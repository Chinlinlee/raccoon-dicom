const _ = require("lodash");
const workItemModel = require("@models/mongodb/models/workItems");
const patientModel = require("@models/mongodb/models/patient");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");
const { BaseWorkItemService } = require("./base-workItem.service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { UPS_EVENT_TYPE } = require("./workItem-event");


const notAllowedAttributes = [
    "00080016",
    "00080018",
    "00100010",
    "00100020",
    "00100030",
    "00100040",
    "00380010",
    "00380014",
    "00081080",
    "00081084",
    "0040A370",
    "00741224",
    "00741000"
];

class UpdateWorkItemService extends BaseWorkItemService {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.requestWorkItem = /**  @type {Object[]} */(this.request.body).pop();
        /** @type {DicomJsonModel} */
        this.requestWorkItem = new DicomJsonModel(this.requestWorkItem);
        this.workItem = null;
        this.transactionUID = null;
    }

    async updateUps() {
        this.transactionUID = this.requestWorkItem.getString("00081195");
        await this.findOneWorkItem();
        await this.checkRequestUpsIsValid();
        this.adjustRequestWorkItem();

        let updatedWorkItem = await workItemModel.findOneAndUpdate({
            upsInstanceUID: this.workItem.dicomJson.upsInstanceUID
        }, {
            ...this.requestWorkItem.dicomJson
        }, {
            new: true
        });

        let updateWorkItemDicomJson = new DicomJsonModel(updatedWorkItem);
        let hitSubscriptions = await this.getHitSubscriptions(updateWorkItemDicomJson);
        if (hitSubscriptions.length === 0) {
            return updatedWorkItem;
        }
        let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);


        //Each time the SCP changes the Input Readiness State (0040,4041) Attribute for a UPS instance, the SCP shall send a UPS State Report Event to subscribed SCUs.
        let modifiedInputReadLineState = this.requestWorkItem.getString(`${dictionary.keyword.InputReadinessState}`);
        let originalInputReadLineState = this.workItem.getString(`${dictionary.keyword.InputReadinessState}`);
        if (modifiedInputReadLineState && modifiedInputReadLineState !== originalInputReadLineState) {
            this.addUpsEvent(
                UPS_EVENT_TYPE.StateReport,
                this.workItem.dicomJson.upsInstanceUID,
                this.stateReportOf(updateWorkItemDicomJson),
                hitSubscriptionAeTitleArray
            );
        }

        this.addProgressInfoUpdatedEvent(updateWorkItemDicomJson, hitSubscriptionAeTitleArray);
        this.addAssignedEvents(updateWorkItemDicomJson, hitSubscriptionAeTitleArray);

        this.triggerUpsEvents();
    }
    
    addProgressInfoUpdatedEvent(workItemDicomJson, aeTitles) {
        let modifiedProcedureStepProgressInfo = _.get(this.requestWorkItem.dicomJson, dictionary.keyword.ProcedureStepProgressInformationSequence);
        let originalProcedureStepProgressInfo = _.get(this.workItem.dicomJson , dictionary.keyword.ProcedureStepProgressInformationSequence);
        if (modifiedProcedureStepProgressInfo && !_.isEqual(modifiedProcedureStepProgressInfo, originalProcedureStepProgressInfo)) {
            this.addUpsEvent(
                UPS_EVENT_TYPE.ProgressReport,
                this.workItem.dicomJson.upsInstanceUID,
                this.progressReportOf(workItemDicomJson),
                aeTitles
            );
        }
    }

    addAssignedEvents(workItemDicomJson, aeTitles) {
        let modifiedPerformer = _.get(this.requestWorkItem.dicomJson, dictionary.keyword.ScheduledHumanPerformersSequence);
        let originalPerformer = _.get(this.workItem.dicomJson, dictionary.keyword.ScheduledHumanPerformersSequence);
        let performerUpdated = modifiedPerformer && !_.isEqual(modifiedPerformer, originalPerformer);

        let modifiedStationName = _.get(this.requestWorkItem.dicomJson, dictionary.keyword.ScheduledStationNameCodeSequence);
        let originalStationName = _.get(this.workItem.dicomJson, dictionary.keyword.ScheduledStationNameCodeSequence);
        let stationNameUpdate = modifiedStationName && !_.isEqual(modifiedStationName, originalStationName);

        let assignedEventInformationArray = this.getAssignedEventInformationArray(workItemDicomJson, performerUpdated, stationNameUpdate);
        for(let assignedEventInfo of assignedEventInformationArray) {
            this.addUpsEvent(UPS_EVENT_TYPE.Assigned, workItemDicomJson.dicomJson.upsInstanceUID, assignedEventInfo, aeTitles);
        }
    }

    async findOneWorkItem() {

        let workItem = await workItemModel.findOne({
            upsInstanceUID: this.request.params.workItem
        });

        if (!workItem) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSDoesNotExist,
                "The UPS instance not exist",
                404
            );
        }

        this.workItem = new DicomJsonModel(workItem.toObject());

    }

    checkRequestUpsIsValid() {
        let procedureState = this.workItem.getString("00741000");

        const mappingMethod = {
            "SCHEDULED": () => {
                if (this.transactionUID) {
                    throw new DicomWebServiceError(
                        DicomWebStatusCodes.UPSNotYetInProgress,
                        "The request should not contain transaction UID of the UPS instance state is SCHEDULED",
                        400
                    );
                }
            },
            "IN PROGRESS": () => {
                let foundUpsTransactionUID = this.workItem.getString("00081195");
                if (!this.transactionUID) {
                    throw new DicomWebServiceError(
                        DicomWebStatusCodes.UPSTransactionUIDNotCorrect,
                        "The transaction UID is missing when request UPS instance state is IN_PROGRESS",
                        400
                    );
                } else if (foundUpsTransactionUID != this.transactionUID) {
                    throw new DicomWebServiceError(
                        DicomWebStatusCodes.UPSTransactionUIDNotCorrect,
                        "The request transaction UID is inconsistent with found UPS instance's transaction UID",
                        400
                    );
                }
            },
            "CANCELED": () => {
                throw new DicomWebServiceError(
                    DicomWebStatusCodes.UPSMayNoLongerBeUpdated,
                    "Shall not modify UPS instance with state CANCELED"
                );
            },
            "COMPLETED": () => {
                throw new DicomWebServiceError(
                    DicomWebStatusCodes.UPSMayNoLongerBeUpdated,
                    "Shall not modify UPS instance with state COMPLETED"
                );
            }
        };

        return mappingMethod[procedureState]() || true;
    }

    /**
     * remove not allowed updating attribute in request work item
     */
    adjustRequestWorkItem() {
        for (let i = 0; i < notAllowedAttributes.length; i++) {
            let notAllowedAttr = notAllowedAttributes[i];
            _.unset(this.requestWorkItem.dicomJson, notAllowedAttr);
        }
    }
}

module.exports.UpdateWorkItemService = UpdateWorkItemService;
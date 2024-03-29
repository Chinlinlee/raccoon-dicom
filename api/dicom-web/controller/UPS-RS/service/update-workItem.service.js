const _ = require("lodash");
const { WorkItemModel } = require("@dbModels/workitems.model");
const { PatientModel } = require("@dbModels/patient.model");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { BaseWorkItemService } = require("@api/dicom-web/controller/UPS-RS/service/base-workItem.service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { UPS_EVENT_TYPE } = require("./workItem-event");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");

class UpdateWorkItemService extends BaseWorkItemService {
    static notAllowedAttributes = Object.freeze([
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
    ]);
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.requestWorkItem = /**  @type {Object[]} */(this.request.body).pop();
        /** @type { BaseDicomJson } */
        this.requestWorkItem = new BaseDicomJson(this.requestWorkItem);
        this.transactionUID = null;
    }

    async updateUps() {
        this.transactionUID = this.requestWorkItem.getString("00081195");
        let workItem = await WorkItemModel.findOneByUpsInstanceUID(this.request.params.workItem);
        /** @type { BaseDicomJson } */
        this.workItemDicomJson = await workItem.toDicomJson();
        await this.checkRequestUpsIsValid();
        this.adjustRequestWorkItem();

        let updatedWorkItem = await WorkItemModel.updateOneByUpsInstanceUID(this.request.params.workItem, {
            ...this.requestWorkItem.dicomJson
        });

        this.triggerUpdateWorkItemEvent(updatedWorkItem);
    }

    async triggerUpdateWorkItemEvent(workItem) {
        let updateWorkItemDicomJson = await workItem.toDicomJson();
        let hitSubscriptions = await this.getHitSubscriptions(workItem);
        if (hitSubscriptions.length === 0) {
            return workItem;
        }
        let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);


        //Each time the SCP changes the Input Readiness State (0040,4041) Attribute for a UPS instance, the SCP shall send a UPS State Report Event to subscribed SCUs.
        let modifiedInputReadLineState = this.requestWorkItem.getString(`${dictionary.keyword.InputReadinessState}`);
        let originalInputReadLineState = this.workItemDicomJson.getString(`${dictionary.keyword.InputReadinessState}`);
        if (modifiedInputReadLineState && modifiedInputReadLineState !== originalInputReadLineState) {
            this.addUpsEvent(
                UPS_EVENT_TYPE.StateReport,
                this.request.params.workItem,
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
        let originalProcedureStepProgressInfo = _.get(this.workItemDicomJson.dicomJson, dictionary.keyword.ProcedureStepProgressInformationSequence);
        if (modifiedProcedureStepProgressInfo && !_.isEqual(modifiedProcedureStepProgressInfo, originalProcedureStepProgressInfo)) {
            this.addUpsEvent(
                UPS_EVENT_TYPE.ProgressReport,
                this.request.params.workItem,
                this.progressReportOf(workItemDicomJson),
                aeTitles
            );
        }
    }

    addAssignedEvents(workItemDicomJson, aeTitles) {
        let modifiedPerformer = _.get(this.requestWorkItem.dicomJson, dictionary.keyword.ScheduledHumanPerformersSequence);
        let originalPerformer = _.get(this.workItemDicomJson.dicomJson, dictionary.keyword.ScheduledHumanPerformersSequence);
        let performerUpdated = modifiedPerformer && !_.isEqual(modifiedPerformer, originalPerformer);

        let modifiedStationName = _.get(this.requestWorkItem.dicomJson, dictionary.keyword.ScheduledStationNameCodeSequence);
        let originalStationName = _.get(this.workItemDicomJson.dicomJson, dictionary.keyword.ScheduledStationNameCodeSequence);
        let stationNameUpdate = modifiedStationName && !_.isEqual(modifiedStationName, originalStationName);

        let assignedEventInformationArray = this.getAssignedEventInformationArray(workItemDicomJson, performerUpdated, stationNameUpdate);
        for (let assignedEventInfo of assignedEventInformationArray) {
            this.addUpsEvent(UPS_EVENT_TYPE.Assigned, this.request.params.workItem, assignedEventInfo, aeTitles);
        }
    }


    checkRequestUpsIsValid() {
        let procedureState = this.workItemDicomJson.getString("00741000");

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
                let foundUpsTransactionUID = this.workItemDicomJson.getString("00081195");
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
        for (let i = 0; i < UpdateWorkItemService.notAllowedAttributes.length; i++) {
            let notAllowedAttr = UpdateWorkItemService.notAllowedAttributes[i];
            _.unset(this.requestWorkItem.dicomJson, notAllowedAttr);
        }
    }
}

module.exports.UpdateWorkItemService = UpdateWorkItemService;
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
const { SubscribeService } = require("./subscribe.service");
const { UPS_EVENT_TYPE } = require("./workItem-event");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

class CreateWorkItemService extends BaseWorkItemService {
    constructor(req, res) {
        super(req, res);
        this.requestWorkItem = /**  @type {Object[]} */(this.request.body).pop();
        /** @type {DicomJsonModel} */
        this.requestWorkItem = new DicomJsonModel(this.requestWorkItem);
    }

    async createUps() {
        let uid = _.get(this.request, "query.workitem",
            await UIDUtils.createUID()
        );
        _.set(this.requestWorkItem.dicomJson, "upsInstanceUID", uid);
        _.set(this.requestWorkItem.dicomJson, "00080018", {
            vr: "UI",
            Value: [
                uid
            ]
        });
        let workListLabel = this.requestWorkItem.getString("00741202");
        if (!workListLabel) {
            _.set(this.requestWorkItem, "00741202", {
                vr: "LO",
                Value: [
                    "RACCOON"
                ]
            });
        }

        if (this.requestWorkItem.getString("00741000") !== "SCHEDULED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSNotScheduled,
                `Refused: The provided value of UPS State was not "SCHEDULED"`,
                400
            );
        }

        let patient = await this.findOneOrCreatePatient();

        let workItem = new workItemModel(this.requestWorkItem.dicomJson);
        
        if (await this.isUpsExist(uid)) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.DuplicateSOPinstance,
                `SOP Instance UID that was already allocated to another SOP Instance`,
                400
            );
        }
        let savedWorkItem = await workItem.save();


        let workItemDicomJson = new DicomJsonModel(savedWorkItem);
        let hitGlobalSubscriptions = await this.getHitGlobalSubscriptions(workItemDicomJson);
        for(let hitGlobalSubscription of hitGlobalSubscriptions) {
            let subscribeService = new SubscribeService(this.request, this.response);
            subscribeService.upsInstanceUID = workItemDicomJson.dicomJson.upsInstanceUID;
            subscribeService.deletionLock = hitGlobalSubscription.isDeletionLock;
            subscribeService.subscriberAeTitle = hitGlobalSubscription.aeTitle;
            await subscribeService.create();
        }

        let hitSubscriptions = await this.getHitSubscriptions(workItemDicomJson);
        
        if (hitSubscriptions) {
            let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);
            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, workItemDicomJson.dicomJson.upsInstanceUID, this.stateReportOf(workItemDicomJson), hitSubscriptionAeTitleArray);
            let assignedEventInformationArray = await this.getAssignedEventInformationArray(
                workItemDicomJson,
                _.get(workItemDicomJson.dicomJson, `${dictionary.keyword.ScheduledStationNameCodeSequence}`, false),
                _.get(workItemDicomJson.dicomJson, `${dictionary.keyword.ScheduledHumanPerformersSequence}`, false)
            );
            
            for(let assignedEventInfo of assignedEventInformationArray) {
                this.addUpsEvent(UPS_EVENT_TYPE.Assigned, workItemDicomJson.dicomJson.upsInstanceUID, assignedEventInfo, hitSubscriptionAeTitleArray);
            }
        }
        
        this.triggerUpsEvents();

        return workItem;
    }

    async findOneOrCreatePatient() {
        let patientId = this.requestWorkItem.getString("00100020");
        _.set(this.requestWorkItem.dicomJson, "patientID", patientId);

        /** @type {patientModel | null} */
        let patient = await patientModel.findOne({
            "00100020.Value": patientId
        });

        if (!patient) {
            /** @type {patientModel} */
            let patientObj = new patientModel(this.requestWorkItem.dicomJson);
            patient = await patientObj.save();
        }

        return patient;
    }

    async isUpsExist(uid) {
        return await workItemModel.findOne({
            upsInstanceUID: uid
        });
    }
}

module.exports.CreateWorkItemService = CreateWorkItemService;
const _ = require("lodash");
const { WorkItemModel } = require("@dbModels/workitems.model");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { BaseWorkItemService } = require("@api/dicom-web/controller/UPS-RS/service/base-workItem.service");
const { SubscribeService } = require("@api/dicom-web/controller/UPS-RS/service/subscribe.service");
const { UPS_EVENT_TYPE } = require("./workItem-event");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");

class CreateWorkItemService extends BaseWorkItemService {
    constructor(req, res) {
        super(req, res);
        this.requestWorkItem = /**  @type {Object[]} */(this.request.body).pop();
        /** @type {BaseDicomJson} */
        this.requestWorkItem = new BaseDicomJson(this.requestWorkItem);
    }

    async createUps() {
        let uid = _.get(this.request, "query.workitem",
            await UIDUtils.createUID()
        );
        await this.dataAdjustBeforeCreatingUps(uid);
        await this.validateWorkItem(uid);

        let savedWorkItem = await WorkItemModel.createWorkItemAndPatient(this.requestWorkItem.dicomJson);

        this.triggerCreateEvent(savedWorkItem);

        return savedWorkItem;
    }

    async dataAdjustBeforeCreatingUps(uid) {
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

        let patientId = this.requestWorkItem.getString("00100020");
        _.set(this.requestWorkItem.dicomJson, "patientID", patientId);
    }

    async validateWorkItem(uid) {
        if (this.requestWorkItem.getString("00741000") !== "SCHEDULED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSNotScheduled,
                `Refused: The provided value of UPS State was not "SCHEDULED"`,
                400
            );
        }

        if (await this.isUpsExist(uid)) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.DuplicateSOPinstance,
                `SOP Instance UID that was already allocated to another SOP Instance`,
                400
            );
        }
    }

    async triggerCreateEvent(workItem) {
        let workItemDicomJson = new BaseDicomJson(workItem);
        let hitGlobalSubscriptions = await this.getHitGlobalSubscriptions(workItemDicomJson);
        for (let hitGlobalSubscription of hitGlobalSubscriptions) {
            let subscribeService = new SubscribeService(this.request, this.response);
            subscribeService.upsInstanceUID = workItemDicomJson.dicomJson.upsInstanceUID;
            subscribeService.deletionLock = hitGlobalSubscription.isDeletionLock;
            subscribeService.subscriberAeTitle = hitGlobalSubscription.aeTitle;
            await subscribeService.create();
        }

        let hitSubscriptions = await this.getHitSubscriptions(workItem);

        if (hitSubscriptions) {
            let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);
            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, workItemDicomJson.dicomJson.upsInstanceUID, this.stateReportOf(await workItem.toDicomJson()), hitSubscriptionAeTitleArray);
            let assignedEventInformationArray = await this.getAssignedEventInformationArray(
                workItemDicomJson,
                _.get(workItemDicomJson.dicomJson, `${dictionary.keyword.ScheduledStationNameCodeSequence}`, false),
                _.get(workItemDicomJson.dicomJson, `${dictionary.keyword.ScheduledHumanPerformersSequence}`, false)
            );

            for (let assignedEventInfo of assignedEventInformationArray) {
                this.addUpsEvent(UPS_EVENT_TYPE.Assigned, workItemDicomJson.dicomJson.upsInstanceUID, assignedEventInfo, hitSubscriptionAeTitleArray);
            }
        }

        this.triggerUpsEvents();
    }

    async isUpsExist(uid) {
        return await WorkItemModel.findOneByUpsInstanceUID(uid);
    }
}

module.exports.CreateWorkItemService = CreateWorkItemService;
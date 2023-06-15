const _ = require("lodash");
const { WorkItemEvent } = require("./workItem-event");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");
const { findWsArrayByAeTitle } = require("@root/websocket");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");
const { convertRequestQueryToMongoQuery } = require("../../QIDO-RS/service/QIDO-RS.service");
const globalSubscriptionModel = require("@models/mongodb/models/upsGlobalSubscription");
const subscriptionModel = require("@models/mongodb/models/upsSubscription");
const workItemModel = require("@models/mongodb/models/workItems");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
class BaseWorkItemService {

    constructor(req, res) {
        /** @type { import("express").Request } */
        this.request = req;
        /** @type { import("express").Response } */
        this.response = res;
        /** @type {WorkItemEvent[]} */
        this.upsEvents = [];
        /** @type {DicomJsonModel} */
        this.workItem = null;
    }

    addUpsEvent(type, upsInstanceUID, eventInformation, subscribers) {
        let workItemEvent = new WorkItemEvent(type, upsInstanceUID, eventInformation, subscribers);
        this.upsEvents.push(workItemEvent);
    }

    async triggerUpsEvents() {
        while (this.upsEvents.length > 0) {
            let upsEvent = this.upsEvents.shift();
            for (let i = 0; i < upsEvent.subscriberAeTitleArray.length; i++) {
                let aeTitle = upsEvent.subscriberAeTitleArray[i];
                if (!(await this.isAeTileSubscribed(aeTitle))) 
                    continue;

                let wsArray = findWsArrayByAeTitle(aeTitle);
                let basicEventJson = upsEvent.getBasicEventJson();
                _.merge(upsEvent.eventAttr, basicEventJson);
                wsArray.forEach(ws => {
                    ws.send(
                        JSON.stringify(upsEvent.eventAttr, null, 4)
                    );
                });
            }
        }
    }

    /**
     * Use for getting event information
     * @param {DicomJsonModel} workItem
     */
    stateReportOf(workItem) {
        let eventInformation = {
            "00404041": {
                "vr": "CS",
                "Value": [
                    `${workItem.getString("00404041")}`
                ]
            },
            "00741000": {
                "vr": "CS",
                "Value": [
                    `${workItem.getString("00741000")}`
                ]
            }
        };

        if (workItem.getString("00741000") === "CANCELED") {
            let item = _.get(workItem.dicomJson, "00741002");
            if (item) {
                _.set(eventInformation, "0074100E", _.get(item, "0074100E"));
                _.set(eventInformation, "00741238", _.get(item, "00741238"));
            }
        }

        return eventInformation;
    }

    progressReportOf(workItem) {
        return {
            "00741002": _.get(workItem.dicomJson, dictionary.keyword.ProcedureStepProgressInformationSequence)
        };
    }

    async isAeTileSubscribed(aeTitle) {
        let subscription = await subscriptionModel.findOne({
            aeTitle: aeTitle
        });

        if (!subscription)
            return false;

        return subscription.subscribed === SUBSCRIPTION_STATE.SUBSCRIBED_LOCK || 
               subscription.subscribed === SUBSCRIPTION_STATE.SUBSCRIBED_NO_LOCK;
    }

    async getGlobalSubscriptionsCursor() {
        return globalSubscriptionModel.find({}).cursor();
    }

    /**
     * @param {DicomJsonModel} workItem
     */
    async getHitGlobalSubscriptions(workItem) {
        let globalSubscriptionsCursor = await this.getGlobalSubscriptionsCursor();
        let hitGlobalSubscriptions = [];
        let globalSubscription = await globalSubscriptionsCursor.next();
        while(globalSubscription) {
            if (!globalSubscription.queryKeys) {
                hitGlobalSubscriptions.push(globalSubscription);
            } else {
                let { $match } = await convertRequestQueryToMongoQuery(globalSubscription.queryKeys);
                $match.$and.push({
                    upsInstanceUID: workItem.dicomJson.upsInstanceUID
                });
                let count = await workItemModel.countDocuments({
                    ...$match
                });
                if (count > 0)
                    hitGlobalSubscriptions.push(globalSubscription);
            }
            globalSubscription = await globalSubscriptionsCursor.next();
        }
        return hitGlobalSubscriptions;
    }

    async getHitSubscriptions(workItem) {
        let hitSubscriptions = await subscriptionModel.find({
            workItems: workItem.dicomJson._id
        });

        return hitSubscriptions;
    }

    getAssignedEventInformationArray(workItem, stationNameUpdated, performerUpdated) {
        if (!performerUpdated) {
            let scheduledStationCodeSeq = _.get(workItem.dicomJson, `${dictionary.keyword.ScheduledStationNameCodeSequence}.Value`);
            return stationNameUpdated ? scheduledStationCodeSeq : [];
        }
        /** @type {Array<any>} */
        let scheduledHumanPerformersSeq = _.get(workItem.dicomJson, `${dictionary.keyword.ScheduledHumanPerformersSequence}.Value`);
        let assignedEventInfo = scheduledHumanPerformersSeq.map(item => this.getAssignedOf(workItem, stationNameUpdated, item));
        return assignedEventInfo;
    }

    /**
     * 
     * @param {*} workItem
     * @param {boolean} stationNameUpdated 
     * @param {*} seqItem 
     */
    getAssignedOf(workItem, stationNameUpdated, seqItem) {
        let eventInformation = {};
        _.set(eventInformation, `${dictionary.keyword.HumanPerformerCodeSequence}`, _.get(seqItem, `${dictionary.keyword.HumanPerformerCodeSequence}`));
        _.set(eventInformation, `${dictionary.keyword.HumanPerformerOrganization}`, _.get(seqItem, `${dictionary.keyword.HumanPerformerOrganization}`));
        if (stationNameUpdated) {
            _.set(eventInformation, `${dictionary.keyword.ScheduledStationNameCodeSequence}`, _.get(workItem.dicomJson, `${dictionary.keyword.ScheduledStationNameCodeSequence}`));
        }
        return eventInformation;
    }
}

module.exports.BaseWorkItemService = BaseWorkItemService;
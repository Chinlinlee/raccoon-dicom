const _ = require("lodash");
const { WorkItemEvent } = require("./workItem-event");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");
const subscriptionModel = require("@models/mongodb/models/upsSubscription");
const { findWsArrayByAeTitle } = require("@root/websocket");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");


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

    async isAeTileSubscribed(aeTitle) {
        let subscription = await subscriptionModel.findOne({
            aeTitle: aeTitle
        });

        if (!subscription)
            return false;

        return subscription.subscribed === SUBSCRIPTION_STATE.SUBSCRIBED_LOCK || 
               subscription.subscribed === SUBSCRIPTION_STATE.SUBSCRIBED_NO_LOCK;
    }
}

module.exports.BaseWorkItemService = BaseWorkItemService;
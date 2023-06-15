const { default: UID } = require("@dcm4che/data/UID");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");


class WorkItemEvent {

    static messageID = 0;
    /**
     * @param {EVENT_TYPE} type
     * @param {string} upsInstanceUID
     * @param {DicomJsonModel} eventAttr
     * @param {string[]} subscriberAeTitleArray
     */
    constructor(type, upsInstanceUID, eventAttr, subscriberAeTitleArray) {
        /** @type {UPS_EVENT_TYPE} */
        this.type = type;
        /** @type {string} */
        this.upsInstanceUID = upsInstanceUID;
        /** @type {DicomJsonModel} */
        this.eventAttr = eventAttr;
        /** */
        this.subscriberAeTitleArray = subscriberAeTitleArray;
    }

    getBasicEventJson() {
        return {
            "00000002": {
                "vr": "UI",
                "Value": [
                    UID.UnifiedProcedureStepPush
                ]
            },
            "00000110": {
                "vr": "US",
                "Value": [
                    WorkItemEvent.messageID++
                ]
            },
            "00001000": {
                "vr": "UI",
                "Value": [
                    `${this.upsInstanceUID}`
                ]
            },
            "00001002": {
                "vr": "US",
                "Value": [
                    this.type
                ]
            }
        };
    }

}

/**
 * @see {@link https://dicom.nema.org/medical/dicom/current/output/html/part04.html#table_CC.2.4-1| Table CC.2.4-1. Report a Change in UPS Status - Event Report Information}
 * @readonly
 * @enum {number}
 */
const UPS_EVENT_TYPE = {
    StateReport: 1,
    CancelRequested: 2,
    ProgressReport: 3,
    SCPStatusChange: 4,
    Assigned: 5
};

module.exports.UPS_EVENT_TYPE = UPS_EVENT_TYPE;
module.exports.WorkItemEvent = WorkItemEvent;
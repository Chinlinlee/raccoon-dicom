const _ = require("lodash");
const { DicomJsonModel, BaseDicomJson } = require("@dicom-json-model");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { BaseWorkItemService } = require("@api/dicom-web/controller/UPS-RS/service/base-workItem.service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { UPS_EVENT_TYPE } = require("./workItem-event");
const { raccoonConfig } = require("@root/config-class");

class CancelWorkItemService extends BaseWorkItemService {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.upsInstanceUID = this.request.params.workItem;
        this.workItem = null;
        this.requestWorkItem = /**  @type {Object[]} */(this.request.body).pop();
    }

    async initWorkItem() {
        this.workItem = await this.findOneWorkItem(this.upsInstanceUID);
    }

    async cancel() {
        await this.initWorkItem();
        let procedureStepState = this.workItem.getString(dictionary.keyword.ProcedureStepState);

        if (procedureStepState === "IN PROGRESS") {
            //Only send cancel info event now, IMO
            //User need to watch for cancel event and use change state API to cancel
            await this.addCancelEvent();
            await this.triggerUpsEvents();
            return;
        } else if (procedureStepState === "CANCELED") {
            this.response.set("Warning", "299 <service>: The UPS is already in the requested state of CANCELED.");
            return this.response.status(200).json({
                status: DicomWebStatusCodes.UPSAlreadyInRequestedStateOfCanceled,
                message: "UPS Already In Requested State Of Canceled"
            });
        } else if (procedureStepState === "COMPLETED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSAlreadyCompleted,
                "The request is inconsistent with the current state of the Target Workitem. The Target Workitem is in the COMPLETED state.",
                409
            );
        } else if (procedureStepState === "SCHEDULED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSNotYetInProgress,
                "The request is inconsistent with the current state of the Target Workitem. The Target Workitem is in the SCHEDULED state.",
                409
            );
        }

    }

    async addCancelEvent() {
        let hitSubscriptions = await this.getHitSubscriptions(this.workItem);
        let aeTitles = hitSubscriptions.map(v => v.aeTitle);

        this.addUpsEvent(UPS_EVENT_TYPE.CancelRequested, this.upsInstanceUID, this.cancelRequestBy(), aeTitles);
    }

    cancelRequestBy() {
        let eventInfo = new BaseDicomJson(
            this.requestWorkItem,
            dictionary.keyword.ReasonForCancellation,
            dictionary.keyword.ProcedureStepDiscontinuationReasonCodeSequence,
            dictionary.keyword.ContactURI,
            dictionary.keyword.ContactDisplayName
        );

        eventInfo.setValue(dictionary.keyword.RequestingAE, raccoonConfig.dicomWebConfig.aeTitle);

        return eventInfo.dicomJson;
    }

}


module.exports.CancelWorkItemService = CancelWorkItemService;
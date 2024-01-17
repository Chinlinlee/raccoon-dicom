const _ = require("lodash");
const moment = require("moment");
const { DicomCode } = require("@models/DICOM/code");
const { WorkItemModel } = require("@dbModels/workitems.model");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { BaseWorkItemService } = require("@api/dicom-web/controller/UPS-RS/service/base-workItem.service");
const { UPS_EVENT_TYPE } = require("./workItem-event");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");

class ChangeWorkItemStateService extends BaseWorkItemService {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.requestState = /**  @type {Object[]} */(this.request.body).pop();
        /** @type {BaseDicomJson} */
        this.requestState = new BaseDicomJson(this.requestState);
        this.transactionUID = this.requestState.getString("00081195");
        if (!this.transactionUID) {
            this.response.set("Warning", "299 Raccoon: The Transaction UID is missing.");
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSTransactionUIDNotCorrect,
                "Refused: The Transaction UID is missing.",
                400
            );
        }

        this.workItem = null;
        this.workItemState = "";
        this.workItemTransactionUID = "";
    }

    async changeWorkItemState() { 
        this.workItem = await WorkItemModel.findOneByUpsInstanceUID(this.request.params.workItem);
        /** @type { BaseDicomJson } */
        this.workItemDicomJson = await this.workItem.toDicomJson();
        this.workItemState = this.workItemDicomJson.getString("00741000");
        this.workItemTransactionUID = this.workItemDicomJson.getString("00081195");
        let requestState = this.requestState.getString("00741000");

        if (requestState === "IN PROGRESS") {
            this.inProgressChange();
        } else if (requestState === "CANCELED") {
            this.cancelChange();
        } else if (requestState === "COMPLETED") {
            this.completeChange();
        }

        let updatedWorkItem = await WorkItemModel.findOneAndUpdate({
            upsInstanceUID: this.request.params.workItem
        }, {
            ...this.requestState.dicomJson
        }, {
            new: true
        });

        let updatedWorkItemDicomJson = await updatedWorkItem.toDicomJson();

        let hitSubscriptions = await this.getHitSubscriptions(updatedWorkItem);

        if (hitSubscriptions.length === 0) return;

        let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);
        
        this.addUpsEvent(UPS_EVENT_TYPE.StateReport, updatedWorkItem.upsInstanceUID, this.stateReportOf(updatedWorkItemDicomJson), hitSubscriptionAeTitleArray);
        this.triggerUpsEvents();
    }

    inProgressChange() {
        if (this.workItemState === "IN PROGRESS") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSAlreadyInProgress,
                "The request is inconsistent with the current state of the Target Workitem",
                409
            );
        } else if (this.workItemState === "COMPLETED" || this.workItemState === "CANCELED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSMayNoLongerBeUpdated,
                "The request is inconsistent with the current state of the Target Workitem",
                409
            );
        }
    }

    cancelChange() {
        if (this.workItemState === "SCHEDULED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSNotYetInProgress,
                "The request is inconsistent with the current state of the Target Workitem",
                409
            );
        } else if (this.workItemState === "COMPLETED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSMayNoLongerBeUpdated,
                "The request is inconsistent with the current state of the Target Workitem",
                409
            );
        } else if (this.workItemState === "CANCELED") {
            this.response.set("Warning", "299 Raccoon: The UPS is already in the requested state of CANCELED.");
        }

        if (this.transactionUID !== this.workItemTransactionUID) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSTransactionUIDNotCorrect,
                "Refused: The correct Transaction UID was not provided",
                400
            );
        }
        this.supplementDiscontinuationReasonCode();
    }

    completeChange() {
        if (this.workItemState === "SCHEDULED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSNotYetInProgress,
                "The request is inconsistent with the current state of the Target Workitem (UPS Not Yet In Progress)",
                409
            );
        } else if (this.workItemState === "CANCELED") {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSMayNoLongerBeUpdated,
                "The request is inconsistent with the current state of the Target Workitem (The CANCELED UPS can not change to COMPLETED)",
                409
            );
        } else if (this.workItemState === "COMPLETED") {
            this.response.set("Warning", "299 Raccoon: The UPS is already in the requested state of COMPLETED.");
        }

        if (this.transactionUID !== this.workItemTransactionUID) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSTransactionUIDNotCorrect,
                "Refused: The correct Transaction UID was not provided",
                400
            );
        }
        if (!this.meetFinalStateRequirementsOfCompleted()) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSNotMetFinalStateRequirements,
                "The request is inconsistent with the current state of the Target Workitem (The workitem is not meet final state requirements of completed)",
                409
            );
        }
    }

    ensureProgressInformationSequence() {
        let progressInformation = this.workItemDicomJson.getValues("00741002");
        if (!progressInformation) {
            _.set(this.workItemDicomJson.dicomJson, "00741002", {
                vr: "SQ",
                Value: []
            });
        }
    }

    supplementDiscontinuationReasonCode() {
        this.ensureProgressInformationSequence();
        let procedureStepCancellationDateTime = _.get(this.workItemDicomJson.dicomJson, "00741002.Value.0.00404052");
        if (!procedureStepCancellationDateTime) {
            _.set(this.workItemDicomJson.dicomJson, "00741002.Value.0.00404052", {
                vr: "DT",
                Value: [
                    moment().format("YYYYMMDDhhmmss.SSSSSSZZ")
                ]
            });
        }

        let reasonCodeMeaning = _.get(this.workItemDicomJson.dicomJson, "00741002.Value.0.0074100E.Value.0.00080104");
        if (!reasonCodeMeaning) {
            _.set(this.workItemDicomJson.dicomJson, "00741002.Value.0.0074100E.Value.0", {
                vr: "SQ",
                Value: [
                    {
                        "00081000": {
                            "vr": "SH",
                            "Value": ["110513"]
                        },
                        "00080102": {
                            "vr": "SH",
                            "Value": ["DCM"]
                        },
                        "00080104": {
                            "vr": "LO",
                            "Value": ["Discontinued for unspecified reason"]
                        }
                    }
                ]
            });
        }
    }

    meetFinalStateRequirementsOfCompleted() {
        let performedProcedure = _.get(this.workItemDicomJson.dicomJson, "00741216");
        if (performedProcedure &&
            _.get(performedProcedure, "Value.0.00404050") &&
            _.get(performedProcedure, "Value.0.00404051")) {

            try {
                let stationNameCode = new DicomCode(_.get(performedProcedure, "Value.0.00404028.Value.0"));
                let workItemCode = new DicomCode(_.get(performedProcedure, "Value.0.00404019.Value.0"));
    
                return true;
            } catch(e) {
                console.log(`Invalid Dicom Code ${e}`);
            }
        }
        return false;
    }
}

module.exports.ChangeWorkItemStateService = ChangeWorkItemStateService;
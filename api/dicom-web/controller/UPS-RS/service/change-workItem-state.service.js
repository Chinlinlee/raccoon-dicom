const _ = require("lodash");
const moment = require("moment");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");
const { DicomCode } = require("@models/DICOM/code");
const workItemModel = require("@models/mongodb/models/workItems");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { BaseWorkItemService } = require("./base-workItem.service");
const { UPS_EVENT_TYPE } = require("./workItem-event");

class ChangeWorkItemStateService extends BaseWorkItemService {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.requestState = /**  @type {Object[]} */(this.request.body).pop();
        /** @type {DicomJsonModel} */
        this.requestState = new DicomJsonModel(this.requestState);
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
        await this.findOneWorkItem();
        
        this.workItemState = this.workItem.getString("00741000");
        this.workItemTransactionUID = this.workItem.getString("00081195");
        let requestState = this.requestState.getString("00741000");

        if (requestState === "IN PROGRESS") {
            this.inProgressChange();
        } else if (requestState === "CANCELED") {
            this.cancelChange();
        } else if (requestState === "COMPLETED") {
            this.completeChange();
        }

        let updatedWorkItem = await workItemModel.findOneAndUpdate({
            upsInstanceUID: this.request.params.workItem
        }, {
            ...this.requestState.dicomJson
        }, {
            new: true
        });

        let updatedWorkItemDicomJson = new DicomJsonModel(updatedWorkItem.toObject());

        let hitSubscriptions = await this.getHitSubscriptions(updatedWorkItemDicomJson);

        if (hitSubscriptions.length === 0) return;

        let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);
        
        this.addUpsEvent(UPS_EVENT_TYPE.StateReport, updatedWorkItemDicomJson.dicomJson.upsInstanceUID, this.stateReportOf(updatedWorkItemDicomJson), hitSubscriptionAeTitleArray);
        this.triggerUpsEvents();
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
        
        this.workItem = new DicomJsonModel(workItem);
        
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
        let progressInformation = _.get(this.workItem.dicomJson, "00741002.Value");
        if (!progressInformation) {
            _.set(this.workItem.dicomJson, "00741002", {
                vr: "SQ",
                Value: []
            });
        }
    }

    supplementDiscontinuationReasonCode() {
        this.ensureProgressInformationSequence();
        let procedureStepCancellationDateTime = _.get(this.workItem.dicomJson, "00741002.Value.0.00404052");
        if (!procedureStepCancellationDateTime) {
            _.set(this.workItem.dicomJson, "00741002.Value.0.00404052", {
                vr: "DT",
                Value: [
                    moment().format("YYYYMMDDhhmmss.SSSSSSZZ")
                ]
            });
        }

        let reasonCodeMeaning = _.get(this.workItem.dicomJson, "00741002.Value.0.0074100E.Value.0.00080104");
        if (!reasonCodeMeaning) {
            _.set(this.workItem.dicomJson, "00741002.Value.0.0074100E.Value.0", {
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
        let performedProcedure = _.get(this.workItem.dicomJson, "00741216");
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
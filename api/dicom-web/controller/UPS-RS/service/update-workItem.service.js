const _ = require("lodash");
const workItemModel = require("@models/mongodb/models/workItems");
const patientModel = require("@models/mongodb/models/patient");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");


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

class UpdateWorkItemService {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    constructor(req, res) {
        this.request = req;
        this.response = res;
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
        
        await workItemModel.findOneAndUpdate({
            upsInstanceUID: this.workItem.dicomJson.upsInstanceUID
        }, {
            ...this.requestWorkItem.dicomJson
        });
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
                let foundUpsTransactionUID = this.workItem.getString("00741000");
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
        for(let i = 0 ; i < notAllowedAttributes.length ; i++) {
            let notAllowedAttr = notAllowedAttributes[i];
            _.unset(this.requestWorkItem.dicomJson, notAllowedAttr);
        }
    }
}

module.exports.UpdateWorkItemService = UpdateWorkItemService;
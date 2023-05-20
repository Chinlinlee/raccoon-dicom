const _ = require("lodash");
const workItemModel = require("@models/mongodb/models/workItems");
const patientModel = require("@models/mongodb/models/patient");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");

class CreateWorkItemService {
    constructor(req, res) {
        this.request = req;
        this.response = res;
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
        await workItem.save();


        //TODO: subscription
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
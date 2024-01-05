const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { PatientModel } = require("@models/sql/models/patient.model");
const { CreateMwlItemService } = require("@root/api/dicom-web/controller/MWL-RS/service/create-mwlItem.service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { MwlItemPersistentObject } = require("@models/sql/po/mwlItem.po");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");

class SqlCreateMwlItemService extends CreateMwlItemService {
    constructor(req, res) {
        super(req, res);
        this.requestMwlItemDicomJsonModel = new DicomJsonModel(this.requestMwlItem[0]);
    }

    async checkPatientExist() {
        let patientID = this.requestMwlItemDicomJsonModel.getString("00100020");
        let patientCount = await PatientModel.count({
            where: {
                x00100020: patientID
            }
        });
        if (patientCount <= 0) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.MissingAttribute,
                `Patient[id=${patientID}] does not exists`,
                404
            );
        }
    }

    async createOrUpdateMwl(mwlDicomJson) {
        let studyInstanceUID = mwlDicomJson.getValue(dictionary.keyword.StudyInstanceUID);
        let patientID = this.requestMwlItemDicomJsonModel.getString("00100020");
        let mwlItemPO = new MwlItemPersistentObject(mwlDicomJson.dicomJson, await PatientModel.findOne({ where: { x00100020: patientID } }));
        let mwlItem = await mwlItemPO.save();
        this.apiLogger.logger.info(`create mwl item: ${studyInstanceUID}`);
        return mwlItem.json;
    }
}

module.exports.CreateMwlItemService = SqlCreateMwlItemService;
const _ = require("lodash");
const { MwlItemModel } = require("@dbModels/mwlitems.model");
const { PatientModel } = require("@dbModels/patient.model");
const { StudyModel } = require("@dbModels/study.model");
const crypto = require('crypto');
const moment = require("moment");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { v4: uuidV4 } = require("uuid");
const shortHash = require("shorthash2");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { ApiLogger } = require("@root/utils/logs/api-logger");

class CreateMwlItemService {
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.requestMwlItem = /**  @type {Object} */(this.request.body);
        this.requestMwlItemDicomJson = new BaseDicomJson(this.requestMwlItem[0]);
        this.apiLogger = new ApiLogger(req, "Create Mwl Item Service");
        this.apiLogger.addTokenValue();
    }

    async create() {

        await this.checkPatientExist();

        let mwlItem = this.requestMwlItem[0];
        let mwlDicomJson = new BaseDicomJson(mwlItem);

        let spsItem = new BaseDicomJson({
            [dictionary.keyword.ScheduledProcedureStepSequence]: {
                ...mwlItem[dictionary.keyword.ScheduledProcedureStepSequence]
            }
        });

        let spsStatusPath = `${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStatus}`;
        if (!spsItem.getValue(spsStatusPath)) {
            spsItem.setValue(spsStatusPath, "SCHEDULED");
        }

        let spsIDPath = `${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepID}`;
        if (!spsItem.getValue(spsIDPath)) {
            let spsID = shortHash(uuidV4());
            spsItem.setValue(spsIDPath, `SPS-${spsID}`);
        }
        mwlItem[dictionary.keyword.ScheduledProcedureStepSequence] = {
            ...mwlItem[dictionary.keyword.ScheduledProcedureStepSequence],
            ...spsItem.dicomJson[dictionary.keyword.ScheduledProcedureStepSequence]
        };
        
        if (!mwlDicomJson.getValue(dictionary.keyword.RequestedProcedureID)) {
            let rpID = shortHash(uuidV4());
            _.set(mwlItem, dictionary.keyword.RequestedProcedureID, {
                vr: BaseDicomJson.getTagVrOfTag(dictionary.keyword.RequestedProcedureID),
                Value: [
                    `RP-${rpID}`
                ]
            });
        }
        
        if (!mwlDicomJson.getValue(dictionary.keyword.StudyInstanceUID)) {
            let studyInstanceUID = await UIDUtils.createUID();
            _.set(mwlItem, dictionary.keyword.StudyInstanceUID, {
                vr: BaseDicomJson.getTagVrOfTag(dictionary.keyword.StudyInstanceUID),
                Value: [
                    studyInstanceUID
                ]
            });
        }

        if (!mwlDicomJson.getValue(dictionary.keyword.AccessionNumber)) {
            let accessionNumber = shortHash(uuidV4());
            _.set(mwlItem, dictionary.keyword.AccessionNumber, {
                vr: BaseDicomJson.getTagVrOfTag(dictionary.keyword.AccessionNumber),
                Value: [
                    accessionNumber
                ]
            });
        }

        return await this.createOrUpdateMwl(mwlDicomJson);
    }

    async checkPatientExist() {
        let patientID = this.requestMwlItemDicomJson.getString("00100020");
        let patientCount = await PatientModel.getCountByPatientID(patientID);
        if (patientCount <= 0) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.MissingAttribute,
                `Patient[id=${patientID}] does not exists`,
                404
            );
        }
    }

    /**
     * 
     * @param {BaseDicomJson} mwlDicomJson 
     */
    async createOrUpdateMwl(mwlDicomJson) {
        let studyInstanceUID = mwlDicomJson.getValue(dictionary.keyword.StudyInstanceUID);
        let spsItem = new BaseDicomJson(mwlDicomJson.getValue(dictionary.keyword.ScheduledProcedureStepSequence));
        let spsID = spsItem.getValue(dictionary.keyword.ScheduledProcedureStepID);
        let foundMwl = await MwlItemModel.findOneByStudyInstanceUIDAndSpsID(studyInstanceUID, spsID);

        if (!foundMwl) {
            // create
            let createdMwlItem = await MwlItemModel.createWithGeneralDicomJson(mwlDicomJson.dicomJson);
            this.apiLogger.logger.info(`create mwl item: ${studyInstanceUID}`);
            return createdMwlItem.toGeneralDicomJson();
        } else {
            // update
            let updatedMwlItem = await MwlItemModel.updateOneWithGeneralDicomJson(foundMwl, mwlDicomJson.dicomJson);
            this.apiLogger.logger.info(`update mwl item: ${studyInstanceUID}`);
            return updatedMwlItem.toGeneralDicomJson();
        }
    }

}

module.exports.CreateMwlItemService = CreateMwlItemService;
const _ = require("lodash");
const { MwlItemModel } = require("@models/mongodb/models/mwlitems.model");
const { PatientModel } = require("@models/mongodb/models/patient.model");
const { StudyModel } = require("@models/mongodb/models/study.model");
const crypto = require('crypto');
const moment = require("moment");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { DicomJsonModel, BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { v4: uuidV4 } = require("uuid");
const shortHash = require("shorthash2");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { ApiLogger } = require("@root/utils/logs/api-logger");

class CreateMwlItemService {
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.requestMwlItem = /**  @type {Object} */(this.request.body);
        /** @type {DicomJsonModel} */
        this.requestMwlItemDicomJsonModel = new DicomJsonModel(this.requestMwlItem[0]);
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
            ...spsItem.dicomJson
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
        let patientID = this.requestMwlItemDicomJsonModel.getString("00100020");
        let patientCount = await PatientModel.count({ 
            patientID 
        });
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
        let foundMwl = await MwlItemModel.findOne({
            $and: [
                {
                    "0020000D.Value.0": studyInstanceUID
                },
                {
                    "00400100.Value.0.00400009.Value.0": spsID
                }
            ]
        });

        if (!foundMwl) {
            // create
            let mwlItemModelObj = new MwlItemModel(mwlDicomJson.dicomJson);
            await mwlItemModelObj.save();
            this.apiLogger.logger.info(`create mwl item: ${studyInstanceUID}`);
            return mwlItemModelObj.toDicomJson();
        } else {
            // update
            foundMwl.$set({
                ...mwlDicomJson.dicomJson
            });
            await foundMwl.save();
            this.apiLogger.logger.info(`update mwl item: ${studyInstanceUID}`);
            return foundMwl.toDicomJson();
        }
    }

}

module.exports.CreateMwlItemService = CreateMwlItemService;
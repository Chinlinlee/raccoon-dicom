const uuid = require("uuid");
const _ = require("lodash");
const { DicomJsonParser } = require("../../../../../models/DICOM/dicom-json-parser");
const {
    DicomJsonModel,
    DicomJsonBinaryDataModel
} = require("@dicom-json-model");
const { DicomFileSaver } = require("./dicom-file-saver");
const { DicomJpegGenerator } = require("./dicom-jpeg-generator");
const { logger } = require("../../../../../utils/logs/log");
const { DicomWebService } = require("../../../service/dicom-web.service");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");


const StowRsFailureCode = {
    "GENERAL_FAILURE": "272",
    "INVALID_DICOM_INSTANCE": "43264",
    "STUDY_INSTANCE_UID_NOT_MATCH": "43265"
};


class StowRsService {
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res 
     * @param {import('formidable').File[]} uploadFiles
     */
    constructor(req, res, uploadFiles) {
        this.request = req;
        this.response = res;

        this.response.locals = {
            "storeInfos": []
        };

        this.uploadFiles = uploadFiles;

        this.responseMessage = {
            "00081190": {
                //Study retrieve URL
                vr: "UT",
                Value: []
            },
            "00081198": {
                //Failed SOP Sequence
                vr: "SQ",
                Value: [] // Use SOPSeq
            },
            "00081199": {
                //ReferencedSOPSequence
                vr: "SQ",
                Value: [] // Use SOPSeq
            }
        };
        this.responseCode = 200;


        this.setMissingOriginalFilenameFilesToUuid_();
    }

    /**
     * @private
     * @param {string} file 
     */
    fixEmptyUploadFileName_(file) {
        if (!file.originalFilename) file.originalFilename = `${uuid.v4()}.dcm`;
    }

    /**
     * @private
     */
    setMissingOriginalFilenameFilesToUuid_() {
        for (let i = 0; i < this.uploadFiles.length; i++) {
            let file = this.uploadFiles[i];
            this.fixEmptyUploadFileName_(file);
        }
    }

    async storeInstances() {
        for (let i = 0; i < this.uploadFiles.length; i++) {

            let currentFile = this.uploadFiles[i];
            let dicomJsonModel;
            let dicomFileSaveInfo;
            try {
                let storeInstanceResult = await this.storeInstance(currentFile);
                dicomJsonModel = storeInstanceResult.dicomJsonModel;
                dicomFileSaveInfo = storeInstanceResult.dicomFileSaveInfo;
                this.response.locals.storeInfos.push({
                    dicomFileSaveInfo,
                    dicomJsonModel
                });
            } catch (e) {
                // log transferred failure
                let auditManager = new AuditManager(
                    EventType.STORE_CREATE, EventOutcomeIndicator.MajorFailure,
                    DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
                    DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
                );

                await auditManager.onDicomInstancesTransferred(
                    dicomJsonModel ? [dicomJsonModel.uidObj.studyUID] : "Unknown"
                );

                throw e;
            }

            //generate JPEG
            let dicomJpegGenerator = new DicomJpegGenerator(dicomJsonModel, dicomFileSaveInfo.instancePath);
            dicomJpegGenerator.generateAllFrames();
        }

        return {
            code: this.responseCode,
            responseMessage: this.responseMessage
        };
    }

    /**
     * 
     * @param {import("formidable").File} file 
     */
    async storeInstance(file) {
        let dicomJsonParser = new DicomJsonParser();
        let dicomJson = await dicomJsonParser.parseFromFilename(file.filepath);

        let dicomJsonModel = new DicomJsonModel(dicomJson);
        dicomJsonModel.setMinifyDicomJsonAndTempBigValueTags();
        dicomJsonModel.setUidObj();

        let beginAudit = new AuditManager(
            EventType.STORE_BEGIN, EventOutcomeIndicator.Success,
            DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
            DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
        );
        let transferredAudit = new AuditManager(
            EventType.STORE_CREATE, EventOutcomeIndicator.Success,
            DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
            DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
        );

        await beginAudit.onBeginTransferringDicomInstances([dicomJsonModel.uidObj.studyUID]);

        let isSameStudyIDStatus = this.isSameStudyID_(this.responseMessage);
        if (!isSameStudyIDStatus) {
            transferredAudit.eventResult = EventOutcomeIndicator.MinorFailure;
            this.responseCode = 409;
        }

        let dicomJsonBinaryDataModel = new DicomJsonBinaryDataModel(dicomJsonModel);
        await dicomJsonBinaryDataModel.storeAllBinaryDataToFileAndDb();
        dicomJsonBinaryDataModel.replaceAllBinaryToURI();

        let dicomFileSaver = new DicomFileSaver(file, dicomJsonModel);
        let dicomFileSaveInfo = await dicomFileSaver.saveAndGetSaveInfo();

        await dicomJsonModel.saveMetadataToFile(dicomFileSaveInfo.fullPath);

        await dicomJsonModel.storeToDb(dicomFileSaveInfo);

        let retrieveUrlObj = this.getRetrieveUrl(dicomJsonModel.uidObj);
        this.responseMessage["00081190"].Value.push(retrieveUrlObj.study);
        this.responseMessage["00081190"].Value = _.uniq(this.responseMessage["00081190"].Value);

        let sopSeq = this.getSOPSeq(dicomJsonModel.uidObj.sopClass, dicomJsonModel.uidObj.instanceUID);
        _.set(sopSeq, "00081190.vr", "UT");
        _.set(sopSeq, "00081190.Value", [retrieveUrlObj.instance]);
        this.responseMessage["00081199"]["Value"].push(sopSeq);


        await transferredAudit.onDicomInstancesTransferred(
            [dicomJsonModel.uidObj.studyUID]
        );

        return {
            dicomJsonModel,
            dicomFileSaveInfo
        };
    }

    /**
     * @private
     * @param {*} uidObj 
     * @param {*} storeMessage 
     * @returns 
     */
    isSameStudyID_(uidObj, storeMessage) {
        let reqStudyId = this.request.params.studyID;
        let dataStudyId = uidObj.studyUID;
        let sopSeq = this.getSOPSeq(uidObj.sopClass, uidObj.instanceUID);
        let result = true;

        if (reqStudyId) {
            if (reqStudyId !== dataStudyId) {

                logger.error(
                    `[STOW-RS] [The UID is not consist, request UID: (${this.request.params.studyID}, DICOM file UID: ${dataStudyId})]`
                );

                let failureMessage = {
                    "00081197": {
                        vr: "US",
                        Value: [StowRsFailureCode.STUDY_INSTANCE_UID_NOT_MATCH]
                    }
                };

                Object.assign(sopSeq, failureMessage);
                storeMessage["00081198"].Value.push(sopSeq);
                result = false;
            }
        }
        return result;
    }

    /* Failure Reason
    http://dicom.nema.org/medical/dicom/current/output/chtml/part02/sect_J.4.2.html
    A7xx - Refused out of Resources

        The STOW-RS Service did not store the instance because it was out of resources.
    A9xx - Error: Data Set does not match SOP Class

        The STOW-RS Service did not store the instance because the instance does not conform to its specified SOP Class.
    Cxxx - Error: Cannot understand

        The STOW-RS Service did not store the instance because it cannot understand certain Data Elements.
    C122 - Referenced Transfer Syntax not supported

        The STOW-RS Service did not store the instance because it does not support the requested Transfer Syntax for the instance.
    0110 - Processing failure

        The STOW-RS Service did not store the instance because of a general failure in processing the operation.
    0122 - Referenced SOP Class not supported

        The STOW-RS Service did not store the instance because it does not support the requested SOP Class. 
    */
    getSOPSeq(referencedSOPClassUID, referencedSOPInstanceUID) {
        let result = {
            "00081150": {
                vr: "UI",
                Value: [referencedSOPClassUID]
            },
            "00081155": {
                vr: "UI",
                Value: [referencedSOPInstanceUID]
            }
        };
        return result;
    }

    getRetrieveUrl(uidObj) {
        let dicomWebService = new DicomWebService(this.request, undefined);
        let url = `${dicomWebService.getBasicURL()}/studies`;

        return {
            study: `${url}/${uidObj.studyUID}`,
            series: `${url}/${uidObj.studyUID}/series/${uidObj.seriesUID}`,
            instance: `${url}/${uidObj.studyUID}/series/${uidObj.seriesUID}/instances/${uidObj.instanceUID}`
        };
    }

};


module.exports.StowRsService = StowRsService;



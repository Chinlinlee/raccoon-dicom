const _ = require("lodash");

const { DicomJsonParser } = require("@models/DICOM/dicom-json-parser");
const { StowRsService } = require("@root/api/dicom-web/controller/STOW-RS/service/stow-rs.service");
const { DicomFileSaver } = require("@root/api/dicom-web/controller/STOW-RS/service/dicom-file-saver");
const { SqlDicomJsonModel: DicomJsonModel } = require("@models/sql/dicom-json-model");
const { SqlDicomJpegGenerator: DicomJpegGenerator } = require("./dicom-jpeg-generator");

class SqlStowRsService extends StowRsService {
    /**
     * @param {import('express').Request} req
     * @param {import('formidable').File[]} uploadFiles
     */
    constructor(req, uploadFiles) {
        super(req, uploadFiles);
    }

    async storeInstances() {
        for (let i = 0; i < this.uploadFiles.length; i++) {

            let currentFile = this.uploadFiles[i];

            let {
                dicomJsonModel,
                dicomFileSaveInfo
            } = await this.storeInstance(currentFile);


            //sync DICOM to FHIR
            // if (isSyncToFhir) {
            //     let dicomFhirService = new DicomFhirService(this.request, dicomJsonModel);
            //     await dicomFhirService.initDicomFhirConverter();
            //     await dicomFhirService.postDicomToFhirServerAndStoreLog();
            // }

            //generate JPEG
            // let dicomJpegGenerator = new DicomJpegGenerator(dicomJsonModel, dicomFileSaveInfo.instancePath);
            // dicomJpegGenerator.generateAllFrames();
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

        let isSameStudyIDStatus = this.isSameStudyID_(this.responseMessage);
        if (!isSameStudyIDStatus) {
            this.responseCode = 409;
        }

        // TODO
        // let dicomJsonBinaryDataModel = new DicomJsonBinaryDataModel(dicomJsonModel);
        // await dicomJsonBinaryDataModel.storeAllBinaryDataToFileAndDb();
        // dicomJsonBinaryDataModel.replaceAllBinaryToURI();

        let dicomFileSaver = new DicomFileSaver(file, dicomJsonModel);
        let dicomFileSaveInfo = await dicomFileSaver.saveAndGetSaveInfo();

        await dicomJsonModel.saveMetadataToFile(dicomFileSaveInfo.fullPath);

        await dicomJsonModel.storeToDb(dicomFileSaveInfo);

        let retrieveUrlObj = this.getRetrieveUrl(dicomJsonModel.uidObj);
        this.responseMessage["00081190"].Value.push(retrieveUrlObj.study);
        this.responseMessage["00081190"].Value = _.uniq(this.responseMessage["00081190"].Value);

        let sopSeq = this.getSOPSeq(dicomJsonModel.uidObj.sopClass, dicomJsonModel.uidObj.sopInstanceUID);
        _.set(sopSeq, "00081190.vr", "UT");
        _.set(sopSeq, "00081190.Value", [retrieveUrlObj.instance]);
        this.responseMessage["00081199"]["Value"].push(sopSeq);

        return {
            dicomJsonModel,
            dicomFileSaveInfo
        };
    }
}


module.exports.SqlStowRsService = SqlStowRsService;
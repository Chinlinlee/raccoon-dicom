const fs = require("fs");
const { Dcm2JpgExecutor$Dcm2JpgOptions } = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");
const colorette = require("colorette");
const { DicomJpegGenerator } = require("@root/api/dicom-web/controller/STOW-RS/service/dicom-jpeg-generator");
const { DicomToJpegTaskModel } = require("@models/sql/models/dicomToJpegTask.model");
/**
 * @typedef JsDcm2JpegTask
 * @property {Dcm2JpgExecutor$Dcm2JpgOptions} jsDcm2Jpeg
 * @property {string} jpegFilename
 */

class SqlDicomJpegGenerator extends DicomJpegGenerator {
    /**
     * 
     * @param {import("../../../../../models/DICOM/dicom-json-model").DicomJsonModel} dicomJsonModel 
     * @param {string} dicomInstanceFilename 
     */
    constructor(dicomJsonModel, dicomInstanceFilename) {
        super(dicomJsonModel, dicomInstanceFilename);
    }



    /**
     * @private
     */
    async insertStartTask_() {
        let startTaskObj = {
            studyUID: this.dicomJsonModel.uidObj.studyUID,
            seriesUID: this.dicomJsonModel.uidObj.seriesUID,
            instanceUID: this.dicomJsonModel.uidObj.sopInstanceUID,
            status: false,
            message: "processing",
            taskTime: new Date(),
            finishedTime: null,
            fileSize: `${(fs.statSync(this.dicomInstanceFilename).size / 1024 / 1024).toFixed(3)}MB`
        };
        
        await DicomToJpegTaskModel.insertOrUpdate(startTaskObj);
    }

    /**
     * @private
     */
    async insertEndTask_() {
        let endTaskObj = {
            studyUID: this.dicomJsonModel.uidObj.studyUID,
            seriesUID: this.dicomJsonModel.uidObj.seriesUID,
            instanceUID: this.dicomJsonModel.uidObj.sopInstanceUID,
            status: true,
            message: "generated",
            finishedTime: new Date()
        };

        await DicomToJpegTaskModel.insertOrUpdate(endTaskObj);
    }

    /**
     * @private
     * @param {string} message 
     */
    async insertErrorTask_(message) {
        let errorTaskObj = {
            studyUID: this.dicomJsonModel.uidObj.studyUID,
            seriesUID: this.dicomJsonModel.uidObj.seriesUID,
            instanceUID: this.dicomJsonModel.uidObj.sopInstanceUID,
            status: false,
            message: message,
            finishedTime: new Date()
        };

        await DicomToJpegTaskModel.insertOrUpdate(errorTaskObj);
    }

}

module.exports.SqlDicomJpegGenerator = SqlDicomJpegGenerator;
const fs = require("fs");
const { Dcm2JpgExecutor } = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const { Dcm2JpgExecutor$Dcm2JpgOptions } = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");
const notImageSOPClass = require("../../../../../models/DICOM/dicomWEB/notImageSOPClass");
const { logger } = require("../../../../../utils/logs/log");
const dicomToJpegTask = require("../../../../../models/mongodb/models/dicomToJpegTask");
const colorette = require("colorette");

/**
 * @typedef JsDcm2JpegTask
 * @property {Dcm2JpgExecutor$Dcm2JpgOptions} jsDcm2Jpeg
 * @property {string} jpegFilename
 */

const DCMTK_GENERATE_JPEG_EVERY_N_STEP = 4;
class DicomJpegGenerator {
    /**
     * 
     * @param {import("../../../../../models/DICOM/dicom-json-model").DicomJsonModel} dicomJsonModel 
     * @param {string} dicomInstanceFilename 
     */
    constructor(dicomJsonModel, dicomInstanceFilename) {
        /** @type {import("../../../../../models/DICOM/dicom-json-model").DicomJsonModel} */
        this.dicomJsonModel = dicomJsonModel;
        /** @type {string} */
        this.dicomInstanceFilename = dicomInstanceFilename;
        this.jpegFilename = this.dicomInstanceFilename.replace(/\.dcm/gi, "");
    }

    async generateAllFrames() {
        try {
            
            if (notImageSOPClass.includes(this.dicomJsonModel.getSopClassUid())) {
                return;
            }

            await this.insertStartTask_();

            await this.generateJpeg();
            logger.info(
                `[STOW-RS] [${colorette.yellowBright("Background generating jpeg finished")}, ${JSON.stringify(
                    this.dicomJsonModel.uidObj
                )}]`
            );

            await this.insertEndTask_();

        } catch (e) {

            let errorMessage = JSON.stringify(e, Object.getOwnPropertyNames(e));
            await this.insertErrorTask_(errorMessage);

            throw e;

        }

    }

    async generateJpeg() {

        /** @type {JsDcm2JpegTask[]} */
        let jsDcm2JpegArr = new Array();

        for (let i = 1; i <= this.dicomJsonModel.getFrameNumber(); i++) {

            /** @type { Dcm2JpgExecutor$Dcm2JpgOptions } */
            let opt = await Dcm2JpgExecutor$Dcm2JpgOptions.newInstanceAsync();
            let windowCenter = this.dicomJsonModel.getWindowCenter();
            let windowWidth = this.dicomJsonModel.getWindowCenter();

            if (windowCenter && windowWidth) {
                opt.windowCenter = windowCenter;
                opt.windowWidth = windowWidth;
            }

            opt.frameNumber = i;
            jsDcm2JpegArr.push({
                jsDcm2JpegOption: opt,
                jpegFilename: `${this.jpegFilename}.${i - 1}.jpg`
            });

            if (i % DCMTK_GENERATE_JPEG_EVERY_N_STEP === 0) {
                await Promise.allSettled(
                    jsDcm2JpegArr.map(async (j) => 
                        Dcm2JpgExecutor.convertDcmToJpgFromFilename(this.dicomInstanceFilename, j.jpegFilename, j.jsDcm2JpegOption)
                    )
                );
                jsDcm2JpegArr = new Array();
            }
        }
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

        await dicomToJpegTask.insertOrUpdate(startTaskObj);
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
        await dicomToJpegTask.insertOrUpdate(endTaskObj);
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
        await dicomToJpegTask.insertOrUpdate(errorTaskObj);
    }

}

module.exports.DicomJpegGenerator = DicomJpegGenerator;
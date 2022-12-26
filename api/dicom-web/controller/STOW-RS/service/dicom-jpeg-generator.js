const mongoose = require("mongoose");
const fs = require("fs");
const {
    dcm2jsonV8,
    dcm2jpegCustomCmd,
    dcmtkSupportTransferSyntax
} = require("../../../../../models/DICOM/dcmtk");
const {
    DicomToJpegCommand
} = require("../../../../../models/DICOM/dicom-to-jpeg-command");
const { logger, pythonLogger } = require("../../../../../utils/log");
const PyDicomJpegConvert = require("../../../../../python").getJpeg;
const dicomToJpegTask = require("../../../../../models/mongodb/models/dicomToJpegTask");

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

            await this.insertStartTask_();

            if (dcmtkSupportTransferSyntax.includes(this.dicomJsonModel.getTransferSyntax())) {
                await this.generateByDcmtk();

                logger.info(
                    `[STOW-RS] [Background generating jpeg finished, ${JSON.stringify(
                        this.dicomJsonModel.uidObj
                    )}]`
                );

            } else {

                await this.generateByPython();

                pythonLogger.info(
                    `[STOW-RS] [Background generating jpeg finished, ${JSON.stringify(
                        this.dicomJsonModel.uidObj
                    )}]`
                );

            }

            await this.insertEndTask_();

        } catch(e) {

            let errorMessage = JSON.stringify(e, Object.getOwnPropertyNames(e));
            await this.insertErrorTask_(errorMessage);

            throw e;

        }

    }

    async generateByDcmtk() {

        let execCmdGroup = [];

        for(let i =1 ; i <= this.dicomJsonModel.getFrameNumber(); i++) {
            let dicomToJpegCommand = new DicomToJpegCommand({
                windowCenter: this.dicomJsonModel.getWindowCenter(),
                windowWidth: this.dicomJsonModel.getWindowWidth(),
                frameNumber: i,
                dicomFilename: this.dicomInstanceFilename,
                jpegFilename: this.jpegFilename
            });

            let execCmd = dicomToJpegCommand.getFrameCommandStringByOs();
            execCmdGroup.push(execCmd);
            
            if (i % DCMTK_GENERATE_JPEG_EVERY_N_STEP === 0) {
                await Promise.allSettled(
                    execCmdGroup.map((cmd) => dcm2jpegCustomCmd(cmd))
                );
                execCmdGroup = new Array();
            }

        }
    }

    async generateByPython() {
        for (let i = 1; i <= this.dicomJsonModel.getFrameNumber(); i++) {
            await PyDicomJpegConvert[process.env.OS].getJpegByPyDicom(
                this.dicomInstanceFilename,
                i
            );
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
const path = require("path");
const shortHash = require("shorthash2");
const mkdirp = require("mkdirp");
const moveFile = require("../../../../../utils/file/moveFile");
const { logger } = require("../../../../../utils/log");

const { raccoonConfig } = require("../../../../../config-class");

const {
    rootPath: STORE_DICOM_ROOT_PATH
} = raccoonConfig.dicomWebConfig;


class DicomFileSaver {
    constructor(file, dicomJsonModel) {
        /** @type {import('formidable').File} */ 
        this.file = file;
        /** @type {import("../../../../../models/DICOM/dicom-json-model").DicomJsonModel} */
        this.dicomJsonModel = dicomJsonModel;
    }

    async saveAndGetSaveInfo() {
        try {
            let {
                studyUID,
                seriesUID
            } = this.dicomJsonModel.uidObj;
            let shortStudyUID = shortHash(studyUID);
            let shortSeriesUID = shortHash(seriesUID);
    
            let {
                year,
                month
            } = this.dicomJsonModel.getStartedDateYearAndMonth();
    
            let relativeStorePath = `files/${year}/${month}/${shortStudyUID}/${shortSeriesUID}/`;
    
            let fullStorePath = this.getFullStorePath_(relativeStorePath);
            let instanceStorePath = this.getInstanceStorePath_(fullStorePath);
    
            await this.createDirectoryAndMoveUploadTempFile(fullStorePath);
            logger.info(
                `[STOW-RS] [Move uploaded temp DICOM file "${this.file.filepath}" to "${instanceStorePath}"`
            );

            return {
                fullPath: fullStorePath,
                relativePath: `${relativeStorePath}${this.file.originalFilename}`,
                instancePath: instanceStorePath,
                seriesPath: `files/${year}/${month}/${shortStudyUID}/${shortSeriesUID}`,
                studyPath: `files/${year}/${month}/${shortStudyUID}`
            };
        } catch(e) {
            throw e;
        }
    }

    getFullStorePath_(relativeStorePath) {
        return path.join(
            STORE_DICOM_ROOT_PATH,
            relativeStorePath
        );
    }

    getInstanceStorePath_(fullStorePath) {
        return path.join(fullStorePath, this.file.originalFilename);
    }

    async createDirectoryAndMoveUploadTempFile(fullStorePath) {
        mkdirp.sync(fullStorePath, "0755");

        let instanceStorePath = this.getInstanceStorePath_(fullStorePath);
        await moveFile(this.file.filepath, instanceStorePath, {
            overwrite: true
        });
    }
}


module.exports.DicomFileSaver = DicomFileSaver;
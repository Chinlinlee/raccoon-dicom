const path = require("path");
const shortHash = require("shorthash2");
const mkdirp = require("mkdirp");
const moveFile = require("../../../../../utils/file/moveFile");
const { logger } = require("../../../../../utils/logs/log");

const { raccoonConfig } = require("../../../../../config-class");


class DicomFileSaver {
    constructor(file, dicomJsonModel) {
        /** @type {import('formidable').File} */ 
        this.file = file;
        /** @type {import("../../../../../models/DICOM/dicom-json-model").DicomJsonModel} */
        this.dicomJsonModel = dicomJsonModel;
        this.originalFilename = path.basename(this.file.originalFilename);
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
            } = this.dicomJsonModel.getStudyDateYearAndMonth();
    
            let relativeStorePath = `files/${year}/${month}/${shortStudyUID}/${shortSeriesUID}/`;
    
            let fullStorePath = this.getFullStorePath_(relativeStorePath);
            let instanceStorePath = this.getInstanceStorePath_(fullStorePath);
    
            await this.createDirectoryAndMoveUploadTempFile(fullStorePath);
            logger.info(
                `[STOW-RS] [Move uploaded temp DICOM file "${this.file.filepath}" to "${instanceStorePath}"`
            );

            return {
                fullPath: fullStorePath,
                relativePath: path.join(relativeStorePath, this.originalFilename),
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
            raccoonConfig.dicomWebConfig.storeRootPath,
            relativeStorePath
        );
    }

    getInstanceStorePath_(fullStorePath) {
        return path.join(fullStorePath, this.originalFilename);
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
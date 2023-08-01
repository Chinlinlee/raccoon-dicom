const _ = require("lodash");
const shortHash = require("shorthash2");
const fsP = require("fs/promises");
const path = require("path");
const mkdirp = require("mkdirp");

const { DicomJsonModel, DicomJsonBinaryDataModel } = require("@models/DICOM/dicom-json-model");
const { PatientPersistentObject } = require("./po/patient.po");
const { StudyPersistentObject } = require("./po/study.po");
const { SeriesPersistentObject } = require("./po/series.po");
const { InstancePersistentObject } = require("./po/instance.po");
const { StudyModel } = require("./models/study.model");
const { DicomBulkDataModel } = require("./models/dicomBulkData.model");

const { raccoonConfig } = require("@root/config-class");
const { logger } = require("@root/utils/logs/log");


class SqlDicomJsonModel extends DicomJsonModel {
    constructor(dicomJson) {
        super(dicomJson);
    }

    async storeToDb(dicomFileSaveInfo) {
        let dicomJsonClone = _.cloneDeep(this.dicomJson);
        try {
            let mediaStorage = this.getMediaStorageInfo();
            _.merge(dicomJsonClone, this.uidObj);
            _.merge(dicomJsonClone, {
                studyPath: dicomFileSaveInfo.studyPath,
                seriesPath: dicomFileSaveInfo.seriesPath,
                instancePath: dicomFileSaveInfo.relativePath
            });
            _.merge(dicomJsonClone, mediaStorage);

            delete dicomJsonClone.sopClass;
            delete dicomJsonClone.sopInstanceUID;

            let storedPatient = await this.storePatientCollection(dicomJsonClone);
            let storedStudy = await this.storeStudyCollection(dicomJsonClone, storedPatient);
            let storedSeries = await this.storeSeriesCollection(dicomJsonClone, storedStudy);
            await this.storeInstanceCollection(dicomJsonClone, storedSeries);

            await StudyModel.updateModalitiesInStudy(storedStudy.x0020000D);
        } catch(e) {
            throw e;
        }
    }

    async storePatientCollection(dicomJson) {
        let patientPo = new PatientPersistentObject(dicomJson);
        let patient = await patientPo.createPatient();
        return patient;
    }

    async storeStudyCollection(dicomJson, patient) {
        let studyPo = new StudyPersistentObject(dicomJson, patient);
        let study = await studyPo.createStudy();
        return study;
    }

    async storeSeriesCollection(dicomJson, study) {
        let seriesPo = new SeriesPersistentObject(dicomJson, study);
        let series = await seriesPo.createSeries();
        return series;
    }

    async storeInstanceCollection(dicomJson, series) {
        let instancePo = new InstancePersistentObject(dicomJson, series);
        return await instancePo.createInstance();
    }
}

class SqlDicomJsonBinaryDataModel extends DicomJsonBinaryDataModel {
    constructor(dicomJsonModel) {
        super(dicomJsonModel);
    }

    async storeAllBinaryDataToFileAndDb() {
        let {
            sopInstanceUID
        } = this.dicomJsonModel.uidObj;

        let shortInstanceUID = shortHash(sopInstanceUID);

        
        for(let i = 0; i < this.pathGroupOfBinaryProperties.length ; i++) {
            let relativeFilename = `files/bulkData/${shortInstanceUID}/`;
            let pathOfBinaryProperty = this.pathGroupOfBinaryProperties[i];

            let binaryData = _.get(this.dicomJsonModel.dicomJson, pathOfBinaryProperty);

            if(binaryData) {
                relativeFilename += `${pathOfBinaryProperty}.raw`;
                let filename = path.join(
                    raccoonConfig.dicomWebConfig.storeRootPath,
                    relativeFilename
                );

                mkdirp.sync(
                    path.join(
                        raccoonConfig.dicomWebConfig.storeRootPath,
                        `files/bulkData/${shortInstanceUID}`
                    )
                );

                await fsP.writeFile(filename, Buffer.from(binaryData, "base64"));
                logger.info(`[STOW-RS] [Store binary data to ${filename}]`);

                let bulkData = new BulkData(this.dicomJsonModel.uidObj, relativeFilename, pathOfBinaryProperty);
                await bulkData.storeToDb();
            }

        }
    }

}

class BulkData {
    constructor(uidObj, filename, pathOfBinaryProperty) {
        /** @type {import("../../utils/typeDef/dicom").UIDObject} */
        this.uidObj = uidObj;
        this.filename = filename;
        this.pathOfBinaryProperty = pathOfBinaryProperty;
    }

    async storeToDb() {

        let item = {
            studyUID: this.uidObj.studyUID,
            seriesUID: this.uidObj.seriesUID,
            instanceUID: this.uidObj.sopInstanceUID,
            filename: this.filename,
            binaryValuePath: this.pathOfBinaryProperty
        };

        await DicomBulkDataModel.findOrCreate({
            where: {
                instanceUID: this.uidObj.sopInstanceUID,
                binaryValuePath: this.pathOfBinaryProperty
            },
            defaults: item
        });

        logger.info(`[STOW-RS] [Store bulkdata ${JSON.stringify(item)} successful]`);
    }
}

module.exports.SqlDicomJsonModel = SqlDicomJsonModel;
module.exports.SqlDicomJsonBinaryDataModel = SqlDicomJsonBinaryDataModel;
const _ = require("lodash");

const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");
const { PatientPersistentObject } = require("./po/patient.po");
const { StudyPersistentObject } = require("./po/study.po");
const { SeriesPersistentObject } = require("./po/series.po");
const { InstancePersistentObject } = require("./po/instance.po");


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


module.exports.SqlDicomJsonModel = SqlDicomJsonModel;
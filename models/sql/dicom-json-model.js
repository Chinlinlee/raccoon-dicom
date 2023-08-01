const _ = require("lodash");

const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");
const { PatientPersistentObject } = require("./po/patient.po");
const { StudyPersistentObject } = require("./po/study.po");


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
            this.storeSeriesCollection(dicomJsonClone);
            this.storeInstanceCollection(dicomJsonClone);
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
        // TODO
        let studyPo = new StudyPersistentObject(dicomJson, patient);
        let study = await studyPo.createStudy();
        return study;
    }

    async storeSeriesCollection(dicomJson) {
        // TODO
    }

    async storeInstanceCollection(dicomJson) {
        // TODO
    }
}


module.exports.SqlDicomJsonModel = SqlDicomJsonModel;
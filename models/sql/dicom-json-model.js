const { BaseDicomJson, DicomJsonModel, DicomJsonBinaryDataModel, BulkData } = require("@models/DICOM/dicom-json-model");
const { PatientPersistentObject } = require("./po/patient.po");
const { StudyPersistentObject } = require("./po/study.po");
const { SeriesPersistentObject } = require("./po/series.po");
const { InstancePersistentObject } = require("./po/instance.po");
const { StudyModel } = require("./models/study.model");

DicomJsonModel.prototype.storeToDb = async function (dicomFileSaveInfo) {
    let dbJson = this.getCleanDataBeforeStoringToDb(dicomFileSaveInfo);

    try {
        let storedPatient = await this.storePatientCollection(dbJson);
        let storedStudy = await this.storeStudyCollection(dbJson, storedPatient);
        let storedSeries = await this.storeSeriesCollection(dbJson, storedStudy);
        await this.storeInstanceCollection(dbJson, storedSeries);

        await StudyModel.updateModalitiesInStudy(storedStudy);
    } catch (e) {
        throw e;
    }
};
DicomJsonModel.prototype.storePatientCollection = async function (dicomJson) {
    let patientPo = new PatientPersistentObject(dicomJson);
    let patient = await patientPo.createPatient();
    return patient;
};

DicomJsonModel.prototype.storeStudyCollection = async function(dicomJson, patient) {
    let studyPo = new StudyPersistentObject(dicomJson, patient);
    let study = await studyPo.createStudy();
    return study;
};

DicomJsonModel.prototype.storeSeriesCollection = async function (dicomJson, study) {
    let seriesPo = new SeriesPersistentObject(dicomJson, study);
    let series = await seriesPo.createSeries();
    return series;
};

DicomJsonModel.prototype.storeInstanceCollection = async function(dicomJson, series) {
    let instancePo = new InstancePersistentObject(dicomJson, series);
    return await instancePo.createInstance();
};

class SqlDicomJsonBinaryDataModel extends DicomJsonBinaryDataModel{
    constructor(dicomJsonModel) {
        super(dicomJsonModel);
        this.bulkDataModelClass = BulkData;
    }
}

module.exports.DicomJsonModel = DicomJsonModel;
module.exports.BaseDicomJson = BaseDicomJson;
module.exports.DicomJsonBinaryDataModel = SqlDicomJsonBinaryDataModel;
module.exports.BulkData = BulkData;
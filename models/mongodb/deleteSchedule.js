const schedule = require("node-schedule");
const moment = require("moment");
const { logger } = require("@root/utils/logs/log");
const { StudyModel } = require("@dbModels/study.model");
const { InstanceModel } = require("@dbModels/instance.model");
const { SeriesModel } = require("@dbModels/series.model");
const { PatientModel } = require("./models/patient.model");

// Delete dicom with delete status >= 2
schedule.scheduleJob("*/5 * * * * *", async function () {
    deleteExpirePatients().catch(e => {
        logger.error(e);
    });
    deleteExpireStudies().catch((e) => {
        logger.error(e);
    });
    deleteExpireSeries().catch((e) => {
        logger.error(e);
    });
    deleteExpireInstances().catch((e) => {
        logger.error(e);
    });
});

async function deleteExpirePatients() {
    let deletedPatients = await PatientModel.find({
        deleteStatus: {
            $gte: 2
        }
    });

    for (let deletedPatient of deletedPatients) {
        let updateAtDate = moment(deletedPatient.updatedAt);
        let now = moment();
        let diff = now.diff(updateAtDate, "seconds");
        if (diff >= 30) {
            let patientID = deletedPatient.patientID;
            logger.info("delete expired patient: " + patientID);
            await Promise.all([
                StudyModel.deleteMany({
                    "00100020.Value.0": patientID
                }),
                InstanceModel.deleteMany({
                    "00100020.Value.0": patientID
                }),
                SeriesModel.deleteMany({
                    "00100020.Value.0": patientID
                }),
                deletedPatient.delete()
            ]);
        }
    }
}

async function deleteExpireStudies() {
    let deletedStudies = await StudyModel.find({
        deleteStatus: {
            $gte: 2
        }
    });

    for (let deletedStudy of deletedStudies) {
        let updateAtDate = moment(deletedStudy.updatedAt);
        let now = moment();
        let diff = now.diff(updateAtDate, "seconds");
        if (diff >= 30) {
            let studyUID = deletedStudy.studyUID;

            logger.info("delete expired study: " + studyUID);
            await Promise.all([
                InstanceModel.deleteMany({
                    studyUID
                }),
                SeriesModel.deleteMany({
                    studyUID
                }),
                deletedStudy.delete()
            ]);

            await deletedStudy.deleteDicomInstances();
        }
    }
}

async function deleteExpireSeries() {
    let deletedSeries = await SeriesModel.find({
        deleteStatus: {
            $gte: 2
        }
    });

    for (let aDeletedSeries of deletedSeries) {
        let updateAtDate = moment(aDeletedSeries.updatedAt);
        let now = moment();
        let diff = now.diff(updateAtDate, "seconds");
        if (diff >= 30) {
            let { studyUID, seriesUID } = aDeletedSeries;

            logger.info("delete expired series: " + seriesUID);
            await Promise.all([
                InstanceModel.deleteMany({
                    $and: [
                        { x0020000D: studyUID },
                        { x0020000E: seriesUID }
                    ]
                }),
                aDeletedSeries.delete()
            ]);

            await aDeletedSeries.deleteDicomInstances();
        }
    }
}

async function deleteExpireInstances() {
    let deletedInstances = await InstanceModel.find({
        deleteStatus: {
            $gte: 2
        }
    });

    for (let deletedInstance of deletedInstances) {
        let { instanceUID } = deletedInstance;

        let updateAtDate = moment(deletedInstance.updatedAt);
        let now = moment();
        let diff = now.diff(updateAtDate, "days");
        if (diff >= 30) {
            logger.info("delete expired instance: " + instanceUID);
            await deletedInstance.delete();
            await deletedInstance.deleteDicomInstances();
        }
    }
}
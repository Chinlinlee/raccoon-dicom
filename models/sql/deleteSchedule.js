const schedule = require("node-schedule");
const { StudyModel } = require("./models/study.model");
const { Op } = require("sequelize");
const moment = require("moment");
const { logger } = require("@root/utils/logs/log");
const { InstanceModel } = require("./models/instance.model");
const { SeriesModel } = require("./models/series.model");
const { PatientModel } = require("./models/patient.model");

// Delete dicom with delete status >= 2
schedule.scheduleJob("0 0 */1 * * *", async function () {
    deleteExpirePatient().catch((e) => {
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

async function deleteExpirePatient() {
    let deletedPatients = await PatientModel.findAll({
        where: {
            deleteStatus: {
                [Op.gte]: 2
            }
        }
    });

    for (let deletedPatient of deletedPatients) {
        let updateAtDate = moment(deletedPatient.getDataValue("updatedAt"));
        let now = moment();
        let diff = now.diff(updateAtDate, "days");
        if (diff >= 30) {
            let patientID = deletedPatient.getDataValue("x00100020");

            logger.info("delete expired patient: " + patientID);
            await Promise.all([
                InstanceModel.destroy({
                    where: {
                        x00100020: patientID
                    }
                }),
                SeriesModel.destroy({
                    where: {
                        x00100020: patientID
                    }
                }),
                deletedPatient.destroy()
            ]);

            await deletedPatient.deleteStudyFolder();
        }
    }
}

async function deleteExpireStudies() {
    let deletedStudies = await StudyModel.findAll({
        where: {
            deleteStatus: {
                [Op.gte]: 2
            }
        }
    });

    for (let deletedStudy of deletedStudies) {
        let updateAtDate = moment(deletedStudy.getDataValue("updatedAt"));
        let now = moment();
        let diff = now.diff(updateAtDate, "days");
        if (diff >= 30) {
            let studyUID = deletedStudy.getDataValue("x0020000D");

            logger.info("delete expired study: " + studyUID);
            await Promise.all([
                InstanceModel.destroy({
                    where: {
                        x0020000D: studyUID
                    }
                }),
                SeriesModel.destroy({
                    where: {
                        x0020000D: studyUID
                    }
                }),
                deletedStudy.destroy()
            ]);

            await deletedStudy.deleteStudyFolder();
        }
    }
}

async function deleteExpireSeries() {
    let deletedSeries = await SeriesModel.findAll({
        where: {
            deleteStatus: {
                [Op.gte]: 2
            }
        }
    });

    for (let aDeletedSeries of deletedSeries) {
        let updateAtDate = moment(aDeletedSeries.getDataValue("updatedAt"));
        let now = moment();
        let diff = now.diff(updateAtDate, "days");
        if (diff >= 30) {
            let studyUID = aDeletedSeries.getDataValue("x0020000D");
            let seriesUID = aDeletedSeries.getDataValue("x0020000E");

            logger.info("delete expired series: " + seriesUID);
            await Promise.all([
                InstanceModel.destroy({
                    where: {
                        x0020000D: studyUID,
                        x0020000E: seriesUID
                    }
                }),
                aDeletedSeries.destroy()
            ]);

            await aDeletedSeries.deleteSeriesFolder();
        }
    }
}

async function deleteExpireInstances() {
    let deletedInstances = await InstanceModel.findAll({
        where: {
            deleteStatus: {
                [Op.gte]: 2
            }
        }
    });

    for (let deletedInstance of deletedInstances) {
        let instanceUID = deletedInstance.getDataValue("x00080018");

        let updateAtDate = moment(deletedInstance.getDataValue("updatedAt"));
        let now = moment();
        let diff = now.diff(updateAtDate, "days");
        if (diff >= 30) {
            logger.info("delete expired instance: " + instanceUID);
            await deletedInstance.destroy();
            await deletedInstance.deleteInstance();
        }
    }
}
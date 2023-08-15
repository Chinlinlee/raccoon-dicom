const schedule = require("node-schedule");
const { StudyModel } = require("./models/study.model");
const { Op } = require("sequelize");
const moment = require("moment");
const { logger } = require("@root/utils/logs/log");
const { InstanceModel } = require("./models/instance.model");
const { SeriesModel } = require("./models/series.model");

// Delete dicom with delete status >= 2
schedule.scheduleJob("*/10 * * * * *", async function () {
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
        }
    }
}
const schedule = require("node-schedule");
const moment = require("moment");
const { logger } = require("@root/utils/logs/log");
const dicomStudyModel = require("./models/dicomStudy");
const dicomModel = require("./models/dicom");
const dicomSeriesModel = require("./models/dicomSeries");

// Delete dicom with delete status >= 2
schedule.scheduleJob("*/5 * * * * *", async function () {
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
    let deletedStudies = await dicomStudyModel.find({
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
                dicomModel.deleteMany({
                    studyUID
                }),
                dicomSeriesModel.deleteMany({
                    studyUID
                }),
                deletedStudy.delete()
            ]);

            await deletedStudy.deleteStudyFolder();
        }
    }
}

async function deleteExpireSeries() {
    let deletedSeries = await dicomSeriesModel.find({
        deleteStatus: {
            $gte: 2
        }
    });

    for (let aDeletedSeries of deletedSeries) {
        let updateAtDate = moment(aDeletedSeries.updatedAt);
        let now = moment();
        let diff = now.diff(updateAtDate, "seconds");
        if (diff >= 30) {
            let {studyUID, seriesUID} = aDeletedSeries;

            logger.info("delete expired series: " + seriesUID);
            await Promise.all([
                dicomModel.deleteMany({
                    $and: [
                        { x0020000D: studyUID },
                        { x0020000E: seriesUID }
                    ]
                }),
                aDeletedSeries.delete()
            ]);

            await aDeletedSeries.deleteSeriesFolder();
        }
    }
}

async function deleteExpireInstances() {
    let deletedInstances = await dicomModel.find({
        deleteStatus: {
            $gte: 2
        }
    });

    for (let deletedInstance of deletedInstances) {
        let {instanceUID} = deletedInstance;

        let updateAtDate = moment(deletedInstance.updatedAt);
        let now = moment();
        let diff = now.diff(updateAtDate, "days");
        if (diff >= 30) {
            logger.info("delete expired instance: " + instanceUID);
            await deletedInstance.deleteInstance();
            await deletedInstance.delete();
        }
    }
}
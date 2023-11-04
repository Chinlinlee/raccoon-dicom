const { SeriesBulkDataFactory } = require("./service/bulkdata");
const { BaseBulkDataController } = require("./base.controller");
const { SeriesImagePathFactory } = require("../service/WADO-RS.service");

class SeriesBulkDataController extends BaseBulkDataController {
    constructor(req, res) {
        super(req, res);
        this.bulkDataFactoryType = SeriesBulkDataFactory;
        this.imagePathFactoryType = SeriesImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get bulk data from StudyInstanceUID: ${this.request.params.studyUID}\
, SeriesInstanceUID: ${this.request.params.seriesUID}`);
    }

}


/**
 * 
 * @param {import("express").Request}
 * @param {import("express").Response}
 * @returns 
 */
module.exports = async function (req, res) {
    let seriesBulkDataController = new SeriesBulkDataController(req, res);

    await seriesBulkDataController.doPipeline();
};
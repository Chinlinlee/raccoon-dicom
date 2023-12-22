const { BaseRetrieveMetadataController } = require("./base.controller");
const { SeriesImagePathFactory } = require("@wado-rs-service");

class RetrieveSeriesMetadataController extends BaseRetrieveMetadataController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = SeriesImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`[WADO-RS] [Get Study's Series' Instances Metadata] [series UID: ${this.request.params.seriesUID}, study UID: ${this.request.params.studyUID}]`);
    }
}
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveSeriesMetadataController(req, res);

    await controller.doPipeline();
};
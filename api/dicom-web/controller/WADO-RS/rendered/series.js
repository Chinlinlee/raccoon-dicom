const { SeriesImagePathFactory } = require("@wado-rs-service");
const { SeriesFramesWriter } = require("@rendered-service");
const { BaseRetrieveRenderedController } = require("./base.controller");

class RetrieveRenderedSeriesController extends BaseRetrieveRenderedController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = SeriesImagePathFactory;
        this.framesWriter = SeriesFramesWriter;
    }

    logAction() {
        this.apiLogger.logger.info(`[WADO-RS] [Get study's series' rendered instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}]`);
    }

    logSuccessful() {
        this.apiLogger.logger.info(`[WADO-RS] [path: ${this.request.originalUrl}] [Write Multipart Successfully, study's series' rendered instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}]`);
    }
}
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveRenderedSeriesController(req, res);

    await controller.doPipeline();
};

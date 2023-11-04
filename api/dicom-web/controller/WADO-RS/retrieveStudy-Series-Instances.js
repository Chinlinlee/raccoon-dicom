const { BaseRetrieveController, SeriesZipResponseHandler, SeriesMultipartRelatedResponseHandler } = require("./base.controller");

class RetrieveInstancesOfSeries extends BaseRetrieveController {
    constructor(req, res) {
        super(req, res);
        this.zipResponseHandlerType = SeriesZipResponseHandler;
        this.multipartResponseHandlerType = SeriesMultipartRelatedResponseHandler;
    }

    logAction() {
        this.apiLogger.logger.info(`[WADO-RS] [Get study's series' instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}] [Request Accept: ${this.request.headers.accept}]`);
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveInstancesOfSeries(req, res);

    await controller.doPipeline();
};
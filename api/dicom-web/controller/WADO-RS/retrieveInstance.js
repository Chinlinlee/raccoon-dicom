const { BaseRetrieveController, InstanceZipResponseHandler, InstanceMultipartRelatedResponseHandler } = require("./base.controller");
class RetrieveInstanceOfSeriesOfStudiesController extends BaseRetrieveController {
    constructor(req, res) {
        super(req, res);
        this.zipResponseHandlerType = InstanceZipResponseHandler;
        this.multipartResponseHandlerType = InstanceMultipartRelatedResponseHandler;
    }

    logAction() {
        this.apiLogger.logger.info(`Get study's series' instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}`);
        this.apiLogger.logger.info(`Request Accept: ${this.request.headers.accept}`);
    }
}


/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveInstanceOfSeriesOfStudiesController(req, res);

    await controller.doPipeline();
};
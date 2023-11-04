const { BaseRetrieveController, StudyZipResponseHandler, StudyMultipartRelatedResponseHandler } = require("./base.controller");

class RetrieveStudyInstancesController extends BaseRetrieveController {
    constructor(req, res) {
        super(req, res);
        this.zipResponseHandlerType = StudyZipResponseHandler;
        this.multipartResponseHandlerType = StudyMultipartRelatedResponseHandler;
    }

    logAction() {
        this.apiLogger.logger.info(`[WADO-RS] [Get study's instances, study UID: ${this.request.params.studyUID}] [Request Accept: ${this.request.headers.accept}]`);
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveStudyInstancesController(req, res);

    await controller.doPipeline();
};
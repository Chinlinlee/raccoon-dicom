const { InstanceImagePathFactory } = require("@wado-rs-service");
const { InstanceFramesWriter } = require("@rendered-service");
const { BaseRetrieveRenderedController } = require("./base.controller");

class RetrieveRenderedInstancesController extends BaseRetrieveRenderedController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = InstanceImagePathFactory;
        this.framesWriter = InstanceFramesWriter;
    }

    logAction() {
        this.apiLogger.logger.info(`Get study's series' rendered instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}`);
    }

    logSuccessful() {
        this.apiLogger.logger.info(`Write Multipart Successfully, study's series' instances' rendered images, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}, instance UID: ${this.request.params.instanceUID}`);
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveRenderedInstancesController(req, res);

    await controller.doPipeline();
};

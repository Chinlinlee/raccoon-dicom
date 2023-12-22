const _ = require("lodash");
const { InstanceImagePathFactory } = require("@wado-rs-service");
const { BaseRetrieveRenderedController } = require("./base.controller");
const { InstanceFramesListWriter } = require("@rendered-service");

class RetrieveRenderedInstanceFramesController extends BaseRetrieveRenderedController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = InstanceImagePathFactory;
        this.framesWriter = InstanceFramesListWriter;
    }

    logAction() {
        this.apiLogger.logger.info(`Get study's series' rendered instances' frames, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}, instance UID: ${this.request.params.instanceUID}, frame: ${this.request.params.frameNumber}`);
    }

    logSuccessful() {
        this.apiLogger.logger.info(`Get instance's frame successfully, instance UID: ${this.request.params.instanceUID}, frame number: ${JSON.stringify(this.request.params.frameNumber)}`);
    }
}
/**
 * 
 * @param {import("http").incomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveRenderedInstanceFramesController(req, res);

    await controller.doPipeline();
};
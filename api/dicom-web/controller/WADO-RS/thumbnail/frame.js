const {
    InstanceThumbnailFactory
} = require("../service/thumbnail.service");
const { BaseThumbnailController } = require("./base.controller");

class RetrieveFrameThumbnailController extends BaseThumbnailController {
    constructor(req, res) {
        super(req, res);
        this.factory = InstanceThumbnailFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get Study's Series' Instance Thumbnail [series UID: ${this.request.params.seriesUID}]\
instance UID: ${this.request.params.instanceUID}\
frames: ${JSON.stringify(this.request.params.frameNumber)}`);
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveFrameThumbnailController(req, res);

    await controller.doPipeline();
};
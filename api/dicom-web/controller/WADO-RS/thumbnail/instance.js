const {
    InstanceThumbnailFactory
} = require("../service/thumbnail.service");
const { BaseThumbnailController } = require("./base.controller");



class RetrieveInstanceThumbnailController extends BaseThumbnailController {
    constructor(req, res) {
        super(req, res);
        this.factory = InstanceThumbnailFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get Study's Series' Instance Thumbnail [study UID: ${this.request.params.studyUID},\
series UID: ${this.request.params.seriesUID}]\
instance UID: ${this.request.params.instanceUID}`);
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveInstanceThumbnailController(req, res);

    await controller.doPipeline();
};
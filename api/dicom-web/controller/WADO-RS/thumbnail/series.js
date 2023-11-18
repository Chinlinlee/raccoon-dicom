const { Controller } = require("../../../../controller.class");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const {
    ThumbnailService,
    SeriesThumbnailFactory
} = require("../service/thumbnail.service");
const { BaseThumbnailController } = require("./base.controller");



class RetrieveSeriesThumbnailController extends BaseThumbnailController {
    constructor(req, res) {
        super(req, res);
        this.factory = SeriesThumbnailFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get Study's Series' Thumbnail [study UID: ${this.request.params.studyUID},\
series UID: ${this.request.params.seriesUID}]`);
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveSeriesThumbnailController(req, res);

    await controller.doPipeline();
};
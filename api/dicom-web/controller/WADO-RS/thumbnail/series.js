const { Controller } = require("../../../../controller.class");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const {
    ThumbnailService,
    SeriesThumbnailFactory
} = require("../service/thumbnail.service");



class RetrieveSeriesThumbnailController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {

        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        apiLogger.logger.info(`Get Study's Series' Thumbnail [study UID: ${this.request.params.studyUID},\
 series UID: ${this.request.params.seriesUID}]`);

        try {
            let thumbnailService = new ThumbnailService(this.request, this.response, apiLogger, SeriesThumbnailFactory);
            return thumbnailService.getThumbnailAndResponse();
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            apiLogger.logger.error(errorStr);

            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end({
                code: 500,
                message: "An exception occurred"
            });
        }
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
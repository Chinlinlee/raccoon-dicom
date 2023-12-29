const { Controller } = require("@root/api/controller.class");
const { StudyImagePathFactory } = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");
const { ThumbnailService } = require("../service/thumbnail.service");
const { ApiLogger } = require("@root/utils/logs/api-logger");

class BaseThumbnailController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.factory = StudyImagePathFactory;
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();
    }

    logAction() {
        this.apiLogger.logger.info(`Get Study's Thumbnail [study UID: ${this.request.params.studyUID}]`);
    }

    async mainProcess() {
        try {
            this.logAction();
            let thumbnailService = new ThumbnailService(this.request, this.response, this.apiLogger, this.factory);
            return thumbnailService.getThumbnailAndResponse();
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            this.apiLogger.logger.error(errorStr);

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

module.exports.BaseThumbnailController = BaseThumbnailController;
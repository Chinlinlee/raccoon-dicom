const { Controller } = require("@root/api/controller.class");
const { StudyImagePathFactory } = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");
const { ThumbnailService } = require("../service/thumbnail.service");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

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
            let thumbnail = await thumbnailService.getThumbnail();
            return this.response.end(thumbnail, "binary");
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports.BaseThumbnailController = BaseThumbnailController;
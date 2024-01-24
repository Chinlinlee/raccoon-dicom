const { Controller } = require("@root/api/controller.class");
const { StudyImagePathFactory } = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");
const { ThumbnailService } = require("../service/thumbnail.service");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseThumbnailController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        try {
            let thumbnailService = new ThumbnailService(this.request, this.response, this.request.logger, this.request.factory);
            let thumbnail = await thumbnailService.getThumbnail();
            return this.response.end(thumbnail, "binary");
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.request.logger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports.BaseThumbnailController = BaseThumbnailController;
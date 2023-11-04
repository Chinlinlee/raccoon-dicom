const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyImagePathFactory } = require("../service/WADO-RS.service");
const { MetadataService } = require("../service/metadata.service");
const { ControllerErrorHandler } = require("@error/controller.handler");

class BaseRetrieveMetadataController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();
        this.imagePathFactory = StudyImagePathFactory;
    }

    logAction() {
        throw new Error("Abstract method, not implement");
    }

    async mainProcess() {
        this.logAction();
        let metadataService = new MetadataService(this.request, this.imagePathFactory);

        try {
            let responseMetadata = await metadataService.getMetadata(this.request.params);
            if (responseMetadata.length > 0) {
                this.response.writeHead(200, {
                    "Content-Type": "application/dicom+json"
                });
                return this.response.end(JSON.stringify(responseMetadata));
            }

            this.response.writeHead(204);
            return this.response.end();

        } catch (e) {
            ControllerErrorHandler.raiseInternalServerError(e, this.apiLogger, this.response);
        }
    }
}

module.exports.BaseRetrieveMetadataController = BaseRetrieveMetadataController;
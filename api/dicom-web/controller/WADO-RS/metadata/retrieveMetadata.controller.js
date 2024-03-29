const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyImagePathFactory } = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");
const { MetadataService } = require("../service/metadata.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseRetrieveMetadataController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let metadataService = new MetadataService(this.request, this.request.imagePathFactory);

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
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.request.logger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports.BaseRetrieveMetadataController = BaseRetrieveMetadataController;
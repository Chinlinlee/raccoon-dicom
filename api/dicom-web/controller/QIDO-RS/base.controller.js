const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { QidoRsService } = require("@api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseQueryController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    logAction() {
        throw new Error("Not Implemented");
    }

    async mainProcess() {
        try {
            let qidoRsService = new QidoRsService(this.request, this.response, this.request.dicomLevel);
            let foundDicomJson = await qidoRsService.getDicomJson();
            if (foundDicomJson.length === 0 ) {
                return this.response.status(204).send();
            }
            return this.response.status(200).set("Content-Type", "application/dicom+json").json(foundDicomJson);
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.request.logger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports.BaseQueryController = BaseQueryController;
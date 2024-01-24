const {
    UnSubscribeService
} = require("@api/dicom-web/controller/UPS-RS/service/unsubscribe.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { DicomWebServiceError } = require("@error/dicom-web-service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class UnSubscribeWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "UPS-RS");
    }

    async mainProcess() {

        this.apiLogger.addTokenValue();
        this.apiLogger.logger.info(`UnSubscription, params: ${this.paramsToString()}`);
        
        try {
            let service = new UnSubscribeService(this.request, this.response);
            await service.delete();

            return this.response
                       .set("Content-Type", "application/dicom+json")
                       .status(200)
                       .end();
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new UnSubscribeWorkItemController(req, res);

    await controller.doPipeline();
};

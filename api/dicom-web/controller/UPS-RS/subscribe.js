const {
    SubscribeService
} = require("@api/dicom-web/controller/UPS-RS/service/subscribe.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { DicomWebServiceError } = require("@error/dicom-web-service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class SubscribeWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "UPS-RS");
    }

    async mainProcess() {

        this.apiLogger.addTokenValue();
        this.apiLogger.logger.info(`Create Subscription, params: ${this.paramsToString()}`);
        
        try {
            let service = new SubscribeService(this.request, this.response);
            let subscription = await service.create();

            return this.response
                       .set("Content-Type", "application/dicom+json")
                       .status(201)
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
    let controller = new SubscribeWorkItemController(req, res);

    await controller.doPipeline();
};

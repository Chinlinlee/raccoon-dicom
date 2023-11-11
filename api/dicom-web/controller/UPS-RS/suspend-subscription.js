/**
 * @description
 * https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_11.12
 * This transaction is used to stop the origin server from automatically subscribing the User-Agent to new Workitems. This does not delete any existing subscriptions to specific Workitems.
 */

const {
    SuspendSubscribeService
} = require("./service/suspend-subscription.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { DicomWebServiceError } = require("@error/dicom-web-service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class SuspendSubscribeWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "UPS-RS");
    }

    async mainProcess() {

        this.apiLogger.addTokenValue();
        this.apiLogger.logger.info(`Suspend Subscription, params: ${this.paramsToString()}`);
        
        try {
            let service = new SuspendSubscribeService(this.request, this.response);
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
    let controller = new SuspendSubscribeWorkItemController(req, res);

    await controller.doPipeline();
};

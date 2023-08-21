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

class SuspendSubscribeWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "UPS-RS");

        apiLogger.addTokenValue();
        apiLogger.logger.info(`Suspend Subscription, params: ${this.paramsToString()}`);
        
        try {
            let service = new SuspendSubscribeService(this.request, this.response);
            await service.delete();

            return this.response
                       .set("Content-Type", "application/dicom+json")
                       .status(200)
                       .end();
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            apiLogger.logger.error(errorStr);

            if (e instanceof DicomWebServiceError) {
                return this.response.status(e.code).json({
                    status: e.status,
                    message: e.message
                });
            }

            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end(JSON.stringify({
                code: 500,
                message: "An Server Exception Occurred"
            }));
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
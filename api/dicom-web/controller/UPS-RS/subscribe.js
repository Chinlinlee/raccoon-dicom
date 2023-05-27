const {
    SubscribeService
} = require("./service/subscribe.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { DicomWebServiceError } = require("@error/dicom-web-service");

class SubscribeWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "UPS-RS");

        apiLogger.addTokenValue();
        apiLogger.logger.info(`Create Subscription, params: ${this.paramsToString()}`);
        
        try {
            let service = new SubscribeService(this.request, this.response);
            let subscription = await service.create();

            return this.response
                       .set("Content-Type", "application/dicom+json")
                       .status(201)
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
    let controller = new SubscribeWorkItemController(req, res);

    await controller.doPipeline();
};

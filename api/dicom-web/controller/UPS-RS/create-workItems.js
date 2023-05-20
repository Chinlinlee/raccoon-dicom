const _ = require("lodash");
const {
    CreateWorkItemService
} = require("./service/create-workItem.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { DicomWebServiceError } = require("@error/dicom-web-service");

class CreateWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "UPS-RS");

        apiLogger.addTokenValue();
        apiLogger.logger.info("Create workItem");
        
        try {
            let workItemService = new CreateWorkItemService(this.request, this.response);
            let workItem = await workItemService.createUps();
            apiLogger.logger.info(`Create workItem ${workItem.upsInstanceUID} successful`);
            return this.response.status(201).send();
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            apiLogger.logger.error(errorStr);

            if (e instanceof DicomWebServiceError) {
                return this.response.status(e.code).send({
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
    let controller = new CreateWorkItemController(req, res);

    await controller.doPipeline();
};

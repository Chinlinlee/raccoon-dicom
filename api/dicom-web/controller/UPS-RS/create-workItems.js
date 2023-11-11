const _ = require("lodash");
const {
    CreateWorkItemService
} = require("./service/create-workItem.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { DicomWebServiceError } = require("@error/dicom-web-service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class CreateWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "UPS-RS");
    }

    async mainProcess() {

        this.apiLogger.addTokenValue();
        this.apiLogger.logger.info("Create workItem");
        
        try {
            let workItemService = new CreateWorkItemService(this.request, this.response);
            let workItem = await workItemService.createUps();
            this.apiLogger.logger.info(`Create workItem ${workItem.upsInstanceUID} successful`);
            return this.response.status(201).send();
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
    let controller = new CreateWorkItemController(req, res);

    await controller.doPipeline();
};

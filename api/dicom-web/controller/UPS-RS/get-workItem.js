const _ = require("lodash");
const {
    GetWorkItemService
} = require("./service/get-workItem.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class GetWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "UPS-RS");
    }

    async mainProcess() {

        this.apiLogger.addTokenValue();
        this.apiLogger.logger.info(`Get workItem, query: ${this.queryToString()}, param: ${this.paramsToString()}`);
        
        try {
            let getWorkItemService = new GetWorkItemService(this.request, this.response);
            let workItems = await getWorkItemService.getUps();

            if (workItems.length === 0 && !_.get(this.request, "params.workItem")) {
                return this.response.status(204).end();
            } else if (workItems.length === 0) {
                return this.response.status(404).end();
            }

            return this.response.set("Content-Type", "application/dicom+json").status(200).json(workItems);
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
    let controller = new GetWorkItemController(req, res);

    await controller.doPipeline();
};

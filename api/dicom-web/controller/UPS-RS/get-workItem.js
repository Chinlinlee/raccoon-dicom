const _ = require("lodash");
const {
    GetWorkItemService
} = require("./service/get-workItem.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");

class GetWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "UPS-RS");

        apiLogger.addTokenValue();
        apiLogger.logger.info(`Get workItem, query: ${this.queryToString()}, param: ${this.paramsToString()}`);
        
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
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            apiLogger.logger.error(errorStr);

            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end(JSON.stringify({
                code: 500,
                message: errorStr
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
    let controller = new GetWorkItemController(req, res);

    await controller.doPipeline();
};

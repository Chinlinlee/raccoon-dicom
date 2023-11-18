const {
    UpdateWorkItemService
} = require("./service/update-workItem.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { DicomWebServiceError } = require("@error/dicom-web-service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class UpdateWorkItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "UPS-RS");
    }

    async mainProcess() {

        this.apiLogger.addTokenValue();
        this.apiLogger.logger.info(`Update workItem, params: ${this.paramsToString()}`);
        
        try {
            let service = new UpdateWorkItemService(this.request, this.response);
            let workItems = await service.updateUps();
            return this.response
                       .set("Content-Type", "application/dicom+json")
                       .set("Warning", "299 Raccoon: The Workitem was updated with modifications.")
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
    let controller = new UpdateWorkItemController(req, res);

    await controller.doPipeline();
};

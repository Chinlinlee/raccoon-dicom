const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { DeleteMwlItemService } = require("./service/delete-mwlItem.service");

class DeleteMwlItemCountController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "MWL-RS");
    }

    async mainProcess() {
        try {
            let deleteMwlItemService = new DeleteMwlItemService(this.request, this.response);
            await deleteMwlItemService.deleteMwlItem();

            return this.response
                   .set("Content-Type", "application/dicom+json")
                   .status(200)
                   .send();
            
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
    let controller = new DeleteMwlItemCountController(req, res);

    await controller.doPipeline();
};
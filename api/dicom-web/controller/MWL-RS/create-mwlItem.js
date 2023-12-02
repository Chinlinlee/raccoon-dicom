const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { CreateMwlItemService } = require("./service/create-mwlitem.service");

class CreateMwlItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "MWL-RS");
    }

    async mainProcess() {
        try {
            let createMwlItemService = new CreateMwlItemService(this.request, this.response);
            let mwlItem = await createMwlItemService.create();
            return this.response
                   .set("Content-Type", "application/dicom+json")
                   .status(201)
                   .json(mwlItem);
            
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
    let controller = new CreateMwlItemController(req, res);

    await controller.doPipeline();
};
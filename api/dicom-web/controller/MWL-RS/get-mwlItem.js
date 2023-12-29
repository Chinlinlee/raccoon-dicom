const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { GetMwlItemService } = require("@api/dicom-web/controller/MWL-RS/service/get-mwlItem.service");

class GetMwlItemController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "MWL-RS");
    }

    async mainProcess() {
        try {
            let mwlItems = await new GetMwlItemService(this.request, this.response).getMwlItems();


            if (mwlItems.length === 0) return this.response.status(204).end();

            return this.response
                   .set("Content-Type", "application/dicom+json")
                   .status(200)
                   .json(mwlItems);
            
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
    let controller = new GetMwlItemController(req, res);

    await controller.doPipeline();
};
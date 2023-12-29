const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { GetMwlItemCountService } = require("@api/dicom-web/controller/MWL-RS/service/count-mwlItem.service");

class GetMwlItemCountController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "MWL-RS");
    }

    async mainProcess() {
        try {
            let getMwlItemCountService = new GetMwlItemCountService(this.request, this.response);
            let count = await getMwlItemCountService.getMwlItemCount();
            return this.response
                   .set("Content-Type", "application/dicom+json")
                   .status(200)
                   .json({
                        count
                   });
            
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
    let controller = new GetMwlItemCountController(req, res);

    await controller.doPipeline();
};
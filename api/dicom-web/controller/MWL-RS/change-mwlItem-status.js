const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { ChangeMwlItemStatusService } = require("@mwl-service/change-mwlItem-status");

class ChangeMwlItemStatusController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "MWL-RS");
    }

    async mainProcess() {
        try {
            let changeMwlItemService = new ChangeMwlItemStatusService(this.request, this.response);
            let changedMwlItems = await changeMwlItemService.changeMwlItemsStatus();

            return this.response
                   .set("Content-Type", "application/dicom+json")
                   .status(200)
                   .json(changedMwlItems);
            
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
    let controller = new ChangeMwlItemStatusController(req, res);

    await controller.doPipeline();
};
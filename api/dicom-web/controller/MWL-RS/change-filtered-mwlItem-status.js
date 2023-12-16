const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { ChangeFilteredMwlItemStatusService } = require("./service/change-filtered-mwlItem-status");

class ChangeFilteredMwlItemStatusController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "MWL-RS");
    }

    async mainProcess() {
        try {
            let changeFilteredMwlItemService = new ChangeFilteredMwlItemStatusService(this.request, this.response);
            let changedMwlItemsCount = await changeFilteredMwlItemService.changeMwlItemsStatus();
            
            return this.response
                   .set("Content-Type", "application/dicom+json")
                   .status(200)
                   .json({
                        updatedCount: changedMwlItemsCount
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
    let controller = new ChangeFilteredMwlItemStatusController(req, res);

    await controller.doPipeline();
};
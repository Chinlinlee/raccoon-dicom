const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { QidoRsService } = require("@qido-rs-service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseQueryController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "QIDO-RS");
        this.apiLogger.addTokenValue();
        this.level = "patient";
    }

    logAction() {
        throw new Error("Not Implemented");
    }

    async mainProcess() {
        this.logAction();
        
        try {
            let qidoRsService = new QidoRsService(this.request, this.response, this.level);
            await qidoRsService.getAndResponseDicomJson();
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports.BaseQueryController = BaseQueryController;
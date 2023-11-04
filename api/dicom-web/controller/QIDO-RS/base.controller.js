const { ControllerErrorHandler } = require("@error/controller.handler");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { QidoRsService } = require("./service/QIDO-RS.service");

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
            return ControllerErrorHandler.raiseInternalServerError(e, this.apiLogger, this.response);
        }
    }
}

module.exports.BaseQueryController = BaseQueryController;
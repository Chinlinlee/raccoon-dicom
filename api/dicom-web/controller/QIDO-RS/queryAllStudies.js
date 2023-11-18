const {
    QidoRsService
} = require("./service/QIDO-RS.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { BaseQueryController } = require("./base.controller");

class QueryAllStudiesController extends BaseQueryController { 
    constructor(req, res) {
        super(req, res);
        this.level = "study";
    }

    logAction() {
        this.apiLogger.logger.info(`Query All Studies`);
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QueryAllStudiesController(req, res);

    await controller.doPipeline();
};


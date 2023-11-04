const {
    QidoRsService
} = require("./service/QIDO-RS.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { BaseQueryController } = require("./base.controller");

class QueryAllInstancesController extends BaseQueryController {
    constructor(req, res) {
        super(req, res);
        this.level = "instance";
    }

    logAction() {
        this.apiLogger.logger.info("Query all instances");
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QueryAllInstancesController(req, res);

    await controller.doPipeline();
};

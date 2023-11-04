const {
    QidoRsService
} = require("./service/QIDO-RS.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { BaseQueryController } = require("./base.controller");

class QueryInstancesOfStudiesController extends BaseQueryController {
    constructor(req, res) {
        super(req, res);
        this.level = "instance";
    }

    logAction() {
        this.apiLogger.logger.info(`Query instances in study, Study UID: ${this.request.params.studyUID}`);
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QueryInstancesOfStudiesController(req, res);

    await controller.doPipeline();
};
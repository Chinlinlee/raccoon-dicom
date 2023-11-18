const {
    QidoRsService
} = require("./service/QIDO-RS.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { BaseQueryController } = require("./base.controller");

class QuerySeriesOfStudiesController extends BaseQueryController {
    constructor(req, res) {
        super(req, res);
        this.level = "series";
    }

    logAction() {
        this.apiLogger.logger.info(`Query series Level, Study UID: ${this.request.params.studyUID}`);
    }
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QuerySeriesOfStudiesController(req, res);

    await controller.doPipeline();
};

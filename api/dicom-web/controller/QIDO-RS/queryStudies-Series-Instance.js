const _ = require("lodash");
const {
    QidoRsService
} = require("./service/QIDO-RS.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { BaseQueryController } = require("./base.controller");

class QueryInstancesOfSeriesOfStudiesController extends BaseQueryController {
    constructor(req, res) {
        super(req, res);
        this.level = "instance";
    }

    logAction() {
        this.apiLogger.logger.info(`Query instance Level, Study UID: ${this.request.params.studyUID}, Series UID: ${this.request.params.seriesUID}`);
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QueryInstancesOfSeriesOfStudiesController(req, res);

    await controller.doPipeline();
};

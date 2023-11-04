const { BaseQueryController } = require("./base.controller");

class QueryAllSeriesController extends BaseQueryController {
    constructor(req, res) {
        super(req, res);
        this.level = "series";
    }

    logAction() {
        this.apiLogger.logger.info("Query all series");
    }
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QueryAllSeriesController(req, res);

    await controller.doPipeline();
};

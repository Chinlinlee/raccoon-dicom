const { BaseQueryController } = require("./base.controller");

class QueryAllPatientsController extends BaseQueryController {
    constructor(req, res) {
        super(req, res);
        this.level = "patient";
    }

    logAction() {
        this.apiLogger.logger.info("Query all patients");
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QueryAllPatientsController(req, res);

    await controller.doPipeline();
};

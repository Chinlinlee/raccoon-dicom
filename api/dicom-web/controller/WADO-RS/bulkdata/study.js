const { StudyBulkDataFactory } = require("./service/bulkdata");
const { BaseBulkDataController } = require("./base.controller");
const { StudyImagePathFactory } = require("../service/WADO-RS.service");

class StudyBulkDataController extends BaseBulkDataController {
    constructor(req, res) {
        super(req, res);
        this.bulkDataFactoryType = StudyBulkDataFactory;
        this.imagePathFactoryType = StudyImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get bulk data from StudyInstanceUID: ${this.request.params.studyUID}`);
    }

}


/**
 * 
 * @param {import("express").Request}
 * @param {import("express").Response}
 * @returns 
 */
module.exports = async function(req, res) {
    let studyBulkDataController = new StudyBulkDataController(req, res);

    await studyBulkDataController.doPipeline();
};
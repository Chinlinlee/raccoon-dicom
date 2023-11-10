const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { BulkDataService, InstanceBulkDataFactory } = require("./service/bulkdata");
const { getInternalServerErrorMessage } = require("../../../../../utils/errorResponse/errorResponseMessage");
const { InstanceModel } = require("@dbModels/dicom");
const { BaseBulkDataController } = require("./base.controller");
const { InstanceImagePathFactory } = require("../service/WADO-RS.service");

class InstanceBulkDataController extends BaseBulkDataController {
    constructor(req, res) {
        super(req, res);
        this.bulkDataFactoryType = InstanceBulkDataFactory;
        this.imagePathFactoryType = InstanceImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get bulk data from StudyInstanceUID: ${this.request.params.studyUID}\
, SeriesInstanceUID: ${this.request.params.seriesUID}\
, SOPInstanceUID: ${this.request.params.instanceUID}`);
    }

}


/**
 * 
 * @param {import("express").Request}
 * @param {import("express").Response}
 * @returns 
 */
module.exports = async function (req, res) {
    let instanceBulkDataController = new InstanceBulkDataController(req, res);

    await instanceBulkDataController.doPipeline();
};
const mongoose = require("mongoose");
const { Controller } = require("../../../../controller.class");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { BulkDataService, SpecificBulkDataFactory } = require("./service/bulkdata");
const { getInternalServerErrorMessage } = require("../../../../../utils/errorResponse/errorResponseMessage");
const { BaseBulkDataController } = require("./base.controller");
const { InstanceImagePathFactory } = require("../service/WADO-RS.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BulkDataController extends BaseBulkDataController {
    constructor(req, res) {
        super(req, res);
        this.bulkDataFactoryType = SpecificBulkDataFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get bulk data ${this.request.params.binaryValuePath}\
, from StudyInstanceUID: ${this.request.params.studyUID}\
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
module.exports = async function(req, res) {
    let bulkDataController = new BulkDataController(req, res);

    await bulkDataController.doPipeline();
};
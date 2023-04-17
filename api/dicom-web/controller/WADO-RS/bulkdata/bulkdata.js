const mongoose = require("mongoose");
const { Controller } = require("../../../../controller.class");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { BulkDataService } = require("./service/bulkdata");
const { getInternalServerErrorMessage } = require("../../../../../utils/errorResponse/errorResponseMessage");

class BulkDataController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        apiLogger.logger.info(`Get bulk data ${this.request.params.binaryValuePath}\
, from StudyInstanceUID: ${this.request.params.studyUID}\
, SeriesInstanceUID: ${this.request.params.seriesUID}\
, SOPInstanceUID: ${this.request.params.instanceUID}`);

        let bulkDataService = new BulkDataService(this.request, this.response);

        try {
            let bulkData = await bulkDataService.getSpecificBulkData();
            await bulkDataService.writeBulkData(bulkData);
            bulkDataService.multipartWriter.writeFinalBoundary();
            return this.response.end();
        } catch(e) {
            apiLogger.logger.error(e);
            return this.response.status(500).json(
                getInternalServerErrorMessage("An exception occur")
            );
        }
        
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
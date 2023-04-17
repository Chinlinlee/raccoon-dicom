const mongoose = require("mongoose");
const { Controller } = require("../../../../controller.class");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { BulkDataService } = require("./service/bulkdata");
const { getInternalServerErrorMessage } = require("../../../../../utils/errorResponse/errorResponseMessage");
const dicomModel = require("../../../../../models/mongodb/models/dicom");

class InstanceBulkDataController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        apiLogger.logger.info(`Get bulk data from StudyInstanceUID: ${this.request.params.studyUID}\
, SeriesInstanceUID: ${this.request.params.seriesUID}\
, SOPInstanceUID: ${this.request.params.instanceUID}`);

        let bulkDataService = new BulkDataService(this.request, this.response);

        try {
            let bulkDataArray = await bulkDataService.getInstanceBulkData();
            for (let bulkData of bulkDataArray) {
                await bulkDataService.writeBulkData(bulkData);
            }

            let dicomInstancePathObj = await dicomModel.getPathOfInstance({
                studyUID: this.request.params.studyUID,
                seriesUID: this.request.params.seriesUID,
                instanceUID: this.request.params.instanceUID
            });
            
            await bulkDataService.writeBulkData(dicomInstancePathObj);
            
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
    let instanceBulkDataController = new InstanceBulkDataController(req, res);

    await instanceBulkDataController.doPipeline();
};
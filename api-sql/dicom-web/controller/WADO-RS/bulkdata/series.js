const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { BulkDataService } = require("./service/bulkdata");
const { getInternalServerErrorMessage } = require("@root/utils/errorResponse/errorResponseMessage");
const { SeriesModel } = require("@models/sql/models/series.model");

class SeriesBulkDataController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        apiLogger.logger.info(`Get bulk data from StudyInstanceUID: ${this.request.params.studyUID}\
, SeriesInstanceUID: ${this.request.params.seriesUID}`);

        let bulkDataService = new BulkDataService(this.request, this.response);

        try {
            let bulkDataArray = await bulkDataService.getSeriesBulkData();
            for (let bulkData of bulkDataArray) {
                await bulkDataService.writeBulkData(bulkData);
            }

            let dicomInstancePathObjArray = await SeriesModel.getPathGroupOfInstances({
                studyUID: this.request.params.studyUID,
                seriesUID: this.request.params.seriesUID
            });

            for (let instancePathObj of dicomInstancePathObjArray) {
                await bulkDataService.writeBulkData(instancePathObj);
            }

            bulkDataService.multipartWriter.writeFinalBoundary();
            return this.response.end();
        } catch (e) {
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
module.exports = async function (req, res) {
    let seriesBulkDataController = new SeriesBulkDataController(req, res);

    await seriesBulkDataController.doPipeline();
};
const mongoose = require("mongoose");
const { Controller } = require("../../../../controller.class");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { BulkDataService } = require("./service/bulkdata");
const dicomStudyModel = require("../../../../../models/mongodb/models/dicomStudy");
const { getInternalServerErrorMessage } = require("../../../../../utils/errorResponse/errorResponseMessage");

class StudyBulkDataController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        apiLogger.logger.info(`Get bulk data from StudyInstanceUID: ${this.request.params.studyUID}`);

        let bulkDataService = new BulkDataService(this.request, this.response);

        try {
            let bulkDataArray = await bulkDataService.getStudyBulkData();
            for (let bulkData of bulkDataArray) {
                await bulkDataService.writeBulkData(bulkData);
            }

            let dicomInstancePathObjArray = await dicomStudyModel.getPathGroupOfInstances({
                studyUID: this.request.params.studyUID
            });

            for(let instancePathObj of dicomInstancePathObjArray) {
                await bulkDataService.writeBulkData(instancePathObj);
            }
            
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
    let studyBulkDataController = new StudyBulkDataController(req, res);

    await studyBulkDataController.doPipeline();
};
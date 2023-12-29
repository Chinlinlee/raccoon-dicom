const { SpecificBulkDataFactory } = require("@api/dicom-web/controller/WADO-RS/bulkdata/service/bulkdata");
const { BaseBulkDataController } = require("./base.controller");

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
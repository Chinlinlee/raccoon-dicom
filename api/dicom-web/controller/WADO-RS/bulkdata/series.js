const { SeriesBulkDataFactory } = require("@api/dicom-web/controller/WADO-RS/bulkdata/service/bulkdata");
const { BaseBulkDataController } = require("./retrieveBulkData.controller");
const { SeriesImagePathFactory } = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");

class SeriesBulkDataController extends BaseBulkDataController {
    constructor(req, res) {
        super(req, res);
        this.bulkDataFactoryType = SeriesBulkDataFactory;
        this.imagePathFactoryType = SeriesImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get bulk data from StudyInstanceUID: ${this.request.params.studyUID}\
, SeriesInstanceUID: ${this.request.params.seriesUID}`);
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
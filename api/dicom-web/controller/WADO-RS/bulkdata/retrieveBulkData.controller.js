const { Controller } = require("@root/api/controller.class");
const { StudyBulkDataFactory, BulkDataService } = require("@api/dicom-web/controller/WADO-RS/bulkdata/service/bulkdata");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyImagePathFactory } = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseBulkDataController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.bulkDataService = new BulkDataService(this.request, this.response, this.request.bulkDataFactoryType);
    }

    async mainProcess() {
        try {

            let bulkData = await this.bulkDataService.getBulkData();
            if (Array.isArray(bulkData)) {
                await this.responseBulkDataArray(bulkData);
            } else {
                await this.responseBulkData(bulkData);
            }

            this.bulkDataService.multipartWriter.writeFinalBoundary();
            return this.response.end();
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.request.logger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }

    async responseBulkDataArray(bulkDataArray) {
        for (let bulkData of bulkDataArray) {
            await this.bulkDataService.writeBulkData(bulkData);
        }

        let imagePathFactory = new this.request.imagePathFactoryType({
            ...this.request.params
        });
        await imagePathFactory.getImagePaths();

        for (let imagePathObj of imagePathFactory.imagePaths) {
            await this.bulkDataService.writeBulkData(imagePathObj);
        }
    }

    async responseBulkData(bulkData) {
        await this.bulkDataService.writeBulkData(bulkData);
    }
}

module.exports.BaseBulkDataController = BaseBulkDataController;
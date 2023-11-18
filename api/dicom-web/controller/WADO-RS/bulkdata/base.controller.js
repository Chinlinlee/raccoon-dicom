const { Controller } = require("@root/api/controller.class");
const { StudyBulkDataFactory, BulkDataService } = require("./service/bulkdata");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyImagePathFactory } = require("../service/WADO-RS.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseBulkDataController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();
        this.bulkDataFactoryType = StudyBulkDataFactory;
        this.imagePathFactoryType = StudyImagePathFactory;
        this.bulkDataService = new BulkDataService(this.request, this.response, this.bulkDataFactoryType);
    }

    logAction() {
        throw new Error("Abstract Method not implemented.");
    }

    async mainProcess() {
        this.logAction();

        try {
            this.logAction();

            let bulkData = await this.bulkDataService.getBulkData();
            if (Array.isArray(bulkData)) {
                await this.responseBulkDataArray(bulkData);
            } else {
                await this.responseBulkData(bulkData);
            }

            this.bulkDataService.multipartWriter.writeFinalBoundary();
            return this.response.end();
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }

    async responseBulkDataArray(bulkDataArray) {
        for (let bulkData of bulkDataArray) {
            await this.bulkDataService.writeBulkData(bulkData);
        }

        let imagePathFactory = new this.imagePathFactoryType({
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
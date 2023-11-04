const { Controller } = require("@root/api/controller.class");
const { StudyBulkDataFactory, BulkDataService } = require("./service/bulkdata");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyImagePathFactory } = require("../service/WADO-RS.service");
const { ControllerErrorHandler } = require("@error/controller.handler");

class BaseBulkDataController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();
        this.bulkDataFactoryType = StudyBulkDataFactory;
        this.imagePathFactoryType = StudyImagePathFactory;
    }

    logAction() {
        throw new Error("Abstract Method not implemented.");
    }

    async mainProcess() {
        this.logAction();

        let bulkDataService = new BulkDataService(this.request, this.response, this.bulkDataFactoryType);

        try {
            let bulkDataArray = await bulkDataService.getBulkData();
            for(let bulkData of bulkDataArray) {
                await bulkDataService.writeBulkData(bulkData);
            }

            let imagePathFactory = new this.imagePathFactoryType({
                ...this.request.params
            });
            await imagePathFactory.getImagePaths();
            
            for(let imagePathObj of imagePathFactory.imagePaths) {
                await bulkDataService.writeBulkData(imagePathObj);
            }

            bulkDataService.multipartWriter.writeFinalBoundary();
            return this.response.end();
        } catch(e) {
            return ControllerErrorHandler.raiseInternalServerError(e, this.apiLogger, this.response);
        }
    }
}

module.exports.BaseBulkDataController = BaseBulkDataController;
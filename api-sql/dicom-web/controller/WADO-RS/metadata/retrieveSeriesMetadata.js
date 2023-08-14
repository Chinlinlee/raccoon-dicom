const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const fileExist = require("@root/utils/file/fileExist");
const wadoService = require("../service/WADO-RS.service");
const errorResponse = require("@root/utils/errorResponse/errorResponseMessage");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { SeriesModel } = require("@models/sql/models/series.model");

class RetrieveSeriesMetadataController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();


        apiLogger.logger.info(`[WADO-RS] [Get Study's Series' Instances Metadata] [series UID: ${this.request.params.seriesUID}, study UID: ${this.request.params.studyUID}]`);
        try {
            let responseMetadata = [];

            let imagesPathList = await SeriesModel.getPathGroupOfInstances(this.request.params);
            if (imagesPathList.length > 0) {
                for (let imagePathObj of imagesPathList) {
                    let instanceDir = path.dirname(imagePathObj.instancePath);
                    let metadataPath = path.join(instanceDir, `${imagePathObj.instanceUID}.metadata.json`);
                    if (await fileExist(metadataPath)) {
                        let metadataJsonStr = fs.readFileSync(metadataPath, { encoding: "utf-8" });
                        let metadataJson = JSON.parse(metadataJsonStr);
                        wadoService.addHostnameOfBulkDataUrl(metadataJson, this.request);
                        responseMetadata.push(metadataJson);
                    }
                }
                this.response.writeHead(200, {
                    "Content-Type": "application/dicom+json"
                });
                return this.response.end(JSON.stringify(responseMetadata));
            }

            this.response.writeHead(204);
            return this.response.end(JSON.stringify(
                errorResponse.getNotFoundErrorMessage(
                    `Not found metadata of series UID:${this.request.params.seriesUID}  study UID: ${this.request.params.studyUID}`
                )
            ));
        } catch(e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            console.error(errorStr);
            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end();
        }
    }
}
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveSeriesMetadataController(req, res);

    await controller.doPipeline();
};
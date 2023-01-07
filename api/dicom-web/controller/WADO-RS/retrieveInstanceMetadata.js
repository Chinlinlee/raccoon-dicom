const mongoose = require("mongoose");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const fileExist = require("../../../../utils/file/fileExist");
const wadoService = require("./service/WADO-RS.service");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { logger } = require("../../../../utils/log");
const { Controller } = require("../../../controller.class");

class RetrieveInstanceMetadataController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        logger.info(`[WADO-RS] [Get Study's Series' Instance Metadata] [instance UID: ${this.request.params.instanceUID}, series UID: ${this.request.params.seriesUID}, study UID: ${this.request.params.studyUID}]`);
        try {
            let responseMetadata = [];

            let imagePathObj = await mongoose.model("dicom").getPathGroupOfInstances(this.request.params);
            if (imagePathObj) {
                let instanceDir = path.dirname(imagePathObj.instancePath);
                let metadataPath = path.join(instanceDir, `${imagePathObj.instanceUID}.metadata.json`);
                if (await fileExist(metadataPath)) {
                    let metadataJsonStr = fs.readFileSync(metadataPath, { encoding: "utf-8" });
                    let metadataJson = JSON.parse(metadataJsonStr);
                    wadoService.addHostnameOfBulkDataUrl(metadataJson, this.request);
                    responseMetadata.push(metadataJson);
                }
                this.response.writeHead(200, {
                    "Content-Type": "application/dicom+json"
                });
                return this.response.end(JSON.stringify(responseMetadata));
            }
            
            this.response.writeHead(204);
            return this.response.end(JSON.stringify(
                errorResponse.getNotFoundErrorMessage(
                    `Not found metadata of instance UID: ${this.request.params.instanceUID}, series UID: ${this.request.params.seriesUID}, study UID: ${this.request.params.studyUID}`
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
    let controller = new RetrieveInstanceMetadataController(req, res);

    await controller.preProcess();

    await controller.mainProcess();

    controller.postProcess();
};
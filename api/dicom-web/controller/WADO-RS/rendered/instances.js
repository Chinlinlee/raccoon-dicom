const _ = require("lodash");
const mongoose = require("mongoose");
const renderedService = require("../service/rendered.service");
const { InstanceImagePathFactory } = require("../service/WADO-RS.service");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { Controller } = require("../../../../controller.class");

class RetrieveRenderedInstancesController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        let headerAccept = _.get(this.request.headers, "accept", "");
    
        apiLogger.logger.info(`Get study's series' rendered instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}`);
        
        if (!headerAccept == `multipart/related; type="image/jpeg"`) {
            let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow \`multipart/related; type="image/jpeg"\`, exception : ${headerAccept}`);
            this.response.writeHead(badRequestMessage.HttpStatus, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(badRequestMessage));
        }
        
        try {
            let renderedImageMultipartWriter = new renderedService.RenderedImageMultipartWriter(
                this.request,
                this.response,
                InstanceImagePathFactory,
                renderedService.InstanceFramesWriter
            );

            await renderedImageMultipartWriter.write();
    
            apiLogger.logger.info(`Write Multipart Successfully, study's series' instances' rendered images, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}, instance UID: ${this.request.params.instanceUID}`);
            return this.response.end();
        } catch(e) {
            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end(JSON.stringify(e));
        }
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveRenderedInstancesController(req, res);

    await controller.doPipeline();
};

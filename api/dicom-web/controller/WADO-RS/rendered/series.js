const mongoose = require("mongoose");
const _ = require("lodash");
const renderedService = require("../service/rendered.service");
const { MultipartWriter } = require("../../../../../utils/multipartWriter");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { logger } = require("../../../../../utils/log");
const { Controller } = require("../../../../controller.class");

class RetrieveRenderedSeriesController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let headerAccept = _.get(this.request.headers, "accept", "");
        logger.info(`[WADO-RS] [Get study's series' rendered instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}]`);
        if (!headerAccept == `multipart/related; type="image/jpeg"`) {
            let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow \`multipart/related; type="image/jpeg"\`, exception : ${headerAccept}`);
            this.response.writeHead(badRequestMessage.HttpStatus, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(badRequestMessage));
        }
        
        try {
            let instancesInSeries = await mongoose.model("dicomSeries").getPathGroupOfInstances(this.request.params);
    
            if (instancesInSeries.length > 0) {
                let multipartWriter = new MultipartWriter([], this.response, this.request);
                
                for(let imagePathObj of instancesInSeries) {
                    let instanceFramesObj = await renderedService.getInstanceFrameObj(imagePathObj);
                    let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
                    dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
                    await renderedService.writeRenderedImages(this.request, dicomNumberOfFrames, instanceFramesObj, multipartWriter);
                }
                multipartWriter.writeFinalBoundary();
            } else {
                this.response.writeHead(204, {
                    "content-type": "application/dicom+json"
                });
            }

            logger.info(`[WADO-RS] [path: ${this.request.originalUrl}] [Write Multipart Successfully, study's series' rendered instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}]`);

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
    let controller = new RetrieveRenderedSeriesController(req, res);

    await controller.doPipeline();
};

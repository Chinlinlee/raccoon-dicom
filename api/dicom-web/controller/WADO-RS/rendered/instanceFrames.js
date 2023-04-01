const _ = require("lodash");
const renderedService = require("../service/rendered.service");
const { MultipartWriter } = require("../../../../../utils/multipartWriter");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { Controller } = require("../../../../controller.class");

class RetrieveRenderedInstanceFramesController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        let {
            studyUID,
            seriesUID,
            instanceUID,
            frameNumber
        } = this.request.params;
        
        apiLogger.logger.info(`Get study's series' rendered instances' frames, study UID: ${studyUID}, series UID: ${seriesUID}, instance UID: ${instanceUID}, frame: ${frameNumber}`);
    
        let headerAccept = _.get(this.request.headers, "accept", "");
        if (!headerAccept.includes("*/*") && !headerAccept.includes("image/jpeg")) {
            let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow */* or image/jpeg , exception : ${headerAccept}`);
            this.response.writeHead(badRequestMessage.HttpStatus, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(badRequestMessage));
        }
    
        try {
            let instanceFramesObj = await renderedService.getInstanceFrameObj(this.request.params);
            if (!instanceFramesObj) {
                this.response.writeHead(404, {
                    "Content-Type": "application/dicom+json"
                });
                let notFoundMessage = errorResponse.getNotFoundErrorMessage(`Not Found Instance, Instance UID: ${
                    instanceUID
                }, Series UID: ${
                    seriesUID
                }, Study UID: ${
                    studyUID
                }`);
                
                let notFoundMessageStr = JSON.stringify(notFoundMessage);
    
                apiLogger.logger.warn(`[${notFoundMessageStr}]`);
    
                return this.response.end(notFoundMessageStr);
            }
            let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
            dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
    
            for(let i = 0; i < frameNumber.length ; i++) {
                let frame = frameNumber[i];
                if (frame > dicomNumberOfFrames) {
                    let badRequestMessage = errorResponse.getBadRequestErrorMessage(`Bad frame number , This instance NumberOfFrames is : ${dicomNumberOfFrames} , But request ${frameNumber}`);
                    this.response.writeHead(badRequestMessage.HttpStatus, {
                        "Content-Type": "application/dicom+json"
                    });
    
                    let badRequestMessageStr = JSON.stringify(badRequestMessage);
    
                    apiLogger.logger.warn(badRequestMessageStr);
    
                    return this.response.end(JSON.stringify(badRequestMessageStr));
                }
            }
            
            let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
            if (frameNumber.length == 1) {
                let postProcessResult = await renderedService.postProcessFrameImage(this.request, frameNumber[0], instanceFramesObj, transferSyntax);
                if (postProcessResult.status) {
                    this.response.writeHead(200, {
                        "Content-Type": "image/jpeg"
                    });
                    apiLogger.logger.info(`Get instance's frame successfully, instance UID: ${instanceUID}, frame number: ${frameNumber[0]}`);
                    return this.response.end(postProcessResult.magick.toBuffer(), "binary");
                }
                throw new Error(`Can not process this image, instanceUID: ${instanceFramesObj.instanceUID}, frameNumber: ${this.request.frameNumber[0]}`);
            } else {
                let multipartWriter = new MultipartWriter([], this.request, this.response);
                await renderedService.writeSpecificFramesRenderedImages(this.request, frameNumber, instanceFramesObj, multipartWriter);
                multipartWriter.writeFinalBoundary();
    
                apiLogger.logger.info(`Get instance's frame successfully, instance UID: ${instanceUID}, frame numbers: ${frameNumber}`);
    
                return this.response.end();
            }
        } catch(e) {
            console.error(e);
            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end(JSON.stringify(e, Object.getOwnPropertyNames(e), 4), "utf8");
        }
    }
}
/**
 * 
 * @param {import("http").incomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveRenderedInstanceFramesController(req, res);

    await controller.doPipeline();
};
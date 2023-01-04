const _ = require("lodash");
const wadoService = require("./service/WADO-RS.service");
const renderedService = require("./service/rendered.service");
const { MultipartWriter } = require("../../../../utils/multipartWriter");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");

class RetrieveRenderedStudyController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let headerAccept = _.get(this.request.headers, "accept", "");
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
    
        apiLogger.info(`[Get study's rendered instances, study UID: ${this.request.params.studyUID}]`);
    
        if (!headerAccept == `multipart/related; type="image/jpeg"`) {
            let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow \`multipart/related; type="image/jpeg"\`, exception : ${headerAccept}`);
            this.response.writeHead(badRequestMessage.HttpStatus, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(badRequestMessage));
        }
        
        try {
            let instancesInStudy = await wadoService.getStudyImagesPath(this.request.params);
    
            if (instancesInStudy) {
                let multipartWriter = new MultipartWriter([], this.response, this.request);
                
                for(let imagePathObj of instancesInStudy) {
                    let instanceFramesObj = await renderedService.getInstanceFrameObj(imagePathObj);
                    let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
                    dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
                    await renderedService.writeRenderedImages(this.request, dicomNumberOfFrames, instanceFramesObj, multipartWriter);
                }
                multipartWriter.writeFinalBoundary();
            }
    
            apiLogger.info(`[Write Multipart Successfully, study's rendered instances, study UID: ${this.request.params.studyUID}]`);
    
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
    let controller = new RetrieveRenderedStudyController(req, res);

    await controller.preProcess();

    await controller.mainProcess();

    controller.postProcess();
};

const _ = require("lodash");
const renderedService = require("../service/rendered.service");
const { InstanceImagePathFactory } = require("../service/WADO-RS.service");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { Controller } = require("../../../../controller.class");

class RetrieveRenderedInstanceFramesController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();

        let {
            studyUID,
            seriesUID,
            instanceUID,
            frameNumber
        } = this.request.params;
        
        this.apiLogger.logger.info(`Get study's series' rendered instances' frames, study UID: ${studyUID}, series UID: ${seriesUID}, instance UID: ${instanceUID}, frame: ${frameNumber}`);
    
        let headerAccept = _.get(this.request.headers, "accept", "");
        if (!headerAccept.includes("*/*") && !headerAccept.includes("image/jpeg")) {
            let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow */* or image/jpeg , exception : ${headerAccept}`);
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
                renderedService.InstanceFramesListWriter
            );

            let buffer = await renderedImageMultipartWriter.write();

            this.apiLogger.logger.info(`Get instance's frame successfully, instance UID: ${instanceUID}, frame number: ${JSON.stringify(frameNumber)}`);

            if (buffer instanceof Buffer) {
                return this.response.end(buffer, "binary");
            }

            return this.response.end();
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
const mongoose = require("mongoose");
const _ = require("lodash");
const renderedService = require("../service/rendered.service");
const {
    StudyImagePathFactory
} = require("../service/WADO-RS.service");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { Controller } = require("../../../../controller.class");

class RetrieveRenderedStudyController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let headerAccept = _.get(this.request.headers, "accept", "");
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();
    
        apiLogger.logger.info(`Get study's rendered instances, study UID: ${this.request.params.studyUID}`);
    
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
                StudyImagePathFactory,
                renderedService.StudyFramesWriter
            );

            await renderedImageMultipartWriter.write();
    
            apiLogger.logger.info(`Write Multipart Successfully, study's rendered instances, study UID: ${this.request.params.studyUID}`);
    
            return this.response.end();
        } catch(e) {
            apiLogger.logger.error(e);

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

    await controller.doPipeline();
};

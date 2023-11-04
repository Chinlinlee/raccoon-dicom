const _ = require("lodash");
const renderedService = require("../service/rendered.service");
const {
    StudyImagePathFactory, SeriesImagePathFactory, InstanceImagePathFactory
} = require("../service/WADO-RS.service");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { Controller } = require("../../../../controller.class");

class BaseRetrieveRenderedController extends Controller {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();
        this.imagePathFactory = StudyImagePathFactory;
        this.framesWriter = renderedService.StudyFramesWriter;
    }

    logAction() {
        throw new Error("abstract, not implement");
    }
    
    logSuccessful() {
        throw new Error("abstract, not implement");
    }

    async mainProcess() {
        this.logAction();
    
        let headerAccept = _.get(this.request.headers, "accept", "");
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
                this.imagePathFactory,
                this.framesWriter
            );

            let buffer = await renderedImageMultipartWriter.write();

            this.logSuccessful();

            if (buffer instanceof Buffer) {
                return this.response.end(buffer, "binary");
            }
    
            return this.response.end();
        } catch(e) {
            this.apiLogger.logger.error(e);

            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end({
                code: 500,
                message: "An exception occurred"
            });
        }
    }
}


module.exports.BaseRetrieveRenderedController = BaseRetrieveRenderedController;
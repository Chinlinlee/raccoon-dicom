const _ = require("lodash");
const renderedService = require("@api/dicom-web/controller/WADO-RS/service/rendered.service");
const {
    StudyImagePathFactory
} = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");
const errorResponse = require("@root/utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { Controller } = require("../../../../controller.class");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class BaseRetrieveRenderedController extends Controller {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
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
                this.request.imagePathFactory,
                this.request.framesWriter
            );

            let buffer = await renderedImageMultipartWriter.write();

            if (buffer instanceof Buffer) {
                return this.response.end(buffer, "binary");
            }
    
            return this.response.end();
        } catch(e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.request.logger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}


module.exports.BaseRetrieveRenderedController = BaseRetrieveRenderedController;
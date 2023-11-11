const { WadoUriService, NotFoundInstanceError } = require("../service/WADO-URI.service");
const { Controller } = require("../../controller.class");
const { ApiLogger } = require("../../../utils/logs/api-logger");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class RetrieveSingleInstanceController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.logger = new ApiLogger(this.request, "WADO-URI");
        this.service = new WadoUriService(req, res, this.logger);
    }

    async mainProcess() {
        let { 
            contentType
        } = this.request.query;

        if (!contentType) contentType = this.request.headers.accept;

        try {

            if (contentType === "application/dicom") {
                this.service.getAndResponseDicomInstance();
            } else if (contentType === "image/jpeg") {
                this.service.getAndResponseJpeg();
            } else if (!contentType) {
                this.service.getAndResponseDicomInstance();
            }

        } catch(e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.logger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
        
    }

}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveSingleInstanceController(req, res);

    await controller.doPipeline();
};
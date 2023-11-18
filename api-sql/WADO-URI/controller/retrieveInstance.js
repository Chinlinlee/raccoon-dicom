const { WadoUriService, NotFoundInstanceError } = require("../service/WADO-URI.service");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");

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
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            this.logger.error(errorStr);

            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end(JSON.stringify({
                code: 500,
                message: errorStr
            }));
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
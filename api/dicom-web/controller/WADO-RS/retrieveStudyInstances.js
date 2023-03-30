const { logger } = require("../../../../utils/log");
const wadoService = require("./service/WADO-RS.service");
const { WADOZip } = require("./service/WADOZip");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { Controller } = require("../../../controller.class");

class RetrieveStudyInstancesController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        try {
            logger.info(`[WADO-RS] [Get study's instances, study UID: ${this.request.params.studyUID}] [Request Accept: ${this.request.headers.accept}]`);

            if (this.request.headers.accept.toLowerCase() === "application/zip") {
                return await this.responseZip();
            } else if (this.request.headers.accept.includes("multipart/related")) {
                return await this.responseMultipartRelated();
            } else if (this.request.headers.accept.includes("*")){
                this.request.headers.accept = "multipart/related; type=\"application/dicom\"";
                return await this.responseMultipartRelated();
            }

            return wadoService.sendNotSupportedMediaType(this.response, this.request.headers.accept);
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            logger.error(`[WADO-RS] [Error: ${errorStr}]`);
            
            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end(JSON.stringify({
                code: 500,
                message: errorStr
            }));
        }
    }

    async responseZip() {
        let wadoZip = new WADOZip(this.request.params, this.response);
        let zipResult = await wadoZip.getZipOfStudyDICOMFiles();
        if (zipResult.status) {
            return this.response.end();
        } else {
            this.response.writeHead(zipResult.code, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(zipResult));
        }
    }

    async responseMultipartRelated() {
        let type = wadoService.getAcceptType(this.request);
        let isSupported = wadoService.supportInstanceMultipartType.indexOf(type) > -1;
        if (!isSupported) {
            return wadoService.sendNotSupportedMediaType(this.response, type);
        }

        let writeMultipartResult = await wadoService.multipartFunc[type].getStudyDICOMFiles(this.request.params, this.request, this.response, type);
        if (!writeMultipartResult.status) {
            this.response.writeHead(writeMultipartResult.code, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(writeMultipartResult));
        }

        return this.response.end();
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveStudyInstancesController(req, res);

    await controller.doPipeline();
};
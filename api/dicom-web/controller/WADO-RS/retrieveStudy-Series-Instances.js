const { logger } = require("../../../../utils/log");
const wadoService = require("./service/WADO-RS.service");
const { WADOZip } = require("./service/WADOZip");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { Controller } = require("../../../controller.class");

class RetrieveInstancesOfSeries extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        try {
            logger.info(`[WADO-RS] [Get study's series' instances, study UID: ${this.request.params.studyUID}, series UID: ${this.request.params.seriesUID}] [Request Accept: ${this.request.headers.accept}]`);
            if (this.request.headers.accept.toLowerCase() === "application/zip") {
                let wadoZip = new WADOZip(this.request.params, this.response);
                let zipResult = await wadoZip.getZipOfSeriesDICOMFiles();
                if (zipResult.status) {
                    return this.response.end();
                } else {
                    this.response.writeHead(zipResult.code, {
                        "Content-Type": "application/dicom+json"
                    });
                    return this.response.end(JSON.stringify(zipResult));
                }
            } else if (this.request.headers.accept.includes("multipart/related")) {
                let type = wadoService.getAcceptType(this.request);
                let isSupported = wadoService.supportInstanceMultipartType.indexOf(type) > -1;
                if (!isSupported) {
                    return wadoService.sendNotSupportedMediaType(this.response, type);
                }
                let writeMultipartResult = await wadoService.multipartFunc[type].getSeriesDICOMFiles(this.request.params, this.request, this.response, type);
                if (!writeMultipartResult.status) {
                    this.response.writeHead(writeMultipartResult.code, {
                        "Content-Type": "application/dicom+json"
                    });
                    return this.response.end(JSON.stringify(writeMultipartResult));
                }
                return this.response.end();
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
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveInstancesOfSeries(req, res);

    await controller.preProcess();

    await controller.mainProcess();

    controller.postProcess();
};
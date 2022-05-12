const { logger } = require("../../../../utils/log");
const wadoService = require("./service/WADO-RS.service");
const { WADOZip } = require("./service/WADOZip");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    try {
        logger.info(`[WADO-RS] [Get study's instances, study UID: ${req.params.studyUID}] [Request Accept: ${req.headers.accept}]`);
        if (req.headers.accept.toLowerCase() === "application/zip") {
            let wadoZip = new WADOZip(req.params, res);
            let zipResult = await wadoZip.getZipOfStudyDICOMFiles();
            if (zipResult.status) {
                return res.end();
            }
        } else if (req.headers.accept.includes("multipart/related")) {
            let type = wadoService.getAcceptType(req);
            let isSupported = wadoService.supportInstanceMultipartType.indexOf(type) > -1;
            if (!isSupported) {
                let errorMessage = errorResponse.getNotSupportedErrorMessage(`The type ${type} is not supported, server supported multipart/related; type="application/dicom", multipart/related; type="application/octet-stream" and application/zip`);
                res.writeHead(errorMessage.HttpStatus, {
                   "Content-Type": "application/dicom+json" 
                });
                return res.end(JSON.stringify(errorMessage));
            }
            await wadoService.multipartFunc[type].getStudyDICOMFiles(req.params, req, res, type);
        }
        return res.end();
    } catch(e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[WADO-RS] [Error: ${errorStr}]`);
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify({
            code: 500,
            message: errorStr
        }));
    }
};
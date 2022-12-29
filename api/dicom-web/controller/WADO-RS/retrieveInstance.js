const wadoService = require("./service/WADO-RS.service");
const { WADOZip } = require("./service/WADOZip");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let apiLogger = new ApiLogger(req, "WADO-URI");

    apiLogger.info(`[Get study's series' instances, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}] [Request Accept: ${req.headers.accept}]`);

    try {
        if (req.headers.accept.toLowerCase() === "application/zip") {
            let wadoZip = new WADOZip(req.params, res);
            let zipResult = await wadoZip.getZipOfInstanceDICOMFile();
            if (zipResult.status) {
                return res.end();
            } else {
                res.writeHead(zipResult.code, {
                    "Content-Type": "application/dicom+json"
                });
                return res.end(JSON.stringify(zipResult));
            }
        } else if (req.headers.accept.includes("multipart/related")) {
            let type = wadoService.getAcceptType(req);
            let isSupported = wadoService.supportInstanceMultipartType.indexOf(type) > -1;
            if (!isSupported) {
                return wadoService.sendNotSupportedMediaType(res, type);
            }
            let writeMultipartResult = await wadoService.multipartFunc[type].getInstanceDICOMFile(req.params, req, res, type);
            if (!writeMultipartResult.status) {
                res.writeHead(writeMultipartResult.code, {
                    "Content-Type": "application/dicom+json"
                });
                return res.end(JSON.stringify(writeMultipartResult));
            }
            return res.end();
        }
        return wadoService.sendNotSupportedMediaType(res, req.headers.accept);
    } catch(e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        apiLogger.error(errorStr);

        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify({
            code: 500,
            message: errorStr
        }));
    }
};
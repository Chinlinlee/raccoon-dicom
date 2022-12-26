const { performance } = require("node:perf_hooks");
const errorResponseMessage = require("../../../../utils/errorResponse/errorResponseMessage");
const { logger } = require("../../../../utils/log");
/**@type {import('socket.io').Server} */
const io = require("../../../../socket").get();
const { StowRsRequestMultipartParser } = require("./service/request-multipart-parser");
const { StowRsService } = require("./service/stow-rs.service");

/**
 * To store DICOM instance
 * 1. we parse multipart request to get file info that user upload
 * 2. parse DICOM to JSON and store DICOM file from step 1
 * 3. parse DICOM json model to FHIR (Patient, Endpoint, ImagingStudy)
 * 4. upload FHIR to FHIR server
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async function (req, res) {
    let startSTOWTime = performance.now();
    let retCode;
    let storeMessage;
    try {
        let requestMultipartParser = new StowRsRequestMultipartParser(req);
        let multipartParseResult = await requestMultipartParser.parse();

        if (multipartParseResult.status) {
            let stowRsService = new StowRsService(req, multipartParseResult.multipart.files);
            let storeInstancesResult = await stowRsService.storeInstances();

            retCode = storeInstancesResult.code;
            storeMessage = storeInstancesResult.responseMessage;
        }
        let endSTOWTime = performance.now();
        let elapsedTime = (endSTOWTime - startSTOWTime).toFixed(3);
        logger.info(
            `[STOW-RS] [Finished STOW-RS, elapsed time: ${elapsedTime} ms]`
        );

        res.writeHead(retCode, {
            "Content-Type": "application/dicom"
        });
        
        return res.end(JSON.stringify(storeMessage));
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[STOW-RS] [${errorStr}]`);
        let errorMessage =
            errorResponseMessage.getInternalServerErrorMessage(errorStr);
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        return res.end(JSON.stringify(errorMessage));
    }
};

const { performance } = require("node:perf_hooks");
const errorResponseMessage = require("@root/utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StowRsRequestMultipartParser } = require("@root/api/dicom-web/controller/STOW-RS/service/request-multipart-parser");
const { SqlStowRsService } = require("./service/stow-rs.service");


/**
 * To store DICOM instance
 * 1. we parse multipart request to get file info that user upload
 * 2. parse DICOM to JSON and store DICOM file from step 1
 * 3. parse DICOM json model to FHIR (Patient, Endpoint, ImagingStudy)
 * 4. upload FHIR to FHIR server
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let startSTOWTime = performance.now();
    let retCode;
    let storeMessage;
    let apiLogger = new ApiLogger(req, "STOW-RS");
    apiLogger.addTokenValue();

    try {
        let requestMultipartParser = new StowRsRequestMultipartParser(req);
        let multipartParseResult = await requestMultipartParser.parse();

        if (multipartParseResult.status) {
            let stowRsService = new SqlStowRsService(req, multipartParseResult.multipart.files);
            let storeInstancesResult = await stowRsService.storeInstances();

            retCode = storeInstancesResult.code;
            storeMessage = storeInstancesResult.responseMessage;
        }
        let endSTOWTime = performance.now();
        let elapsedTime = (endSTOWTime - startSTOWTime).toFixed(3);
        apiLogger.logger.info(`Finished STOW-RS, elapsed time: ${elapsedTime} ms`);

        res.writeHead(retCode, {
            "Content-Type": "application/dicom"
        });
        
        return res.end(JSON.stringify(storeMessage));
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        apiLogger.logger.error(errorStr);

        let errorMessage =
            errorResponseMessage.getInternalServerErrorMessage(errorStr);
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        return res.end(JSON.stringify(errorMessage));
    }
};

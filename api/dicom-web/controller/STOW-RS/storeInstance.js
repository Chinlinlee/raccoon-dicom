const { performance } = require("node:perf_hooks");
const errorResponseMessage = require("../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../utils/logs/api-logger");
const { Controller } = require("../../../controller.class");
const { StowRsRequestMultipartParser } = require("./service/request-multipart-parser");
const { StowRsService } = require("./service/stow-rs.service");

class StoreInstanceController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let startSTOWTime = performance.now();
        let retCode;
        let storeMessage;
        let apiLogger = new ApiLogger(this.request, "STOW-RS");
        apiLogger.addTokenValue();
    
        try {
            let requestMultipartParser = new StowRsRequestMultipartParser(this.request);
            let multipartParseResult = await requestMultipartParser.parse();
    
            if (multipartParseResult.status) {
                let stowRsService = new StowRsService(this.request, multipartParseResult.multipart.files);
                let storeInstancesResult = await stowRsService.storeInstances();
    
                retCode = storeInstancesResult.code;
                storeMessage = storeInstancesResult.responseMessage;
            }
            let endSTOWTime = performance.now();
            let elapsedTime = (endSTOWTime - startSTOWTime).toFixed(3);
            apiLogger.logger.info(`Finished STOW-RS, elapsed time: ${elapsedTime} ms`);
    
            this.response.writeHead(retCode, {
                "Content-Type": "application/dicom"
            });
            
            return this.response.end(JSON.stringify(storeMessage));
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            apiLogger.logger.error(errorStr);
    
            let errorMessage =
                errorResponseMessage.getInternalServerErrorMessage(errorStr);
            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(errorMessage));
        }
    }
}


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
    let controller = new StoreInstanceController(req, res);

    await controller.doPipeline();
};

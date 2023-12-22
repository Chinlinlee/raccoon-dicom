const { getInternalServerErrorMessage, getNotFoundErrorMessage } = require("@root/utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("@root/utils/logs/api-logger");


class DicomWebServiceErrorHandler {

    static doErrorResponse(response, e) {
        return response.status(e.code).json({
            status: e.status,
            message: e.message
        });
    }
}

class NotFoundInstanceErrorHandler {
    static doErrorResponse(response, e) {
        response.writeHead(404, {
            "Content-Type": "application/dicom+json"
        });
        return response.end(JSON.stringify(getNotFoundErrorMessage(e.message)));
    }
}

class InstanceGoneErrorHandler {
    static doErrorResponse(response, e) {
        response.writeHead(410, {
            "Content-Type": "application/dicom+json"
        });
        return response.end(JSON.stringify({
            Details: e.message,
            HttpStatus: 410,
            Message: "Image Gone",
            Method: "GET"
        }));
    }
}

class InvalidFrameNumberErrorHandler {
    static doErrorResponse(response, e) {
        response.writeHead(400, {
            "Content-Type": "application/dicom+json"
        });

        return response.end(JSON.stringify({
            Details: e.message,
            HttpStatus: 400,
            Message: "Bad request",
            Method: "GET"
        }));
    }
}

const ApiErrorHandlerMapping = {
    "DicomWebServiceError": DicomWebServiceErrorHandler,
    "NotFoundInstanceError": NotFoundInstanceErrorHandler,
    "InstanceGoneError": InstanceGoneErrorHandler,
    "InvalidFrameNumberError": InvalidFrameNumberErrorHandler
};

class ApiErrorArrayHandler {
    /**
     * @param {import("express").Response} res
     * @param {ApiLogger} apiLogger 
     * @param {Error} e 
     */
    constructor(res, apiLogger, e) {
        this.response = res;
        /** @type {ApiLogger} */
        this.apiLogger = apiLogger;
        /** @type {Error} */
        this.error = e;
    }

    doErrorResponse() {
        if (this.isCustomError(this.error)) {
            this.apiLogger.logger.error(this.error);
            return ApiErrorHandlerMapping[this.error.name].doErrorResponse(this.response, this.error);
        } else {
            ApiErrorArrayHandler.raiseInternalServerError(this.error,  this.response, this.apiLogger);
        }
    }

    /**
     * 
     * @param {import("express").Response} response 
     * @param {ApiLogger} apiLogger 
     * @param {Error} e 
     */
    static raiseInternalServerError(e, response, apiLogger) {
        apiLogger.logger.error(e);

        if (!response.headersSent) {
            response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            return response.json(getInternalServerErrorMessage("An exception occurred"));
        }
        return response.end();
    }

    isCustomError(e) {
        return Object.keys(ApiErrorHandlerMapping).find(key => e.name === key);
    }
}

module.exports.ApiErrorArrayHandler = ApiErrorArrayHandler;
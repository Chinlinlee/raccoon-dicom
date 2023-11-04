class ControllerErrorHandler {

    /**
     * 
     * @param {Error} e 
     * @param {ApiLogger} apiLogger 
     * @param {import("express").Response} response 
     */
    static raiseInternalServerError(e, apiLogger, response) {
        apiLogger.logger.error(e);

        response.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        response.end({
            code: 500,
            message: "An exception occurred"
        });
    }
}

module.exports.ControllerErrorHandler = ControllerErrorHandler;
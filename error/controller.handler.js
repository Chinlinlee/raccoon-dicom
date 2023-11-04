const { getInternalServerErrorMessage } = require("@root/utils/errorResponse/errorResponseMessage");

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

        return response.json(getInternalServerErrorMessage("An exception occurred"));
    }
}

module.exports.ControllerErrorHandler = ControllerErrorHandler;
const DicomWebStatusCodes = {
    "DuplicateSOPinstance": "0111",
    "UPSNotScheduled": "C309"
};

class DicomWebServiceError extends Error {
    constructor(status, message, code=500) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.status = status;
        this.code = code;
    }
}

module.exports.DicomWebStatusCodes = DicomWebStatusCodes;
module.exports.DicomWebServiceError = DicomWebServiceError;
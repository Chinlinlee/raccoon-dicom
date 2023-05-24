const DicomWebStatusCodes = {
    "InvalidAttributeValue": "0106",
    "DuplicateSOPinstance": "0111",
    "MissingAttribute": "0120",
    "UPSMayNoLongerBeUpdated": "C300",
    "UPSTransactionUIDNotCorrect": "C301",
    "UPSAlreadyInProgress": "C302",
    "UPSNotMetFinalStateRequirements": "C304",
    "UPSDoesNotExist": "C307",
    "UPSNotScheduled": "C309",
    "UPSNotYetInProgress": "C310"
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
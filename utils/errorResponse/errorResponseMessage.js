function getInternalServerErrorMessage(details) {
    let message = {
        Details: details,
        HttpStatus: 500,
        Message: "Server Wrong",
        Method: "GET"
    };
    return message;
}

function getNotSupportedErrorMessage(details) {
    let message = {
        Details: details,
        HttpStatus: 406,
        Message: "Media type not supported",
        Method: "GET"
    };
    return message;
}

function getBadRequestErrorMessage(details) {
    let message = {
        Details: details,
        HttpStatus: 400,
        Message: "Bad request",
        Method: "GET"
    };
    return message;
}

function getNotFoundErrorMessage(details) {
    let message = {
        Details: details,
        HttpStatus: 404,
        Message: "Not found",
        Method: "GET"
    };
    return message;
}

module.exports.getInternalServerErrorMessage = getInternalServerErrorMessage;
module.exports.getNotSupportedErrorMessage = getNotSupportedErrorMessage;
module.exports.getBadRequestErrorMessage = getBadRequestErrorMessage;
module.exports.getNotFoundErrorMessage = getNotFoundErrorMessage;

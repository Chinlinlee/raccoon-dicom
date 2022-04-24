function getInternalServerErrorMessage(details) {
    let message = {
        "Details" : details, 
        "HttpStatus" : 500,
        "Message" : "Server Wrong",
        "Method" : "GET",
    }
    return message;
}


module.exports.getInternalServerErrorMessage = getInternalServerErrorMessage;
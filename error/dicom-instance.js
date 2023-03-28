class NotFoundInstanceError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
    }
}

class InvalidFrameNumberError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;   
    }
}

module.exports.NotFoundInstanceError = NotFoundInstanceError;
module.exports.InvalidFrameNumberError = InvalidFrameNumberError;

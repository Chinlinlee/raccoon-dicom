const _ = require("lodash");

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @param {Function} next 
 */
function defaultContentType(req, res, next) {
    let { contentType } = req.query;
    if (!contentType) _.set(req.query, "contentType", req.headers.accept);
    next();
}

module.exports.defaultContentType = defaultContentType;
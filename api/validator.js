const Joi = require("joi");
const lodash = require("lodash");

/**
 * @param {Object} paramSchema the valid scheama
 * @param {string} item body , query , param
 * @param {Object} options Joi option
 * @param {Boolean} options.allowUnknown
 */
const validateParams = function (paramSchema, item, options) {
    return async (req, res, next) => {
        const schema = Joi.object().keys(paramSchema);
        const paramSchemaKeys = Object.keys(req[item]);
        let requestParamObj = {};
        for (let key of paramSchemaKeys) {
            requestParamObj[key] = lodash.get(req[item], key);
        }
        try {
            let value = await schema.validateAsync(requestParamObj, options);
            req[item] = value;
        } catch (err) {
            let message = {
                Details: err.details[0].message,
                HttpStatus: 400,
                Message: "Bad request"
            };
            res.writeHead(400, {
                "Content-Type": "application/json"
            });
            return res.end(JSON.stringify(message));
        }
        next();
    };
};

module.exports = {
    ...module.exports,
    validateParams: validateParams
};

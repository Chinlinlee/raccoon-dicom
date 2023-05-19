const Joi = require("joi");
const lodash = require("lodash");

const intArrayJoi = Joi.extend((joi) => {
    return {
        type: "intArray",
        base: joi.array(),
        coerce: (value, helper) => {
            let item = (value.split ? value.split(',').map(v => parseInt(v)) : parseInt(value));
            return {
                value: item
            };
        }
    };
});

const stringArrayJoi = Joi.extend((joi) => {
    return {
        type: "stringArray",
        base: joi.array(),
        coerce: (value, helper) => {
            if (lodash.isArray(value)) {
                value = value.join(",");
            }

            if (typeof value !== 'string') {
                return {
                    value: value
                };
            }

            return {
                value: value.replace(/^,+|,+$/mg, '').split(',')
            };
        }
    };
});

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

/**
 * 
 * @param {Joi.Schema} joiSchema 
 * @param {string} field 
 * @param {Joi.ValidationOptions} joiOptions 
 */
function validateByJoi(joiSchema, field, joiOptions) {
    return async (req, res, next) => {
        try {
            let value = await joiSchema.validateAsync(req[field], joiOptions);
            req[field] = value;
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
}

module.exports = {
    ...module.exports,
    validateParams: validateParams,
    intArrayJoi: intArrayJoi
};
module.exports.validateByJoi = validateByJoi;
module.exports.stringArrayJoi = stringArrayJoi;

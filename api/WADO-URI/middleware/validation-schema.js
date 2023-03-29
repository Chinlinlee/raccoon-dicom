/**
 * Route
 * Implement https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_9.4
 * WADO-URI
 * @author Chin-Lin Lee <a5566qq2581@gmail.com>
 */

const joi = require("joi");

/**
 * 
 * @param {string} v 
 * @param {joi.CustomHelpers<any>} helper 
 * @returns 
 */
function validateRegionInQuery (v, helper) {

    if (v.split(",") !== 4) {
        return helper.message("invalid region parameter, region=xmin,ymin,xmax,ymin, and every value need between 0 and 1");
    }

    let regionValues = v.split(",");
    
    let isAnyError = regionValues.some(validateRegionIndividualValue);
    if (isAnyError) {
        return helper.message("invalid region parameter, region=xmin,ymin,xmax,ymin, and every value need between 0 and 1");
    }

    let [xMin, yMin, xMax, yMax] = regionValues;

    if (Number(xMin) > Number(xMax)) {
        return helper.message(`invalid region parameter, xMin : ${xMin} > xMax : ${xMax}`);
    }

    if (Number(yMin) > Number(yMax)) {
        return helper.message(`invalid region parameter, xMin : ${yMin} > xMax : ${yMax}`);
    }

    return v;
}

/**
 * 
 * @param {string} value 
 */
function validateRegionIndividualValue(value) {
    return joi.number().min(0).max(1).validate(value).error;
}

const wadoUriValidationSchema = joi.object({
    requestType : joi.string().required().allow("WADO"),
    studyUID : joi.string().required(),
    seriesUID : joi.string().required(),
    objectUID : joi.string().required(),
    contentType : joi.string().valid("image/jpeg", "application/dicom").default("application/dicom"),
    frameNumber : joi.number().integer().min(1).when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    }),
    imageQuality: joi.number().integer().min(1).max(100).when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    }),
    region: joi.string().custom( validateRegionInQuery).when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    }),
    rows: joi.number().min(1).when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    }),
    columns: joi.number().min(1).when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    }),
    windowCenter: joi.number().when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    }).when("windowWidth", {
        is: joi.exist(),
        then: joi.required()
    }),
    windowWidth: joi.number().when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    }).when("windowCenter", {
        is: joi.exist(),
        then: joi.exist()
    }),
    iccprofile: joi.string().default("no").valid("no", "yes", "srgb", "adobergb", "rommrgb").when("contentType", {
        is: joi.equal("application/dicom"),
        then: joi.forbidden()
    })
});


module.exports.wadoUriValidationSchema = wadoUriValidationSchema;
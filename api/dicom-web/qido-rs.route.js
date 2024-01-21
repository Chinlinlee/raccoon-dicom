const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi, stringArrayJoi } = require("../validator");
const router = express();
const {
    dictionary
} = require("../../models/DICOM/dicom-tags-dic");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { BaseQueryController } = require("./controller/QIDO-RS/base.controller");

const KEYWORD_KEYS = Object.keys(dictionary.keyword);
const HEX_KEYS = Object.keys(dictionary.tag);

//#region QIDO-RS
const queryValidation = {
    limit: Joi.number().integer().min(1).max(100),
    offset: Joi.number().integer().min(0),
    includefield: stringArrayJoi.stringArray().items(
        Joi.string().custom(
            (attribute, helper) => {
                if (!isValidAttribute(attribute)) {
                    return helper.message(`Invalid DICOM attribute: ${attribute}, please enter valid keyword or tag`);
                }
                return convertKeywordToHex(attribute);
            }
        )
    ).single(),
    isRecycle: Joi.boolean().default(false)
};

/**
 * 
 * @param {string} attribute 
 */
function isValidAttribute(attribute) {
    if (KEYWORD_KEYS.indexOf(attribute) >= 0 ||
        HEX_KEYS.indexOf(attribute) >= 0 ||
        attribute === "all") {

        return true;
    }

    return false;
}

function convertKeywordToHex(attribute) {
    if (KEYWORD_KEYS.indexOf(attribute) >= 0) {
        return dictionary.keyword[attribute];
    }
    return attribute;
}

const queryController = async (req, res) => {
    let controller = new BaseQueryController(req, res);
    await controller.doPipeline();
};

/**
 *  @openapi
 *  /dicom-web/studies:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/isRecycle"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 */
router.get("/studies", validateParams(queryValidation, "query", {
    allowUnknown: true
}), (req, res, next) => {
    req.dicomLevel = "study";
    req.logger = new ApiLogger(req, "QIDO-RS");
    req.logger.addTokenValue();
    req.logger.logger.info(`Query Studies, Incoming Parameters: ${JSON.stringify(req.query)}`);
    next();
}, queryController);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for series from specific study's UID
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/isRecycle"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 */
router.get(
    "/studies/:studyUID/series", validateParams(queryValidation, "query", {
        allowUnknown: true
    }),
    (req, res, next) => {
        req.dicomLevel = "series";
        req.logger = new ApiLogger(req, "QIDO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info("Query Study's Series, Incoming Parameters: " + JSON.stringify(req.query));
        next();
    },
    queryController
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/instances:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/SOPClassUID"
 *        - $ref: "#/components/parameters/InstanceNumber"
 *        - $ref: "#/components/parameters/isRecycle"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/InstanceRequiredMatchingAttributes"
 */
router.get(
    "/studies/:studyUID/instances", validateParams(queryValidation, "query", {
        allowUnknown: true
    }),
    (req, res, next) => {
        req.dicomLevel = "instance";
        req.logger = new ApiLogger(req, "QIDO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info("Query Study's Instances, Incoming Parameters: " + JSON.stringify(req.query));
        next();
    },
    queryController
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/SOPClassUID"
 *        - $ref: "#/components/parameters/InstanceNumber"
 *        - $ref: "#/components/parameters/isRecycle"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/InstanceRequiredMatchingAttributes"
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances", validateParams(queryValidation, "query", {
        allowUnknown: true
    }),
    (req, res, next) => {
        req.dicomLevel = "instance";
        req.logger = new ApiLogger(req, "QIDO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info("Query Study's Series' Instances, Incoming Parameters: " + JSON.stringify(req.query));
        next();
    },
    queryController
);

/**
 *  @openapi
 *  /dicom-web/series:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query all series in server
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/isRecycle"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 * 
 */
router.get(
    "/series", validateParams(queryValidation, "query", {
        allowUnknown: true
    }),
    (req, res, next) => {
        req.dicomLevel = "series";
        req.logger = new ApiLogger(req, "QIDO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info("Query All Series, Incoming Parameters: " + JSON.stringify(req.query));
        next();
    },
    queryController
);

/**
 *  @openapi
 *  /dicom-web/instances:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query all instances in server
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *        - $ref: "#/components/parameters/SOPClassUID"
 *        - $ref: "#/components/parameters/InstanceNumber"
 *        - $ref: "#/components/parameters/isRecycle"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/StudyRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/SeriesRequiredMatchingAttributes"
 *                  - $ref: "#/components/schemas/InstanceRequiredMatchingAttributes"
 */
router.get(
    "/instances", validateParams(queryValidation, "query", {
        allowUnknown: true
    }),
    (req, res, next) => {
        req.dicomLevel = "instance";
        req.logger = new ApiLogger(req, "QIDO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info("Query All Instances, Incoming Parameters: " + JSON.stringify(req.query));
        next();
    },
    queryController
);

/**
 *  @openapi
 *  /dicom-web/patients:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query all patients in server
 *      parameters:
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/PatientBirthDate"
 *        - $ref: "#/components/parameters/PatientBirthTime"
 *      responses:
 *        200:
 *          description: Query successfully
 *          content:
 *            "application/dicom+json":
 *              schema:
 *                type: array
 *                items:
 *                  allOf:
 *                  - $ref: "#/components/schemas/PatientRequiredMatchingAttributes"
 */
router.get(
    "/patients",
    validateParams({limit: queryValidation.limit, offset: queryValidation.offset}, "query", {
        allowUnknown: true
    }),
    (req, res, next) => {
        req.dicomLevel = "patient";
        req.logger = new ApiLogger(req, "QIDO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info("Query All Patients, Incoming Parameters: " + JSON.stringify(req.query));
        next();
    },
    queryController
);

//#endregion

module.exports = router;
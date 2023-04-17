const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/bulkdata:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve study's bulk data
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedOctet"
 *          
 */
router.get(
    "/studies/:studyUID/bulkdata",
    require("./controller/WADO-RS/bulkdata/study")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/bulkdata:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve series's bulk data
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedOctet"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/bulkdata",
    require("./controller/WADO-RS/bulkdata/series")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}/bulkdata:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve instance's bulk data
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedOctet"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/bulkdata",
    require("./controller/WADO-RS/bulkdata/instance")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}/bulkdata/{binaryValuePath}:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve instance's bulk data of specific tag
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *        - $ref: "#/components/parameters/binaryValuePath"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedOctet"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/bulkdata/:binaryValuePath",
    require("./controller/WADO-RS/bulkdata/bulkdata")
);

module.exports = router;
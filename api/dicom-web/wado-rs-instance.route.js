const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

//#region WADO-RS Retrieve Transaction Instance Resources

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's instances
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedDICOM"
 *          
 */
router.get(
    "/studies/:studyUID",
    require("./controller/WADO-RS/retrieveStudyInstances")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's series' instances
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedDICOM"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID",
    require("./controller/WADO-RS/retrieveStudy-Series-Instances")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's instances
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/MultipartRelatedDICOM"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID",
    require("./controller/WADO-RS/retrieveInstance")
);

//#endregion

module.exports = router;
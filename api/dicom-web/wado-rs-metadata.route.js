const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();


//#region WADO-RS Retrieve Transaction Metadata Resources

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/metadata:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's instances' metadata
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/DicomMetadata"
 *          
 */
router.get(
    "/studies/:studyUID/metadata",
    require("./controller/WADO-RS/metadata/retrieveStudyMetadata")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/metadata:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's series' instances' metadata
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/DicomMetadata"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/metadata",
    require("./controller/WADO-RS/metadata/retrieveSeriesMetadata")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}/metadata:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve instance's metadata
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/DicomMetadata"
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/metadata",
    require("./controller/WADO-RS/metadata/retrieveInstanceMetadata")
);

//#endregion

module.exports = router;
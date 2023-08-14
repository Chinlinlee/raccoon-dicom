const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("@root/api/validator");
const router = express();


//#region WADO-RS Retrieve Transaction Thumbnail Resources

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/thumbnail:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's instances' metadata
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *      responses:
 *        200:
 *          description: The response payload for WADO-RS Thumbnail
 *          content:
 *            "image/jpeg":
 *               schema:
 *                 type: string
 *                 format: binary
 *          
 */
router.get(
    "/studies/:studyUID/thumbnail",
    require("./controller/WADO-RS/thumbnail/study")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/thumbnail:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's series' thumbnail
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *      responses:
 *        200:
 *          description: The response payload for WADO-RS Thumbnail
 *          content:
 *            "image/jpeg":
 *               schema:
 *                 type: string
 *                 format: binary
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/thumbnail",
    require("./controller/WADO-RS/thumbnail/series")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}/thumbnail:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's Series' instances' Thumbnail
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *      responses:
 *        200:
 *          description: The response payload for WADO-RS Thumbnail
 *          content:
 *            "image/jpeg":
 *               schema:
 *                 type: string
 *                 format: binary
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/thumbnail",
    require("./controller/WADO-RS/thumbnail/instance")
);

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}/frames/{frameNumbers}/thumbnail:
 *    get:
 *      tags:
 *        - WADO-RS
 *      description: Retrieve Study's instances' metadata
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/seriesUID"
 *        - $ref: "#/components/parameters/instanceUID"
 *        - $ref: "#/components/parameters/frameNumbers"
 *      responses:
 *        200:
 *          description: The response payload for WADO-RS Thumbnail
 *          content:
 *            "image/jpeg":
 *               schema:
 *                 type: string
 *                 format: binary
 *          
 */
router.get(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID/frames/:frameNumber/thumbnail",
    validateParams({
        frameNumber : intArrayJoi.intArray().items(Joi.number().integer().min(1)).single()
    } , "params" , {allowUnknown : true}), 
    require("./controller/WADO-RS/thumbnail/frame")
);



//#endregion

module.exports = router;
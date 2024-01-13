const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

const { BaseThumbnailController } = require("./controller/WADO-RS/thumbnail/retrieveThumbnail.controller");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyThumbnailFactory, SeriesThumbnailFactory, InstanceThumbnailFactory } = require("./controller/WADO-RS/service/thumbnail.service");

const RetrieveThumbnailController = async function (req, res) {
    let controller = new BaseThumbnailController(req, res);
    await controller.doPipeline();
};

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
    (req, res, next) => {
        req.factory = StudyThumbnailFactory;
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get Study's Thumbnail [study UID: ${req.params.studyUID}]`);
        next();
    },
    RetrieveThumbnailController
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
    (req, res, next) => {
        req.factory = SeriesThumbnailFactory;
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get Study's Series' Thumbnail [study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}]`);
        next();
    },
    RetrieveThumbnailController
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
    (req, res, next) => {
        req.factory = InstanceThumbnailFactory;
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get Study's Series' Instance's Thumbnail [study UID: ${req.params.studyUID},`+
        ` series UID: ${req.params.seriesUID}, instance UID: ${req.params.instanceUID}]`);
        next();
    },
    RetrieveThumbnailController
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
    (req, res, next) => {
        req.factory = InstanceThumbnailFactory;
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get Study's Instance's Frame's Thumbnail [study UID: ${req.params.studyUID},`+
        ` series UID: ${req.params.seriesUID}, instance UID: ${req.params.instanceUID}, frame number: ${req.params.frameNumber}]`);
        next();
    },
    RetrieveThumbnailController
);



//#endregion

module.exports = router;
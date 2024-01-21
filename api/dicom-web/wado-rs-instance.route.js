const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();


const {
    BaseRetrieveController,
    StudyZipResponseHandler,
    StudyMultipartRelatedResponseHandler,
    SeriesZipResponseHandler,
    SeriesMultipartRelatedResponseHandler,
    InstanceZipResponseHandler,
    InstanceMultipartRelatedResponseHandler
} = require("./controller/WADO-RS/retrieveInstances.controller");
const { ApiLogger } = require("@root/utils/logs/api-logger");

let retrieveController = async (req, res) => {
    let controller = new BaseRetrieveController(req, res);
    await controller.doPipeline();
};

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
    (req, res, next) => {
        req.zipResponseHandlerType = StudyZipResponseHandler;
        req.multipartResponseHandlerType = StudyMultipartRelatedResponseHandler;
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`[Get study's instances, study UID: ${req.params.studyUID}] [Request Accept: ${req.headers?.accept}]`);
        next();
    },
    retrieveController
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
    (req, res, next) => {
        req.zipResponseHandlerType = SeriesZipResponseHandler;
        req.multipartResponseHandlerType = SeriesMultipartRelatedResponseHandler;
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`[Get study's series' instances, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}] [Request Accept: ${req.headers?.accept}]`);
        next();
    },
    retrieveController
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
    (req, res, next) => {
        req.zipResponseHandlerType = InstanceZipResponseHandler;
        req.multipartResponseHandlerType = InstanceMultipartRelatedResponseHandler;
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`[Get study's series' instance,`+ 
                               `study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}, instance UID: ${req.params.instanceUID}]`
                               + ` [Request Accept: ${req.headers?.accept}]`);
        
        next();
    },
    retrieveController
);

//#endregion

module.exports = router;
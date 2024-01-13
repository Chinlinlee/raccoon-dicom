const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

const { BaseRetrieveMetadataController } = require("./controller/WADO-RS/metadata/retrieveMetadata.controller");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyImagePathFactory, SeriesImagePathFactory, InstanceImagePathFactory } = require("./controller/WADO-RS/service/WADO-RS.service");
const RetrieveMetadataController = async (req, res) => {
    let controller = new BaseRetrieveMetadataController(req, res);
    await controller.doPipeline();
};

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
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info();
        req.logger.logger.info(`Get study's metadata, study UID: ${req.params.studyUID}`);
        req.imagePathFactory = StudyImagePathFactory;
        next();
    },
    RetrieveMetadataController
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
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info();
        req.logger.logger.info(`Get study's series's metadata, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}`);
        req.imagePathFactory = SeriesImagePathFactory;
        next();
    },
    RetrieveMetadataController
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
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get instance's metadata, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID},`+
        ` instance UID: ${req.params.instanceUID}`);
        req.imagePathFactory = InstanceImagePathFactory;
        next();
    },
    RetrieveMetadataController
);

//#endregion

module.exports = router;
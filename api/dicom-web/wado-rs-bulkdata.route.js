const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

const { BaseBulkDataController } = require("./controller/WADO-RS/bulkdata/retrieveBulkData.controller");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { StudyBulkDataFactory, SeriesBulkDataFactory, InstanceBulkDataFactory, SpecificBulkDataFactory } = require("./controller/WADO-RS/bulkdata/service/bulkdata");
const { StudyImagePathFactory, SeriesImagePathFactory, InstanceImagePathFactory } = require("./controller/WADO-RS/service/WADO-RS.service");

const BulkDataController = async (req, res) => {
    let bulkDataController = new BaseBulkDataController(req, res);
    await bulkDataController.doPipeline();
};

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
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get bulk data from study: ${req.params.studyUID}`);
        req.bulkDataFactoryType = StudyBulkDataFactory;
        req.imagePathFactoryType = StudyImagePathFactory;
        next();
    },
    BulkDataController
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
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get series' bulk data from study: ${req.params.studyUID}, series: ${req.params.seriesUID}`);
        req.bulkDataFactoryType = SeriesBulkDataFactory;
        req.imagePathFactoryType = SeriesImagePathFactory;
        next();
    },
    BulkDataController
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
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get instance's bulk data from study: ${req.params.studyUID}, series: ${req.params.seriesUID}, instance: ${req.params.instanceUID}`);
        req.bulkDataFactoryType = InstanceBulkDataFactory;
        req.imagePathFactoryType = InstanceImagePathFactory;
        next();
    },
    BulkDataController
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
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`Get bulk data from study: ${req.params.studyUID}, series: ${req.params.seriesUID}, instance: ${req.params.instanceUID}`+
        `, binaryValuePath: ${req.params.binaryValuePath}`);
        req.bulkDataFactoryType = SpecificBulkDataFactory;
        req.imagePathFactoryType = StudyImagePathFactory;
        next();
    },
    BulkDataController
);

module.exports = router;
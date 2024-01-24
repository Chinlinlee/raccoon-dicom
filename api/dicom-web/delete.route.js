const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();

const { BaseDeleteController } = require("./controller/WADO-RS/deletion/delete.controller");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const DeleteController = async (req, res) => {
    let deleteController = new BaseDeleteController(req, res);
    await deleteController.doPipeline();
};

//#region Delete

router.delete(
    "/studies/:studyUID",
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`delete study: ${req.params.studyUID}`);
        req.dicomLevel = "study";
        next();
    },
    DeleteController
);

router.delete(
    "/studies/:studyUID/series/:seriesUID",
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`delete series, study: ${req.params.studyUID}, series: ${req.params.seriesUID}`);
        req.dicomLevel = "series";
        next();
    },
    DeleteController
);

router.delete(
    "/studies/:studyUID/series/:seriesUID/instances/:instanceUID",
    (req, res, next) => {
        req.logger = new ApiLogger(req, "WADO-RS");
        req.logger.addTokenValue();
        req.logger.logger.info(`delete instance, study: ${req.params.studyUID}, series: ${req.params.seriesUID}, instance: ${req.params.instanceUID}`);
        req.dicomLevel = "instance";
        next();
    },
    DeleteController
);

//#endregion

module.exports = router;

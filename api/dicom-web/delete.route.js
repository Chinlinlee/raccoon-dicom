const express = require("express");
const Joi = require("joi");
const { validateParams, intArrayJoi } = require("../validator");
const router = express();


//#region Delete

router.delete("/studies/:studyUID", require("./controller/WADO-RS/deletion/study"));

router.delete("/studies/:studyUID/series/:seriesUID", require("./controller/WADO-RS/deletion/series"));

router.delete("/studies/:studyUID/series/:seriesUID/instances/:instanceUID", require("./controller/WADO-RS/deletion/instance"));

//#endregion

module.exports = router;

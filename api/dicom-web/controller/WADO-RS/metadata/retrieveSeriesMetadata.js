const mongoose = require("mongoose");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const fileExist = require("../../../../../utils/file/fileExist");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { Controller } = require("../../../../controller.class");
const { ApiLogger } = require("../../../../../utils/logs/api-logger");
const { BaseRetrieveMetadataController } = require("./base.controller");
const { SeriesImagePathFactory } = require("../service/WADO-RS.service");

class RetrieveSeriesMetadataController extends BaseRetrieveMetadataController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = SeriesImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`[WADO-RS] [Get Study's Series' Instances Metadata] [series UID: ${this.request.params.seriesUID}, study UID: ${this.request.params.studyUID}]`);
    }
}
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveSeriesMetadataController(req, res);

    await controller.doPipeline();
};
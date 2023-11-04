const { StudyImagePathFactory } = require("../service/WADO-RS.service");
const { BaseRetrieveMetadataController } = require("./base.controller");

class RetrieveStudyMetadataController extends BaseRetrieveMetadataController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = StudyImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`Get Study's Instances Metadata [study UID: ${this.request.params.studyUID}]`);
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveStudyMetadataController(req, res);

    await controller.doPipeline();
};
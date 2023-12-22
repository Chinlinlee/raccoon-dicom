const { StudyImagePathFactory } = require("@wado-rs-service");
const { StudyFramesWriter } = require("@rendered-service");
const { BaseRetrieveRenderedController } = require("./base.controller");

class RetrieveRenderedStudyController extends BaseRetrieveRenderedController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = StudyImagePathFactory;
        this.framesWriter = StudyFramesWriter;
    }

    logAction() {
        this.apiLogger.logger.info(`Get study's rendered instances, study UID: ${this.request.params.studyUID}`);
    }

    logSuccessful() {
        this.apiLogger.logger.info(`Write Multipart Successfully, study's rendered instances, study UID: ${this.request.params.studyUID}`);
    }
}
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveRenderedStudyController(req, res);

    await controller.doPipeline();
};

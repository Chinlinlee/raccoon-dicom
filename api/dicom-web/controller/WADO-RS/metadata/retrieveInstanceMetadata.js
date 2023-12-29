const { BaseRetrieveMetadataController } = require("./base.controller");
const { InstanceImagePathFactory } = require("@api/dicom-web/controller/WADO-RS/service/WADO-RS.service");

class RetrieveInstanceMetadataController extends BaseRetrieveMetadataController {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactory = InstanceImagePathFactory;
    }

    logAction() {
        this.apiLogger.logger.info(`[WADO-RS] [Get Study's Series' Instance Metadata] [instance UID: ${this.request.params.instanceUID}, series UID: ${this.request.params.seriesUID}, study UID: ${this.request.params.studyUID}]`);
    }
}
/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    let controller = new RetrieveInstanceMetadataController(req, res);

    await controller.doPipeline();
};
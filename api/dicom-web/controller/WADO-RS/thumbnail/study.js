const {
    StudyThumbnailFactory
} = require("../service/thumbnail.service");
const {
    BaseThumbnailController
} = require("./base.controller");


class RetrieveStudyThumbnailController extends BaseThumbnailController {
    constructor(req, res) {
        super(req, res);
        this.factory = StudyThumbnailFactory;
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function (req, res) {
    let controller = new RetrieveStudyThumbnailController(req, res);

    await controller.doPipeline();
};
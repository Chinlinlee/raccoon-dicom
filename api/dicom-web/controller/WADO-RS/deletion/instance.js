const { BaseDeleteController } = require("./base.controller");

class DeleteInstanceController extends BaseDeleteController {
    constructor(req, res) {
        super(req, res);
        this.level = "instance";
    }

    getDeleteSuccessfulMessage() {
        `Delete Study permanently, StudyInstanceUID: ${this.request.params.studyUID}, SeriesInstanceUID: ${this.request.params.seriesUID}, SOPInstanceUID: ${this.request.params.instanceUID}`;
    }
}


/**
 * 
 * @param {import("express").Request}
 * @param {import("express").Response}
 * @returns 
 */
module.exports = async function(req, res) {
    let deleteStudyController = new DeleteInstanceController(req, res);

    await deleteStudyController.doPipeline();
};
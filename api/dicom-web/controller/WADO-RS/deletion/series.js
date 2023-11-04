const { BaseDeleteController } = require("./base.controller");

class DeleteSeriesController extends BaseDeleteController {
    constructor(req, res) {
        super(req, res);
        this.level = "series";
    }

    getDeleteSuccessfulMessage() {
        return `Delete Series permanently, StudyInstanceUID: ${this.request.params.studyUID}, SeriesInstanceUID: ${this.request.params.seriesUID}`;
    }
}


/**
 * 
 * @param {import("express").Request}
 * @param {import("express").Response}
 * @returns 
 */
module.exports = async function(req, res) {
    let deleteStudyController = new DeleteSeriesController(req, res);

    await deleteStudyController.doPipeline();
};
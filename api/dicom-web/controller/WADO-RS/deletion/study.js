const { BaseDeleteController } = require("./base.controller");

class DeleteStudyController extends BaseDeleteController {
    constructor(req, res) {
        super(req, res);
        this.level = "study";
    }
}


/**
 * 
 * @param {import("express").Request}
 * @param {import("express").Response}
 * @returns 
 */
module.exports = async function(req, res) {
    let deleteStudyController = new DeleteStudyController(req, res);

    await deleteStudyController.doPipeline();
};
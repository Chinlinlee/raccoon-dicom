const mongoose = require("mongoose");
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { DeleteService } = require("./service/delete");
const { getInternalServerErrorMessage, getNotFoundErrorMessage } = require("@root/utils/errorResponse/errorResponseMessage");
const { NotFoundInstanceError } = require("@error/dicom-instance");

class DeleteInstanceController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "WADO-RS");
        apiLogger.addTokenValue();

        let deleteService = new DeleteService(this.request, this.response, "instance");

        try {
            await deleteService.delete();

            return this.response.status(200).json({
                Details: `Delete Study permanently, StudyInstanceUID: ${this.request.params.studyUID}, SeriesInstanceUID: ${this.request.params.seriesUID}, SOPInstanceUID: ${this.request.params.instanceUID}`,
                HttpStatus: 200,
                Message: "Delete Successful",
                Method: "DELETE"
            });
        } catch(e) {

            if (e instanceof NotFoundInstanceError) {
                return this.response.status(404).json(
                    getNotFoundErrorMessage(e.message)
                );
            }

            return this.response.status(500).json(
                getInternalServerErrorMessage("An exception occur")
            );
        }
        
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
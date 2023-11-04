const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { DeleteService } = require("./service/delete");
const { NotFoundInstanceError } = require("@error/dicom-instance");
const { getNotFoundErrorMessage, getInternalServerErrorMessage } = require("@root/utils/errorResponse/errorResponseMessage");
const { ControllerErrorHandler } = require("@error/controller.handler");

class BaseDeleteController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();
        this.level = "study";
    }

    async mainProcess() {
        let deleteService = new DeleteService(this.request, this.response, this.level);

        try {
            await deleteService.delete();

            return this.response.status(200).json({
                Details: this.getDeleteSuccessfulMessage(),
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

            return ControllerErrorHandler.raiseInternalServerError(e, this.apiLogger, this.response);
        }
    }

    getDeleteSuccessfulMessage() {
        return  `Delete Study permanently, StudyInstanceUID: ${this.request.params.studyUID}`;
    }

}

module.exports.BaseDeleteController = BaseDeleteController;
const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { DeletePatientService } = require("./service/delete-patient.service");

class DeletePatientController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "PAM-RS");
        this.apiLogger.addTokenValue();
    }
    async mainProcess() {
        this.apiLogger.logger.info(`Delete Patient: ${this.request.params.patientID}`);

        let deletePatientService = new DeletePatientService(this.request, this.response);
        try {
            await deletePatientService.delete();
            return this.response
                       .set("content-type", "application/dicom+json")
                       .status(200)
                       .send();
        } catch(e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports = async function (req, res) {
    let controller = new DeletePatientController(req, res);

    await controller.doPipeline();
};
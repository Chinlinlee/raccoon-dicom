const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { CreatePatientService } = require("./service/create-patient.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { UpdatePatientService } = require("./service/update-patient.service");

class UpdatePatientController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "PAM-RS");
        this.apiLogger.addTokenValue();
    }
    async mainProcess() {
        this.apiLogger.logger.info(`Update Patient: ${this.request.params.patientID}`);

        let updatePatientService = new UpdatePatientService(this.request, this.response);
        try {
            let updatedPatient = await updatePatientService.update();
            return this.response
                       .set("content-type", "application/dicom+json")
                       .status(200)
                       .json(updatedPatient.toDicomJson());
        } catch(e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports = async function (req, res) {
    let controller = new UpdatePatientController(req, res);

    await controller.doPipeline();
};
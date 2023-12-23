const { Controller } = require("@root/api/controller.class");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { CreatePatientService } = require("./service/create-patient.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class CreatePatientController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "PAM-RS");
        this.apiLogger.addTokenValue();
    }
    async mainProcess() {
        this.apiLogger.logger.info("Create Patient");

        let createPatientService = new CreatePatientService(this.request, this.response);
        try {
            let createPatientID = await createPatientService.create();
            return this.response
                       .set("content-type", "application/dicom+json")
                       .status(201)
                       .json(createPatientID);
        } catch(e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

module.exports = async function (req, res) {
    let controller = new CreatePatientController(req, res);

    await controller.doPipeline();
};
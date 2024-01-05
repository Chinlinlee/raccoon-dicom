const { ApiErrorArrayHandler } = require("@error/api-errors.handler");
const { Controller } = require("@root/api/controller.class");
const { FhirConvertService } = require("./service/fhir-convert.service");
const { ApiLogger } = require("@root/utils/logs/api-logger");


class FhirConvertController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(req, "fhir-convert");
        this.apiLogger.addTokenValue();
    }

    async mainProcess() {
        let fhirConvertService = new FhirConvertService(this.request, this.response);
        try {
            let fhirJson = await fhirConvertService.convert();
            return this.response
                .set("content-type", "application/json")
                .status(200)
                .json(fhirJson);
        } catch (e) {
            let apiErrorArrayHandler = new ApiErrorArrayHandler(this.response, this.apiLogger, e);
            return apiErrorArrayHandler.doErrorResponse();
        }
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new FhirConvertController(req, res);

    await controller.doPipeline();
};

const {
    SqlQidoRsService: QidoRsService
} = require("./service/QIDO-RS.service");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { Controller } = require("@root/api/controller.class");

class QueryAllPatientsController extends Controller {
    constructor(req, res) {
        super(req, res);
    }

    async mainProcess() {
        let apiLogger = new ApiLogger(this.request, "QIDO-RS");

        apiLogger.addTokenValue();
        apiLogger.logger.info("Query all patients");
        
        try {
            let qidoRsService = new QidoRsService(this.request, this.response, "patient");
    
            await qidoRsService.getAndResponseDicomJson();
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            apiLogger.logger.error(errorStr);

            this.response.writeHead(500, {
                "Content-Type": "application/dicom+json"
            });
            this.response.end(JSON.stringify({
                code: 500,
                message: "Server error occurred"
            }));
        }
    }
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
module.exports = async function (req, res) {
    let controller = new QueryAllPatientsController(req, res);

    await controller.doPipeline();
};

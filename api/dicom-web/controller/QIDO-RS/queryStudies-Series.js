const {
    QidoRsService
} = require("./service/QIDO-RS.service");
const { ApiLogger } = require("../../../../utils/logs/api-logger");

/**
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async function (req, res) {
    let apiLogger = new ApiLogger(req, "QIDO-RS");

    apiLogger.info(`[Query series Level, Study UID: ${req.params.studyUID}]`);
    
    try {

        let qidoRsService = new QidoRsService(req, res, "series");

        await qidoRsService.getAndResponseDicomJson();

    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        apiLogger.error(errorStr);
    }
};

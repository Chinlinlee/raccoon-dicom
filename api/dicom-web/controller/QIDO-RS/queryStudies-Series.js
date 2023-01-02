const _ = require("lodash");
const {
    convertAllQueryToDICOMTag,
    getSeriesDicomJson
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
        let limit = parseInt(req.query.limit) || 100;
        let skip = parseInt(req.query.offset) || 0;
        delete req.query["limit"];
        delete req.query["offset"];
        let query = _.cloneDeep(req.query);
        let queryKeys = Object.keys(query).sort();
        for (let i = 0; i < queryKeys.length; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }

        let dicomTagQuery = convertAllQueryToDICOMTag(query);
        let seriesJson = await getSeriesDicomJson(
            dicomTagQuery,
            limit,
            skip,
            req
        );
        let seriesJsonLength = _.get(seriesJson, "length", 0);
        if (seriesJsonLength > 0) {
            res.writeHead(200, {
                "Content-Type": "application/dicom+json"
            });
            res.end(JSON.stringify(seriesJson));
        } else {
            res.writeHead(204);
            res.end();
        }
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        apiLogger.error(errorStr);
    }
};

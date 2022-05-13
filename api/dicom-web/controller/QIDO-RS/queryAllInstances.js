const _ = require("lodash");
const {
    convertAllQueryToDICOMTag,
    getInstanceDicomJson
} = require("./service/QIDO-RS.service");
const { logger } = require("../../../../utils/log");

/**
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async function (req, res) {
    logger.info(
        `[QIDO-RS] [Query all instances]`
    );
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
        let instancesJson = await getInstanceDicomJson(
            dicomTagQuery,
            limit,
            skip,
            req
        );
        let instancesJsonLength = _.get(instancesJson, "data.length", 0);
        if (instancesJsonLength > 0) {
            res.writeHead(200, {
                "Content-Type": "application/dicom+json"
            });
            res.end(JSON.stringify(instancesJson.data));
        } else {
            res.writeHead(204);
            res.end();
        }
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[QIDO-RS] [Error: ${errorStr}]`);
    }
};

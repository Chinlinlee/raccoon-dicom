const _ = require("lodash");
const mongoose = require("mongoose");
const moment = require("moment");
const {
    convertAllQueryToDICOMTag,
    getSeriesDicomJson
} = require("./service/QIDO-RS.service");
const { logger } = require("../../../../utils/log");

/**
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async function (req, res) {
    logger.info(
        `[QIDO-RS] [Query all series]`
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
        let seriesJson = await getSeriesDicomJson(
            dicomTagQuery,
            limit,
            skip,
            req
        );
        let seriesJsonLength = _.get(seriesJson, "data.length", 0);
        if (seriesJsonLength > 0) {
            res.writeHead(200, {
                "Content-Type": "application/dicom+json"
            });
            res.end(JSON.stringify(seriesJson.data));
        } else {
            res.writeHead(204);
            res.end();
        }
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[QIDO-RS] [Error: ${errorStr}]`);
    }
};

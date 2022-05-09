const _ = require("lodash");
const {
    convertAllQueryToDICOMTag,
    getSeriesDicomJson
} = require("./service/QIDO-RS.service");
const { logger } = require("../../../../utils/log");

/**
 *  @openapi
 *  /dicom-web/studies/{studyUID}/series:
 *    get:
 *      tags:
 *        - QIDO-RS
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/studyUID"
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
 *        - $ref: "#/components/parameters/Modality"
 *        - $ref: "#/components/parameters/SeriesNumber"
 *      responses:
 *        200:
 *          description: Query successfully
 */

/**
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async function (req, res) {
    logger.info(
        `[QIDO-RS] [Query series Level, Study UID: ${req.params.studyUID}]`
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
        let studiesJson = await getSeriesDicomJson(
            dicomTagQuery,
            limit,
            skip,
            req
        );
        res.writeHead(200, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify(studiesJson.data));
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[QIDO-RS] [Error: ${errorStr}]`);
    }
};

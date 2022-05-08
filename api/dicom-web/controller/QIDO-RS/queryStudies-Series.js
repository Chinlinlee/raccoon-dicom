const _ = require('lodash');
const mongoose = require('mongoose');
const moment = require('moment');
const {
    convertAllQueryToDICOMTag,
    convertRequestQueryToMongoQuery,
    getStudyLevelFields,
    getSeriesLevelFields,
    sortObjByFieldKey
} = require('./service/QIDO-RS.service');
const {
    logger
} = require('../../../../utils/log');

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
    try {
        let limit = req.query.limit || 100;
        let skip = req.query.offset || 0;
        delete req.query["limit"];
        delete req.query["offset"];
        let query = _.cloneDeep(req.query);
        let queryKeys = Object.keys(query).sort();
        for (let i = 0; i < queryKeys.length; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }

        let dicomTagQuery = convertAllQueryToDICOMTag(query);
        let studiesJson = await getSeriesDicomJson(dicomTagQuery, limit, skip, req);
        res.writeHead(200, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify(studiesJson.data));
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[QIDO-RS] [Error: ${errorStr}]`);
    }
};

async function getSeriesDicomJson(iQuery, limit, skip, req) {
    logger.info(`[QIDO-RS] [Query series Level, Study UID: ${req.params.studyUID}]`);
    let result = {
        data: '',
        status: false
    };
    let protocol = req.secure ? "https" : "http";
    let retrieveUrl = `${protocol}://${req.headers.host}/${process.env.DICOMWEB_API}/studies`;
    try {
        iQuery = await convertRequestQueryToMongoQuery(iQuery);
        let query = {
            ...req.params,
            ...iQuery.$match
        };
        logger.info(`[QIDO-RS] [Query for MongoDB: ${JSON.stringify(query)}]`);
        let studyFields = getStudyLevelFields();
        let seriesFields = getSeriesLevelFields();
        let docs = await mongoose.model("dicomSeries")
            .find(query, {
                ...studyFields,
                ...seriesFields
            })
            .limit(limit)
            .skip(skip)
            .exec();
        result.data = docs.map(v => {
            let obj = v.toObject();
            delete obj._id;
            delete obj.id;
            obj["00081190"] = {
                vr: "UR",
                Value: [
                    `${retrieveUrl}/${obj["0020000D"]["Value"][0]}/series/${obj["0020000E"]["Value"][0]}`
                ]
            };
            return sortObjByFieldKey(obj);
        });
        result.status = true;
        return result;
    } catch (e) {
        console.error("get Series DICOM error", e);
        result.data = e;
        result.status = false;
        return result;
    }
}
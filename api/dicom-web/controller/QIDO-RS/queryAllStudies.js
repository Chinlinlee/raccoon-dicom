const _ = require('lodash');
const mongoose = require('mongoose');
const moment = require('moment');
const { 
    convertAllQueryToDICOMTag,
    convertRequestQueryToMongoQuery,
    getStudyLevelFields
} = require('./service/QIDO-RS.service');
const {
    logger
} = require('../../../../utils/log');

/**
 *  @openapi
 *  /dicom-web/studies:
 *    get:
 *      description: Query for studies
 *      parameters:
 *        - $ref: "#/components/parameters/StudyDate"
 *        - $ref: "#/components/parameters/StudyTime"
 *        - $ref: "#/components/parameters/AccessionNumber"
 *        - $ref: "#/components/parameters/ModalitiesInStudy"
 *        - $ref: "#/components/parameters/ReferringPhysicianName"
 *        - $ref: "#/components/parameters/PatientName"
 *        - $ref: "#/components/parameters/PatientID"
 *        - $ref: "#/components/parameters/StudyID"
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
        let limit = req.query.limit || 100 ;
        let skip = req.query.offset || 0;
        delete req.query["limit"];
        delete req.query["offset"];
        let query = _.cloneDeep(req.query);
        let queryKeys = Object.keys(query).sort();
        for ( let i = 0 ; i < queryKeys.length ; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }
    
        let dicomTagQuery = convertAllQueryToDICOMTag(query);
        let studiesJson = await getStudyDicomJson(dicomTagQuery, limit, skip);
        res.writeHead(200, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify(studiesJson.data));
    } catch(e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[QIDO-RS] [Error: ${errorStr}]`);
    }
}

async function getStudyDicomJson(iQuery , limit , skip) {
    logger.info(`[QIDO-RS] [Query Study Level]`);
    let result = {
        data : '' ,
        status: false
    }
    try {
        iQuery = await convertRequestQueryToMongoQuery(iQuery);
        // iQuery = iQuery.$match;
        logger.info(`[QIDO-RS] [Query for MongoDB: ${JSON.stringify(iQuery)}]`);
        let studyFields = getStudyLevelFields();
        let aggregateQuery = [
            {
                $sort: {
                    studyUID: 1
                }
            },
            iQuery,
            {
                $limit: limit + skip
            },
            {
                $skip: skip
            },
            {
                $group: {
                    _id: "$0020000D",
                    modalitiesInStudy: {
                        $addToSet: "$00080060.Value"
                    },
                    dicomJson: {
                        $addToSet: "$$ROOT"
                    }
                }
            },
            {
                $project: {
                    ...studyFields,
                    "dicomJson.00080061": {
                        "vr": "CS",
                        "Value": {
                            $reduce: {
                                input: "$modalitiesInStudy",
                                initialValue: [],
                                in: { 
                                    $concatArrays : ["$$value", "$$this"] 
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    dicomJsonObj: {
                        $mergeObjects: "$$ROOT.dicomJson"
                    }
                }
            },
            {
                $replaceWith: "$dicomJsonObj"
            },
            {
                $sort: {
                    "0020000D": 1
                }
            }
        ];
        let docs = await mongoose.model("dicom").aggregate(aggregateQuery).exec();
        result.data = docs.map(v => {
            let studyDate = _.get(v , "00080020.Value");
            if (studyDate) {
                for (let j in studyDate) {
                    let studyDateYYYYMMDD = moment(studyDate[j]).format("YYYYMMDD").toString();
                    studyDate[j] = studyDateYYYYMMDD;
                }
                _.set(v , "00080020.Value" , studyDate);
            }
            return v;
        });
        result.status = true;
        return result;
    } catch (e) {
        console.error("get Study DICOM error" , e);
        result.data = e;
        result.status = false;
        return result;
    }
}
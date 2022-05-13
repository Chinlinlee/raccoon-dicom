const mongoose = require("mongoose");
const _ = require("lodash");
const { mongoDateQuery } = require("../../../../../models/mongodb/service");
const { dictionary } = require("../../../../../models/DICOM/dicom-tags-dic");
const {
    tagsOfRequiredMatching
} = require("../../../../../models/DICOM/dicom-tags-mapping");
const { logger } = require("../../../../../utils/log");

/**
 * Convert All of name(tags, keyword) of queries to tags number
 * @param {Object} iParam The request query.
 * @returns
 */
function convertAllQueryToDICOMTag(iParam) {
    let keys = Object.keys(iParam);
    let newQS = {};
    for (let i = 0; i < keys.length; i++) {
        let keyName = keys[i];
        let keyNameSplit = keyName.split(".");
        let newKeyNames = [];
        for (let x = 0; x < keyNameSplit.length; x++) {
            if (dictionary.keyword[keyNameSplit[x]]) {
                newKeyNames.push(dictionary.dicom[keyNameSplit[x]]);
            } else if (dictionary.tag[keyNameSplit[x]]) {
                newKeyNames.push(keyNameSplit);
            } else {
                //newKeyNames.push(keyNameSplit);
            }
        }
        // if (newKeyNames.length == 1) {
        //     continue;
        // }
        // let studyTags = Object.keys(QIDORetAtt.study);
        // let seriesTags = Object.keys(QIDORetAtt.series);
        // let instanceTags = Object.keys(QIDORetAtt.instance);
        // for (let seriesTag of seriesTags) {
        //     if (newKeyNames.find(v => v == seriesTag) && !studyTags.includes(seriesTag)) {
        //         newKeyNames = [ "series", ...newKeyNames]
        //     }
        // }
        // for (let instanceTag of instanceTags) {
        //     if (newKeyNames.find(v => v == instanceTag) && !studyTags.includes(instanceTag) && !seriesTags.includes(instanceTag)) {
        //         newKeyNames = [ "series", "instance", ...newKeyNames]
        //     }
        // }
        newKeyNames.push("Value");
        let retKeyName = newKeyNames.join(".");
        newQS[retKeyName] = iParam[keyName];
    }
    return newQS;
}
//#endregion

function checkIsOr(value, keyName) {
    if (_.isObject(value) && _.get(value[keyName], "$or")) {
        return true;
    }
    return false;
}

/**
 * convert value that contains comma to $or query of MongoDB
 * @param {string} iKey
 * @param {string} iValue
 */
function commaValue(iKey, iValue) {
    let $or = [];
    iValue = iValue.split(",");
    for (let i = 0; i < iValue.length; i++) {
        let obj = {};
        obj[iKey] = iValue[i];
        $or.push(obj);
    }
    return $or;
}

async function wildCardFirst(iValue) {
    return new Promise((resolve) => {
        iValue = iValue.replace(/\*/gi, ".*");
        return resolve(new RegExp(iValue, "gi"));
    });
}
async function wildCard(iValue) {
    return new Promise((resolve) => {
        iValue = "^" + iValue;
        iValue = iValue.replace(/\*/gi, ".*");
        return resolve(new RegExp(iValue, "gi"));
    });
}

/**
 * convert all request query object to to $or query and push to $and query
 * @param {Object} iQuery
 * @returns
 */
async function convertRequestQueryToMongoQuery(iQuery) {
    let queryKey = Object.keys(iQuery);
    let mongoQs = {
        $match: {
            $and: []
        }
    };
    for (let i = 0; i < queryKey.length; i++) {
        let mongoOrs = {
            $or: []
        };
        let nowKey = queryKey[i];
        let value = commaValue(nowKey, iQuery[nowKey]);
        for (let x = 0; x < value.length; x++) {
            let nowValue = value[x][nowKey];
            let wildCardFunc = {};
            wildCardFunc[nowValue.indexOf("*")] = wildCard;
            wildCardFunc["0"] = wildCardFirst;
            wildCardFunc["-1"] = (value) => {
                return value;
            };
            value[x][nowKey] = await wildCardFunc[nowValue.indexOf("*")](
                nowValue
            );

            try {
                let keySplit = nowKey.split(".");
                let tag = keySplit[keySplit.length - 2];
                let vrOfTag = dictionary.tagVR[tag];
                await vrQueryLookup[vrOfTag.vr](value[x], nowKey);
            } catch (e) {
                if (!(e instanceof TypeError)) console.error(e);
            }

            if (checkIsOr(value[x], nowKey)) {
                mongoOrs.$or.push(..._.get(value[x][nowKey], "$or"));
            } else {
                mongoOrs.$or.push(value[x]);
            }
        }
        mongoQs.$match.$and.push(mongoOrs);
    }
    return mongoQs.$match.$and.length == 0
        ? {
              $match: {}
          }
        : mongoQs;
}

function getStudyLevelFields() {
    let fields = {};
    for (let tag in tagsOfRequiredMatching.Study) {
        fields[tag] = 1;
    }
    return fields;
}

function getSeriesLevelFields() {
    let fields = {};
    for (let tag in tagsOfRequiredMatching.Series) {
        fields[tag] = 1;
    }
    return fields;
}

function getInstanceLevelFields() {
    let fields = {};
    for (let tag in tagsOfRequiredMatching.Instance) {
        fields[tag] = 1;
    }
    return fields;
}

function sortObjByFieldKey(obj) {
    return _(obj).toPairs().sortBy(0).fromPairs().value();
}

const vrQueryLookup = {
    DA: async (value, tag) => {
        let q = await mongoDateQuery(value, tag, false);
    },
    PN: async (value, tag) => {
        let queryValue = _.cloneDeep(value[tag]);
        value[tag] = {
            $or : [
            {
                [`${tag}.Alphabetic`] : queryValue
            }, 
            {
                [`${tag}.familyName`] : queryValue
            },
            {
                [`${tag}.givenName`] : queryValue
            } ,
            {
                [`${tag}.middleName`] : queryValue
            } ,
            {
                [`${tag}.prefix`] : queryValue
            },
            {
                [`${tag}.suffix`] : queryValue
            }
        ]};
    }
};

async function getStudyDicomJson(iQuery, limit, skip, req) {
    logger.info(`[QIDO-RS] [Query Study Level]`);
    let result = {
        data: "",
        status: false
    };
    let protocol = req.secure ? "https" : "http";
    let retrieveUrl = `${protocol}://${req.headers.host}/${process.env.DICOMWEB_API}/studies`;
    try {
        iQuery = await convertRequestQueryToMongoQuery(iQuery);
        // iQuery = iQuery.$match;
        logger.info(`[QIDO-RS] [Query for MongoDB: ${JSON.stringify(iQuery)}]`);
        let studyFields = getStudyLevelFields();
        let docs = await mongoose
            .model("dicomStudy")
            .find(iQuery.$match, studyFields)
            .limit(limit)
            .skip(skip)
            .exec();
        result.data = docs.map((v) => {
            let obj = v.toObject();
            delete obj._id;
            delete obj.id;
            obj["00081190"] = {
                vr: "UR",
                Value: [`${retrieveUrl}/${obj["0020000D"]["Value"][0]}`]
            };
            return sortObjByFieldKey(obj);
        });
        result.status = true;
        return result;
    } catch (e) {
        console.error("get Study DICOM error", e);
        result.data = e;
        result.status = false;
        return result;
    }
}

async function getSeriesDicomJson(iQuery, limit, skip, req) {
    let result = {
        data: "",
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
        let docs = await mongoose
            .model("dicomSeries")
            .find(query, {
                ...studyFields,
                ...seriesFields
            })
            .limit(limit)
            .skip(skip)
            .exec();
        result.data = docs.map((v) => {
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

async function getInstanceDicomJson(iQuery, limit, skip, req) {
    let result = {
        data: "",
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
        let instanceFields = getInstanceLevelFields();
        let docs = await mongoose
            .model("dicom")
            .find(query, {
                ...studyFields,
                ...seriesFields,
                ...instanceFields
            })
            .limit(limit)
            .skip(skip)
            .exec();
        result.data = docs.map((v) => {
            let obj = v.toObject();
            delete obj._id;
            delete obj.id;
            obj["00081190"] = {
                vr: "UR",
                Value: [
                    `${retrieveUrl}/${obj["0020000D"]["Value"][0]}/series/${obj["0020000E"]["Value"][0]}/instances/${obj["00080018"]["Value"][0]}`
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

module.exports.convertAllQueryToDICOMTag = convertAllQueryToDICOMTag;
module.exports.convertRequestQueryToMongoQuery =
    convertRequestQueryToMongoQuery;
module.exports.getStudyLevelFields = getStudyLevelFields;
module.exports.getSeriesLevelFields = getSeriesLevelFields;
module.exports.getInstanceLevelFields = getInstanceLevelFields;
module.exports.sortObjByFieldKey = sortObjByFieldKey;
module.exports.getStudyDicomJson = getStudyDicomJson;
module.exports.getSeriesDicomJson = getSeriesDicomJson;
module.exports.getInstanceDicomJson = getInstanceDicomJson;

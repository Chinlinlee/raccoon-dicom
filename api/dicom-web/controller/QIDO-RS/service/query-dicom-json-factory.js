const _ = require("lodash");
const { PatientModel } = require("@dbModels/patient");
const { StudyModel } = require("@dbModels/dicomStudy");
const dicomSeriesModel = require("@models/mongodb/models/dicomSeries");
const dicomModel = require("@models/mongodb/models/dicom");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { mongoDateQuery, timeQuery } = require("@models/mongodb/service");



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

/**
 * 
 * @param {string} value 
 * @returns 
 */
function getWildCardQuery(value) {
    let wildCardIndex = value.indexOf("*");
    let questionIndex = value.indexOf("?");

    if (wildCardIndex >= 0 || questionIndex >= 0) {
        value = value.replace(/\*/gm, ".*");
        value = value.replace(/\?/gm, ".");
        value = value.replace(/\^/gm, "\\^");
        value = "^" + value;
        return new RegExp(value, "gm");
    }

    return value;
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
            value[x][nowKey] = getWildCardQuery(nowValue);

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

const vrQueryLookup = {
    DA: async (value, tag) => {
        let q = await mongoDateQuery(value, tag, false);
    },
    DT: async (value, tag) => {
        let q = await mongoDateQuery(value, tag, false, "YYYYMMDDhhmmss.SSSSSSZZ");
    },
    PN: async (value, tag) => {
        let queryValue = _.cloneDeep(value[tag]);
        value[tag] = {
            $or: [
                {
                    [`${tag}.Alphabetic`]: queryValue
                },
                {
                    [`${tag}.familyName`]: queryValue
                },
                {
                    [`${tag}.givenName`]: queryValue
                },
                {
                    [`${tag}.middleName`]: queryValue
                },
                {
                    [`${tag}.prefix`]: queryValue
                },
                {
                    [`${tag}.suffix`]: queryValue
                }
            ]
        };
    },
    TM: async (value, tag) => {
        value[tag] = timeQuery(value, tag);
    }
};

/**
 * 
 * @param {any[]} arr 
 * @returns 
 */
function sortArrayObjByFieldKey(arr) {
    return arr.map(v => sortObjByFieldKey(v));
}

function sortObjByFieldKey(obj) {
    return _(obj).toPairs().sortBy(0).fromPairs().value();
}


class QueryDicomJsonFactory {
    constructor(queryOptions) {
        this.queryOptions = queryOptions;
        this.model = PatientModel;
    }

    async getProcessedQueryOptions() {
        let mongoQuery = await convertRequestQueryToMongoQuery(this.queryOptions.query);

        let query = {
            ...this.queryOptions.requestParams,
            ...mongoQuery.$match
        };

        this.queryOptions.query = { ...query };
        return this.queryOptions;
    }

    async getDicomJson() {
        let processedQueryOptions = await this.getProcessedQueryOptions();
        let docs = await this.model.getDicomJson(processedQueryOptions);

        let sortedTagsSeriesDicomJson = sortArrayObjByFieldKey(docs);

        return sortedTagsSeriesDicomJson;
    }
}

class QueryPatientDicomJsonFactory extends QueryDicomJsonFactory {
    constructor(queryOptions) {
        super(queryOptions);
        this.model = PatientModel;
    }
}

class QueryStudyDicomJsonFactory extends QueryDicomJsonFactory {
    constructor(queryOptions) {
        super(queryOptions);
        this.model = StudyModel;
    }
}

class QuerySeriesDicomJsonFactory extends QueryDicomJsonFactory {
    constructor(queryOptions) {
        super(queryOptions);
        this.model = dicomSeriesModel;
    }
}

class QueryInstanceDicomJsonFactory extends QueryDicomJsonFactory {
    constructor(queryOptions) {
        super(queryOptions);
        this.model = dicomModel;
    }
}

module.exports.QueryPatientDicomJsonFactory = QueryPatientDicomJsonFactory;
module.exports.QueryStudyDicomJsonFactory = QueryStudyDicomJsonFactory;
module.exports.QuerySeriesDicomJsonFactory = QuerySeriesDicomJsonFactory;
module.exports.QueryInstanceDicomJsonFactory = QueryInstanceDicomJsonFactory;
module.exports.convertRequestQueryToMongoQuery = convertRequestQueryToMongoQuery;

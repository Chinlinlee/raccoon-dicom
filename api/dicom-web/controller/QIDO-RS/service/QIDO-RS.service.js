const urlObj = require("url");
const mongoose = require("mongoose");
const _ = require("lodash");
const { mongoDateQuery, timeQuery } = require("../../../../../models/mongodb/service");
const { dictionary } = require("../../../../../models/DICOM/dicom-tags-dic");
const {
    tagsOfRequiredMatching
} = require("../../../../../models/DICOM/dicom-tags-mapping");
const { logger } = require("../../../../../utils/logs/log");
const { raccoonConfig } = require("../../../../../config-class");
const { DicomWebService } = require("../../../service/dicom-web.service");
const dicomWebApiPath = raccoonConfig.dicomWebConfig.apiPath;
const dicomModel = require("../../../../../models/mongodb/models/dicom");
const patientModel = require("../../../../../models/mongodb/models/patient");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");

class QidoRsService {

    /**
     * 
     * @param {import('express').Request} req
     *  @param {import('express').Response} res 
     */
    constructor(req, res, level="instance") {
        this.request = req;
        this.response = res;
        this.level = level;

        this.query = {};

        /**
         * @private
         */
        this.limit_ = parseInt(this.request.query.limit) || 100;
        delete this.request.query["limit"];

        /**
         * @private
         */
        this.skip_ = parseInt(this.request.query.offset) || 0;
        delete this.request.query["offset"];

        /**
         * @private
         */
        this.includeFields_ = this.request.query["includefield"] || [];

        if (this.includeFields_.includes("all")) {
            this.includeFields_ = ["all"];
        }

        delete this.request.query["includefield"];

        this.initQuery_();
    }

    /**
     * @private
     */
    initQuery_() {
        let query = _.cloneDeep(this.request.query);
        let queryKeys = Object.keys(query).sort();
        for (let i = 0; i < queryKeys.length; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }

        this.query = convertAllQueryToDICOMTag(query);
    }

    async getAndResponseDicomJson() {
        try {

            let dicomWebService = new DicomWebService(this.request, this.response);

            let queryOptions = {
                query: this.query,
                skip: this.skip_,
                limit: this.limit_,
                includeFields: this.includeFields_,
                retrieveBaseUrl: `${dicomWebService.getBasicURL()}/studies`,
                requestParams: this.request.params
            };
    
            let qidoDicomJsonFactory = new QidoDicomJsonFactory(queryOptions, this.level);
    
            let dicomJson = await qidoDicomJsonFactory.getDicomJson();
    
            let dicomJsonLength = _.get(dicomJson, "length", 0);
            if (dicomJsonLength > 0) {
                this.response.writeHead(200, {
                    "Content-Type": "application/dicom+json"
                });
                this.response.end(JSON.stringify(dicomJson));
            } else {
                this.response.writeHead(204);
                this.response.end();
            }

        } catch(e) {
            throw e;
        }
    }

}

class QidoDicomJsonFactory {

    /**
     * 
     * @param {import("../../../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions 
     * @param {string} level 
     */
    constructor(queryOptions, level="instance") {
        this.level = level;

        this.getDicomJsonByLevel = {
            "patient": async() => {
                return await getPatientDicomJson(queryOptions);
            },
            "study": async () => {
                return await getStudyDicomJson(queryOptions);
            },
            "series": async () => {
                return await getSeriesDicomJson(queryOptions);
            },
            "instance": async () => {
                return await getInstanceDicomJson(queryOptions);
            }
        };
    }

    async getDicomJson() {
        return await this.getDicomJsonByLevel[this.level]();
    }
}

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
                newKeyNames.push(dictionary.keyword[keyNameSplit[x]]);
            } else if (dictionary.tag[keyNameSplit[x]]) {
                newKeyNames.push(keyNameSplit);
            }
        }
        if (newKeyNames.length === 0) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.InvalidArgumentValue,
                `Invalid request query: ${keyNameSplit}`,
                400
            );
        };
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
    },
    TM: async (value, tag) => {
        value[tag] = timeQuery(value, tag);
    }
};

/**
 * 
 * @param {import("../../../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
 * @returns 
 */
async function getPatientDicomJson(queryOptions) {
    try {
        let mongoQuery = await convertRequestQueryToMongoQuery(queryOptions.query);

        let query = {
            ...queryOptions.requestParams,
            ...mongoQuery.$match
        };
        logger.info(`[QIDO-RS] [Query for MongoDB: ${JSON.stringify(query)}]`);
        
        queryOptions.query = { ...query };
        let docs = await patientModel.getDicomJson(queryOptions);

        let sortedInstanceDicomJson = sortArrayObjByFieldKey(docs);

        return sortedInstanceDicomJson;
    } catch (e) {
        console.error("get Series DICOM error", e);
        throw e;
    }
}

/**
 * 
 * @param {import("../../../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions 
 * @returns 
 */
async function getStudyDicomJson(queryOptions) {
    logger.info(`[QIDO-RS] [Query Study Level]`);

    try {
        let query = await convertRequestQueryToMongoQuery(queryOptions.query);
        queryOptions.query = {
            ...query.$match
        };

        logger.info(`[QIDO-RS] [Query for MongoDB: ${JSON.stringify(queryOptions.query)}]`);

        let docs = await mongoose.model("dicomStudy").getDicomJson(queryOptions);

        let sortedTagsStudyDicomJson = sortArrayObjByFieldKey(docs);

        return sortedTagsStudyDicomJson;
    } catch (e) {
        console.error("get Study DICOM error", e);
        throw e;
    }
}

/**
 * 
 * @param {import("../../../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions 
 * @returns 
 */
async function getSeriesDicomJson(queryOptions) {
    try {
        let mongoQuery = await convertRequestQueryToMongoQuery(queryOptions.query);

        let query = {
            ...queryOptions.requestParams,
            ...mongoQuery.$match
        };
        logger.info(`[QIDO-RS] [Query for MongoDB: ${JSON.stringify(query)}]`);

        queryOptions.query = { ...query };
        let docs = await mongoose.model("dicomSeries").getDicomJson(queryOptions);

        let sortedTagsSeriesDicomJson = sortArrayObjByFieldKey(docs);

        return sortedTagsSeriesDicomJson;
    } catch (e) {
        console.error("get Series DICOM error", e);
        throw e;
    }
}

/**
 * 
 * @param {import("../../../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
 * @returns 
 */
async function getInstanceDicomJson(queryOptions) {
    try {
        let mongoQuery = await convertRequestQueryToMongoQuery(queryOptions.query);

        let query = {
            ...queryOptions.requestParams,
            ...mongoQuery.$match
        };
        logger.info(`[QIDO-RS] [Query for MongoDB: ${JSON.stringify(query)}]`);
        
        queryOptions.query = { ...query };
        let docs = await dicomModel.getDicomJson(queryOptions);

        let sortedInstanceDicomJson = sortArrayObjByFieldKey(docs);

        return sortedInstanceDicomJson;
    } catch (e) {
        console.error("get Series DICOM error", e);
        throw e;
    }
}

module.exports.QidoRsService = QidoRsService;
module.exports.QidoDicomJsonFactory = QidoDicomJsonFactory;
module.exports.convertAllQueryToDICOMTag = convertAllQueryToDICOMTag;
module.exports.convertRequestQueryToMongoQuery = convertRequestQueryToMongoQuery;

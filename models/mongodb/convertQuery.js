const _ = require("lodash");

const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { timeQuery, mongoDateQuery } = require("./service");

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
 * 
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

module.exports.convertRequestQueryToMongoQuery = convertRequestQueryToMongoQuery;
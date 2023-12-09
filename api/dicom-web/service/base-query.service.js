const _ = require("lodash");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");


class BaseQueryService {
    constructor(req, res) {
        this.request = req;
        this.response = res;

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

        this.query = convertAllQueryToDicomTag(query);
    }
}

/**
 * Convert All of name(tags, keyword) of queries to tags number
 * @param {Object} iParam The request query.
 * @returns
 */
function convertAllQueryToDicomTag(iParam, pushSuffixValue=true) {
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
                newKeyNames.push(keyNameSplit[x]);
            }
        }
        let retKeyName;
        if (newKeyNames.length === 0) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.InvalidArgumentValue,
                `Invalid request query: ${keyNameSplit}`,
                400
            );
        } 
        
        if (pushSuffixValue) {
            if (newKeyNames.length >= 2) {
                retKeyName = newKeyNames.map(v => v + ".Value").join(".");
            } else {
                newKeyNames.push("Value");
                retKeyName = newKeyNames.join(".");
            }
        } else {
            retKeyName = newKeyNames.join(".");
        }
        
        newQS[retKeyName] = iParam[keyName];
    }
    return newQS;
}
//#endregion

module.exports.convertAllQueryToDicomTag = convertAllQueryToDicomTag;
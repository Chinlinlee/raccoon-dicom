const _ = require("lodash");

const { Attributes } = require("@dcm4che/data/Attributes");
const { queryTagsOfEachLevel } = require("./queryTagsOfEachLevel");
const { StringUtils } = require("@dcm4che/util/StringUtils");
const { intTagToString } = require("./utils");
const { convertRequestQueryToMongoQuery } = require("@root/api/dicom-web/controller/QIDO-RS/service/query-dicom-json-factory");
const { default: Tag } = require("@dcm4che/data/Tag");

class DimseQueryBuilder {

    /**
     * 
     * @param {Attributes} queryKeys 
     * @param {"patient" | "study" | "series" | "instance" | "mwl"} level
     */
    constructor(queryKeys, level = "patient") {
        this.queryKeys = queryKeys;
        this.level = level;
    }

    async toNormalQuery() {
        const queryTags = queryTagsOfEachLevel[this.level];
        let query = {};

        let spsKeys = await this.queryKeys.getNestedDataset(Tag.ScheduledProcedureStepSequence);
        if (spsKeys != null && 
            !(await spsKeys.isEmpty()) && 
            this.level === "mwl"
        ) {
            let spsQueryTags = queryTagsOfEachLevel.mwlSps;
            for (let i = 0; i < spsQueryTags.length; i++) {
                let tagStringValues = await StringUtils.maskNull(await spsKeys.getStrings(spsQueryTags[i]));
                query[`${intTagToString(Tag.ScheduledProcedureStepSequence)}.Value.${intTagToString(spsQueryTags[i])}.Value`] = tagStringValues.join(",");
            }
        }

        for (let i = 0; i < queryTags.length; i++) {
            let tag = queryTags[i];
            /** @type {string[]} */
            let tagStringValues = await StringUtils.maskNull(await this.queryKeys.getStrings(tag));
            query[`${intTagToString(tag)}.Value`] = tagStringValues.join(",");
        }
        return query;
    }

    cleanEmptyQuery(query) {
        let clonedQuery = _.cloneDeep(query);
        for (let key in query) {
            if (!query[key])
                delete clonedQuery[key];
        }
        return clonedQuery;
    }

    async build(query) {
        return await convertRequestQueryToMongoQuery(
            this.cleanEmptyQuery(query)
        );
    }
}

module.exports.DimseQueryBuilder = DimseQueryBuilder;
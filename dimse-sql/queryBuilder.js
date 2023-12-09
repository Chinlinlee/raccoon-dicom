const _ = require("lodash");

const { DimseQueryBuilder } = require("@root/dimse/queryBuilder");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");


class SqlDimseQueryBuilder extends DimseQueryBuilder {

    /**
     * 
     * @param {Attributes} queryKeys 
     * @param {"patient" | "study" | "series" | "instance"} level
     */
    constructor(queryKeys, level="patient") {
        super(queryKeys, level);
    }

    async build(query) {
        return convertAllQueryToDicomTag(
            this.cleanEmptyQuery(query),
            false
        );
    }
}

module.exports.SqlDimseQueryBuilder = SqlDimseQueryBuilder;
module.exports.DimseQueryBuilder = SqlDimseQueryBuilder;
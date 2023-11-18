const _ = require("lodash");

const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { DimseQueryBuilder } = require("@root/dimse/queryBuilder");


class SqlDimseQueryBuilder extends DimseQueryBuilder {

    /**
     * 
     * @param {Attributes} queryKeys 
     * @param {"patient" | "study" | "series" | "instance"} level
     */
    constructor(queryKeys, level="patient") {
        super(queryKeys, level);
    }

    async getSqlQuery(query) {
        return convertAllQueryToDicomTag(
            this.cleanEmptyQuery(query)
        );
    }
}

module.exports.SqlDimseQueryBuilder = SqlDimseQueryBuilder;
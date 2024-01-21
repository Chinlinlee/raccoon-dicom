const _ = require("lodash");
const { PatientModel } = require("@dbModels/patient.model");
const { StudyModel } = require("@dbModels/study.model");
const { SeriesModel } = require("@dbModels/series.model");
const { InstanceModel } = require("@dbModels/instance.model");
const { WorkItemModel } = require("@dbModels/workitems.model");
const { convertRequestQueryToMongoQuery } = require("@models/mongodb/convertQuery");
const { MwlItemModel } = require("@models/mongodb/models/mwlitems.model");

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
        this.model = SeriesModel;
    }
}

class QueryInstanceDicomJsonFactory extends QueryDicomJsonFactory {
    constructor(queryOptions) {
        super(queryOptions);
        this.model = InstanceModel;
    }
}

class QueryUpsDicomJsonFactory extends QueryDicomJsonFactory {
    constructor(queryOptions) {
        super(queryOptions);
        this.model = WorkItemModel;
    }
}

class QueryMwlDicomJsonFactory extends QueryDicomJsonFactory {
    constructor(queryOptions) {
        super(queryOptions);
        this.model = MwlItemModel;
    }
}

module.exports.QueryDicomJsonFactory = QueryDicomJsonFactory;
module.exports.QueryPatientDicomJsonFactory = QueryPatientDicomJsonFactory;
module.exports.QueryStudyDicomJsonFactory = QueryStudyDicomJsonFactory;
module.exports.QuerySeriesDicomJsonFactory = QuerySeriesDicomJsonFactory;
module.exports.QueryInstanceDicomJsonFactory = QueryInstanceDicomJsonFactory;
module.exports.QueryUpsDicomJsonFactory = QueryUpsDicomJsonFactory;
module.exports.QueryMwlDicomJsonFactory = QueryMwlDicomJsonFactory;

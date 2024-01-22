const { MwlItemModel } = require("@dbModels/mwlitems.model");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");
const { QueryMwlDicomJsonFactory } = require("@models/sql/query/query-dicom-json-factory");

class GetMwlItemService extends BaseQueryService {
    constructor(req, res) {
        super(req, res);
    }

    async getMwlItems() {
        let queryOptions = {
            query: this.query,
            skip: this.skip_,
            limit: this.limit_,
            includeFields: this.includeFields_
        };

        let queryFactory = new QueryMwlDicomJsonFactory(queryOptions);
        let docs = await queryFactory.getDicomJson();

        return docs;
    }
}

module.exports.GetMwlItemService = GetMwlItemService;
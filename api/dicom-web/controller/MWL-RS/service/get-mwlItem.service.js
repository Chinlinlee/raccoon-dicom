const { MwlItemModel } = require("@dbModels/mwlitems.model");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");
const { convertRequestQueryToMongoQuery } = require("../../QIDO-RS/service/query-dicom-json-factory");

class GetMwlItemService extends BaseQueryService {
    constructor(req, res) {
        super(req, res);
    }

    async getMwlItems() {
        let query = (await convertRequestQueryToMongoQuery(this.query)).$match;
        let queryOptions = {
            query,
            skip: this.skip_,
            limit: this.limit_,
            includeFields: this.includeFields_
        };

        let docs = await MwlItemModel.getDicomJson(queryOptions);

        return docs;
    }
}

module.exports.GetMwlItemService = GetMwlItemService;
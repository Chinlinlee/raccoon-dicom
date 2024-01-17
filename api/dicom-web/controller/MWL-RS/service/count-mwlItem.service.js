const { MwlItemModel } = require("@dbModels/mwlitems.model");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");
const { convertRequestQueryToMongoQuery } = require("../../QIDO-RS/service/query-dicom-json-factory");

class GetMwlItemCountService extends BaseQueryService {
    constructor(req, res) {
        super(req, res);
    }

    async getMwlItemCount() {
        this.query = (await convertRequestQueryToMongoQuery(this.query)).$match;
        return await MwlItemModel.getCount(this.query);
    }
}

module.exports.GetMwlItemCountService = GetMwlItemCountService;
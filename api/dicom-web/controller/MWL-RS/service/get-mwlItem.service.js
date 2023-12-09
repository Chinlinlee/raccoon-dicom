const { MwlItemModel } = require("@models/mongodb/models/mwlitems.model");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");

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

        let docs = await MwlItemModel.getDicomJson(queryOptions);

        return docs;
    }
}

module.exports.GetMwlItemService = GetMwlItemService;
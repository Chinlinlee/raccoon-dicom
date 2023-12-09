const { MwlItemModel } = require("@models/mongodb/models/mwlitems.model");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");

class GetMwlItemCountService extends BaseQueryService {
    constructor(req, res) {
        super(req, res);
    }

    async getMwlItemCount() {

        return await MwlItemModel.getCount(this.query);
    }
}

module.exports.GetMwlItemCountService = GetMwlItemCountService;
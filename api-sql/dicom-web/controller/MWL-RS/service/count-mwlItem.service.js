const { MwlItemModel } = require("@models/sql/models/mwlitems.model");
const { GetMwlItemCountService } = require("@root/api/dicom-web/controller/MWL-RS/service/count-mwlItem.service");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");
const { cloneDeep } = require("lodash");

class SqlGetMwlItemCountService extends GetMwlItemCountService{
    constructor(req, res) {
        super(req, res);
    }

    async getMwlItemCount() {
        return await MwlItemModel.getCount(this.query);
    }

    initQuery_() {
        let query = cloneDeep(this.request.query);
        let queryKeys = Object.keys(query).sort();
        for (let i = 0; i < queryKeys.length; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }

        this.query = convertAllQueryToDicomTag(query, false);
    }
}

module.exports.GetMwlItemCountService = SqlGetMwlItemCountService;
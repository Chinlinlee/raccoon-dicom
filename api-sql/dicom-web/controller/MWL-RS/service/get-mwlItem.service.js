const { MwlItemModel } = require("@models/sql/models/mwlItems.model");
const { GetMwlItemService } = require("@root/api/dicom-web/controller/MWL-RS/service/get-mwlItem.service");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");
const { cloneDeep } = require("lodash");

class SqlGetMwlItemService extends GetMwlItemService {
    constructor(req, res) {
        super(req, res);
    }

    async getMwlItems() {
        let queryOptions = {
            query: this.query,
            skip: this.skip_,
            limit: this.limit_,
            requestParams: this.request.params
        };

        let docs = await MwlItemModel.getDicomJson(queryOptions);

        return docs;
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

module.exports.GetMwlItemService = SqlGetMwlItemService;
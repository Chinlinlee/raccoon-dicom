const { cloneDeep } = require("lodash");
const { GetWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/get-workItem.service");
const { QidoRsService } = require("@root/api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { WorkItemModel } = require("@models/sql/models/workitems.model");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");

class SqlGetWorkItemService extends GetWorkItemService {
    constructor(req, res) {
        super(req, res);
    }
    
    async getUps() {
        let queryOptions = {
            query: this.query,
            skip: this.skip_,
            limit: this.limit_,
            requestParams: this.request.params
        };

        let docs = await WorkItemModel.getDicomJson(queryOptions);
        
        return this.adjustDocs(docs);
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

SqlGetWorkItemService.prototype.initQuery_ = QidoRsService.prototype.initQuery_;

module.exports.GetWorkItemService = SqlGetWorkItemService;
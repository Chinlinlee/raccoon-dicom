const _ = require("lodash");
const { GetWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/get-workItem.service");
const { QidoRsService } = require("@root/api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { WorkItemModel } = require("@models/sql/models/workItems.model");

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
}

SqlGetWorkItemService.prototype.initQuery_ = QidoRsService.prototype.initQuery_;

module.exports.GetWorkItemService = SqlGetWorkItemService;
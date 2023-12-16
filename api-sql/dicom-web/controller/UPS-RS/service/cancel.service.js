const _ = require("lodash");
const { WorkItemModel } = require("@models/sql/models/workitems.model");
const { CancelWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/cancel.service");

class SqlCancelWorkItemService extends CancelWorkItemService {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.upsInstanceUID = this.request.params.workItem;
        this.workItem = null;
        this.requestWorkItem = /**  @type {Object[]} */(this.request.body).pop();
    }

    async initWorkItem() {
        this.workItem = await WorkItemModel.findOneWorkItemDicomJsonModel(this.upsInstanceUID);
    }

}


module.exports.CancelWorkItemService = SqlCancelWorkItemService;
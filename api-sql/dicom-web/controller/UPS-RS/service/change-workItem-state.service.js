const { WorkItemModel } = require("@dbModels/workItems.model");
const { ChangeWorkItemStateService } = require("@root/api/dicom-web/controller/UPS-RS/service/change-workItem-state.service");

class SqlChangeWorkItemStateService extends ChangeWorkItemStateService {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */
    constructor(req, res) {
        super(req, res);
    }

    async changeWorkItemState() { 
        let foundWorkItem = await WorkItemModel.findOneWorkItemByUpsInstanceUID(this.request.params.workItem);
        this.workItem = foundWorkItem.toDicomJsonModel();
        
        this.workItemState = this.workItem.getString("00741000");
        this.workItemTransactionUID = this.workItem.getString("00081195");
        let requestState = this.requestState.getString("00741000");

        if (requestState === "IN PROGRESS") {
            this.inProgressChange();
        } else if (requestState === "CANCELED") {
            this.cancelChange();
        } else if (requestState === "COMPLETED") {
            this.completeChange();
        }

        await foundWorkItem.changeWorkItemState(this.requestState);
        // TODO: change work item state event
    }
}

module.exports.ChangeWorkItemStateService = SqlChangeWorkItemStateService;
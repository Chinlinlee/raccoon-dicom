const { WorkItemModel } = require("@dbModels/workitems.model");
const { ChangeWorkItemStateService } = require("@root/api/dicom-web/controller/UPS-RS/service/change-workItem-state.service");
const { UPS_EVENT_TYPE } = require("@root/api/dicom-web/controller/UPS-RS/service/workItem-event");

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
        await foundWorkItem.reload();
        // TODO: change work item state event
        this.triggerUpsChangeStateEvent(foundWorkItem);
    }

    /**
     * 
     * @param {WorkItemModel} updatedWorkItem 
     * @returns 
     */
    async triggerUpsChangeStateEvent(updatedWorkItem) {
        let updatedWorkItemDicomJsonModelObj = updatedWorkItem.toDicomJsonModel();

        let hitSubscriptions = await this.getHitSubscriptions(updatedWorkItemDicomJsonModelObj);

        if (hitSubscriptions.length === 0) return;

        let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);
        this.addUpsEvent(UPS_EVENT_TYPE.StateReport, updatedWorkItemDicomJsonModelObj.dicomJson.upsInstanceUID, this.stateReportOf(updatedWorkItemDicomJsonModelObj), hitSubscriptionAeTitleArray);
        this.triggerUpsEvents();
    }
}

module.exports.ChangeWorkItemStateService = SqlChangeWorkItemStateService;
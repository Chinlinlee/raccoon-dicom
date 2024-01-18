const _ = require("lodash");
const { DicomCode } = require("@models/DICOM/code");
const { WorkItemModel } = require("@dbModels/workitems.model");
const { UpsSubscriptionModel } = require("@dbModels/upsSubscription");
const { UpsGlobalSubscriptionModel } = require("@dbModels/upsGlobalSubscription");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { SUBSCRIPTION_STATE, SUBSCRIPTION_FIXED_UIDS } = require("@models/DICOM/ups");
const { BaseWorkItemService } = require("@api/dicom-web/controller/UPS-RS/service/base-workItem.service");

class UnSubscribeService extends BaseWorkItemService {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
        this.upsInstanceUID = this.request.params.workItem;
        this.workItem = null;
        this.subscriberAeTitle = this.request.params.subscriberAeTitle;
    }

    async delete() {

        if (this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.GlobalUID ||
            this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.FilteredGlobalUID) {

            if (!(await this.isGlobalSubscriptionExist())) {
                throw new DicomWebServiceError(
                    DicomWebStatusCodes.ProcessingFailure,
                    "The target Subscription was not found.",
                    404
                );
            }

            await this.deleteGlobalSubscription();
            
        } else {
            let workItem = await WorkItemModel.findOneByUpsInstanceUID(this.upsInstanceUID);

            if (!(await this.isSubscriptionExist())) {
                throw new DicomWebServiceError(
                    DicomWebStatusCodes.ProcessingFailure,
                    "The target Subscription was not found.",
                    404
                );
            }

            await this.deleteSubscription(workItem);
        }

    }

    /**
     * 
     * @param {any} workItem repository workItem
     */
    async deleteSubscription(workItem) {
        await UpsSubscriptionModel.unsubscribe(this.subscriberAeTitle, workItem);
    }

    async deleteGlobalSubscription() {
        // TODO: wrap method in model
        await Promise.all([
            UpsSubscriptionModel.findOneAndDelete({
                aeTitle: this.subscriberAeTitle
            }),
            UpsGlobalSubscriptionModel.findOneAndDelete({
                aeTitle: this.subscriberAeTitle
            })
        ]);

    }

    async isSubscriptionExist() {
        // TODO: wrap method in model
        return await UpsSubscriptionModel.countDocuments({
            aeTitle: this.subscriberAeTitle
        }) > 0;
    }

    async isGlobalSubscriptionExist() {
        // TODO: wrap method in model
        return await UpsGlobalSubscriptionModel.countDocuments({
            aeTitle: this.subscriberAeTitle
        }) > 0;
    }

}


module.exports.UnSubscribeService = UnSubscribeService;
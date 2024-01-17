const _ = require("lodash");
const { DicomCode } = require("@models/DICOM/code");
const { WorkItemModel } = require("@models/mongodb/models/workitems.model");
const subscriptionModel = require("@models/mongodb/models/upsSubscription");
const globalSubscriptionModel = require("@models/mongodb/models/upsGlobalSubscription");
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

        await subscriptionModel.findOneAndUpdate({
            aeTitle: this.subscriberAeTitle,
            workItems: workItem._id
        }, {
            $pull: {
                workItems: workItem._id
            }
        });

    }

    async deleteGlobalSubscription() {

        await Promise.all([
            subscriptionModel.findOneAndDelete({
                aeTitle: this.subscriberAeTitle
            }),
            globalSubscriptionModel.findOneAndDelete({
                aeTitle: this.subscriberAeTitle
            })
        ]);

    }

    async isSubscriptionExist() {
        return await subscriptionModel.countDocuments({
            aeTitle: this.subscriberAeTitle
        }) > 0;
    }

    async isGlobalSubscriptionExist() {
        return await globalSubscriptionModel.countDocuments({
            aeTitle: this.subscriberAeTitle
        }) > 0;
    }

}


module.exports.UnSubscribeService = UnSubscribeService;
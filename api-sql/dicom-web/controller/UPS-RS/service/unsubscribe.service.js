const _ = require("lodash");
const { DicomJsonModel } = require("@dicom-json-model");
const { DicomCode } = require("@models/DICOM/code");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const {  SUBSCRIPTION_FIXED_UIDS } = require("@models/DICOM/ups");
const { UnSubscribeService } = require("@root/api/dicom-web/controller/UPS-RS/service/unsubscribe.service");
const { WorkItemModel } = require("@models/sql/models/workitems.model");
const { UpsSubscriptionModel } = require("@models/sql/models/upsSubscription.model");
const { UpsGlobalSubscriptionModel } = require("@models/sql/models/upsGlobalSubscription.model");

class SqlUnSubscribeService extends UnSubscribeService {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
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
            let workItem = await WorkItemModel.findOneWorkItemByUpsInstanceUID(this.upsInstanceUID);

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
     * @param {WorkItemModel} workItem 
     */
    async deleteSubscription(workItem) {
        let subscription = await UpsSubscriptionModel.findOne({
            where: {
                aeTitle: this.subscriberAeTitle
            }
        });
        await subscription.removeUPSWorkItem(workItem);
    }

    async deleteGlobalSubscription() {

        await Promise.all([
            UpsSubscriptionModel.destroy({
                where: {
                    aeTitle: this.subscriberAeTitle
                }
            }),
            UpsGlobalSubscriptionModel.destroy({
                where: {
                    aeTitle: this.subscriberAeTitle
                }
            })
        ]);

    }

    async isSubscriptionExist() {
        return await UpsSubscriptionModel.count({
            where: {
                aeTitle: this.subscriberAeTitle
            }
        }) > 0;
    }

    async isGlobalSubscriptionExist() {
        return await UpsGlobalSubscriptionModel.count({
            where: {
                aeTitle: this.subscriberAeTitle
            }
        }) > 0;
    }

}


module.exports.UnSubscribeService = SqlUnSubscribeService;
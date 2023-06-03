const _ = require("lodash");
const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");
const { DicomCode } = require("@models/DICOM/code");
const workItemModel = require("@models/mongodb/models/workItems");
const subscriptionModel = require("@models/mongodb/models/upsSubscription");
const globalSubscriptionModel = require("@models/mongodb/models/upsGlobalSubscription");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { SUBSCRIPTION_STATE, SUBSCRIPTION_FIXED_UIDS } = require("@models/DICOM/ups");
const { BaseWorkItemService } = require("./base-workItem.service");
const { convertAllQueryToDICOMTag } = require("../../QIDO-RS/service/QIDO-RS.service");

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
            let workItem = await this.findOneWorkItem(this.upsInstanceUID);

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
     * @param {string} upsInstanceUID 
     * @returns {Promise<DicomJsonModel>}
     */
    async findOneWorkItem(upsInstanceUID) {

        let workItem = await workItemModel.findOne({
            upsInstanceUID: upsInstanceUID
        });

        if (!workItem) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSDoesNotExist,
                "The UPS instance not exist",
                404
            );
        }

        return new DicomJsonModel(workItem);

    }

    /**
     * 
     * @param {DicomJsonModel} workItem 
     */
    async deleteSubscription(workItem) {

        await subscriptionModel.findOneAndUpdate({
            aeTitle: this.subscriberAeTitle,
            workItems: workItem.dicomJson._id
        }, {
            $pull: {
                workItems: workItem.dicomJson._id
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
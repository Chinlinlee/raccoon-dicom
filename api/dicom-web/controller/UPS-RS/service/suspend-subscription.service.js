const _ = require("lodash");
const globalSubscriptionModel = require("@models/mongodb/models/upsGlobalSubscription");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { BaseWorkItemService } = require("./base-workItem.service");

class SuspendSubscribeService extends BaseWorkItemService {

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

        if (!(await this.isGlobalSubscriptionExist())) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.ProcessingFailure,
                "The target Subscription was not found.",
                404
            );
        }

        await this.deleteGlobalSubscription();

    }

    async deleteGlobalSubscription() {

        await globalSubscriptionModel.findOneAndDelete({
            aeTitle: this.subscriberAeTitle
        });

    }

    async isGlobalSubscriptionExist() {
        return await globalSubscriptionModel.countDocuments({
            aeTitle: this.subscriberAeTitle
        }) > 0;
    }

}


module.exports.SuspendSubscribeService = SuspendSubscribeService;
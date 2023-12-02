const _ = require("lodash");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { SuspendSubscribeService } = require("@root/api/dicom-web/controller/UPS-RS/service/suspend-subscription.service");
const { UpsGlobalSubscriptionModel } = require("@models/sql/models/upsGlobalSubscription.model");

class SqlSuspendSubscribeService extends SuspendSubscribeService {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
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
        await UpsGlobalSubscriptionModel.destroy({
            where: {
                aeTitle: this.subscriberAeTitle
            }
        });
    }

    async isGlobalSubscriptionExist() {
        return await UpsGlobalSubscriptionModel.destroy({
            where: {
                aeTitle: this.subscriberAeTitle
            }
        }) > 0;
    }

}


module.exports.SuspendSubscribeService = SqlSuspendSubscribeService;
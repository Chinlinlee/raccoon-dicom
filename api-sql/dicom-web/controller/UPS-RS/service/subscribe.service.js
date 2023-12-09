const _ = require("lodash");
const { DicomJsonModel } = require("@dicom-json-model");
const { UpsSubscriptionModel } = require("@dbModels/upsSubscription.model");
const { UpsGlobalSubscriptionModel } = require("@dbModels/upsGlobalSubscription.model");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { SUBSCRIPTION_STATE, SUBSCRIPTION_FIXED_UIDS } = require("@models/DICOM/ups");
const { SubscribeService } = require("@root/api/dicom-web/controller/UPS-RS/service/subscribe.service");
const { WorkItemModel } = require("@models/sql/models/workitems.model");
const { UPS_EVENT_TYPE } = require("@root/api/dicom-web/controller/UPS-RS/service/workItem-event");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");

class SqlSubscribeService extends SubscribeService {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
    }

    async create() {
        
        if (this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.GlobalUID || 
            this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.FilteredGlobalUID) {

            this.query = convertAllQueryToDicomTag(this.request.query, false);
            await this.createOrUpdateGlobalSubscription();
        } else {
            let workItem = await WorkItemModel.findOneWorkItemByUpsInstanceUID(this.upsInstanceUID);
            let workItemDicomJsonModel = workItem.toDicomJsonModel();
            await this.createOrUpdateSubscription(workItem);
            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, this.upsInstanceUID, this.stateReportOf(workItemDicomJsonModel), [this.subscriberAeTitle]);
        }
        
        await this.triggerUpsEvents();
    }

    //#region Subscription
    async findOneSubscription() {
        return await UpsSubscriptionModel.findOne({
            where: {
                aeTitle: this.subscriberAeTitle
            }
        });
    }

    /**
     * 
     * @param {DicomJsonModel} workItem 
     * @returns 
     */
    async createOrUpdateSubscription(workItem) {
        let subscription = await this.findOneSubscription();
        let subscribed = this.deletionLock ? SUBSCRIPTION_STATE.SUBSCRIBED_NO_LOCK : SUBSCRIPTION_STATE.SUBSCRIBED_LOCK;
        await this.updateWorkItemSubscription(workItem, subscribed);
        if (!subscription) {
            // Create
            let subscriptionObj = UpsSubscriptionModel.build({
                aeTitle: this.subscriberAeTitle,
                isDeletionLock: this.deletionLock,
                subscribed: subscribed
            });

            await subscriptionObj.addUPSWorkItem(workItem);
            let createdSubscription = await subscriptionObj.save();
            return createdSubscription;
        } else {
            // Update
            subscription.isDeletionLock = this.deletionLock;
            subscription.subscribed = subscribed;
            if (!await subscription.hasUPSWorkItem(workItem)) {
                subscription.addUPSWorkItem(workItem);
            }
            let updatedSubscription = await subscription.save();
            return updatedSubscription;
        }
    }

    async updateWorkItemSubscription(workItem, subscription) {
        workItem.subscribed = subscription;
        await workItem.save();
    }
    //#endregion

    //#region Global Subscriptions
    async createOrUpdateGlobalSubscription() {
        let subscribed = this.deletionLock ? SUBSCRIPTION_STATE.SUBSCRIBED_NO_LOCK : SUBSCRIPTION_STATE.SUBSCRIBED_LOCK;
        let subscription = await this.findOneGlobalSubscription();
        if (this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.GlobalUID) this.query = undefined;
        if (this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.FilteredGlobalUID && _.isEmpty(this.query)) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.InvalidArgumentValue,
                `Missing "filter", The Filtered Worklist Subscription must have "filter"`,
                400
            );
        }
        if (!subscription) {
            //Create
            let subscriptionObj = UpsGlobalSubscriptionModel.build({
                aeTitle: this.subscriberAeTitle,
                isDeletionLock: this.deletionLock,
                subscribed: subscribed,
                queryKeys: this.query
            });

            let createdSubscription = await subscriptionObj.save();
        } else {
            //Update
            subscription.isDeletionLock = this.deletionLock;
            subscription.subscribed = subscribed;
            subscription.queryKeys = this.query;
            subscription.changed("queryKeys");
            await subscription.save();
        }

        let notSubscribedWorkItems = await this.findNotSubscribedWorkItems();
        for(let notSubscribedWorkItem of notSubscribedWorkItems) {
            await this.createOrUpdateSubscription(notSubscribedWorkItem);
            
            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, notSubscribedWorkItem.upsInstanceUID, this.stateReportOf(notSubscribedWorkItem.toDicomJsonModel()), [this.subscriberAeTitle]);
        }
    }

    async findOneGlobalSubscription() {
        return await UpsGlobalSubscriptionModel.findOne({
            where: {
                aeTitle: this.subscriberAeTitle
            }
        });
    }
    //#endregion

    async findNotSubscribedWorkItems() {
        return await WorkItemModel.findAll({
            where: {
                subscribed: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
            }
        }) || [];
    }
}


module.exports.SubscribeService = SqlSubscribeService;
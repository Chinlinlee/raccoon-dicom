const _ = require("lodash");
const { WorkItemModel } = require("@dbModels/workitems.model");
const { UpsSubscriptionModel } = require("@dbModels/upsSubscription");
const { UpsGlobalSubscriptionModel } = require("@dbModels/upsGlobalSubscription");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { SUBSCRIPTION_STATE, SUBSCRIPTION_FIXED_UIDS } = require("@models/DICOM/ups");
const { BaseWorkItemService } = require("@api/dicom-web/controller/UPS-RS/service/base-workItem.service");
const { UPS_EVENT_TYPE } = require("./workItem-event");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");

class SubscribeService extends BaseWorkItemService {

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
        this.deletionLock = _.clone(this.request.query.deletionlock);
        delete this.request.query["deletionlock"];
    }

    async create() {

        if (this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.GlobalUID ||
            this.upsInstanceUID === SUBSCRIPTION_FIXED_UIDS.FilteredGlobalUID) {

            this.query = convertAllQueryToDicomTag(this.request.query);
            await this.createOrUpdateGlobalSubscription();
        } else {
            let workItem = await WorkItemModel.findOneByUpsInstanceUID(this.upsInstanceUID);
            await this.createOrUpdateSubscription(workItem);
            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, this.upsInstanceUID, this.stateReportOf(await workItem.toDicomJson()), [this.subscriberAeTitle]);
        }

        await this.triggerUpsEvents();
    }

    //#region Subscription
    async findOneSubscription() {

        let subscription = await UpsSubscriptionModel.findOneByAeTitle(this.subscriberAeTitle);

        return subscription;

    }

    /**
     * 
     * @param {any} workItem repository workItem
     * @returns 
     */
    async createOrUpdateSubscription(workItem) {
        let subscription = await this.findOneSubscription();
        let subscribed = this.deletionLock ? SUBSCRIPTION_STATE.SUBSCRIBED_NO_LOCK : SUBSCRIPTION_STATE.SUBSCRIBED_LOCK;
        await workItem.subscribe(subscribed);
        
        if (!subscription) {
            // Create
            return await UpsSubscriptionModel.createSubscriptionForWorkItem(workItem, this.subscriberAeTitle, this.deletionLock, subscribed);
        } else {
            // Update
            return await UpsSubscriptionModel.updateSubscription(subscription, workItem, this.deletionLock, subscribed);
        }
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
            await UpsGlobalSubscriptionModel.createGlobalSubscription({
                aeTitle: this.subscriberAeTitle,
                isDeletionLock: this.deletionLock,
                subscribed: subscribed,
                queryKeys: this.query
            });
        } else {
            //Update
            await UpsGlobalSubscriptionModel.updateRepositoryInstance(subscription, this.query, this.deletionLock, subscribed);
        }

        let notSubscribedWorkItems = await this.findNotSubscribedWorkItems();
        for (let notSubscribedWorkItem of notSubscribedWorkItems) {
            let workItemDicomJson = await notSubscribedWorkItem.toDicomJson();
            await this.createOrUpdateSubscription(notSubscribedWorkItem);

            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, notSubscribedWorkItem.upsInstanceUID, this.stateReportOf(workItemDicomJson), [this.subscriberAeTitle]);
        }
    }

    async findOneGlobalSubscription() {

        let globalSubscription = await UpsGlobalSubscriptionModel.findOneByAeTitle(this.subscriberAeTitle);

        return globalSubscription;

    }
    //#endregion

    async findNotSubscribedWorkItems() {
        return await WorkItemModel.findNotSubscribedWorkItems();
    }
}


module.exports.SubscribeService = SubscribeService;
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
const { UPS_EVENT_TYPE } = require("./workItem-event");
const { convertAllQueryToDICOMTag } = require("../../QIDO-RS/service/QIDO-RS.service");

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

            this.query = convertAllQueryToDICOMTag(this.request.query);
            await this.createOrUpdateGlobalSubscription();
        } else {
            let workItem = await this.findOneWorkItem(this.upsInstanceUID);
            await this.createOrUpdateSubscription(workItem);
            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, this.upsInstanceUID, this.stateReportOf(workItem), [this.subscriberAeTitle]);
        }
        
        await this.triggerUpsEvents();
    }

    
    /**
     * 
     * @param {string} upsInstanceUID 
     * @returns 
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

    //#region Subscription
    async findOneSubscription() {
        
        let subscription = await subscriptionModel.findOne({
            aeTitle: this.subscriberAeTitle
        });

        return subscription;

    }

    /**
     * 
     * @param {DicomJsonModel} workItem 
     * @returns 
     */
    async createOrUpdateSubscription(workItem) {
        let subscription = await this.findOneSubscription(workItem);
        let subscribed = this.deletionLock ? SUBSCRIPTION_STATE.SUBSCRIBED_NO_LOCK : SUBSCRIPTION_STATE.SUBSCRIBED_LOCK;
        await this.updateWorkItemSubscription(workItem, subscribed);
        if (!subscription) {
            // Create
            let subscriptionObj = new subscriptionModel({
                aeTitle: this.subscriberAeTitle,
                workItems: [
                    workItem.dicomJson._id
                ],
                isDeletionLock: this.deletionLock,
                subscribed: subscribed
            });

            let createdSubscription = await subscriptionObj.save();
            return createdSubscription;
        } else {
            // Update
            let updatedSubscription =await subscriptionModel.findOneAndUpdate({
                _id: subscription._id
            }, {
                $set: {
                    isDeletionLock: this.deletionLock,
                    subscribed: subscribed
                },
                $addToSet: {
                    workItems: workItem.dicomJson._id
                }
            });
            subscription.isDeletionLock = this.deletionLock;
            subscription.subscribed = subscribed;
            return updatedSubscription;
        }
    }

    async updateWorkItemSubscription(workItem, subscription) {
        workItem.dicomJson.subscribed = subscription;
        await workItem.dicomJson.save();
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
            let subscriptionObj = new globalSubscriptionModel({
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
            await subscription.save();
        }

        let notSubscribedWorkItems = await this.findNotSubscribedWorkItems();
        for(let notSubscribedWorkItem of notSubscribedWorkItems) {
            let workItemDicomJson = new DicomJsonModel(notSubscribedWorkItem);
            await this.createOrUpdateSubscription(workItemDicomJson);
            
            this.addUpsEvent(UPS_EVENT_TYPE.StateReport, workItemDicomJson.dicomJson.upsInstanceUID, this.stateReportOf(workItemDicomJson), [this.subscriberAeTitle]);
        }
    }

    async findOneGlobalSubscription() {
                
        let globalSubscription = await globalSubscriptionModel.findOne({
            aeTitle: this.subscriberAeTitle
        });

        return globalSubscription;

    }
    //#endregion

    async findNotSubscribedWorkItems() {
        return await workItemModel.find({
            $or: [
                {
                    subscribed: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
                },
                {
                    subscribed: {
                        $exists: false
                    }
                }
            ]
            
        }) || [];
    }
}


module.exports.SubscribeService = SubscribeService;
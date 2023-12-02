const _ = require("lodash");
const { DicomJsonModel } = require("@dicom-json-model");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");
const { UpsGlobalSubscriptionModel } = require("@dbModels/upsGlobalSubscription.model");
const { UpsSubscriptionModel } = require("@dbModels/upsSubscription.model");
const { WorkItemModel } = require("@dbModels/workItems.model");
const { BaseWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/base-workItem.service");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { UpsQueryBuilder } = require("./query/upsQueryBuilder");
class SqlBaseWorkItemService extends BaseWorkItemService {

    constructor(req, res) {
        super(req, res);
    }

    async isAeTileSubscribed(aeTitle) {
        let subscription = await UpsSubscriptionModel.findOne({
            where: {
                aeTitle: aeTitle
            }
        });

        if (!subscription)
            return false;

        return subscription.subscribed === SUBSCRIPTION_STATE.SUBSCRIBED_LOCK || 
               subscription.subscribed === SUBSCRIPTION_STATE.SUBSCRIBED_NO_LOCK;
    }

    async getGlobalSubscriptionsCursor() {
        return UpsGlobalSubscriptionModel.cursor({});
    }

    /**
     * @param {DicomJsonModel} workItem
     */
    async getHitGlobalSubscriptions(workItem) {
        let globalSubscriptionsCursor = await this.getGlobalSubscriptionsCursor();
        let hitGlobalSubscriptions = [];
        let globalSubscription = await globalSubscriptionsCursor.next();
        while (globalSubscription) {
            if (!globalSubscription.queryKeys) {
                hitGlobalSubscriptions.push(globalSubscription);
            } else {
                let query = convertAllQueryToDicomTag(globalSubscription.queryKeys, false);
                _.set(query, "upsInstanceUID", workItem.dicomJson.upsInstanceUID);
                let queryOptions = {
                    query: query
                };
                let upsQueryBuilder = new UpsQueryBuilder(queryOptions);
                let dbQuery = upsQueryBuilder.build();
                let count = await WorkItemModel.count({
                    ...dbQuery
                });
                if (count > 0)
                    hitGlobalSubscriptions.push(globalSubscription);
            }
            globalSubscription = await globalSubscriptionsCursor.next();
        }
        return hitGlobalSubscriptions;
    }

    async getHitSubscriptions(workItem) {
        let hitSubscriptions = await UpsSubscriptionModel.findAll({
            include: [
                {
                    model: WorkItemModel,
                    where: {
                        upsInstanceUID: workItem.dicomJson.upsInstanceUID
                    },
                    required: true
                }
            ]
        });

        return hitSubscriptions;
    }

}

module.exports.BaseWorkItemService = SqlBaseWorkItemService;
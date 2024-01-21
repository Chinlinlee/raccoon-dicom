const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");
const { WorkItemModel } = require("./workitems.model");

class UpsSubscriptionModel extends Model {
    static async findByWorkItem(workItem) {
        return await UpsSubscriptionModel.findAll({
            include: [
                {
                    model: WorkItemModel,
                    where: {
                        upsInstanceUID: workItem.upsInstanceUID
                    }
                }
            ]
        });
    }

    static async findOneByAeTitle(aeTitle) {
        return await UpsSubscriptionModel.findOne({
            where: {
                aeTitle
            }
        });
    }

    static async createSubscriptionForWorkItem(workItem, aeTitle, deletionLock, subscribed) {
        let [subscription, created] = await UpsSubscriptionModel.findOrCreate({
            where: {
                aeTitle: aeTitle
            },
            defaults: {
                aeTitle: aeTitle,
                subscribed: subscribed,
                isDeletionLock: deletionLock
            }
        });

        if (!(await subscription.hasUPSWorkItem(workItem))) {
            await subscription.addUPSWorkItem(workItem);
        }
        
        return await subscription.save();
    }

    static async updateSubscription(subscription, workItem, deletionLock, subscribed) {
        if (!(await subscription.hasUPSWorkItem(workItem))) {
            await subscription.addUPSWorkItem(workItem);
        }
        subscription.isDeletionLock = deletionLock;
        subscription.subscribed = subscribed;
        return await subscription.save();
    }

    static async unsubscribe(aeTitle, workItem) {
        let subscription = await UpsSubscriptionModel.findOne({
            where: {
                aeTitle: aeTitle
            }
        });

        return await workItem.removeUpsSubscription(subscription);
    }

    static async getCountByAeTitle(aeTitle) {
        return await UpsSubscriptionModel.count({
            where: {
                aeTitle
            }
        });
    }

    static deleteOneByAeTitle(aeTitle) {
        return UpsSubscriptionModel.destroy({
            where: {
                aeTitle
            }
        });
    }
};

UpsSubscriptionModel.init({
    aeTitle: {
        type: DataTypes.TEXT
    },
    subscribed: {
        type: DataTypes.INTEGER,
        defaultValue: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
    },
    isDeletionLock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "UpsSubscription",
    tableName: "UpsSubscription",
    freezeTableName: true
});

module.exports.UpsSubscriptionModel = UpsSubscriptionModel;

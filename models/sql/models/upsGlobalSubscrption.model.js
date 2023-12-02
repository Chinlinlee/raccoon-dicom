const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");

class UpsGlobalSubscriptionModel extends Model {};

UpsGlobalSubscriptionModel.init({
    aeTitle: {
        type: DataTypes.TEXT
    },
    subscribed: {
        type: DataTypes.INTEGER,
        defaultValue: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
    },
    queryKeys: {
        type: vrTypeMapping.JSON,
        allowNull: true
    },
    isDeletionLock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "UpsGlobalSubscription",
    tableName: "UpsGlobalSubscription",
    freezeTableName: true
});

module.exports.UpsGlobalSubscriptionModel = UpsGlobalSubscriptionModel;

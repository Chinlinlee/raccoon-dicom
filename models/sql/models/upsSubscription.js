const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");

class UpsSubscriptionModel extends Model {
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

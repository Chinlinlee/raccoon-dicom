const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");

class UpsGlobalSubscriptionModel extends Model {
    static async cursor(query) {
        return new UpsGlobalSubscriptionModelCursor(query);
    }
};

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

class UpsGlobalSubscriptionModelCursor {
    /**
     * 
     * @param {import("sequelize").FindOptions} query 
     */
    constructor(query) {
        /** @type { import("sequelize").FindOptions } */
        this.query = query;
        this.offset = 0;
        this.item = undefined;
    }

    async next() {
        return await UpsGlobalSubscriptionModel.findOne({
            ...this.query,
            offset: this.offset++
        }); 
    }
}


module.exports.UpsGlobalSubscriptionModel = UpsGlobalSubscriptionModel;

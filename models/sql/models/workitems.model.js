const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { raccoonConfig } = require("@root/config-class");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}

class WorkItemModel extends Model {


    async getAttributes() {
        let obj = this.toJSON();
        let jsonStr = JSON.stringify(obj.json);
        return await Common.getAttributesFromJsonString(jsonStr);
    }
};

/** @type { import("sequelize").ModelAttributes } */
const WorkItemSchema = {
    upsInstanceUID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    patientID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transactionUID: {
        type: DataTypes.STRING
    },
    subscribed: {
        type: DataTypes.INTEGER, 
        defaultValue: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
    },
    //#region patient level
    "x00100020": {
        type: vrTypeMapping.LO,
        allowNull: false
    },
    //#endregion
    "x00741200": {
        type: vrTypeMapping.CS
    },
    "x00404010": {
        type: vrTypeMapping.DT
    },
    "x00741204": {
        type: vrTypeMapping.LO
    },
    "x00741202": {
        type: vrTypeMapping.LO
    },
    "x00404025": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404026": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404027": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404034": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404005": {
        type: vrTypeMapping.DT
    },
    "x00404011": {
        type: vrTypeMapping.DT
    },
    "x00404018": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00380010": {
        type: vrTypeMapping.LO
    },
    "x00741000": {
        type: vrTypeMapping.CS
    },
    "x00080082": {
        type: DataTypes.INTEGER
    },
    // #region Scheduled Human Performers Sequence
    "x00404009": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404036": {
        type: vrTypeMapping.LO
    },
    // #endregion
    "json": {
        type: vrTypeMapping.JSON
    }
};

WorkItemModel.init(WorkItemSchema, {
    sequelize: sequelizeInstance,
    modelName: "UPSWorkItem",
    tableName: "UPSWorkItem",
    freezeTableName: true
});

module.exports.WorkItemModel = WorkItemModel;
module.exports.WorkItemSchema = WorkItemSchema;

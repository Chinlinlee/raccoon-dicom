const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class DicomBulkDataModel extends Model {};

DicomBulkDataModel.init({
    studyUID: {
        type: vrTypeMapping.UI
    },
    seriesUID: {
        type: vrTypeMapping.UI
    },
    instanceUID: {
        type: vrTypeMapping.UI
    },
    filename: {
        type: DataTypes.TEXT("long")
    },
    binaryValuePath: {
        type: DataTypes.TEXT("medium")
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "DicomBulkData",
    tableName: "DicomBulkData",
    freezeTableName: true
});

module.exports.DicomBulkDataModel = DicomBulkDataModel;

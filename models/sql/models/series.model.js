const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class SeriesModel extends Model { };

SeriesModel.init({
    "x0020000D": {
        type: vrTypeMapping.UI,
        allowNull: false
    },
    "x0020000E": {
        type: vrTypeMapping.UI,
        allowNull: false,
        unique: true
    },
    "x00080021": {
        type: vrTypeMapping.DA
    },
    "x00080060": {
        type: vrTypeMapping.CS
    },
    "x0008103E": {
        type: vrTypeMapping.LO
    },
    "x0008103F": {
        type: DataTypes.JSON
    },
    "x00081050": { // 1-n
        type: DataTypes.JSON
    },
    "x00081052": {
        type: DataTypes.JSON
    },
    "x00081070": { // 1-n
        type: DataTypes.JSON
    },
    "x00081072": {
        type: DataTypes.JSON
    },
    "x00081250": {
        type: DataTypes.JSON
    },
    "x00200011": {
        type: vrTypeMapping.IS
    },
    "x00400244": {
        type: vrTypeMapping.DA
    },
    "x00400245": {
        type: vrTypeMapping.TM
    },
    "x00400275": {
        type: DataTypes.JSON
    },
    "x00080031": {
        type: vrTypeMapping.TM
    },
    "json": {
        type: DataTypes.JSON
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Series",
    tableName: "Series",
    freezeTableName: true
});

module.exports.SeriesModel = SeriesModel;

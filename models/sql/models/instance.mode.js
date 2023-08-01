const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class InstanceModel extends Model { };

InstanceModel.init({
    "instancePath": {
        type: DataTypes.TEXT("long")
    },
    "x0020000D": {
        type: vrTypeMapping.UI,
        allowNull: false
    },
    "x0020000E": {
        type: vrTypeMapping.UI,
        allowNull: false
    },
    "x00080018": {
        type: vrTypeMapping.UI,
        allowNull: false,
        unique: true
    },
    "x00080016": {
        type: vrTypeMapping.UI
    },
    "x00080023": {
        type: vrTypeMapping.DA
    },
    "x00080033": {
        type: vrTypeMapping.TM
    },
    "x00200013": {
        type: vrTypeMapping.IS
    },
    "x0040A043": { //SQ
        type: DataTypes.JSON
    },
    "x0040A073": {
        type: DataTypes.JSON
    },
    "x0040A491": {
        type: vrTypeMapping.CS
    },
    "x0040A493": {
        type: vrTypeMapping.CS
    },
    "x0040A730": {
        type: DataTypes.JSON
    },
    "json": {
        type: DataTypes.JSON
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Instance",
    tableName: "Instance",
    freezeTableName: true
});

module.exports.InstanceModel = InstanceModel;

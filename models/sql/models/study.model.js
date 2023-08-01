const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class StudyModel extends Model { };

StudyModel.init({
    "studyPath": {
        type: DataTypes.TEXT("long")
    },
    "x00100020": {
        type: vrTypeMapping.LO,
        allowNull: false
    },
    "x00080005": {
        type: DataTypes.JSON
    },
    "x00080020": {
        type: vrTypeMapping.DA
    },
    "x00080030": {
        type: vrTypeMapping.TM
    },
    "x00080050": {
        type: vrTypeMapping.SH
    },
    "x00080056": {
        type: vrTypeMapping.CS
    },
    "x00080061": { 
        type: DataTypes.JSON 
    },
    "x00080090": {
        type: vrTypeMapping.PN
    },
    "x00080201": {
        type: vrTypeMapping.SH
    },
    "x0020000D": {
        type: vrTypeMapping.UI,
        allowNull: false,
        unique: true
    },
    "x00200010": {
        type: vrTypeMapping.SH
    },
    "x00201206": {
        type: vrTypeMapping.IS
    },
    "x00201208": {
        type: vrTypeMapping.IS
    },
    "json": {
        type: DataTypes.JSON
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Study",
    tableName: "Study",
    freezeTableName: true
});

module.exports.StudyModel = StudyModel;

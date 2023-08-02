const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class PatientModel extends Model {};

PatientModel.init({
    "x00100010": {
        type: DataTypes.INTEGER
    },
    "x00100020": {
        type: vrTypeMapping.LO,
        allowNull: false,
        unique: true
    },
    "x00100021": {
        type: vrTypeMapping.LO
    },
    "x00100030": {
        type: vrTypeMapping.DA
    },
    "x00100032": {
        type: vrTypeMapping.TM
    },
    "x00100040": {
        type: vrTypeMapping.CS
    },
    "x00102160": {
        type: vrTypeMapping.SH
    },
    "x00104000": {
        type: vrTypeMapping.LT
    },
    "x00880130": {
        type: vrTypeMapping.SH
    },
    "x00880140": {
        type: vrTypeMapping.UI
    },
    "json": {
        type: vrTypeMapping.JSON
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Patient",
    tableName: "Patient",
    freezeTableName: true
});

module.exports.PatientModel = PatientModel;

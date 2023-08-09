/**
 * This Tag(Verifying Observer SQ, 0040,A073) only used in SR Document
 */
const { Model, DataTypes } = require("sequelize");
const { vrTypeMapping } = require("../vrTypeMapping");
const sequelizeInstance = require("../instance");

class VerifyIngObserverSqModel extends Model {}

VerifyIngObserverSqModel.init({
    "x0040A027": {
        // Verifying Organization
        type: vrTypeMapping.LO
    },
    "x0040A030": {
        // Verification DateTime
        type: vrTypeMapping.DT
    },
    "x0040A075": {
        // Verifying Observer Name
        type: vrTypeMapping.PN
    },
    "x0040A088": {
        // Verifying Observer Identification Code Sequence (foreign key)
        type: DataTypes.INTEGER
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "VerifyingObserverSQ",
    tableName: "VerifyingObserverSQ",
    freezeTableName: true
});

module.exports.VerifyIngObserverSqModel = VerifyIngObserverSqModel;
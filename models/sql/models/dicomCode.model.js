const { Model } = require("sequelize");
const sequelizeInstance = require("@root/models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class DicomCodeModel extends Model {};

DicomCodeModel.init({
    "x00080100": {
        type: vrTypeMapping.SH
    },
    "x00080102": {
        type: vrTypeMapping.SH
    },
    "x00080103": {
        type: vrTypeMapping.SH
    },
    "x00080104": {
        type: vrTypeMapping.SH
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "DicomCode",
    tableName: "DicomCode",
    freezeTableName: true,
    indexes: [
        {
            fields: ["x00080100"]
        },
        {
            fields: ["x00080102"]
        },
        {
            fields: ["x00080103"]
        }
    ]
});

module.exports.DicomCodeModel = DicomCodeModel;
const { Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class DicomContentSqModel extends Model {}

DicomContentSqModel.init({
    "x0040A010": {
        // Relationship Type
        type: vrTypeMapping.CS
    },
    "x0040A040": {
        // Value Type
        type: vrTypeMapping.CS
    },
    "x0040A160": {
        // Text Value
        type: vrTypeMapping.UT,
        validate: {
            requiredIfValueType(value) {
                if (!value && this.x0040A040 === "TEXT") {
                    throw new Error("x0040A160 is required if x0040A040 is TEXT");
                }
            }
        }
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "DicomContentSQ",
    tableName: "DicomContentSQ",
    freezeTableName: true,
    indexes: [
        {
            fields: ["x0040A010"]
        },
        {
            fields: ["x0040A160"]
        }
    ]
});

module.exports.DicomContentSqModel = DicomContentSqModel;
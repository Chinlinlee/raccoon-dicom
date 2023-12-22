const { DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const _ = require("lodash");

class SeriesRequestAttributesModel extends Model {}

SeriesRequestAttributesModel.init({
    "x0020000E": {
        type: vrTypeMapping.UI,
        allowNull: false
    },
    "x00080050": {
        type: vrTypeMapping.SH
    },
    "x00080051_x00400031": {
        type: vrTypeMapping.UT
    },
    "x00080051_x00400032": {
        type: vrTypeMapping.UT
    },
    "x00080051_x00400033": {
        type: vrTypeMapping.CS
    },
    "x00321033": {
        type: vrTypeMapping.LO
    },
    "x00401001": {
        type: vrTypeMapping.SH
    },
    "x0020000D": {
        type: vrTypeMapping.UI
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "SeriesRequestAttributes",
    tableName: "SeriesRequestAttributes",
    freezeTableName: true
});

module.exports.SeriesRequestAttributesModel = SeriesRequestAttributesModel;
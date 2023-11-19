const { raccoonConfig } = require("@root/config-class");
const { DataTypes } = require("sequelize");

const vrTypeMapping = {
    "AE": DataTypes.STRING,
    "AS": DataTypes.STRING,
    "CS": DataTypes.STRING,
    "DA": DataTypes.DATEONLY,
    "DS": DataTypes.STRING,
    "DT": DataTypes.DATE,
    "FT": DataTypes.FLOAT,
    "FD": DataTypes.DOUBLE,
    "IS": DataTypes.STRING,
    "LO": DataTypes.STRING,
    "LT": DataTypes.STRING(10240+1),
    "OB": DataTypes.TEXT,
    "OD": DataTypes.TEXT,
    "OF": DataTypes.TEXT,
    "OL": DataTypes.TEXT,
    "OV": DataTypes.TEXT,
    "OW": DataTypes.TEXT,
    "PN": DataTypes.INTEGER, // foreign key
    "SH": DataTypes.STRING,
    "SL": DataTypes.INTEGER,
    "SS": DataTypes.SMALLINT,
    "ST": DataTypes.STRING(1024+1),
    "SV": DataTypes.BIGINT,
    "TM": DataTypes.DECIMAL,
    "UC": DataTypes.TEXT("long"),
    "UI": DataTypes.STRING,
    "UL": DataTypes.INTEGER.UNSIGNED,
    "UR": DataTypes.TEXT("long"),
    "US": DataTypes.SMALLINT.UNSIGNED,
    "UT": DataTypes.TEXT("long"),
    "UV": DataTypes.BIGINT.UNSIGNED,
    "JSON": raccoonConfig.dbConfig.dialect === "postgres" ? DataTypes.JSONB : DataTypes.JSON // For Array or SQ data
};


module.exports.vrTypeMapping = vrTypeMapping;
const { DataTypes } = require("sequelize");

const vrTypeMapping = {
    "AE": DataTypes.STRING(16+1),
    "AS": DataTypes.STRING(4+1),
    "CS": DataTypes.STRING(16+1),
    "DA": DataTypes.DATEONLY,
    "DS": DataTypes.STRING(16+1),
    "DT": DataTypes.DATE,
    "FT": DataTypes.FLOAT,
    "FD": DataTypes.DOUBLE,
    "IS": DataTypes.STRING(12+1),
    "LO": DataTypes.STRING(64+1),
    "LT": DataTypes.STRING(10240+1),
    "OB": DataTypes.TEXT,
    "OD": DataTypes.TEXT,
    "OF": DataTypes.TEXT,
    "OL": DataTypes.TEXT,
    "OV": DataTypes.TEXT,
    "OW": DataTypes.TEXT,
    "PN": DataTypes.INTEGER, // foreign key
    "SH": DataTypes.STRING(16+1),
    "SL": DataTypes.INTEGER,
    "SS": DataTypes.SMALLINT,
    "ST": DataTypes.STRING(1024+1),
    "SV": DataTypes.BIGINT,
    "TM": DataTypes.DECIMAL,
    "UC": DataTypes.TEXT("long"),
    "UI": DataTypes.STRING(64+1),
    "UL": DataTypes.INTEGER.UNSIGNED,
    "UR": DataTypes.TEXT("long"),
    "US": DataTypes.SMALLINT.UNSIGNED,
    "UT": DataTypes.TEXT("long"),
    "UV": DataTypes.BIGINT.UNSIGNED
};


module.exports.vrTypeMapping = vrTypeMapping;
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@root/plugins/sql/instance");


class PersonNameModel extends Model {}
PersonNameModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    alphabetic: {
        type: DataTypes.STRING
    },
    ideographic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phonetic: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "PersonName",
    tableName: "PersonName",
    freezeTableName: true
});


module.exports.PersonNameModel = PersonNameModel;

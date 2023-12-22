const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { get } = require("lodash");

class PersonNameModel extends Model {

    /**
     * 
     * @param {any} nameObj 
     * @returns 
     */
    static async createPersonName(nameObj) {
        if (!PersonNameModel.isEmpty(nameObj)) {
            return await PersonNameModel.create({
                alphabetic: get(nameObj, "Alphabetic", undefined),
                ideographic: get(nameObj, "Ideographic", undefined),
                phonetic: get(nameObj, "Phonetic", undefined)
            });
        }
        return undefined;
    }

    /**
     * 
     * @param {any} nameObj 
     * @param {string} id 
     * @returns 
     */
    static async updatePersonNameById(nameObj, id) {
        if (!PersonNameModel.isEmpty(nameObj)) {
            return await PersonNameModel.update({
                alphabetic: get(nameObj, "Alphabetic", undefined),
                ideographic: get(nameObj, "Ideographic", undefined),
                phonetic: get(nameObj, "Phonetic", undefined)
            }, {
                where: {
                    id: id
                }
            });
        }
        return undefined;
    }

    /**
     * 
     * @param {any} item 
     * @param {string} field 
     * @returns 
     */
    static async createPersonNames(item, field) {
        let personNames = [];
        if (item[field]) {
            for (let personName of item[field]) {
                let personNameSequelize = await PersonNameModel.create({
                    alphabetic: get(personName, "Alphabetic", undefined),
                    ideographic: get(personName, "Ideographic", undefined),
                    phonetic: get(personName, "Phonetic", undefined)
                });
                personNames.push(personNameSequelize);
            }
        }
        return personNames;
    }

    static isEmpty(json) {
        return !json && !(json?.Alphabetic ||  json?.Ideographic || json?.Phonetic);
    }
}
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

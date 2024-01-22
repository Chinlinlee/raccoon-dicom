const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class DicomBulkDataModel extends Model {
    static async createOrUpdateBulkData(query, newBulkData, options) {
        return await DicomBulkDataModel.findOrCreate({
            where: {
                ...query
            },
            defaults: newBulkData
        });
    }

    /**
     * 
     * @param {Object} query 
     * @param {string} query.studyUID
     * @param {string} query.seriesUID
     * @param {string} query.instanceUID
     * @param {string} query.binaryValuePath
     * @param {*} options 
     */
    static async findOneBulkData(query, options) {
        return await DicomBulkDataModel.findOne({
            where: {
                ...query
            }
        });
    }

    static async findStudyBulkData(query) {
        return await DicomBulkDataModel.findAll({
            where: {
                studyUID: query.studyUID
            }
        });
    }

    static async findSeriesBulkData(query) {
        return await DicomBulkDataModel.findAll({
            where: {
                studyUID: query.studyUID,
                seriesUID: query.seriesUID
            }
        });
    }

    static async findInstanceBulkData(query) {
        return await DicomBulkDataModel.findAll({
            where: {
                studyUID: query.studyUID,
                seriesUID: query.seriesUID,
                instanceUID: query.instanceUID
            }
        });
    }

    static async findSpecificBulkData(query) {
        return await DicomBulkDataModel.findAll({
            where: {
                studyUID: query.studyUID,
                seriesUID: query.seriesUID,
                instanceUID: query.instanceUID,
                binaryValuePath: query.binaryValuePath
            }
        });
    }
};

DicomBulkDataModel.init({
    studyUID: {
        type: vrTypeMapping.UI
    },
    seriesUID: {
        type: vrTypeMapping.UI
    },
    instanceUID: {
        type: vrTypeMapping.UI
    },
    filename: {
        type: DataTypes.TEXT
    },
    binaryValuePath: {
        type: DataTypes.TEXT
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "DicomBulkData",
    tableName: "DicomBulkData",
    freezeTableName: true
});

module.exports.DicomBulkDataModel = DicomBulkDataModel;

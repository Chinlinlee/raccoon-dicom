const _ = require("lodash");
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");

class DicomToJpegTaskModel extends Model {};

DicomToJpegTaskModel.init({
    studyUID: {
        type: vrTypeMapping.UI
    },
    seriesUID: {
        type: vrTypeMapping.UI
    },
    instanceUID: {
        type: vrTypeMapping.UI
    },
    message: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    taskTime: {
        type: DataTypes.DATE
    },
    finishedTime: {
        type: DataTypes.DATE
    },
    fileSize: {
        type: DataTypes.TEXT
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "DicomToJpegTask",
    tableName: "DicomToJpegTask",
    freezeTableName: true
});

DicomToJpegTaskModel.insertOrUpdate = async (item) => {
    try {
        let [task, created] = await DicomToJpegTaskModel.findOrCreate({
            where: {
                studyUID: item.studyUID,
                seriesUID: item.seriesUID,
                instanceUID: item.instanceUID
            },
            defaults: item
        });
        
        // update
        if (!created) {
            _.assign(task, item);
            await task.save();
        }
    } catch(e) {
        throw e;
    }
};

module.exports.DicomToJpegTaskModel = DicomToJpegTaskModel;

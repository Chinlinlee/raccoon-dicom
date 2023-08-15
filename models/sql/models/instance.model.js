const fsP = require("fs/promises");
const path = require("path");
const { Sequelize, DataTypes, Model } = require("sequelize");
const _ = require("lodash");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { InstanceQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/instanceQueryBuilder");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { getStoreDicomFullPath } = require("@models/mongodb/service");
const { logger } = require("@root/utils/logs/log");
const { raccoonConfig } = require("@root/config-class");

class InstanceModel extends Model {
    async incrementDeleteStatus() {
        let deleteStatus = this.getDataValue("deleteStatus");
        this.setDataValue("deleteStatus", deleteStatus + 1);
        await this.save();
    }

    async deleteInstance() {
        let instancePath = this.getDataValue("instancePath");
        logger.warn("Permanently delete instance: " + instancePath);
        await fsP.rm(path.join(raccoonConfig.dicomWebConfig.storeRootPath, instancePath), {
            force: true,
            recursive: true
        });
    }
};

InstanceModel.init({
    "instancePath": {
        type: DataTypes.TEXT("long")
    },
    "x00020010": {
        // Transfer Syntax UID
        type: vrTypeMapping.UI
    },
    "x0020000D": {
        type: vrTypeMapping.UI,
        allowNull: false
    },
    "x0020000E": {
        type: vrTypeMapping.UI,
        allowNull: false
    },
    "x00080018": {
        type: vrTypeMapping.UI,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    "x00080016": {
        type: vrTypeMapping.UI
    },
    "x00080023": {
        type: vrTypeMapping.DA
    },
    "x00080033": {
        type: vrTypeMapping.TM
    },
    "x00200013": {
        type: vrTypeMapping.IS
    },
    "x00280008": {
        // Number of Frames
        type: vrTypeMapping.IS
    },
    "x00281050": {
        type: vrTypeMapping.DS,
        get() {
            const rawValue = this.getDataValue("x00281050");
            return rawValue ? rawValue.split("\\") : undefined;
        }
    },
    "x00281051": {
        type: vrTypeMapping.DS,
        get() {
            const rawValue = this.getDataValue("x00281050");
            return rawValue ? rawValue.split("\\") : undefined;
        }
    },
    "x0040A491": {
        type: vrTypeMapping.CS
    },
    "x0040A493": {
        type: vrTypeMapping.CS
    },
    "json": {
        type: vrTypeMapping.JSON
    },
    "deleteStatus": {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Instance",
    tableName: "Instance",
    freezeTableName: true
});

InstanceModel.getDicomJson = async function (queryOptions) {
    let queryBuilder = new InstanceQueryBuilder(queryOptions);
    let q = queryBuilder.build();
    let seriesArray = await InstanceModel.findAll({
        ...q,
        attributes: ["json", "x0020000D", "x0020000E", "x00080018"],
        limit: queryOptions.limit,
        offset: queryOptions.skip,
        where: {
            deleteStatus: 0
        }
    });

    return await Promise.all(seriesArray.map(async series => {
        let { json } = series.toJSON();
        // Set Retrieve URL
        let studyInstanceUID = _.get(json, "0020000D.Value.0");
        let seriesInstanceUID = _.get(json, "0020000E.Value.0");
        let sopInstanceUID = _.get(json, "00080018.Value.0");
        _.set(json, dictionary.keyword.RetrieveURL, {
            vr: dictionary.tagVR[dictionary.keyword.RetrieveURL].vr,
            Value: [
                `${queryOptions.retrieveBaseUrl}/${studyInstanceUID}/series/${seriesInstanceUID}/instances/${sopInstanceUID}`
            ]
        });
        return json;
    }));
};

InstanceModel.getPathOfInstance = async function (iParam) {
    let { studyUID, seriesUID, instanceUID } = iParam;

    try {
        let instance = await sequelizeInstance.model("Instance").findOne({
            where: {
                x0020000D: studyUID,
                x0020000E: seriesUID,
                x00080018: instanceUID,
                deleteStatus: 0
            }
        });

        if (instance) {
            let instanceJson = await instance.toJSON();

            _.set(instanceJson, "instancePath", getStoreDicomFullPath(instanceJson));
            _.set(instanceJson, "studyUID", instanceJson.x0020000D);
            _.set(instanceJson, "seriesUID", instanceJson.x0020000E);
            _.set(instanceJson, "instanceUID", instanceJson.x00080018);

            return instanceJson;
        }

        return undefined;
    } catch (e) {
        throw e;
    }
};

InstanceModel.getInstanceOfMedianIndex = async function (query) {
    let instanceCountOfStudy = await InstanceModel.count({
        where: {
            x0020000D: query.studyUID,
            deleteStatus: 0
        }
    });

    let instance = await InstanceModel.findOne({
        where: {
            x0020000D: query.studyUID,
            deleteStatus: 0
        },
        attributes: ["x0020000D", "x0020000E", "x00080018", "instancePath"],
        offset: instanceCountOfStudy >> 1,
        limit: 1,
        order: [
            ["x0020000D", "ASC"],
            ["x0020000E", "ASC"]
        ]
    });

    if (instance) {
        _.set(instance, "studyUID", instance.x0020000D);
        _.set(instance, "seriesUID", instance.x0020000E);
        _.set(instance, "instanceUID", instance.x00080018);
    }

    return instance;
};

module.exports.InstanceModel = InstanceModel;

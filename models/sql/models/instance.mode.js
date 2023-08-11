const { Sequelize, DataTypes, Model } = require("sequelize");
const _ = require("lodash");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { InstanceQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/instanceQueryBuilder");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { getStoreDicomFullPath } = require("@models/mongodb/service");

class InstanceModel extends Model { };

InstanceModel.init({
    "instancePath": {
        type: DataTypes.TEXT("long")
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
    "x0040A491": {
        type: vrTypeMapping.CS
    },
    "x0040A493": {
        type: vrTypeMapping.CS
    },
    "json": {
        type: vrTypeMapping.JSON
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Instance",
    tableName: "Instance",
    freezeTableName: true
});

InstanceModel.getDicomJson = async function(queryOptions) {
    let queryBuilder = new InstanceQueryBuilder(queryOptions);
    let q = queryBuilder.build();
    let seriesArray = await InstanceModel.findAll({
        ...q,
        attributes: ["json", "x0020000D", "x0020000E", "x00080018"],
        limit: queryOptions.limit,
        offset: queryOptions.skip
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

InstanceModel.getPathOfInstance = async function(iParam) {
    let { studyUID, seriesUID, instanceUID } = iParam;

    try {
        let instance = await sequelizeInstance.model("Instance").findOne({
            where: {
                x0020000D: studyUID,
                x0020000E: seriesUID,
                x00080018: instanceUID
            }
        });

        if (instance) {
            let instanceJson = await instance.toJSON();

            _.set(instanceJson, "instancePath",  getStoreDicomFullPath(instanceJson));
            _.set(instanceJson, "studyUID", instanceJson.x0020000D);
            _.set(instanceJson, "seriesUID", instanceJson.x0020000E);
            _.set(instanceJson, "instanceUID", instanceJson.x00080018);

            return instanceJson;
        }

        return undefined;
    } catch(e) {
        throw e;
    }
};

module.exports.InstanceModel = InstanceModel;

const fsP = require("fs/promises");
const path = require("path");
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const _ = require("lodash");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { InstanceQueryBuilder } = require("@models/sql/query/instanceQueryBuilder");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { getStoreDicomFullPath } = require("@models/mongodb/service");
const { logger } = require("@root/utils/logs/log");
const { raccoonConfig } = require("@root/config-class");
const { BaseDicomModel } = require("./baseDicom.model");
const notImageSOPClass = require("@models/DICOM/dicomWEB/notImageSOPClass");

class InstanceModel extends BaseDicomModel {
    async findOneByDicomUID({ studyUID, seriesUID, instanceUID }) {
        return await InstanceModel.findOne({
            where: {
                x0020000D: studyUID,
                x0020000E: seriesUID,
                x00080018: instanceUID
            }
        });
    }

    async deleteInstance() {
        let instancePath = this.getDataValue("instancePath");
        logger.warn("Permanently delete instance: " + instancePath);
        await fsP.rm(path.join(raccoonConfig.dicomWebConfig.storeRootPath, instancePath), {
            force: true,
            recursive: true
        });
    }

    /**
     * 
     * @param {string} studyUID 
     */
    static async getAuditInstancesInfoFromStudyUID(studyUID) {
        let instanceInfos = {
            sopClassUIDs: [],
            accessionNumbers: [],
            patientID: "",
            patientName: ""
        };
        if (!studyUID) return instanceInfos;

        let instances = await sequelizeInstance.model("Instance").findAll({
            where: {
                x0020000D: studyUID
            }
        });

        for (let instance of instances) {
            let sopClassUID = instance.x00080016;
            let accessionNumber = instance.x00080050;
            let patientID = instance.x00100020;
            let patientName = _.get(instance.json, "00100010.Value.0.Alphabetic");
            sopClassUID ? instanceInfos.sopClassUIDs.push(sopClassUID) : null;
            accessionNumber ? instanceInfos.accessionNumbers.push(accessionNumber) : null;
            patientID ? instanceInfos.patientID = patientID : null;
            patientName ? instanceInfos.patientName = patientName : null;
        }

        instanceInfos.sopClassUIDs = _.uniq(instanceInfos.sopClassUIDs);
        instanceInfos.accessionNumbers = _.uniq(instanceInfos.accessionNumbers);

        return instanceInfos;
    }

    /**
     * @param {Object} iParam 
     * @param {string} iParam.studyUID
     * @param {string} iParam.seriesUID
     * @param {string} iParam.instanceUID
     * 
     */
    static async getInstanceFrame(iParam) {
        let { studyUID, seriesUID, instanceUID } = iParam;

        try {
            /** @type { import("sequelize").FindOptions } */
            let query = {
                where: {
                    x0020000D: studyUID,
                    x0020000E: seriesUID,
                    x00080018: instanceUID,
                    x00080016: {
                        [Op.notIn]: notImageSOPClass
                    },
                    deleteStatus: 0
                },
                attributes: [
                    "instancePath",
                    "x00020010",
                    "x0020000D",
                    "x0020000E",
                    "x00080018",
                    "x00280008",
                    "x00281050",
                    "x00281051"
                ]
            };

            let instance = await InstanceModel.findOne(query);
            if (instance) {
                let instanceJson = instance.toJSON();

                _.set(instanceJson, "studyUID", instanceJson.x0020000D);
                _.set(instanceJson, "seriesUID", instanceJson.x0020000E);
                _.set(instanceJson, "instanceUID", instanceJson.x00080018);
                _.set(instanceJson, "instancePath", path.join(
                    raccoonConfig.dicomWebConfig.storeRootPath,
                    instanceJson.instancePath
                ));

                if (instance?.x00280008) {
                    _.set(instanceJson, "00280008", {
                        vr: dictionary.keyword.NumberOfFrames,
                        Value: [instance?.x00280008 || 1]
                    });
                }
                
                if (instance?.x00281050) {
                    _.set(instanceJson, "00281050", {
                        vr: dictionary.keyword.WindowCenter,
                        Value: [Array.isArray(instance?.x00281050) ? instance.x00281050[0] : instance.x00281050]
                    });
                }
                
                if (instance?.x00281051) {
                    _.set(instanceJson, "00281051", {
                        vr: dictionary.keyword.WindowWidth,
                        Value: [Array.isArray(instance?.x00281051) ? instance.x00281051[0] : instance.x00281051]
                    });
                }
                

                return instanceJson;
            }

            return undefined;
        } catch (e) {
            throw e;
        }
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
    "x00080022": {
        type: vrTypeMapping.DA
    },
    "x00080023": {
        type: vrTypeMapping.DA
    },
    "x0008002A": {
        type: vrTypeMapping.DT
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
    if (q.where[Op.and]) {
        q.where[Op.and].push(
            {
                deleteStatus: queryOptions.isRecycle ? 1 : 0
            }
        );
    } else {
        q.where[Op.and] = [
            {
                deleteStatus: queryOptions.isRecycle ? 1 : 0
            }
        ];
    }
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

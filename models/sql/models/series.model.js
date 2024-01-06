const fsP = require("fs/promises");
const path = require("path");
const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { SeriesQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/seriesQueryBuilder");
const _ = require("lodash");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { getStoreDicomFullPathGroup } = require("@models/mongodb/service");
const { logger } = require("@root/utils/logs/log");
const { raccoonConfig } = require("@root/config-class");
const { BaseDicomModel } = require("./baseDicom.model");

class SeriesModel extends BaseDicomModel {
    getSeriesPath() {
        return this.getDataValue("seriesPath");
    }

    async deleteSeriesFolder() {
        let seriesPath = this.getDataValue("seriesPath");
        logger.warn("Permanently delete series folder: " + seriesPath);
        await fsP.rm(path.join(raccoonConfig.dicomWebConfig.storeRootPath, seriesPath), {
            force: true,
            recursive: true
        });
    }
};

SeriesModel.init({
    "seriesPath": {
        type: DataTypes.TEXT("long")
    },
    "x0020000D": {
        type: vrTypeMapping.UI,
        allowNull: false
    },
    "x0020000E": {
        type: vrTypeMapping.UI,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    "x00080021": {
        type: vrTypeMapping.DA
    },
    "x00080060": {
        type: vrTypeMapping.CS
    },
    "x0008103E": {
        type: vrTypeMapping.LO
    },
    "x0008103F": {
        // Temp field for future use
        // vr: SQ
        // VM: 1
        type: vrTypeMapping.JSON
    },
    "x00081052": {
        // Temp field for future use
        // vr: SQ
        // VM: 1
        type: vrTypeMapping.JSON
    },
    "x00081072": {
        // Temp field for future use
        // vr: SQ
        // VM: 1
        type: vrTypeMapping.JSON
    },
    "x00081250": {
        // Temp field for future use
        // vr: SQ
        // VM: 1
        type: vrTypeMapping.JSON
    },
    "x00200011": {
        type: vrTypeMapping.IS
    },
    "x00400244": {
        type: vrTypeMapping.DA
    },
    "x00400245": {
        type: vrTypeMapping.TM
    },
    "x00080031": {
        type: vrTypeMapping.TM
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
    modelName: "Series",
    tableName: "Series",
    freezeTableName: true
});

SeriesModel.getDicomJson = async function (queryOptions) {
    let queryBuilder = new SeriesQueryBuilder(queryOptions);
    let q = queryBuilder.build();
    if (q.where[Op.and]) {
        q.where[Op.and].push(
            {
                deleteStatus: 0
            }
        );
    } else {
        q.where[Op.and] = [
            {
                deleteStatus: 0
            }
        ];
    }
    let seriesArray = await SeriesModel.findAll({
        ...q,
        attributes: ["json", "x0020000E"],
        limit: queryOptions.limit,
        offset: queryOptions.skip
    });

    return await Promise.all(seriesArray.map(async series => {
        let { json } = series.toJSON();
        // Set Retrieve URL
        let studyInstanceUID = _.get(json, "0020000D.Value.0");
        let seriesInstanceUID = _.get(json, "0020000E.Value.0");
        _.set(json, dictionary.keyword.RetrieveURL, {
            vr: dictionary.tagVR[dictionary.keyword.RetrieveURL].vr,
            Value: [
                `${queryOptions.retrieveBaseUrl}/${studyInstanceUID}/series/${seriesInstanceUID}`
            ]
        });
        return json;
    }));
};

SeriesModel.getPathGroupOfInstances = async function (iParam) {
    let { studyUID, seriesUID } = iParam;

    try {
        let instances = await sequelizeInstance.model("Instance").findAll({
            where: {
                x0020000D: studyUID,
                x0020000E: seriesUID,
                deleteStatus: 0
            },
            attributes: ["instancePath", "x0020000D", "x0020000E", "x00080018"]
        });

        let fullPathGroup = getStoreDicomFullPathGroup(instances);

        return fullPathGroup.map(v => {
            _.set(v, "studyUID", v.x0020000D);
            _.set(v, "seriesUID", v.x0020000E);
            _.set(v, "instanceUID", v.x00080018);
            return v;
        });

    } catch (e) {
        throw e;
    }
};

module.exports.SeriesModel = SeriesModel;

const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { SeriesModel } = require("./series.model");
const _ = require("lodash");
const { StudyQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/querybuilder");
const { InstanceModel } = require("./instance.mode");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

class StudyModel extends Model { 
    async getNumberOfStudyRelatedSeries() {
        let count = await SeriesModel.count({
            where: {
                x0020000D: _.get(this.json, "0020000D.Value.0")
            }
        });
        return count;
    }

    async getNumberOfStudyRelatedInstances() {
        let count = await InstanceModel.count({
            where: {
                x0020000D: _.get(this.json, "0020000D.Value.0")
            }
        });
        return count;
    }
};

StudyModel.init({
    "studyPath": {
        type: DataTypes.TEXT("long")
    },
    "x00100020": {
        type: vrTypeMapping.LO,
        allowNull: false
    },
    "x00080005": {
        type: vrTypeMapping.JSON
    },
    "x00080020": {
        type: vrTypeMapping.DA
    },
    "x00080030": {
        type: vrTypeMapping.TM
    },
    "x00080050": {
        type: vrTypeMapping.SH
    },
    "x00080056": {
        type: vrTypeMapping.CS
    },
    "x00080090": {
        type: vrTypeMapping.PN
    },
    "x00080201": {
        type: vrTypeMapping.SH
    },
    "x0020000D": {
        type: vrTypeMapping.UI,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    "x00200010": {
        type: vrTypeMapping.SH
    },
    "x00201206": {
        type: vrTypeMapping.IS
    },
    "x00201208": {
        type: vrTypeMapping.IS
    },
    "json": {
        type: vrTypeMapping.JSON
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Study",
    tableName: "Study",
    freezeTableName: true
});

StudyModel.updateModalitiesInStudy = async function (study) {
    let seriesArray = await SeriesModel.findAll({
        where: {
            x0020000D: study.x0020000D
        },
        attributes: [
            [Sequelize.fn("DISTINCT", Sequelize.col("x00080060")), "modality"]
        ]
    });

    let modalities = [];
    for (let item of seriesArray) {
        if (_.get(item, "dataValues.modality"))
            modalities.push(item.dataValues.modality);
    }

    study.json = {
        ...study.json,
        "00080061": {
            vr: "CS",
            Value: modalities
        }
    };
    await study.save();
};

StudyModel.getDicomJson = async function (queryOptions) {
    let queryBuilder = new StudyQueryBuilder(queryOptions);
    let q = queryBuilder.build();
    let studies = await StudyModel.findAll({
        ...q,
        attributes: ["json"],
        limit: queryOptions.limit,
        offset: queryOptions.skip
    });


    return await Promise.all(studies.map(async study => {
        let numberOfStudyRelatedSeries = await study.getNumberOfStudyRelatedSeries();
        let numberOfStudyRelatedInstances = await study.getNumberOfStudyRelatedInstances();
        let { json } = study.toJSON();
        // Set Retrieve URL
        _.set(json, dictionary.keyword.RetrieveURL, {
            vr: dictionary.tagVR[dictionary.keyword.RetrieveURL].vr,
            Value: [`${queryOptions.retrieveBaseUrl}/${_.get(json, "0020000D.Value.0")}`]
        });

        // Set number of Study related series
        _.set(json, dictionary.keyword.NumberOfStudyRelatedSeries, {
            vr: dictionary.tagVR[dictionary.keyword.NumberOfStudyRelatedSeries].vr,
            Value: [
                numberOfStudyRelatedSeries.toString()
            ]
        });

        // Set number of Study related instances
        _.set(json, dictionary.keyword.NumberOfStudyRelatedInstances, {
            vr: dictionary.tagVR[dictionary.keyword.NumberOfStudyRelatedInstances].vr,
            Value: [
                numberOfStudyRelatedInstances.toString()
            ]
        });

        return json;
    }));
};

module.exports.StudyModel = StudyModel;

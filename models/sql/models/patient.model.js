const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { PatientQueryBuilder } = require("../query/patientQueryBuilder");
const { raccoonConfig } = require("@root/config-class");
const { BaseDicomModel } = require("./baseDicom.model");

class PatientModel extends BaseDicomModel { 
    static async createOrUpdatePatient(patientID, patient) {
        /** @type {PatientModel | null} */
        const { PatientPersistentObject } = require("../po/patient.po");
        let patientPersistent = new PatientPersistentObject(patient);
        let bringPatient = await patientPersistent.createPatient();

        return bringPatient;
    }
};

PatientModel.init({
    "x00100010": {
        type: DataTypes.INTEGER
    },
    "x00100020": {
        type: vrTypeMapping.LO,
        allowNull: false,
        unique: true
    },
    "x00100021": {
        type: vrTypeMapping.LO
    },
    "x00100030": {
        type: vrTypeMapping.DA
    },
    "x00100032": {
        type: vrTypeMapping.TM
    },
    "x00100040": {
        type: vrTypeMapping.CS
    },
    "x00102160": {
        type: vrTypeMapping.SH
    },
    "x00104000": {
        type: vrTypeMapping.LT
    },
    "x00880130": {
        type: vrTypeMapping.SH
    },
    "x00880140": {
        type: vrTypeMapping.UI
    },
    "json": {
        type: vrTypeMapping.JSON
    },
    "deleteStatus": {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Patient",
    tableName: "Patient",
    freezeTableName: true
});

PatientModel.getDicomJson = async function (queryOptions) {
    let queryBuilder = new PatientQueryBuilder(queryOptions);
    let q = queryBuilder.build();
    let studies = await PatientModel.findAll({
        ...q,
        attributes: ["json"],
        limit: queryOptions.limit,
        offset: queryOptions.skip
    });


    return await Promise.all(studies.map(async study => {
        let { json } = study.toJSON();

        return json;
    }));
};

module.exports.PatientModel = PatientModel;

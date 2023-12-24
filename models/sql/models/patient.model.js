const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { PatientQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/patientQueryBuilder");
const { raccoonConfig } = require("@root/config-class");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}

class PatientModel extends Model { 
    static async updateOrCreatePatient(patient) {
        /** @type {PatientModel | null} */
        const { PatientPersistentObject } = require("../po/patient.po");
        let patientPersistent = new PatientPersistentObject(patient);
        let bringPatient = await patientPersistent.createPatient();

        return bringPatient;
    }

    async incrementDeleteStatus() {
        let deleteStatus = this.getDataValue("deleteStatus");
        this.setDataValue("deleteStatus", deleteStatus + 1);
        await this.save();
    }

    toDicomJson() {
        return this.json;
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

PatientModel.prototype.getAttributes = async function () {
    let patientObj = this.toJSON();

    let jsonStr = JSON.stringify(patientObj.json);
    return await Common.getAttributesFromJsonString(jsonStr);
};

module.exports.PatientModel = PatientModel;

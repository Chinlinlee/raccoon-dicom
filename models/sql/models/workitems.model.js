const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelizeInstance = require("@models/sql/instance");
const { vrTypeMapping } = require("../vrTypeMapping");
const { raccoonConfig } = require("@root/config-class");
const { SUBSCRIPTION_STATE } = require("@models/DICOM/ups");
const { UpsQueryBuilder } = require("@models/sql/query/upsQueryBuilder");
const { DicomJsonModel, BaseDicomJson } = require("../dicom-json-model");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { merge } = require("lodash");
const { PatientModel } = require("./patient.model");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}

class WorkItemModel extends Model {


    async getAttributes() {
        let obj = this.toJSON();
        let jsonStr = JSON.stringify(obj.json);
        return await Common.getAttributesFromJsonString(jsonStr);
    }

    toDicomJsonModel() {
        return new DicomJsonModel(this.json);
    }

    async toGeneralDicomJson() {
        return this.json;
    }

    async toDicomJson() {
        return new BaseDicomJson(await this.toGeneralDicomJson());
    }

    async subscribe(subscription) {
        this.subscribed = subscription;
        return await this.save();
    }

    /**
     * 
     * @param {DicomJsonModel} changedStateWorkItemDicomJsonModel 
     */
    async changeWorkItemState(changedStateWorkItemDicomJsonModel) {
        let changedWorkItemJson = merge(this.json, changedStateWorkItemDicomJsonModel.dicomJson);
        this.transactionUID = changedStateWorkItemDicomJsonModel.getString("00081195");
        this.x00741000 = changedStateWorkItemDicomJsonModel.getString("00741000");
        this.json = {
            ...this.json,
            ...changedWorkItemJson
        };
        // Let sequelize know json is changed
        this.changed("json", true);
        await this.save();
    }

    static async getDicomJson (queryOptions) {
        let queryBuilder = new UpsQueryBuilder(queryOptions);
        let q = queryBuilder.build();

        let upsArray = await WorkItemModel.findAll({
            ...q,
            attributes: ["json"],
            limit: queryOptions.limit,
            offset: queryOptions.skip
        });

        return await Promise.all(upsArray.map(async ups => {
            let { json } = ups.toJSON();
            return json;
        }));
    }

    static async findOneWorkItemDicomJsonModel(upsInstanceUID) {
        let workItemObj = await WorkItemModel.findOne({
            where: {
                upsInstanceUID: upsInstanceUID
            }
        });
        if (workItemObj) {
            let {json} = workItemObj.toJSON();
            return new DicomJsonModel(json);
        } else {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.UPSDoesNotExist,
                "The UPS instance not exist",
                404
            );
        }
    }

    static async findOneByUpsInstanceUID(upsInstanceUID) {
        let workItemObj = await WorkItemModel.findOne({
            where: {
                upsInstanceUID: upsInstanceUID
            }
        });
        return workItemObj;
    }

    static async findNotSubscribedWorkItems() {
        return await WorkItemModel.findAll({
            where: {
                subscribed: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
            }
        }) || [];
    }



    static async createWorkItemAndPatient(generalDicomJson) {
        const { UpsWorkItemPersistentObject } = require("../po/upsWorkItem.po");

        let patient = await PatientModel.createOrUpdatePatient(generalDicomJson);
        let workItem = new UpsWorkItemPersistentObject(generalDicomJson, patient);
        return await workItem.save();
    }

    static async updateOneByUpsInstanceUID(upsInstanceUID, generalDicomJson, options) {
        const { UpsWorkItemPersistentObject } = require("../po/upsWorkItem.po");
        let workItem = await WorkItemModel.findOne({
            where: {
                upsInstanceUID: upsInstanceUID
            }
        });
        let patient = await workItem.getPatient();
        generalDicomJson.upsInstanceUID = upsInstanceUID;
        let upsPO = new UpsWorkItemPersistentObject(generalDicomJson, patient);
        return await upsPO.save(options?.adjust);
    }

    static async getCountWithQueryAndUpsInstanceUID(query, upsInstanceUID) {
        let queryOptions = {
            query: query
        };
        let upsQueryBuilder = new UpsQueryBuilder(queryOptions);
        let dbQuery = upsQueryBuilder.build();
        return WorkItemModel.count({
            where: {
                ...dbQuery,
                upsInstanceUID: upsInstanceUID
            }
        });
    }
};

/** @type { import("sequelize").ModelAttributes } */
const WorkItemSchema = {
    upsInstanceUID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    patientID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transactionUID: {
        type: DataTypes.STRING
    },
    subscribed: {
        type: DataTypes.INTEGER, 
        defaultValue: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
    },
    //#region patient level
    "x00100020": {
        type: vrTypeMapping.LO,
        allowNull: false
    },
    //#endregion
    "x00741200": {
        type: vrTypeMapping.CS
    },
    "x00404010": {
        type: vrTypeMapping.DT
    },
    "x00741204": {
        type: vrTypeMapping.LO
    },
    "x00741202": {
        type: vrTypeMapping.LO
    },
    "x00404025": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404026": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404027": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404034": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404005": {
        type: vrTypeMapping.DT
    },
    "x00404011": {
        type: vrTypeMapping.DT
    },
    "x00404018": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00380010": {
        type: vrTypeMapping.LO
    },
    "x00380014_x00400031": {
        type: vrTypeMapping.UT
    },
    "x00380014_x00400032": {
        type: vrTypeMapping.UT
    },
    "x00380014_x00400033": {
        type: vrTypeMapping.CS
    },
    "x00741000": {
        type: vrTypeMapping.CS
    },
    "x00080082": {
        type: DataTypes.INTEGER
    },
    // #region Scheduled Human Performers Sequence
    "x00404009": {
        // DICOM Code
        type: DataTypes.INTEGER
    },
    "x00404036": {
        type: vrTypeMapping.LO
    },
    "x00404037": {
        type: DataTypes.INTEGER
    },
    // #endregion
    "json": {
        type: vrTypeMapping.JSON
    }
};

WorkItemModel.init(WorkItemSchema, {
    sequelize: sequelizeInstance,
    modelName: "UPSWorkItem",
    tableName: "UPSWorkItem",
    freezeTableName: true
});

module.exports.WorkItemModel = WorkItemModel;
module.exports.WorkItemSchema = WorkItemSchema;

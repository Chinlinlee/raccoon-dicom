const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { SUBSCRIPTION_STATE } = require("../../DICOM/ups");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { PatientModel } = require("./patient.model");
const { convertRequestQueryToMongoQuery } = require("@root/api/dicom-web/controller/QIDO-RS/service/query-dicom-json-factory");

let workItemSchema = new mongoose.Schema(
    {
        upsInstanceUID: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        patientID: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        transactionUID: {
            type: String,
            default: void 0,
            index: true
        },
        subscribed: {
            type: Number,
            default: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
        }
    },
    {
        strict: true,
        versionKey: false,
        toObject: {
            getters: true
        },
        statics: {
            findNotSubscribedWorkItems: async function () {
                return await mongoose.model("workItems").find({
                    $or: [
                        {
                            subscribed: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
                        },
                        {
                            subscribed: {
                                $exists: false
                            }
                        }
                    ]

                }) || [];
            },
            /**
             * 
             * @param {Object} workItem general dicom json
             */
            createWorkItemAndPatient: async function (workItem) {
                let patientID = _.get(workItem, "00100020.Value.0");
                workItem.patientID = patientID;

                await PatientModel.findOneOrCreatePatient(patientID, workItem);

                let workItemDoc = new mongoose.model("workItems")(workItem);
                return await workItemDoc.save();
            },
            /**
             * 
             * @param {string} upsInstanceUID 
             * @returns 
             */
            findOneByUpsInstanceUID: async function (upsInstanceUID) {
                return await mongoose.model("workItems").findOne({
                    upsInstanceUID
                });
            },
            /**
             * 
             * @param {Object} query the query structure example { "00100010.Value": "foo" } or { "00100010.Value.00100010.Value": "bar" }
             * @param {string} upsInstanceUID 
             * @returns {number} count
             */
            async getCountWithQueryAndUpsInstanceUID(query, upsInstanceUID) {
                let { $match } = await convertRequestQueryToMongoQuery(query);
                $match.$and.push({
                    upsInstanceUID: upsInstanceUID
                });
                return await mongoose.model("workItems").countDocuments({
                    ...$match
                });
            },
            /**
             * 
             * @param {string} upsInstanceUID 
             * @param {import("@root/utils/typeDef/dicom").GeneralDicomJson} generalDicomJson 
             */
            updateOneByUpsInstanceUID: async function (upsInstanceUID, generalDicomJson) {
                return await mongoose.model("workItems").findOneAndUpdate({
                    upsInstanceUID
                }, generalDicomJson, {new: true}).exec();
            }
        },
        methods: {
            toDicomJson: async function () {
                return new BaseDicomJson(await this.toGeneralDicomJson());
            },
            toGeneralDicomJson: async function () {
                let obj = this.toObject();

                delete obj._id;
                delete obj.id;
                delete obj.upsInstanceUID;
                delete obj.patientID;
                delete obj.transactionUID;
                delete obj.subscribed;

                return obj;
            }
        }
    }
);

for (let tag in tagsNeedStore.UPS) {
    let vr = tagsNeedStore.UPS[tag].vr;
    let tagSchema = getVRSchema(vr);
    workItemSchema.add({
        [tag]: tagSchema
    });
}

for (let tag in tagsNeedStore.Patient) {
    let vr = tagsNeedStore.Patient[tag].vr;
    let tagSchema = getVRSchema(vr);
    workItemSchema.add({
        [tag]: tagSchema
    });
}

/**
 * 
 * @param {import("@root/utils/typeDef/dicom").DicomJsonQueryOptions} queryOptions
 * @returns 
 */
workItemSchema.statics.getDicomJson = async function (queryOptions) {
    let workItemFields = getWorkItemFields();

    let {
        workItem
    } = queryOptions.requestParams;

    let query = workItem ? {
        upsInstanceUID: workItem
    } : queryOptions.query;

    try {
        let docs = await mongoose.model("workItems").find(query, workItemFields)
            .limit(queryOptions.limit)
            .skip(queryOptions.skip)
            .setOptions({
                strictQuery: false
            })
            .exec();


        let workItemDicomJson = docs.map((v) => {
            let obj = v.toObject();
            delete obj._id;
            delete obj.id;
            return obj;
        });

        return workItemDicomJson;

    } catch (e) {
        throw e;
    }
};

function getWorkItemFields() {
    return {
        upsInstanceUID: 0,
        patientID: 0,
        transactionUID: 0,
        "00081195": 0,
        subscribed: 0
    };
}

let workItemModel = mongoose.model(
    "workItems",
    workItemSchema,
    "workItems"
);

/** @type { WorkItemsModel } */
module.exports = workItemModel;
module.exports.WorkItemModel = workItemModel;

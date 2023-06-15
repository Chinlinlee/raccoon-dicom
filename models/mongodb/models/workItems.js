const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { SUBSCRIPTION_STATE } = require("../../DICOM/ups");

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
 * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
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

/**
 * @typedef { mongoose.Model<mongoose.Schema> & { 
 * getDicomJson: function(import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions): Promise<function>
 * }} WorkItemsModel
*/

/** @type {WorkItemsModel} */
let workItemModel = mongoose.model(
    "workItems",
    workItemSchema,
    "workItems"
);

/** @type { WorkItemsModel } */
module.exports = workItemModel;

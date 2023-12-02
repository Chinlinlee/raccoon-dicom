const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");

let mwlItemSchema = new mongoose.Schema(
    {},
    {
        strict: true,
        versionKey: false,
        toObject: {
            getters: true
        },
        statics: {
            /**
             * 
             * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
             * @returns 
             */
            getDicomJson: async function (queryOptions) {
                // TODO: Not Yet Test
                let {
                    mwlItem
                } = queryOptions.requestParams;

                let query = mwlItem ? {
                    mwlInstanceUID: mwlItem
                } : queryOptions.query;

                try {
                    let docs = await mongoose.model("mwlItems").find(query)
                        .limit(queryOptions.limit)
                        .skip(queryOptions.skip)
                        .setOptions({
                            strictQuery: false
                        })
                        .exec();


                    let mwlDicomJson = docs.map((v) => {
                        let obj = v.toObject();
                        delete obj._id;
                        delete obj.id;
                        return obj;
                    });

                    return mwlDicomJson;

                } catch (e) {
                    throw e;
                }
            }
        },
        methods: {
            toDicomJson: function () {
                let obj = this.toObject();
                delete obj._id;
                delete obj.id;
                return obj;
            }
        }
    }
);

for (let tag in tagsNeedStore.MWL) {
    let vr = tagsNeedStore.MWL[tag].vr;
    let tagSchema = getVRSchema(vr);
    mwlItemSchema.add({
        [tag]: tagSchema
    });
}

for (let tag in tagsNeedStore.Patient) {
    let vr = tagsNeedStore.Patient[tag].vr;
    let tagSchema = getVRSchema(vr);
    mwlItemSchema.add({
        [tag]: tagSchema
    });
}

let mwlItemModel = mongoose.model(
    "mwlItems",
    mwlItemSchema,
    "mwlItems"
);

module.exports = mwlItemModel;
module.exports.MwlItemModel = mwlItemModel;

const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { IncludeFieldsFactory } = require("../service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { raccoonConfig } = require("@root/config-class");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { convertRequestQueryToMongoQuery } = require("../convertQuery");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}


let mwlItemSchema = new mongoose.Schema(
    {},
    {
        strict: true,
        versionKey: false,
        toObject: {
            getters: true
        },
        statics: {
            getDimseResultCursor: async function (query, keys) {
                return mongoose.model("mwlItems").find(query, keys).setOptions({
                    strictQuery: false
                })
                    .cursor();
            },
            /**
             * 
             * @param {import("@root/utils/typeDef/dicom").DicomJsonQueryOptions} queryOptions
             * @returns 
             */
            getDicomJson: async function (queryOptions) {
                let projection = mongoose.model("mwlItems").getDicomJsonProjection(queryOptions.includeFields);
                try {
                    let docs = await mongoose.model("mwlItems").find(queryOptions.query, projection)
                        .limit(queryOptions.limit)
                        .skip(queryOptions.skip)
                        .setOptions({
                            strictQuery: false
                        })
                        .exec();


                    let mwlDicomJson = await Promise.all(docs.map(async (v) => await v.toGeneralDicomJson()));

                    return mwlDicomJson;

                } catch (e) {
                    throw e;
                }
            },
            getDicomJsonProjection: function (includeFields) {
                let includeFieldsFactory = new IncludeFieldsFactory(includeFields);
                return includeFieldsFactory.getMwlLevelFields();
            },
            getCount: async function (query) {
                let mongoQuery = await convertRequestQueryToMongoQuery(query);
                return await mongoose.model("mwlItems").countDocuments(mongoQuery);
            },
            deleteByStudyInstanceUIDAndSpsID: async function (studyUID, spsID) {
                return await mongoose.model("mwlItems").deleteMany({
                    $and: [
                        {
                            [`${dictionary.keyword.StudyInstanceUID}.Value.0`]: studyUID
                        },
                        {
                            [`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepID}.Value.0`]: spsID
                        }
                    ]
                });
            },
            /**
             * 
             * @param {string} studyUID 
             * @param {string} spsID 
             */
            findOneByStudyInstanceUIDAndSpsID: async function (studyUID, spsID) {
                return await mongoose.model("mwlItems").findOne({
                    $and: [
                        {
                            [`${dictionary.keyword.StudyInstanceUID}.Value.0`]: studyUID
                        },
                        {
                            [`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepID}.Value.0`]: spsID
                        }
                    ]
                });
            },
            createWithGeneralDicomJson: async function (generalDicomJson) {
                let mwlItemModelObj = new mongoose.model("mwlItems")(generalDicomJson);
                return await mwlItemModelObj.save();
            },
            updateOneWithGeneralDicomJson: async function (mwlItem, generalDicomJson) {
                mwlItem.$set({
                    ...generalDicomJson
                });
                return await mwlItem.save();
            }
        },
        methods: {
            toGeneralDicomJson: async function () {
                let obj = this.toObject();
                delete obj._id;
                delete obj.id;
                return obj;
            },
            toDicomJson: async function () {
                return new BaseDicomJson(await this.toGeneralDicomJson());
            },
            getAttributes: async function () {
                let jsonStr = JSON.stringify(this.toDicomJson());
                return await Common.getAttributesFromJsonString(jsonStr);
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

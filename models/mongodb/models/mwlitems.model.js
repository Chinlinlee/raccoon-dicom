const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { IncludeFieldsFactory } = require("../service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { raccoonConfig } = require("@root/config-class");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");

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
             * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
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
            },
            getDicomJsonProjection: function (includeFields) {
                let includeFieldsFactory = new IncludeFieldsFactory(includeFields);
                return includeFieldsFactory.getMwlLevelFields();
            },
            getCount: async function (query) {
                return await mongoose.model("mwlItems").countDocuments(query);
            },
            deleteByStudyInstanceUIDAndSpsID: async function(studyUID, spsID) {
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
            }
        },
        methods: {
            toGeneralDicomJson: async function() {
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

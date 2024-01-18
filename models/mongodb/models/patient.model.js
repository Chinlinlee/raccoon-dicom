const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const {
    tagsOfRequiredMatching
} = require("../../DICOM/dicom-tags-mapping");
const { raccoonConfig } = require("@root/config-class");
const { DicomSchemaOptionsFactory, PatientDocDicomJsonHandler } = require("../schema/dicom.schema");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");

let patientSchemaOptions = _.merge(
    DicomSchemaOptionsFactory.get("patient", PatientDocDicomJsonHandler),
    {
        methods: {
            toGeneralDicomJson: async function () {
                let obj = this.toObject();
                delete obj._id;
                delete obj.id;
                delete obj.patientID;
                delete obj.studyPaths;
                delete obj.deleteStatus;
                delete obj.createdAt;
                delete obj.updatedAt;

                return obj;
            },
            toDicomJson: async function() {
                return new BaseDicomJson(await this.toGeneralDicomJson());
            }
        },
        statics: {
            getPathGroupQuery: function (iParam) {
                let { patientID } = iParam;
                return {
                    $match: {
                        "00100020.Value": patientID
                    }
                };
            },
            /**
             * 
             * @param {import("@root/utils/typeDef/dicom").DicomJsonQueryOptions} queryOptions
             * @returns 
             */
            getDicomJsonProjection: function (queryOptions) {
                let fields = {};
                for (let tag in tagsOfRequiredMatching.Patient) {
                    fields[tag] = 1;
                }
                return fields;
            },
            /**
             * 
             * @param {string} patientId 
             * @param {any} patient 
             */
            findOneOrCreatePatient: async function(patientId, patient) {
                /** @type {PatientModel | null} */
                let foundPatient = await mongoose.model("patient").findOne({
                    "00100020.Value": patientId
                });

                if (!foundPatient) {
                    /** @type {PatientModel} */
                    let patientObj = new mongoose.model("patient")(patient);
                    patient = await patientObj.save();
                }

                return patient;
            },
            /**
             * 
             * @param {string} patientID 
             * @param {any} patient patient general dicom json
             */
            createOrUpdatePatient: async function(patientID, patient) {
                return await mongoose.model("patient").findOneAndUpdate({
                    patientID
                }, patient, { upsert: true, new: true });
            }
        }
    }
);

let patientSchema = new mongoose.Schema(
    {
        patientID: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        studyPaths: {
            type: [String],
            default: void 0
        },
        deleteStatus: {
            type: Number,
            default: 0
        }
    },
    patientSchemaOptions
);

for (let tag in tagsNeedStore.Patient) {
    let vr = tagsNeedStore.Patient[tag].vr;
    let tagSchema = getVRSchema(vr);
    patientSchema.add({
        [tag]: tagSchema
    });
}

// default storage media file set info from config
patientSchema[dictionary.keyword.StorageMediaFileSetID] = {
    ...patientSchema[dictionary.keyword.StorageMediaFileSetID],
    default: {
        vr: "SH",
        Value: raccoonConfig.mediaStorageID
    }
};

patientSchema[dictionary.keyword.StorageMediaFileSetUID] = {
    ...patientSchema[dictionary.keyword.StorageMediaFileSetUID],
    default: {
        vr: "UI",
        Value: raccoonConfig.mediaStorageUID
    }
};

// Index patient id
patientSchema.index({
    patientID: 1
});
patientSchema.index({
    "00100020": 1
});

let patientModel = mongoose.model(
    "patient",
    patientSchema,
    "patient"
);

module.exports = patientModel;

module.exports.PatientModel = patientModel;

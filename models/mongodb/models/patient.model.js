const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const {
    tagsOfRequiredMatching
} = require("../../DICOM/dicom-tags-mapping");
const { raccoonConfig } = require("@root/config-class");
const { DicomSchemaOptionsFactory, PatientDocDicomJsonHandler } = require("../schema/dicom.schema");

let patientSchemaOptions = _.merge(
    DicomSchemaOptionsFactory.get("patient", PatientDocDicomJsonHandler),
    {
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
             * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
             * @returns 
             */
            getDicomJsonProjection: function (queryOptions) {
                let fields = {};
                for (let tag in tagsOfRequiredMatching.Patient) {
                    fields[tag] = 1;
                }
                return fields;
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

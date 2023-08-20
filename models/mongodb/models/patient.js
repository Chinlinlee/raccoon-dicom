const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { getStoreDicomFullPathGroup } = require("../service");
const {
    tagsOfRequiredMatching
} = require("../../DICOM/dicom-tags-mapping");
const { Common } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common");

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
        }
    },
    {
        strict: true,
        versionKey: false,
        toObject: {
            getters: true
        },
        statics: {
            getDimseResultCursor : async function (query, keys) {
                return mongoose.model("patient").find(query, keys).setOptions({
                    strictQuery: false
                })
                .cursor();
            }
        },
        methods: {
            getAttributes: async function() {
                let patient = this.toObject();
                delete patient._id;
                delete patient.id;

                let jsonStr = JSON.stringify(patient);
                return await Common.getAttributesFromJsonString(jsonStr);
            }
        }
    }
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

/**
 * 
 * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
 * @returns 
 */
patientSchema.statics.getDicomJson = async function (queryOptions) {
    let patientFields = getPatientLevelFields();

    try {
        let docs = await mongoose.model("patient").find(queryOptions.query, patientFields)
            .limit(queryOptions.limit)
            .skip(queryOptions.skip)
            .setOptions({
                strictQuery: false
            })
            .exec();

        
        let patientDicomJson = docs.map((v) => {
            let obj = v.toObject();
            delete obj._id;
            delete obj.id;
            return obj;
        });

        return patientDicomJson;

    } catch (e) {
        throw e;
    }
};

function getPatientLevelFields() {
    let fields = {};
    for (let tag in tagsOfRequiredMatching.Patient) {
        fields[tag] = 1;
    }
    return fields;
}

/**
 * 
 * @param {Object} iParam 
 * @param {string} iParam.studyUID
 */
patientSchema.statics.getPathGroupOfInstances = async function (iParam) {
    let { patientID } = iParam;
    try {
        let query = [
            {
                $match: {
                    "00100020.Value": patientID
                }
            },
            {
                $group: {
                    _id: "$studyUID",
                    pathList: {
                        $addToSet: {
                            studyUID: "$studyUID",
                            seriesUID: "$seriesUID",
                            instanceUID: "$instanceUID",
                            instancePath: "$instancePath"
                        }
                    }
                }
            }
        ];
        let docs = await mongoose.model("dicom").aggregate(query).exec();
        let pathGroup = _.get(docs, "0.pathList", []);

        let fullPathGroup = getStoreDicomFullPathGroup(pathGroup);

        return fullPathGroup;

    } catch (e) {
        throw e;
    }
};

/**
 * @typedef { mongoose.Model<patientSchema> & { 
 * getPathGroupOfInstances: function(iParam: {
 *      patientID: string
 *   }): Promise<import("../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj>;
 * getDicomJson: function(queryOptions: DicomJsonMongoQueryOptions): Promise<function>
 * }} PatientModel
*/

/** @type {PatientModel} */
let patientModel = mongoose.model(
    "patient",
    patientSchema,
    "patient"
);

/** @type {PatientModel} */
module.exports = patientModel;

module.exports.getPatientLevelFields = getPatientLevelFields;

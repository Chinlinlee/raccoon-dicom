const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { 
    getStoreDicomFullPathGroup,
    IncludeFieldsFactory
} = require("../service");
const {
    tagsOfRequiredMatching
} = require("../../DICOM/dicom-tags-mapping");
const { raccoonConfig } = require("../../../config-class");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

let dicomStudySchema = new mongoose.Schema(
    {
        studyUID: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        studyPath: {
            type: String,
            default: void 0
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

for (let tag in tagsNeedStore.Study) {
    let vr = tagsNeedStore.Study[tag].vr;
    let tagSchema = getVRSchema(vr);
    dicomStudySchema.add({
        [tag]: tagSchema
    });
}

dicomStudySchema.index({
    studyUID: 1
});
dicomStudySchema.index({
    "0020000D": 1
});

/**
 * 
 * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
 * @returns 
 */
dicomStudySchema.statics.getDicomJson = async function (queryOptions) {
    let includeFieldsFactory = new IncludeFieldsFactory(queryOptions.includeFields);
    let studyFields = includeFieldsFactory.getStudyLevelFields();

    try {
        let docs = await mongoose.model("dicomStudy").find(queryOptions.query, studyFields)
        .limit(queryOptions.limit)
        .skip(queryOptions.skip)
        .setOptions({
            strictQuery: false
        })
        .exec();
    
        let studyDicomJson = docs.map((v) => {
            let obj = v.toObject();
            delete obj._id;
            delete obj.id;
            obj["00081190"] = {
                vr: "UR",
                Value: [`${queryOptions.retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}`]
            };

            _.set(obj, dictionary.keyword.RetrieveAETitle, {
                ...dictionary.tagVR[dictionary.keyword.RetrieveAETitle],
                Value: [raccoonConfig.aeTitle]
            });
            
            return obj;
        });

        return studyDicomJson;

    } catch(e) {
        throw e;
    }
};

/**
 * 
 * @param {Object} iParam 
 * @param {string} iParam.studyUID
 */
dicomStudySchema.statics.getPathGroupOfInstances = async function(iParam) {
    let { studyUID } = iParam;
    try {
        let query = [
            {
                $match: {
                    studyUID: studyUID
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
 * @typedef { mongoose.Model<dicomStudySchema> & { 
 * getPathGroupOfInstances: function(iParam: {
 *      studyUID: string,
 *   }): Promise<import("../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[]>;
 * getDicomJson: function(queryOptions: import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions): Promise<JSON[]>
 * }} DicomStudyModel
*/

/** @type { DicomStudyModel } */
let dicomStudyModel = mongoose.model(
    "dicomStudy",
    dicomStudySchema,
    "dicomStudy"
);

module.exports = dicomStudyModel;

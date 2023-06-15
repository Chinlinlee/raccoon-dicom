const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { getStoreDicomFullPathGroup, IncludeFieldsFactory } = require("../service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { raccoonConfig } = require("@root/config-class");

let dicomSeriesSchema = new mongoose.Schema(
    {
        studyUID: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        seriesUID: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        seriesPath: {
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
    dicomSeriesSchema.add({
        [tag]: tagSchema
    });
}

for (let tag in tagsNeedStore.Series) {
    let vr = tagsNeedStore.Series[tag].vr;
    let tagSchema = getVRSchema(vr);
    dicomSeriesSchema.add({
        [tag]: tagSchema
    });
}

dicomSeriesSchema.index({
    studyUID: 1
});
dicomSeriesSchema.index({
    seriesUID: 1
});
dicomSeriesSchema.index({
    "0020000D": 1
});
dicomSeriesSchema.index({
    "0020000E": 1
});


/**
 * 
 * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
 * @returns 
 */
dicomSeriesSchema.statics.getDicomJson = async function(queryOptions) {
    let includeFieldsFactory = new IncludeFieldsFactory(queryOptions.includeFields);
    let seriesFields = includeFieldsFactory.getSeriesLevelFields();

    try {
        let docs = await mongoose
            .model("dicomSeries")
            .find(queryOptions.query, {
                ...seriesFields
            })
            .setOptions({
                strictQuery: false
            })
            .limit(queryOptions.limit)
            .skip(queryOptions.skip)
            .exec();

        
        let seriesDicomJson = docs.map((v) => {
            let obj = v.toObject();
            delete obj._id;
            delete obj.id;
            obj["00081190"] = {
                vr: "UR",
                Value: [
                    `${queryOptions.retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}/series/${obj["0020000E"]["Value"][0]}`
                ]
            };

            _.set(obj, dictionary.keyword.RetrieveAETitle, {
                ...dictionary.tagVR[dictionary.keyword.RetrieveAETitle],
                Value: [raccoonConfig.aeTitle]
            });

            return obj;
        });

        return seriesDicomJson;

    } catch (e) {
        throw e;
    }
};

/**
 * 
 * @param {object} iParam 
 * @param {string} iParam.studyUID
 * @param {string} iParam.seriesUID
 */
dicomSeriesSchema.statics.getPathGroupOfInstances = async function(iParam) {
    let { studyUID, seriesUID } = iParam;
    try {
        let query = [
            {
                $match: {
                    $and: [
                        {
                            seriesUID: seriesUID
                        },
                        {
                            studyUID: studyUID
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: "$seriesUID",
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
        let docs = await mongoose.model("dicom").aggregate(query);
        let pathGroup = _.get(docs, "0.pathList", []);

        let fullPathGroup = getStoreDicomFullPathGroup(pathGroup);

        return fullPathGroup;
    } catch (e) {
        throw e;
    }
};


/**
 * @typedef { mongoose.Model<dicomSeriesSchema> & { 
 * getPathGroupOfInstances: function(iParam: {
 *      studyUID: string,
 *      seriesUID: string
 *   }): Promise<import("../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[]>;
 * getDicomJson: function(queryOptions: import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions): Promise<JSON[]>;
 * }} DicomSeriesModel
*/

/** @type { DicomSeriesModel } */
let dicomSeriesModel = mongoose.model(
    "dicomSeries",
    dicomSeriesSchema,
    "dicomSeries"
);

module.exports = dicomSeriesModel;

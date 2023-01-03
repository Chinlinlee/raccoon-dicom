const mongoose = require("mongoose");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const {
    tagsOfRequiredMatching
} = require("../../DICOM/dicom-tags-mapping");
const { getStudyLevelFields } = require("./dicomStudy");

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

function getSeriesLevelFields() {
    let fields = {};
    for (let tag in tagsOfRequiredMatching.Series) {
        fields[tag] = 1;
    }
    return fields;
}

/**
 * 
 * @param {DicomJsonMongoQueryOptions} queryOptions
 * @returns 
 */
dicomSeriesSchema.statics.getDicomJson = async function(queryOptions) {
    let studyFields = getStudyLevelFields();
    let seriesFields = getSeriesLevelFields();

    try {
        let docs = await mongoose
            .model("dicomSeries")
            .find(queryOptions.query, {
                ...studyFields,
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
            return obj;
        });

        return seriesDicomJson;

    } catch (e) {
        throw e;
    }
};

let dicomSeriesModel = mongoose.model(
    "dicomSeries",
    dicomSeriesSchema,
    "dicomSeries"
);

module.exports = dicomSeriesModel;
module.exports.getSeriesLevelFields = getSeriesLevelFields;

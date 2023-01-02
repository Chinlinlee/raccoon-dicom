const mongoose = require("mongoose");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const {
    tagsOfRequiredMatching
} = require("../../DICOM/dicom-tags-mapping");

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
        version: false,
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

dicomStudySchema.statics.getDicomJson = async function (query, queryOptions, retrieveBaseUrl) {
    let studyFields = getStudyLevelFields();

    try {
        let docs = await mongoose.model("dicomStudy").find(query, studyFields)
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
                Value: [`${retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}`]
            };
            return obj;
        });

        return studyDicomJson;
        
    } catch(e) {
        throw e;
    }
};

function getStudyLevelFields() {
    let fields = {};
    for (let tag in tagsOfRequiredMatching.Study) {
        fields[tag] = 1;
    }
    return fields;
}

let dicomStudyModel = mongoose.model(
    "dicomStudy",
    dicomStudySchema,
    "dicomStudy"
);

module.exports = dicomStudyModel;

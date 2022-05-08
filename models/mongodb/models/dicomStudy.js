const mongoose = require("mongoose");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");

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

let dicomStudyModel = mongoose.model(
    "dicomStudy",
    dicomStudySchema,
    "dicomStudy"
);
module.exports = dicomStudyModel;

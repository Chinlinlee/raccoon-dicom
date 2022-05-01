const mongoose = require('mongoose');
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const {
    getVRSchema
} = require('../schema/dicomJsonAttribute');

let dicomSeriesSchema = new mongoose.Schema({
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
}, {
    strict: true,
    versionKey: false,
    toObject: {
        getters: true
    }
});


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
    "studyUID": 1
});
dicomSeriesSchema.index({
    "seriesUID": 1
});
dicomSeriesSchema.index({
    "0020000D": 1
});
dicomSeriesSchema.index({
    "0020000E": 1
});


let dicomSeriesModel = mongoose.model('dicomSeries', dicomSeriesSchema, 'dicomSeries');
module.exports = dicomSeriesModel;

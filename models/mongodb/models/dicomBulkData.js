const mongoose = require('mongoose');

let dicomBulkDataSchema = new mongoose.Schema({  
    studyUID: {
        type: String,
        default: void 0,
        index: true
    },
    seriesUID: {
        type: String,
        default: void 0,
        index: true
    },
    instanceUID: {
        type: String,
        default: void 0,
        index: true
    },
    filename: {
        type: String,
        default: void 0
    },
    binaryValuePath: {
        type: String,
        default: void 0
    }
}, { 
    strict: false,
    versionKey: false
});

let dicomBulkData = mongoose.model('dicomBulkData', dicomBulkDataSchema, 'dicomBulkData');
module.exports = dicomBulkData;

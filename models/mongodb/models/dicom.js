const mongoose = require('mongoose');
const { 
    dicomJsonAttributeSchema, 
    dicomJsonAttributePNSchema, 
    dicomJsonAttributeDASchema 
} = require('../schema/dicomJsonAttribute');

let dicomModelSchema = new mongoose.Schema({  
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
    instanceUID: {
        type: String,
        default: void 0,
        index: true,
        required: true
    },
    "00080020" : dicomJsonAttributeDASchema,
    "00080030": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.Number]
    },
    "00080050": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00080061": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00080090": {
        ...dicomJsonAttributeSchema,
        Value: [dicomJsonAttributePNSchema]
    },
    "00100010": {
        ...dicomJsonAttributeSchema,
        Value: [dicomJsonAttributePNSchema]
    },
    "00100020": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "0020000D": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00200010": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00080060" : {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "0020000E": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00200011": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00400244": dicomJsonAttributeDASchema,
    "00400275": dicomJsonAttributeSchema,
    "00080016": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00080018": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    },
    "00200013": {
        ...dicomJsonAttributeSchema,
        Value: [mongoose.SchemaTypes.String]
    }
}, { 
    strict: false,
    versionKey: false
});

dicomModelSchema.index({
    "0020000D": 1
});
dicomModelSchema.index({
    "0020000E": 1
});
dicomModelSchema.index({
    "00080018": 1
});

dicomModelSchema.methods.getDICOMJson = function () {
    let obj =  this.toObject();
    delete obj._id;
    delete obj.studyUID;
    delete obj.seriesUID;
    delete obj.instanceUID;
}

let dicomModel = mongoose.model('dicom', dicomModelSchema, 'dicom');
module.exports = dicomModel;

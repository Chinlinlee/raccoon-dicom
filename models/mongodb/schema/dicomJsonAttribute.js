const mongoose = require('mongoose');
const moment = require('moment');

let dicomJsonAttributeSchema = {  
    vr: {
        type: String
    },
    Value: {
        type: mongoose.SchemaTypes.Array
    }
};

let dicomJsonAttributePNSchema = new mongoose.Schema({  
    Alphabetic: {
        type: String,
        default : void 0
    },
    Ideographic: {
        type: String,
        default : void 0
    },
    Phonetic: {
        type: String,
        default: void 0
    }
}, {
    versionKey: false,
    _id: false,
    toObject: {
        getters: true
    }
});

let daSchema = {
    type: mongoose.SchemaTypes.Date,
    default: void 0,
    get: function(v) {
        if (v) return moment(v).format('YYYYMMDD');
    }
}

let dicomJsonAttributeDASchema = new mongoose.Schema({
    vr: {
        type: String
    },
    Value: [daSchema]
}, { 
    versionKey: false,
    toObject: {
        getters: true
    },
    _id: false
});


module.exports.dicomJsonAttributeSchema = dicomJsonAttributeSchema;
module.exports.dicomJsonAttributePNSchema = dicomJsonAttributePNSchema;
module.exports.dicomJsonAttributeDASchema = dicomJsonAttributeDASchema;

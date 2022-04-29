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

let dicomJsonAttributeDASchema = new mongoose.Schema({
    vr: {
        type: String
    },
    Value: {
        type: [Date],
        default: void 0,
        get: function (v) {
            if (v.length > 0) {
                return v.map(date=> moment(date).format("YYYYMMDD"));
            }
        }
    }
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

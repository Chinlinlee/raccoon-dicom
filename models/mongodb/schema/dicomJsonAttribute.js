const mongoose = require("mongoose");
const moment = require("moment-timezone");
const _ = require("lodash");

let dicomJsonAttributeSchema = {
    vr: {
        type: String
    },
    Value: {
        type: mongoose.SchemaTypes.Array
    }
};

let dicomJsonAttributePNSchema = {
    Alphabetic: {
        type: String,
        default: void 0
    },
    Ideographic: {
        type: String,
        default: void 0
    },
    Phonetic: {
        type: String,
        default: void 0
    }
};

let dicomJsonAttributeDASchema = {
    vr: {
        type: String
    },
    Value: {
        type: [Date],
        default: void 0,
        set: function(v) {
            let length = _.get(v, "length");
            if (length > 0) {
                return v.map((date) => moment(date, "YYYYMMDD").toDate());
            }
        },
        get: function (v) {
            let length = _.get(v, "length");
            if (length > 0) {
                return v.map((date) => moment(date).format("YYYYMMDD"));
            }
        }
    }
};

function getVRSchema(vr) {
    if (vr == "DA") {
        return new mongoose.Schema(dicomJsonAttributeDASchema, {
            _id: false,
            id: false,
            toObject: {
                getters: true
            }
        });
    } else if (vr == "PN") {
        return new mongoose.Schema(
            {
                ...dicomJsonAttributeSchema,
                Value: [dicomJsonAttributePNSchema]
            },
            {
                _id: false,
                id: false,
                toObject: {
                    getters: true
                }
            }
        );
    } else {
        return new mongoose.Schema(dicomJsonAttributeSchema, {
            _id: false,
            id: false,
            toObject: {
                getters: true
            }
        });
    }
}

module.exports.dicomJsonAttributeSchema = dicomJsonAttributeSchema;
module.exports.dicomJsonAttributePNSchema = dicomJsonAttributePNSchema;
module.exports.dicomJsonAttributeDASchema = dicomJsonAttributeDASchema;
module.exports.getVRSchema = getVRSchema;

const mongoose = require("mongoose");

/**
 * This schema is log error of syncing data to FHIR server.
 */
let syncFHIRLogSchema = new mongoose.Schema(
    {
        studyUID: {
            type: String,
            default: void 0
        },
        seriesUID: {
            type: String,
            default: void 0
        },
        instanceUID: {
            type: String,
            default: void 0
        },
        message: {
            type: String,
            default: void 0
        }
    },
    {
        strict: false,
        versionKey: false
    }
);
let syncFHIRErrorModel = mongoose.model(
    "syncFHIRLog",
    syncFHIRLogSchema,
    "syncFHIRLog"
);

module.exports = syncFHIRErrorModel;

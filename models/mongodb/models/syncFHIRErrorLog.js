const mongoose = require("mongoose");

/**
 * This schema is log error of syncing data to FHIR server.
 */
let syncFHIRErrorLogSchema = new mongoose.Schema(
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
let syncFHIRErrorLogModel = mongoose.model(
    "syncFHIRErrorLog",
    syncFHIRErrorLogSchema,
    "syncFHIRErrorLog"
);

module.exports = syncFHIRErrorLogModel;

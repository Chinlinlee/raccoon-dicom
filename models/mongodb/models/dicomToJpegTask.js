const mongoose = require("mongoose");

/**
 * This schema is log status of generate all JPEG in DICOM file
 */
let dicomToJpegTaskSchema = new mongoose.Schema(
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
            //processing | generated | error message
            type: String,
            default: void 0
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    {
        strict: false,
        versionKey: false
    }
);
let dicomToJpegTask = mongoose.model(
    "dicomToJpegTask",
    dicomToJpegTaskSchema,
    "dicomToJpegTask"
);

module.exports = dicomToJpegTask;

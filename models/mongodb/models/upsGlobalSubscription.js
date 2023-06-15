const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const {
    SUBSCRIPTION_STATE 
} = require("../../DICOM/ups");

let upsGlobalSubscriptionSchema = new mongoose.Schema(
    {
        aeTitle: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        subscribed: {
            type: Number,
            default: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
        },
        queryKeys: {
            type: Object,
            default: void 0
        },
        isDeletionLock: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        }
    },
    {
        strict: false,
        versionKey: false,
        toObject: {
            getters: true
        }
    }
);


let upsSubscriptionModel = mongoose.model(
    "upsGlobalSubscription",
    upsGlobalSubscriptionSchema,
    "upsGlobalSubscription"
);

module.exports = upsSubscriptionModel;

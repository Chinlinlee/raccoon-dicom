const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const {
    SUBSCRIPTION_STATE
} = require("../../DICOM/ups");

let upsSubscriptionSchema = new mongoose.Schema(
    {
        aeTitle: {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        workItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "workItems"
        }],
        subscribed: {
            type: Number,
            default: SUBSCRIPTION_STATE.NOT_SUBSCRIBED
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
    "upsSubscription",
    upsSubscriptionSchema,
    "upsSubscription"
);

module.exports = upsSubscriptionModel;

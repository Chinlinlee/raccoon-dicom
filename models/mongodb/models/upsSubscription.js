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
        },
        statics: {
            findByWorkItem: async function (workItem) {
                return await mongoose.model("upsSubscription").find({ workItems: workItem._id }).exec();
            },
            /**
             * 
             * @param {string} aeTitle 
             * @returns repository item
             */
            findOneByAeTitle: async function (aeTitle) {
                return await mongoose.model("upsSubscription").findOne({ aeTitle }).exec();
            },
            createSubscriptionForWorkItem: async function (workItem, aeTitle, deletionLock, subscribed) {
                let subscription = new mongoose.model("upsSubscription")({
                    aeTitle: aeTitle,
                    workItems: [workItem._id],
                    subscribed: subscribed,
                    isDeletionLock: deletionLock
                });
                return await subscription.save();
            },
            updateSubscription: async function (subscription, workItem, deletionLock, subscribed) {
                return await mongoose.model("upsSubscription").findOneAndUpdate({
                    _id: subscription._id
                }, {
                    $set: {
                        isDeletionLock: deletionLock,
                        subscribed: subscribed
                    },
                    $addToSet: {
                        workItems: workItem._id
                    }
                });
            },
            /**
             * 
             * @param {string} aeTitle 
             * @param {any} workItem  repository item
             */
            unsubscribe: async function (aeTitle, workItem) {
                return await mongoose.model("upsSubscription").findOneAndUpdate({
                    aeTitle: aeTitle,
                    workItems: workItem._id
                }, {
                    $pull: {
                        workItems: workItem._id
                    }
                });

            },
            /**
             * 
             * @param {string} aeTitle 
             */
            getCountByAeTitle: async function (aeTitle) {
                return await mongoose.model("upsSubscription").countDocuments({ aeTitle: aeTitle });
            }
        }
    }
);


let upsSubscriptionModel = mongoose.model(
    "upsSubscription",
    upsSubscriptionSchema,
    "upsSubscription"
);

module.exports = upsSubscriptionModel;
module.exports.UpsSubscriptionModel = upsSubscriptionModel;

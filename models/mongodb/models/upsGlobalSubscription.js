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
        },
        statics: {
            getCursor: async function (query, options) {
                return await mongoose.model("upsGlobalSubscription").find(query, options).cursor();
            },
            createGlobalSubscription: async function (globalSubscription) {
                return await mongoose.model("upsGlobalSubscription").create(globalSubscription);
            },
            updateRepositoryInstance: async function (globalSubscription, query, deletionLock, subscribed) {
                globalSubscription.isDeletionLock = deletionLock;
                globalSubscription.subscribed = subscribed;
                globalSubscription.queryKeys = query;
                return await globalSubscription.save();
            },
            findOneByAeTitle: async function (aeTitle) {
                return await mongoose.model("upsGlobalSubscription").findOne({ aeTitle: aeTitle });
            },
            /**
             * 
             * @param {string} aeTitle 
             * @returns 
             */
            getCountByAeTitle: async function (aeTitle) {
                return await mongoose.model("upsGlobalSubscription").countDocuments({ aeTitle: aeTitle });
            }
        }
    }
);


let upsSubscriptionModel = mongoose.model(
    "upsGlobalSubscription",
    upsGlobalSubscriptionSchema,
    "upsGlobalSubscription"
);

module.exports = upsSubscriptionModel;
module.exports.UpsGlobalSubscriptionModel = upsSubscriptionModel;

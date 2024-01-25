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
            /**
             * @type {import("@root/utils/typeDef/models/upsGlobalSubscription").UpsGlobalSubscriptionConstructor["getCursor"]}
             */
            getCursor: async function (query, options) {
                return await mongoose.model("upsGlobalSubscription").find(query, options).cursor();
            },
            /**
             * @type { import("@root/utils/typeDef/models/upsGlobalSubscription").UpsGlobalSubscriptionConstructor["createGlobalSubscription"] }
             */
            createGlobalSubscription: async function (globalSubscription) {
                return await mongoose.model("upsGlobalSubscription").create(globalSubscription);
            },
            /**
             * @type { import("@root/utils/typeDef/models/upsGlobalSubscription").UpsGlobalSubscriptionConstructor["updateRepositoryInstance"] } 
             */
            updateRepositoryInstance: async function (globalSubscription, query, deletionLock, subscribed) {
                globalSubscription.isDeletionLock = deletionLock;
                globalSubscription.subscribed = subscribed;
                globalSubscription.queryKeys = query;
                return await globalSubscription.save();
            },
            /**
             * @type { import("@root/utils/typeDef/models/upsGlobalSubscription").UpsGlobalSubscriptionConstructor["findOneByAeTitle"] } 
             */
            findOneByAeTitle: async function (aeTitle) {
                return await mongoose.model("upsGlobalSubscription").findOne({ aeTitle: aeTitle });
            },
            /**
             * @type { import("@root/utils/typeDef/models/upsGlobalSubscription").UpsGlobalSubscriptionConstructor["getCountByAeTitle"] }
             */
            getCountByAeTitle: async function (aeTitle) {
                return await mongoose.model("upsGlobalSubscription").countDocuments({ aeTitle: aeTitle });
            },
            /**
             * @type { import("@root/utils/typeDef/models/upsGlobalSubscription").UpsGlobalSubscriptionConstructor["deleteOneByAeTitle"] }
             */
            deleteOneByAeTitle: async function (aeTitle) {
                return await mongoose.model("upsGlobalSubscription").findOneAndDelete({ aeTitle: aeTitle });
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
/** @type { import("@root/utils/typeDef/models/upsGlobalSubscription").UpsGlobalSubscriptionConstructor } */
module.exports.UpsGlobalSubscriptionModel = upsSubscriptionModel;

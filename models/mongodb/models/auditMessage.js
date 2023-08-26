const mongoose = require("mongoose");

let auditMessage = new mongoose.Schema(
    {

    },
    {
        strict: false,
        timestamps: true,
        versionKey: false,
        statics: {
            /**
             * 
             * @param {JSON} json 
             */
            createMessage: async function (json) {
                this.create(json);
            }
        }
    }
);


const auditMessageModel = mongoose.model("auditMessage", auditMessage, "auditMessage");

module.exports = auditMessageModel;
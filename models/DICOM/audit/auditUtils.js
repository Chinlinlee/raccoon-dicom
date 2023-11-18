const _ = require("lodash");

const { Common } = require("@java-wrapper/org/github/chinlinlee/dcm777/common/Common");

class AuditUtils {
    static async toJson(msg) {
        let msgJsonString = await Common.convertAuditMessageToJsonString(msg);
        let msgJson = JSON.parse(msgJsonString);
        return _.get(msgJson, "AuditMessage", msgJson);
    }
}


module.exports.AuditUtils = AuditUtils;

module.exports.EventOutcomeIndicator = {
    Success: "0",
    MinorFailure: "4",
    SeriousFailure: "8",
    MajorFailure: "12"
};
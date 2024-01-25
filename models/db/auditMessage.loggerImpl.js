const { logger } = require("@root/utils/logs/log");

class AuditMessageModelLoggerDbImpl {
    static async createMessage(msg) {
        logger.info(JSON.stringify(msg));
    }
}

/** @type { import("@root/utils/typeDef/models/auditMessageModel").AuditMessageModel } */
module.exports.AuditMessageModel = AuditMessageModelLoggerDbImpl;
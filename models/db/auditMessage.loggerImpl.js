const { logger } = require("@root/utils/logs/log");

class AuditMessageModelLoggerDbImpl {
    static async createMessage(msg) {
        logger.info(JSON.stringify(msg));
    }
}

module.exports.AuditMessageModel = AuditMessageModelLoggerDbImpl;
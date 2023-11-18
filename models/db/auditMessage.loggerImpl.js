const { logger } = require("@root/utils/logs/log");

class AuditMessageModelLoggerDbImpl {
    createMessage(msg) {
        logger.info(JSON.stringify(msg));
    }
}

module.exports.AuditMessageModelLoggerDbImpl = AuditMessageModelLoggerDbImpl;
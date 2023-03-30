const path = require("path");
const fileExists = require("../file/fileExist");
const { configure, getLogger } = require("log4js");
const USER_LOG_CONFIG_FILENAME = path.join(__dirname, "../../config/log4js.json");
const DEFAULT_LOG_CONFIG_FILENAME = path.join(__dirname, "../../config/log4js.default.json");

if (fileExists.sync(USER_LOG_CONFIG_FILENAME)) {
    configure(USER_LOG_CONFIG_FILENAME);
} else {
    configure(DEFAULT_LOG_CONFIG_FILENAME);
}
let raccoonLogger = getLogger("raccoon-polka");

class ApiLogger {
    /**
     * 
     * @param {import('http').IncomingMessage} req 
     * @param {string} apiName
     */
    constructor(req, apiName) {
        this.request = req;
        this.apiName = apiName;

        let ip = this.request.headers["x-forwarded-for"] || this.request.socket.remoteAddress;
        this.ip = ip;
        this.prefixMessage = `[${this.apiName}] [path: ${this.request.originalUrl}] [IP: ${ip}]`;
        this.logger = getLogger("api");
    }

    addTokenValue() {
        this.logger.addContext("apiName", this.apiName);
        this.logger.addContext("originalUrl", this.request.originalUrl);
        this.logger.addContext("ip", this.ip);
    }
}

module.exports.ApiLogger = ApiLogger;

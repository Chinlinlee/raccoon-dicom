const fs = require("fs");
const path = require("path");
const { configure, getLogger } = require("log4js");
configure(path.join(__dirname, "../config/log4js.default.json"));
let raccoonLogger = getLogger("raccoon-polka");

let raccoonFHIRLogger = getLogger("raccoon-polka-fhir");

let raccoonPythonLogger = getLogger("raccoon-polka-python");

/**
 * 
 * @param {string} apiName 
 * @param {string} path 
 * @param {string} message 
 */
function apiInfoLog(apiName, path, message="") {
    if (message) {
        raccoonLogger.info(`[${apiName}] [path: ${path}] ${message}`);
    } else {
        raccoonLogger.info(`[${apiName}] [path: ${path}]`);
    }
}

function apiWarningLog(apiName, path, message="") {
    if (message) {
        raccoonLogger.warn(`[${apiName}] [path: ${path}] ${message}`);
    } else {
        raccoonLogger.warn(`[${apiName}] [path: ${path}]`);
    }
}

module.exports.logger = raccoonLogger;
module.exports.fhirLogger = raccoonFHIRLogger;
module.exports.pythonLogger = raccoonPythonLogger;
module.exports.apiInfoLog = apiInfoLog;
module.exports.apiWarningLog = apiWarningLog;

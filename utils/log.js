const fs = require("fs");
const path = require("path");
const { configure, getLogger } = require("log4js");
configure(path.join(__dirname, "../config/log4js.default.json"));
let raccoonLogger = getLogger("raccoon-polka");

let raccoonFHIRLogger = getLogger("raccoon-polka-fhir");

let raccoonPythonLogger = getLogger("raccoon-polka-python");

module.exports.logger = raccoonLogger;
module.exports.fhirLogger = raccoonFHIRLogger;
module.exports.pythonLogger = raccoonPythonLogger;

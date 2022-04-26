const fs = require('fs');
const path = require('path');
const { configure, getLogger } = require('log4js');
configure(path.join(__dirname, "../config/log4js.default.json"));
let raccoonLogger = getLogger("raccoon-polka");

module.exports.logger = raccoonLogger;

let raccoonFHIRLogger = getLogger("raccoon-polka-fhir");
module.exports.fhirLogger = raccoonFHIRLogger;

let raccoonPythonLogger =getLogger("raccoon-polka-python");
module.exports.pythonLogger = raccoonPythonLogger;
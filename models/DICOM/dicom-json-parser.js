const {
    dcm2jsonV8
} = require("./dcmtk");

class DicomJsonParser {
    constructor() {}

    async parseFromFilename(filename) {
        try {
            let dicomJson = await dcm2jsonV8.exec(filename);
            return dicomJson;
        } catch (e) {
            throw e;
        }
    }
}

module.exports.DicomJsonParser = DicomJsonParser;

const { DicomUtf8Converter } = require("./dcm4che/DicomUtf8Converter");
const {
    dcm2jsonV8
} = require("./dcmtk");
const { logger } = require("../../utils/log");


class DicomJsonParser {
    constructor() {}

    async parseFromFilename(filename) {
        let dicomJson;
        try {
            dicomJson = await dcm2jsonV8.exec(filename);
            return dicomJson;
        } catch (e) {

            /**
             * EXITCODE_CANNOT_CONVERT_TO_UNICODE is usually due to dicom file missing (0008,0005)
             * To fix this error, we use dcmconv to convert DICOM file to UTF-8 (ISO_IR 192)
             */
            if (e.message.includes("EXITCODE_CANNOT_CONVERT_TO_UNICODE")) {
                logger.warn(`The file: ${filename} may missing/incorrect (0008,0005) charset, converter dicom to UTF8`);

                try {
                    let dicomUtf8Converter = new DicomUtf8Converter(filename);
                    await dicomUtf8Converter.convert();
                
                    dicomJson = await dcm2jsonV8.exec(filename);
                    return dicomJson;
                } catch(e) {
                    throw e;
                }
            }

            throw e;
        }
    }
}

module.exports.DicomJsonParser = DicomJsonParser;

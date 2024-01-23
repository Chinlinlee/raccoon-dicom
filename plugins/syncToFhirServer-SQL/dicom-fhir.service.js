const { fhirLogger } = require("@root/utils/logs/log");
const { DicomFhirService } = require("../syncToFhirServer/dicom-fhir.service");
const { DicomFhirConverter } = require("./DICOMToFHIR");

class SqlDicomFhirService extends DicomFhirService {
    constructor(req, dicomJsonModel) { 
        super(req, dicomJsonModel); 
        this.dicomFhirConverter = new DicomFhirConverter();
    }

    async storeSyncedFHIRLog_(logObj) {
        fhirLogger.info(JSON.stringify(logObj));
    }
}

module.exports.DicomFhirService = SqlDicomFhirService;
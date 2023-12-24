const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { PatientModel } = require("@models/sql/models/patient.model");
const { DeletePatientService } = require("@root/api/dicom-web/controller/PAM-RS/service/delete-patient.service");

class SqlDeletePatientService extends DeletePatientService {
    constructor(req, res) {
        super(req, res);
    }

    async delete() {
        let { patientID } = this.request.params;
        let patient = await PatientModel.findOne({ 
            "x00100020": patientID
         });
        if (!patient) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.NoSuchObjectInstance,
                `Patient "${this.request.params.patientID}" does not exist.`,
                404
            );
        }

        await patient.incrementDeleteStatus();
    }
}

module.exports.DeletePatientService = SqlDeletePatientService;
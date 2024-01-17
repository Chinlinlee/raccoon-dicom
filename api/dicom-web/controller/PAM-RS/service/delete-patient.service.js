const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { PatientModel } = require("@dbModels/patient.model");

class DeletePatientService {
    constructor(req, res) {
        /** @type { import("express").Request } */
        this.request = req;
        /** @type { import("express").Response } */
        this.response = res;
    }

    async delete() {
        let { patientID } = this.request.params;
        let patient = await PatientModel.findOne({ patientID});
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

module.exports.DeletePatientService = DeletePatientService;
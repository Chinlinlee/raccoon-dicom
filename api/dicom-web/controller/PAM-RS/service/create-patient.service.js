const { PatientModel } = require("@dbModels/patient.model");
const { set, get } = require("lodash");

class CreatePatientService {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async create() {
        let incomingPatient = this.request.body;
        let patientID = get(incomingPatient, "00100020.Value.0");
        set(incomingPatient, "patientID", patientID);
        let patient = await PatientModel.createOrUpdatePatient(patientID, incomingPatient);
        return patient.toGeneralDicomJson();
    }
}

module.exports.CreatePatientService = CreatePatientService;
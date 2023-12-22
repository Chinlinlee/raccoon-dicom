const { PatientModel } = require("@models/mongodb/models/patient.model");
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
        set(incomingPatient, "patientID", get(incomingPatient, "00100020.Value.0"));
        const patient = new PatientModel(incomingPatient);
        return await patient.save();
    }
}

module.exports.CreatePatientService = CreatePatientService;
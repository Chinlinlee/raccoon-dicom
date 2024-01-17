const { PatientModel } = require("@dbModels/patient.model");
const { set, get } = require("lodash");
const shortHash = require("shorthash2");
const { v4: uuidV4 } = require("uuid");

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
        let patientID = shortHash(uuidV4());
        set(incomingPatient, "patientID", patientID);
        set(incomingPatient, "00100020.Value", [
            patientID
        ]);
        const patient = new PatientModel(incomingPatient);
        await patient.save();
        return {
            patientID
        };
    }
}

module.exports.CreatePatientService = CreatePatientService;
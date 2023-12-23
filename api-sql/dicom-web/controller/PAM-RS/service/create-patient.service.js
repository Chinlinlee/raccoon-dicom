const { PatientPersistentObject } = require("@models/sql/po/patient.po");
const { CreatePatientService } = require("@root/api/dicom-web/controller/PAM-RS/service/create-patient.service");
const { set } = require("lodash");
const shortHash = require("shorthash2");
const { v4: uuidV4 } = require("uuid");

class SqlCreatePatientService extends CreatePatientService {
    constructor(req, res) {
        super(req, res);
    }

    async create() {
        
        let incomingPatient = this.request.body;
        let patientID = shortHash(uuidV4());
        set(incomingPatient, "patientID", patientID);
        set(incomingPatient, "00100020.Value", [
            patientID
        ]);
        
        const patient = new PatientPersistentObject(incomingPatient);
        await patient.createPatient();
        return {
            patientID
        };
    }
}

module.exports.CreatePatientService = SqlCreatePatientService;
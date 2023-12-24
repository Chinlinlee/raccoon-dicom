const { PatientPersistentObject } = require("@models/sql/po/patient.po");
const { UpdatePatientService } = require("@root/api/dicom-web/controller/PAM-RS/service/update-patient.service");


class SqlUpdatePatientService extends UpdatePatientService {
    constructor(req, res) {
        super(req, res);
    }

    async update() {
        let patientPO = new PatientPersistentObject(this.incomingPatient);

        return await patientPO.createPatient();
    }
}

module.exports.UpdatePatientService = SqlUpdatePatientService;
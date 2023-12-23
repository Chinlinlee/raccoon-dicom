const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { PatientModel } = require("@models/mongodb/models/patient.model");
const { set } = require("lodash");


class UpdatePatientService {
    constructor(req, res) {
        /** @type { import("express").Request } */
        this.request = req;
        /** @type { import("express").Response } */
        this.response = res;
        this.incomingPatient = this.request.body;
        this.#adjustIncomingPatient();
    }

    async update() {
        let { patientID } = this.request.params;
        return await PatientModel.findOneAndUpdate({
            patientID
        }, {
            $set: {
                ...this.incomingPatient
            }
        }, {
            upsert: true,
            new: true
        });
    }
    
    #adjustIncomingPatient() {
        set(this.incomingPatient, "00100020.Value", [this.request.params.patientID]);
        set(this.incomingPatient, "patientID", this.request.params.patientID);
    }
}

module.exports.UpdatePatientService = UpdatePatientService;
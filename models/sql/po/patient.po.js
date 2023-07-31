const moment = require("moment");
const _ = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { PatientModel } = require("../models/patient.model");
const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");


class PatientPersistentObject {
    constructor(dicomJson) {
        this.json = {};
        Object.keys(tagsNeedStore.Patient).forEach(key => {
            let value = _.get(dicomJson, key);
            value ? _.set(this.json, key, value) : undefined;
        });
        this.x00100010 = _.get(dicomJson, "00100010.Value.0", "");
        this.x00100020 = _.get(dicomJson, "00100020.Value.0", "");
        this.x00100021 = _.get(dicomJson, "00100021.Value.0", "");
        this.x00100030 = _.get(dicomJson, "00100030.Value.0", "");
        this.x00100032 = _.get(dicomJson, "00100032.Value.0", "");
        this.x00100040 = _.get(dicomJson, "00100040.Value.0", "");
        this.x00102160 = _.get(dicomJson, "00102160.Value.0", "");
        this.x00104000 = _.get(dicomJson, "00104000.Value.0", "");
        this.x00880130 = _.get(dicomJson, "00880130.Value.0", "");
        this.x00880140 = _.get(dicomJson, "00880140.Value.0", "");
    }

    async createPersonName() {
        if (this.x00100010) {
            return await PersonNameModel.create({
                alphabetic: _.get(this.x00100010, "Alphabetic", undefined),
                ideographic: _.get(this.x00100010, "Ideographic", undefined),
                phonetic: _.get(this.x00100010, "Phonetic", undefined)
            });
        }
        return undefined;
    }

    async createPatient() {
        let [patient, created] = await PatientModel.findOrCreate({
            where: {
                x00100020: this.x00100020
            },
            defaults: {
                json: this.json,
                x00100020: this.x00100020,
                x00100021: this.x00100021,
                x00100030: this.x00100030 ? this.x00100030 : undefined,
                x00100032: this.x00100032 ? Number(this.x00100032) : undefined,
                x00100040: this.x00100040,
                x00102160: this.x00102160,
                x00104000: this.x00104000,
                x00880130: this.x00880130,
                x00880140: this.x00880140
            }
        });

        if (created) {
            let personName = await this.createPersonName();
            patient.x00100010 = personName ? personName.id : undefined;
            await patient.save();
        }

        return patient;
    }

}

module.exports.PatientPersistentObject = PatientPersistentObject;
const moment = require("moment");
const _ = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { PatientModel } = require("../models/patient.model");
const { StudyModel } = require("../models/study.model");
const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");



class StudyPersistentObject {
    constructor(dicomJson, patient) {
        
        this.json = {};
        Object.keys(tagsNeedStore.Study).forEach(key => {
            let value = _.get(dicomJson, key);
            value ? _.set(this.json, key, value) : undefined;
        });
        this.patient = patient;

        this.x00080005 = _.get(dicomJson, "00080005.Value", undefined);
        this.x00080020 = _.get(dicomJson, "00080020.Value.0", "");
        this.x00080030 = _.get(dicomJson, "00080030.Value.0", "");
        this.x00080050 = _.get(dicomJson, "00080050.Value.0", "");
        this.x00080056 = _.get(dicomJson, "00080056.Value.0", "");
        this.x00080061 = _.get(dicomJson, "00080061.Value.0", undefined);
        this.x00080090 = _.get(dicomJson, "00080090.Value.0", "");
        this.x00080201 = _.get(dicomJson, "00080201.Value.0", "");
        this.x0020000D = _.get(dicomJson, "0020000D.Value.0", "");
        this.x00200010 = _.get(dicomJson, "00200010.Value.0", "");
        this.x00201206 = _.get(dicomJson, "00201206.Value.0", "");
        this.x00201208 = _.get(dicomJson, "00201208.Value.0", "");
    }

    async createReferringPhysicianName() {
        if (this.x00080090) {
            return await PersonNameModel.create({
                alphabetic: _.get(this.x00080090, "Alphabetic", undefined),
                ideographic: _.get(this.x00080090, "Ideographic", undefined),
                phonetic: _.get(this.x00080090, "Phonetic", undefined)
            });
        }
        return undefined;
    }

    async createStudy() {
        let [study, created] = await StudyModel.findOrCreate({
            where: {
                x0020000D: this.x0020000D
            },
            defaults: {
                json: this.json,
                x00100020: this.patient.x00100020,
                x00080005 : this.x00080005,
                x00080020 : this.x00080020,
                x00080030 : this.x00080030 ? Number(this.x00080030) : undefined,
                x00080050 : this.x00080050,
                x00080056 : this.x00080056,
                x00080061 : this.x00080061,
                x00080201 : this.x00080201,
                x0020000D : this.x0020000D,
                x00200010 : this.x00200010,
                x00201206 : this.x00201206,
                x00201208 : this.x00201208
            }
        });

        if (created) {
            let referringPhysicianName = await this.createReferringPhysicianName();
            study.x00080090 = referringPhysicianName ? referringPhysicianName.id : undefined;
            await study.save();
        }

        return study;
    }

    async updateModalitiesInStudy() {
        //TODO
    }

}

module.exports.StudyPersistentObject = StudyPersistentObject;
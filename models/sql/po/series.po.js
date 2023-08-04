const moment = require("moment");
const _ = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { SeriesModel } = require("../models/series.model");

const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");

class SeriesPersistentObject {
    constructor(dicomJson, study) {

        this.json = {};
        Object.keys({
            ...tagsNeedStore.Study,
            ...tagsNeedStore.Series
        }).forEach(key => {
            let value = _.get(dicomJson, key);
            value ? _.set(this.json, key, value) : undefined;
        });
        this.study = study;
        this.seriesPath = _.get(dicomJson, "seriesPath", "");

        this.x0020000D = this.study.x0020000D;
        this.x0020000E = _.get(dicomJson, "0020000E.Value.0", "");
        this.x00080021 = _.get(dicomJson, "00080021.Value.0", undefined);
        this.x00080060 = _.get(dicomJson, "00080060.Value.0", "");
        this.x0008103E = _.get(dicomJson, "0008103E.Value.0", "");
        this.x0008103F = _.get(dicomJson, "0008103F.Value", undefined);
        this.x00081050 = _.get(dicomJson, "00081050.Value", "");
        this.x00081052 = _.get(dicomJson, "00081052.Value.0", "");
        this.x00081070 = _.get(dicomJson, "00081070.Value", "");
        this.x00081072 = _.get(dicomJson, "00081072.Value", "");
        this.x00081250 = _.get(dicomJson, "00081250.Value", "");
        this.x00200011 = _.get(dicomJson, "00200011.Value.0", "");
        this.x00400244 = _.get(dicomJson, "00400244.Value.0", undefined);
        this.x00400245 = _.get(dicomJson, "00400245.Value.0", "");
        this.x00400275 = _.get(dicomJson, "00400275.Value.0", "");
        this.x00080031 = _.get(dicomJson, "00080031.Value.0", "");
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

    async createPersonNames(field) {
        let personNames = [];
        if (this[field]) {
            for (let personName of this[field]) {
                let personNameSequelize = await PersonNameModel.create({
                    alphabetic: _.get(personName, "Alphabetic", undefined),
                    ideographic: _.get(personName, "Ideographic", undefined),
                    phonetic: _.get(personName, "Phonetic", undefined)
                });
                personNames.push(personNameSequelize);
            }
        }
        return personNames;
    }

    async addPerformingPhysicianNames(series) {
        let performingPhysicianNames = await this.createPersonNames("x00081050");
        for (let performingPhysicianName of performingPhysicianNames) {
            await series.addPerformingPhysicianName(performingPhysicianName);
        }
    }

    async addOperatorsNames(series) {
        let operationsNames = await this.createPersonNames("x00081070");
        for (let operationsName of operationsNames) {
            await series.addOperatorsName(operationsName);
        }
    }

    async createSeries() {
        let [series, created] = await SeriesModel.findOrCreate({
            where: {
                x0020000D: this.x0020000D,
                x0020000E: this.x0020000E
            },
            defaults: {
                json: this.json,
                x0020000D: this.x0020000D,
                x0020000E: this.x0020000E,
                x00080021: this.x00080021,
                x00080060: this.x00080060,
                x0008103E: this.x0008103E,
                x0008103F: this.x0008103F,
                x00081050: this.x00081050,
                x00081052: this.x00081052,
                x00081070: this.x00081070,
                x00081072: this.x00081072,
                x00081250: this.x00081250,
                x00200011: this.x00200011,
                x00400244: this.x00400244,
                x00400245: this.x00400245 ? Number(this.x00400245) : undefined,
                x00400275: this.x00400275,
                x00080031: this.x00080031 ? Number(this.x00080031) : undefined,
                seriesPath: this.seriesPath
            }
        });

        if (created) {
            await this.addPerformingPhysicianNames(series);
            await this.addOperatorsNames(series);
            await series.save();
        }
        
        return series;
    }

}

module.exports.SeriesPersistentObject = SeriesPersistentObject;
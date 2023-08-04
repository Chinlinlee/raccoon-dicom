const moment = require("moment");
const _ = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { InstanceModel } = require("../models/instance.mode");

const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");

const INSTANCE_STORE_TAGS = {
    "00080016": true,
    "00080018": true,
    "00080023": true,
    "00080033": true,
    "00200013": true,
    "0040A043": true,
    "0040A073": true,
    "0040A491": true,
    "0040A493": true,
    "0040A730": true,
    "00080008": true,
    "0040A032": true,
    "00081115": true,
    "00280008": true,
    "00280010": true,
    "00280011": true,
    "00280100": true,
    "0040A370": true,
    "0040A375": true,
    "0040A504": true,
    "0040A525": true,
    "00420010": true,
    "00420012": true,
    "00700080": true,
    "00700081": true,
    "00700082": true,
    "00700083": true,
    "00700084": true,
    "00080005": true,
    "00081190": true,
    "00080054": true,
    "00080056": true,
    ...tagsNeedStore.Patient,
    ...tagsNeedStore.Study,
    ...tagsNeedStore.Series
};

class InstancePersistentObject {
    constructor(dicomJson, series) {
        this.json = {};
        Object.keys(INSTANCE_STORE_TAGS).forEach(key => {
            let value = _.get(dicomJson, key);
            value ? _.set(this.json, key, value) : undefined;
        });
        this.series = series;
        this.instancePath = _.get(dicomJson, "instancePath", "");

        this.x0020000D = this.series.x0020000D;
        this.x0020000E = this.series.x0020000E;
        this.x00080018 = _.get(dicomJson, "00080018.Value.0", undefined);
        this.x00080016 = _.get(dicomJson, "00080016.Value.0", undefined);
        this.x00080023 = _.get(dicomJson, "00080023.Value.0", undefined);
        this.x00080033 = _.get(dicomJson, "00080033.Value.0", undefined);
        this.x00200013 = _.get(dicomJson, "00200013.Value.0", undefined);
        this.x0040A043 = _.get(dicomJson, "0040A043.Value", undefined);
        this.x0040A073 = _.get(dicomJson, "0040A073.Value", undefined);
        this.x0040A491 = _.get(dicomJson, "0040A491.Value.0", undefined);
        this.x0040A493 = _.get(dicomJson, "0040A493.Value.0", undefined);
        this.x0040A730 = _.get(dicomJson, "0040A730.Value", undefined);
    }


    async createInstance() {

        let item = {
            json: this.json,
            x0020000D: this.x0020000D,
            x0020000E: this.x0020000E,
            x00080018: this.x00080018,
            x00080016: this.x00080016,
            x00080023: this.x00080023,
            x00080033: this.x00080033 ? Number(this.x00080033) : undefined,
            x00200013: this.x00200013,
            x0040A043: this.x0040A043,
            x0040A073: this.x0040A073,
            x0040A491: this.x0040A491,
            x0040A493: this.x0040A493,
            x0040A730: this.x0040A730,
            instancePath: this.instancePath
        };

        let [instance, created] = await InstanceModel.findOrCreate({
            where: {
                x0020000D: this.x0020000D,
                x0020000E: this.x0020000E,
                x00080018: this.x00080018
            },
            defaults: item
        });

        if (created) {
            // do nothing
        } else {
            await InstanceModel.update(item, {
                where: {
                    x00080018: instance.dataValues.x00080018
                }
            });
        }

        return instance;
    }

}

module.exports.InstancePersistentObject = InstancePersistentObject;
const moment = require("moment");
const { get, set } = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { StudyModel } = require("../models/study.model");
const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { vrValueTransform } = require("./utils");
const { WorkItemModel } = require("../models/workItems.model");


class UpsWorkItemPersistentObject {
    constructor(dicomJson, patient) {

        this.json = {};
        this.initJsonProperties(dicomJson);

        this.patient = patient;

        let dicomJsonObj = new BaseDicomJson(dicomJson);
        this.upsInstanceUID = get(dicomJson, "upsInstanceUID", "");
        this.patientID = get(dicomJson, "patientID", "");
        this.transactionUID = get(dicomJson, "transactionUID", "");

        this.x00100020 = dicomJsonObj.getValue("00100020");
        this.x00080018 = dicomJsonObj.getValue("00080018");
        this.x00741200 = dicomJsonObj.getValue("00741200");
        this.x00404010 = dicomJsonObj.getValue("00404010");
        this.x00741204 = dicomJsonObj.getValue("00741204");
        this.x00741202 = dicomJsonObj.getValue("00741202");
        this.x00404025 = dicomJsonObj.getValue("00404025");
        this.x00404026 = dicomJsonObj.getValue("00404026");
        this.x00404027 = dicomJsonObj.getValue("00404027");
        this.x00404034 = dicomJsonObj.getValue("00404034");
        this.x00404005 = dicomJsonObj.getValue("00404005");
        this.x00404011 = dicomJsonObj.getValue("00404011");
        this.x00380010 = dicomJsonObj.getValue("00380010");
        this.x00741000 = dicomJsonObj.getValue("00741000");
        this.x00080082 = dicomJsonObj.getValue("00080082");
    }

    initJsonProperties(dicomJson) {
        Object.keys({
            ...tagsNeedStore.UPS,
            ...tagsNeedStore.Patient
        }).forEach(key => {
            let value = get(dicomJson, key);
            value ? set(this.json, key, value) : undefined;
        });
    }

    async save() {
        let item = {
            json: this.json,
            upsInstanceUID : this.upsInstanceUID,
            patientID : this.patientID,
            transactionUID : this.transactionUID,
            x00100020: this.x00100020,
            x00080018: this.x00080018,
            x00741200: this.x00741200,
            x00404010: vrValueTransform.DT(this.x00404010),
            x00741204: this.x00741204,
            x00741202: this.x00741202,
            //TODO: dicom code x00404025: this.x00404025,
            //TODO: dicom code x00404026: this.x00404026,
            //TODO: dicom code x00404027: this.x00404027,
            //TODO: dicom code x00404034: this.x00404034, 
            x00404005: vrValueTransform.DT(this.x00404005),
            x00404011: vrValueTransform.DT(this.x00404011),
            x00380010: this.x00380010,
            x00741000: this.x00741000
            //TODO dicom code x00080082: this.x00080082
        };

        let upsWorkItemObj = WorkItemModel.build(item);
        let [upsWorkItem, created] = await WorkItemModel.findOrCreate({
            where: {
                upsInstanceUID: this.upsInstanceUID
            },
            defaults: upsWorkItemObj.toJSON()
        });

        if (created) {
            let patientName = await PersonNameModel.createPersonName(this.x00100010);
            upsWorkItem.x00100010 = patientName ? patientName.id : undefined;
            await upsWorkItem.save();
        } else {
            await WorkItemModel.update(item, {
                where: {
                    upsInstanceUID: upsWorkItem.dataValues.upsInstanceUID
                }
            });
            await PersonNameModel.updatePersonNameById(this.x00100010, upsWorkItem.getDataValue("x00100010"));
        }

        return upsWorkItem;
    }
}

module.exports.UpsWorkItemPersistentObject = UpsWorkItemPersistentObject;
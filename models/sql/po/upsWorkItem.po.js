const { get, set } = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { vrValueTransform } = require("./utils");
const { WorkItemModel } = require("../models/workItems.model");
const { DicomCodeModel } = require("../models/dicomCode.model");


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
        this.x00404005 = dicomJsonObj.getValue("00404005");
        let scheduledHumanPerformerSequence = new BaseDicomJson(dicomJsonObj.getValue("00404034"));
        this.x00404009 = scheduledHumanPerformerSequence.getValue("00404009");
        this.x00404037 = scheduledHumanPerformerSequence.getValue("00404037");
        this.x00404036 = scheduledHumanPerformerSequence.getValue("00404036");
        this.x00404011 = dicomJsonObj.getValue("00404011");
        this.x00400418 = dicomJsonObj.getValue("00400418");
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
            x00741200: this.x00741200,
            x00404010: vrValueTransform.DT(this.x00404010),
            x00741204: this.x00741204,
            x00741202: this.x00741202,
            x00404036: this.x00404036,
            x00404005: vrValueTransform.DT(this.x00404005),
            x00404011: vrValueTransform.DT(this.x00404011),
            x00380010: this.x00380010,
            x00741000: this.x00741000
        };

        let upsWorkItemObj = WorkItemModel.build(item);
        let [upsWorkItem, created] = await WorkItemModel.findOrCreate({
            where: {
                upsInstanceUID: this.upsInstanceUID
            },
            defaults: upsWorkItemObj.toJSON()
        });
        await upsWorkItem.setPatient(this.patient);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledStationNameCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledStationClassCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledStationGeographicLocationCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.HumanPerformerCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledWorkitemCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.InstitutionCodeSequence);
        await this.setHumanPerformerName(upsWorkItem);


        if (created) {
            await upsWorkItem.save();
        } else {
            await WorkItemModel.update(item, {
                where: {
                    upsInstanceUID: upsWorkItem.dataValues.upsInstanceUID
                }
            });
        }

        return upsWorkItem;
    }

    async setGeneralCode(item, tag) {
        if (this[`x${tag}`]) {
            let code = await DicomCodeModel.create({
                "x00080100": get(this[`x${tag}`], "00080100.Value.0", undefined),
                "x00080102": get(this[`x${tag}`], "00080102.Value.0", undefined),
                "x00080103": get(this[`x${tag}`], "00080103.Value.0", undefined),
                "x00080104": get(this[`x${tag}`], "00080104.Value.0", undefined)
            });
            let keyword = dictionary.tag[tag];
            await item[`set${keyword}`](code);
        }
    }

    async setHumanPerformerName(upsWorkItem) {
        if (this.x00404037) {
            let nameOfHumanPerformer = await PersonNameModel.createPersonName(this.x00404037);
            await upsWorkItem[`set${dictionary.tag["00404037"]}`](nameOfHumanPerformer);
        }
    }
}

module.exports.UpsWorkItemPersistentObject = UpsWorkItemPersistentObject;
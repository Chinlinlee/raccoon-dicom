const { get, set, cloneDeep, unset } = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { vrValueTransform } = require("./utils");
const { WorkItemModel } = require("../models/workitems.model");
const { DicomCodeModel } = require("../models/dicomCode.model");
const { UpsRequestAttributesModel } = require("../models/upsRequestAttributes.model");
const { UpdateWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/update-workItem.service");


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

        // issuer of Admission ID
        let issuerOfAdmissionIdSequence = new BaseDicomJson(dicomJsonObj.getValue("00380014"));
        this.admissionLocalEntityId = issuerOfAdmissionIdSequence.getValue("00400031");
        this.admissionUniversalEntityId = issuerOfAdmissionIdSequence.getValue("00400032");
        this.admissionUniversalEntityIdType = issuerOfAdmissionIdSequence.getValue("00400033");
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

    async save(adjust=true) {
        let upsWorkItemObj = WorkItemModel.build(this.getPersistentObject());
        let [upsWorkItem, created] = await WorkItemModel.findOrCreate({
            where: {
                upsInstanceUID: this.upsInstanceUID
            },
            defaults: upsWorkItemObj.toJSON()
        });
        let tempUpsWorkItem = cloneDeep(upsWorkItem);

        
        await upsWorkItem.setPatient(this.patient);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledStationNameCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledStationClassCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledStationGeographicLocationCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.HumanPerformerCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.ScheduledWorkitemCodeSequence);
        await this.setGeneralCode(upsWorkItem, dictionary.keyword.InstitutionCodeSequence);
        await this.setHumanPerformerName(upsWorkItem);

        let requestAttributeDAO = new UpsWorkItemRequestAttributeDAO(this.upsInstanceUID, this.json);
        await requestAttributeDAO.update(upsWorkItem);

        if (!created) {
            await this.removeAllAssociationItems(tempUpsWorkItem);
            if (adjust) {
                this.adjustUpdateWorkItem();
            }
            upsWorkItem.json = {
                ...upsWorkItem.json,
                ...this.json
            };
            upsWorkItem.changed("json", true);
        } 
        await upsWorkItem.save();

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

    async removeAllAssociationItems(upsWorkItem) {
        const associationItemsNames = [
            "ScheduledStationNameCodeSequence",
            "ScheduledStationClassCodeSequence",
            "ScheduledStationGeographicLocationCodeSequence",
            "HumanPerformerCodeSequence",
            "ScheduledWorkitemCodeSequence",
            "InstitutionCodeSequence",
            "HumanPerformerName"
        ];

        for (let i = 0 ; i < associationItemsNames.length ; i++) {
            let associationItemName = associationItemsNames[i];
            let associationItem = await upsWorkItem[`get${associationItemName}`]();
            if (associationItem) {
                await associationItem.destroy();
            }
        }
    }

    getPersistentObject() {
        return {
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
            x00741000: this.x00741000,
            x00380014_x00400031: this.admissionLocalEntityId,
            x00380014_x00400032: this.admissionUniversalEntityId,
            x00380014_x00400033: this.admissionUniversalEntityIdType
        };
    }

    adjustUpdateWorkItem() {
        for (let i = 0; i < UpdateWorkItemService.notAllowedAttributes.length; i++) {
            let notAllowedAttr = UpdateWorkItemService.notAllowedAttributes[i];
            unset(this.json, notAllowedAttr);
        }
    }
}

class UpsWorkItemRequestAttributeDAO {
    constructor(upsInstanceUID, dicomJson) {
        this.dicomJson = dicomJson;
        this.dicomJsonObj = new BaseDicomJson(this.dicomJson);
        this.upsInstanceUID = upsInstanceUID;
    }

    async getRequestAttribute() {
        let requestAttribute = this.dicomJsonObj.getValue(dictionary.keyword.ReferencedRequestSequence);
        if (requestAttribute) {
            return {
                upsInstanceUID: this.upsInstanceUID,
                x00080050: get(requestAttribute, "00080050.Value.0"),
                x00080051_x00400031: get(requestAttribute, "00080051.Value.0.00400031.Value.0"),
                x00080051_x00400032: get(requestAttribute, "00080051.Value.0.00400032.Value.0"),
                x00080051_x00400033: get(requestAttribute, "00080051.Value.0.00400033.Value.0"),
                x00321033: get(requestAttribute, "00321033.Value.0"),
                x00401001: get(requestAttribute, "00401001.Value.0"),
                x0020000D: get(requestAttribute, "0020000D.Value.0")
            };
        }

        return undefined;
    }


    /**
     * 
     * @param {WorkItemModel} workItem 
     */
    async update(workItem) {
        let requestAttributes = await this.getRequestAttribute();
        if (requestAttributes) {
            if (await workItem.getUpsRequestAttributesModel()) {
                await UpsRequestAttributesModel.update(requestAttributes, {
                    where: {
                        upsInstanceUID: workItem.upsInstanceUID
                    }
                });
            } else {
                await workItem.createUpsRequestAttributesModel(requestAttributes);
            }
        } else {
            await UpsRequestAttributesModel.destroy({
                where: {
                    upsInstanceUID: workItem.upsInstanceUID
                }
            });
        }
    }
}

module.exports.UpsWorkItemPersistentObject = UpsWorkItemPersistentObject;
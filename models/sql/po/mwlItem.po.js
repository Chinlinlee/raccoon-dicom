const { get, set, cloneDeep, unset } = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");
const { BaseDicomJson } = require("@models/DICOM/dicom-json-model");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { vrValueTransform } = require("./utils");
const { DicomCodeModel } = require("../models/dicomCode.model");
const { MwlItemModel } = require("../models/mwlItems.model");
const { Op } = require("sequelize");


class MwlItemPersistentObject {
    constructor(dicomJson, patient) {

        this.json = {};
        this.initJsonProperties(dicomJson);

        this.patient = patient;

        let dicomJsonObj = new BaseDicomJson(dicomJson);
        this.study_instance_uid = dicomJsonObj.getValue("0020000D");
        this.accession_number = dicomJsonObj.getValue(dictionary.keyword.AccessionNumber);
        this.accno_local_id = dicomJsonObj.getValue(`${dictionary.keyword.IssuerOfAccessionNumberSequence}.Value.0.${dictionary.keyword.LocalNamespaceEntityID}`);
        this.accno_universal_id = dicomJsonObj.getValue(`${dictionary.keyword.IssuerOfAccessionNumberSequence}.Value.0.${dictionary.keyword.UniversalEntityID}`);
        this.accno_universal_id_type = dicomJsonObj.getValue(`${dictionary.keyword.IssuerOfAccessionNumberSequence}.Value.0.${dictionary.keyword.UniversalEntityIDType}`);
        this.requested_procedure_id = dicomJsonObj.getValue(dictionary.keyword.RequestedProcedureID);
        this.admission_id = dicomJsonObj.getValue(dictionary.keyword.AdmissionID);
        this.issuer_admission_local_id = dicomJsonObj.getValue(`${dictionary.keyword.IssuerOfAdmissionIDSequence}.Value.0.${dictionary.keyword.LocalNamespaceEntityID}`);
        this.issuer_admission_universal_id = dicomJsonObj.getValue(`${dictionary.keyword.IssuerOfAdmissionIDSequence}.Value.0.${dictionary.keyword.UniversalEntityID}`);
        this.issuer_admission_universal_id_type = dicomJsonObj.getValue(`${dictionary.keyword.IssuerOfAdmissionIDSequence}.Value.0.${dictionary.keyword.UniversalEntityIDType}`);
        // #region sps (Scheduled Procedure Step)
        this.station_ae_title = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.StationAETitle}`);
        this.station_name = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.StationName}`);
        this.start_date = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStartDate}`);
        this.end_date = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepEndDate}`);
        this.start_time = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStartTime}`);
        this.end_time = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepEndTime}`);
        this.physician_name = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledPerformingPhysicianName}`);
        this.procedure_step_location = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepLocation}`);
        this.description = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepDescription}`);
        this.protocol_code = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProtocolCodeSequence}`);
        this.institution_name = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.InstitutionName}`);
        this.institution_department_name = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.InstitutionalDepartmentName}`);
        this.institution_department_type_code = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.InstitutionalDepartmentTypeCodeSequence}`);
        this.institution_code = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.InstitutionCodeSequence}`);
        this.sps_id = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepID}`);
        this.sps_status = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStatus}`);
        this.modality = dicomJsonObj.getValue(`${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.Modality}`);
        // #endregion
    }

    initJsonProperties(dicomJson) {
        Object.keys({
            ...tagsNeedStore.MWL,
            ...tagsNeedStore.Patient
        }).forEach(key => {
            let value = get(dicomJson, key);
            value ? set(this.json, key, value) : undefined;
        });
    }

    async save() {
        let mwlItemObj = MwlItemModel.build(this.getPersistentObject());
        mwlItemObj.patient_id = this.patient.x00100020;
        let [mwlItem, created] = await MwlItemModel.findOrCreate({
            where: {
                [Op.and]: [
                    {
                        sps_id: this.sps_id
                    },
                    {
                        study_instance_uid: this.study_instance_uid
                    }
                ]
            },
            defaults: mwlItemObj.toJSON()
        });
        let tempClonedMwlItem = cloneDeep(mwlItem);

        await this.setGeneralCode(mwlItem, dictionary.keyword.InstitutionalDepartmentTypeCodeSequence);
        await this.setGeneralCode(mwlItem, dictionary.keyword.InstitutionCodeSequence);
        await this.setGeneralCode(mwlItem, dictionary.keyword.ScheduledProtocolCodeSequence);
        await this.setPhysicianName(mwlItem);
        if (!created) {
            await this.removeAllAssociationItems(tempClonedMwlItem);
            mwlItem.json = {
                ...mwlItem.json,
                ...this.json
            };
            mwlItem.changed("json", true);
        }
        await mwlItem.save();

        return mwlItem;
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

    async setPhysicianName(mwlItem) {
        if (this.physician_name) {
            let nameOfPhysician = await PersonNameModel.createPersonName(this.physician_name);
            await mwlItem[`set${dictionary.tag["00400006"]}`](nameOfPhysician);
        }
    }

    async removeAllAssociationItems(upsWorkItem) {
        const associationItemsNames = [
            "InstitutionalDepartmentTypeCodeSequence",
            "InstitutionCodeSequence",
            "ScheduledProtocolCodeSequence",
            "ScheduledPerformingPhysicianName"
        ];

        for (let i = 0; i < associationItemsNames.length; i++) {
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
            study_instance_uid: this.study_instance_uid,
            accession_number: this.accession_number,
            accno_local_id: this.accno_local_id,
            accno_universal_id: this.accno_universal_id,
            accno_universal_id_type: this.accno_universal_id_type,
            requested_procedure_id: this.requested_procedure_id,
            admission_id: this.admission_id,
            issuer_admission_local_id: this.issuer_admission_local_id,
            issuer_admission_universal_id: this.issuer_admission_universal_id,
            issuer_admission_universal_id_type: this.issuer_admission_universal_id_type,
            station_ae_title: this.station_ae_title,
            station_name: this.station_name,
            start_date: this.start_date,
            end_date: this.end_date,
            start_time: vrValueTransform.DT(this.start_time),
            end_time: vrValueTransform.DT(this.end_time),
            procedure_step_location: this.procedure_step_location,
            description: this.description,
            institution_name: this.institution_name,
            institution_department_name: this.institution_department_name,
            sps_id: this.sps_id,
            sps_status: this.sps_status,
            modality: this.modality
        };
    }
}

module.exports.MwlItemPersistentObject = MwlItemPersistentObject;
const _ = require("lodash");
const { Op } = require("sequelize");

const sequelize = require("../instance");
const { PersonNameModel } = require("../models/personName.model");
const { PatientQueryBuilder } = require("./patientQueryBuilder");
const { BaseQueryBuilder } = require("./querybuilder");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

class StudyQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);

        let studyInstanceUidInParams = _.get(this.queryOptions.requestParams, "studyUID");
        if (studyInstanceUidInParams) {
            this.query = {
                x0020000D: studyInstanceUidInParams
            };
        }
    }

    getIncludedPatientModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => v.model.getTableName() === "Patient");
        }
        return undefined;
    }

    getIncludedPersonNameModelInPatient() {
        let includedPatientModel = this.getIncludedPatientModel();
        if (includedPatientModel) {
            return includedPatientModel.include.find(v => v.model.getTableName() === "PersonName");
        }
        return undefined;
    }

    getIncludedPersonNameModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => v.model.getTableName() === "PersonName");
        }
        return undefined;
    }


    getStudyInstanceUID(values) {
        return this.getOrQuery(dictionary.keyword.StudyInstanceUID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    getStudyDate(values) {
        return this.getOrQuery(dictionary.keyword.StudyDate, values, BaseQueryBuilder.prototype.getDateQuery.bind(this));
    }

    getStudyTime(values) {
        return this.getOrQuery(dictionary.keyword.StudyTime, values, BaseQueryBuilder.prototype.getTimeQuery.bind(this));
    }

    getAccessionNumber(values) {
        return this.getOrQuery(dictionary.keyword.AccessionNumber, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    getModalitiesInStudy(values) {
        let stringQuery = this.getOrQuery(dictionary.keyword.Modality, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
        this.includeQueries.push({
            model: sequelize.model("Series"),
            where: {
                ...stringQuery
            },
            attributes: []
        });
    }

    getReferringPhysicianName(values) {
        let query = this.getOrQuery(dictionary.keyword.ReferringPhysicianName, values, BaseQueryBuilder.prototype.getPersonNameQuery.bind(this));
        let includedPersonNameModel = this.getIncludedPersonNameModel();
        if (!includedPersonNameModel) {
            this.includeQueries.push({
                model: PersonNameModel,
                where: {
                    [Op.or]: [
                        ...query[Op.or]
                    ]
                },
                required: true
            });
        } 
    }

    getStudyID(values) {
        return this.getOrQuery(dictionary.keyword.StudyID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }
}

module.exports.StudyQueryBuilder = StudyQueryBuilder;
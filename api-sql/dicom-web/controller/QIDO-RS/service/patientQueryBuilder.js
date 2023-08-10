const _ = require("lodash");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder } = require("./querybuilder");
const sequelize = require("@models/sql/instance");
const { PersonNameModel } = require("@models/sql/models/personName.model");

class PatientQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);
        this.query = {};
    }

    getPatientName(value) {
        let { query } = this.getPersonNameQuery(dictionary.keyword.PatientName, value);
        this.includeQueries.push({
            model: PersonNameModel,
            required: true,
            where: {
                ...query
            }
        });
    }

    getPatientID(value) {
        let q = this.getStringQuery(dictionary.keyword.PatientID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getPatientBirthDate(value) {
        let q = this.getDateQuery(dictionary.keyword.PatientBirthDate, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getIssuerOfPatientID(value) {
        let q = this.getStringQuery(dictionary.keyword.IssuerOfPatientID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

}

module.exports.PatientQueryBuilder = PatientQueryBuilder;
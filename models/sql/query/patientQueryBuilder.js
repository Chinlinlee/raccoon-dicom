const _ = require("lodash");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder } = require("./querybuilder");
const sequelize = require("@models/sql/instance");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const { Op } = require("sequelize");

class PatientQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);
    }

    getIncludedPersonNameModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => v.model.getTableName() === "PersonName");
        }
        return undefined;
    }

    getPatientName(values) {
        let query = this.getOrQuery(dictionary.keyword.PatientName, values, this.getPersonNameQuery.bind(this));

        let includedPersonNameModel = this.getIncludedPersonNameModel();
        if (!includedPersonNameModel) {
            this.includeQueries.push({
                model: PersonNameModel,
                required: true,
                where: {
                    [Op.or]: query[Op.or]
                }
            });
        } 

    }

    getPatientID(values) {
        return this.getOrQuery(dictionary.keyword.PatientID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    getPatientBirthDate(value) {
        return this.getOrQuery(dictionary.keyword.PatientBirthDate, value, BaseQueryBuilder.prototype.getDateQuery.bind(this));
    }

    getIssuerOfPatientID(value) {
        return this.getOrQuery(dictionary.keyword.IssuerOfPatientID, value, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

}

module.exports.PatientQueryBuilder = PatientQueryBuilder;
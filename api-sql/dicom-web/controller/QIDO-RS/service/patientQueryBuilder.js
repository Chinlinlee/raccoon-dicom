const _ = require("lodash");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder } = require("./querybuilder");
const sequelize = require("@models/sql/instance");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const { Op } = require("sequelize");

class PatientQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);
        this.query = {};
    }

    getIncludedPersonNameModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => v.model.getTableName() === "PersonName");
        }
        return undefined;
    }

    getPatientName(value) {
        let { query } = this.getPersonNameQuery(dictionary.keyword.PatientName, value);

        let includedPersonNameModel = this.getIncludedPersonNameModel();
        if (!includedPersonNameModel) {
            this.includeQueries.push({
                model: PersonNameModel,
                required: true,
                where: {
                    [Op.or]: [
                        {
                            alphabetic: query[Op.or].alphabetic
                        },
                        {
                            ideographic: query[Op.or].ideographic
                        },
                        {
                            phonetic: query[Op.or].phonetic
                        }
                    ]
                }
            });
        } else {
            includedPersonNameModel.where[Op.or] = [
                ...includedPersonNameModel.where[Op.or],
                {
                    alphabetic: query[Op.or].alphabetic
                },
                {
                    ideographic: query[Op.or].ideographic
                },
                {
                    phonetic: query[Op.or].phonetic
                }
            ];
        }

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
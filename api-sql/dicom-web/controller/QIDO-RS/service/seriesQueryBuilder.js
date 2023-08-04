const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder } = require("./querybuilder");
const { Op, Sequelize } = require("sequelize");
const { raccoonConfig } = require("@root/config-class");

class SeriesQueryBuilder extends BaseQueryBuilder {
    getSeriesDate(value) {
        let q = this.getDateQuery(dictionary.keyword.SeriesDate, value);
        this.query = {
            ...this.query,
            ...q
        };
    }
    getModality(value) {
        let q = this.getStringQuery(dictionary.keyword.Modality, value);
        this.query = {
            ...this.query,
            ...q
        };
    }
    getSeriesDescription(value) {
        let q = this.getStringQuery(dictionary.keyword.SeriesDescription, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getPersonNameJsonArrayQuery(tag, value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.getWildCardRegexString(value);
            return {
                [Op.or]: [
                    Sequelize.literal(`"x${tag}" @? '$[*].Alphabetic ? (@ like_regex "${value}" flag "is")'`)
                ]
            };
        }
        throw new Error("Not implemented");
    }

    getPerformingPhysicianName(value) {
        let q = this.getPersonNameJsonArrayQuery(dictionary.keyword.PerformingPhysicianName, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getOperatorsName(value) {
        let q = this.getPersonNameJsonArrayQuery(dictionary.keyword.OperatorsName, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getSeriesNumber(value) {
        let q = this.getStringQuery(dictionary.keyword.SeriesNumber, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    
}

module.exports.SeriesQueryBuilder = SeriesQueryBuilder;
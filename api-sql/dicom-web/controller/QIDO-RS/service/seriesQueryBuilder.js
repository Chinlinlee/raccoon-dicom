const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder } = require("./querybuilder");
const { Op, Sequelize } = require("sequelize");
const { raccoonConfig } = require("@root/config-class");
const _ = require("lodash");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const sequelize = require("@models/sql/instance");

class SeriesQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);
        let seriesRequestAttributeSequence = new SeriesRequestAttributeSequence(this);
        this["00400275.00080050"] = SeriesRequestAttributeSequence.prototype.getAccessionNumber.bind(seriesRequestAttributeSequence);
        this["00400275.00080051.00400031"] = SeriesRequestAttributeSequence.prototype.getIssuerLocalNameSpaceEntityID.bind(seriesRequestAttributeSequence);
        this["00400275.00080051.00400032"] = SeriesRequestAttributeSequence.prototype.getIssuerUniversalEntityID.bind(seriesRequestAttributeSequence);
        this["00400275.00080051.00400033"] = SeriesRequestAttributeSequence.prototype.getIssuerUniversalEntityIDType.bind(seriesRequestAttributeSequence);
        this["00400275.00321033"] = SeriesRequestAttributeSequence.prototype.getRequestingService.bind(seriesRequestAttributeSequence);
        this["00400275.00401001"] = SeriesRequestAttributeSequence.prototype.getRequestedProcedureID.bind(seriesRequestAttributeSequence);
        this["00400275.0020000D"] = SeriesRequestAttributeSequence.prototype.getStudyInstanceUID.bind(seriesRequestAttributeSequence);
    
        this.includeQueries.push({
            model: sequelize.model("Study"),
            attributes: []
        });
    }
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
        let { query } = this.getPersonNameQuery(dictionary.keyword.PerformingPhysicianName, value);
        this.includeQueries.push({
            model: PersonNameModel,
            as: "performingPhysicianName",
            where: {
                ...query
            },
            attributes: []
        });
    }

    getOperatorsName(value) {
        let { query } = this.getPersonNameQuery(dictionary.keyword.OperatorsName, value);
        this.includeQueries.push({
            model: PersonNameModel,
            as: "operatorsName",
            where: {
                ...query
            },
            attributes: []
        });
    }

    getSeriesNumber(value) {
        let q = this.getStringQuery(dictionary.keyword.SeriesNumber, value);
        this.query = {
            ...this.query,
            ...q
        };
    }


}

class SeriesRequestAttributeSequence {
    constructor(seriesQueryBuilder) {
        /** @type {SeriesQueryBuilder} */
        this.seriesQueryBuilder = seriesQueryBuilder;
    }
    getAccessionNumber(value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.seriesQueryBuilder.getWildCardRegexString(value);
            let q = {
                [Op.or]: [
                    Sequelize.literal(`"x00400275" @? '$."00080050".Value[0] ? (@ like_regex "${value}")'`)
                ]
            };
            this.seriesQueryBuilder.query = {
                ...this.seriesQueryBuilder.query,
                ...q
            };
        }
        throw new Error("Not implemented");
    }

    getIssuerLocalNameSpaceEntityID(value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.seriesQueryBuilder.getWildCardRegexString(value);
            let q = {
                [Op.or]: [
                    Sequelize.literal(`"x00400275" @? '$."00080051".Value[0]."00400031".Value[0] ? (@ like_regex "${value}")'`)
                ]
            };

            this.seriesQueryBuilder.query = {
                ...this.seriesQueryBuilder.query,
                ...q
            };
        }

        throw new Error("Not implemented");
    }

    getIssuerUniversalEntityID(value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.seriesQueryBuilder.getWildCardRegexString(value);
            let q = {
                [Op.or]: [
                    Sequelize.literal(`"x00400275" @? '$."00080051".Value[0]."00400032".Value[0] ? (@ like_regex "${value}")'`)
                ]
            };

            this.seriesQueryBuilder.query = {
                ...this.seriesQueryBuilder.query,
                ...q
            };
        }
        throw new Error("Not implemented");
    }

    getIssuerUniversalEntityIDType(value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.seriesQueryBuilder.getWildCardRegexString(value);
            let q = {
                [Op.or]: [
                    Sequelize.literal(`"x00400275" @? '$."00080051".Value[0]."00400033".Value[0] ? (@ like_regex "${value}")'`)
                ]
            };

            this.seriesQueryBuilder.query = {
                ...this.seriesQueryBuilder.query,
                ...q
            };
        }
        throw new Error("Not implemented");
    }

    getRequestingService(value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.seriesQueryBuilder.getWildCardRegexString(value);
            let q = {
                [Op.or]: [
                    Sequelize.literal(`"x00400275" @? '$."00321033".Value[0] ? (@ like_regex "${value}")'`)
                ]
            };

            this.seriesQueryBuilder.query = {
                ...this.seriesQueryBuilder.query,
                ...q
            };
        }
        throw new Error("Not implemented");
    }

    getRequestedProcedureID(value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.seriesQueryBuilder.getWildCardRegexString(value);
            let q = {
                [Op.or]: [
                    Sequelize.literal(`"x00400275" @? '$."00401001".Value[0] ? (@ like_regex "${value}")'`)
                ]
            };
            this.seriesQueryBuilder.query = {
                ...this.seriesQueryBuilder.query,
                ...q
            };
        }
        throw new Error("Not implemented");
    }

    getStudyInstanceUID(value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            value = this.seriesQueryBuilder.getWildCardRegexString(value);
            let q = {
                [Op.or]: [
                    Sequelize.literal(`"x00400275" @? '$."0020000D".Value[0] ? (@ like_regex "${value}")'`)
                ]
            };
            this.seriesQueryBuilder.query = {
                ...this.seriesQueryBuilder.query,
                ...q
            };
        }
        throw new Error("Not implemented");
    }

}

module.exports.SeriesQueryBuilder = SeriesQueryBuilder;
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder, StudyQueryBuilder } = require("./querybuilder");
const { Op, Sequelize } = require("sequelize");
const { raccoonConfig } = require("@root/config-class");
const _ = require("lodash");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const sequelize = require("@models/sql/instance");
const { SeriesRequestAttributesModel } = require("@models/sql/models/seriesRequestAttributes.model");

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
    
        let studyQueryBuilder = new StudyQueryBuilder(queryOptions);
        let studyQuery = studyQueryBuilder.build();
        this.includeQueries.push({
            model: sequelize.model("Study"),
            attributes: ["x0020000D"],
            ...studyQuery
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
    isModelIncluded() {
        return this.seriesQueryBuilder.includeQueries.find(v=> v.model.getTableName()  === "SeriesRequestAttributes");
    }
    getAccessionNumber(value) { 
        let q = this.seriesQueryBuilder.getStringQuery("00080050", value);
        this.addQuery(q);
    }

    getIssuerLocalNameSpaceEntityID(value) {
        let q = this.seriesQueryBuilder.getStringQuery("00080051_x00400031", value);
        this.addQuery(q);
    }

    getIssuerUniversalEntityID(value) {
        let q = this.seriesQueryBuilder.getStringQuery("00080051_x00400032", value);
        this.addQuery(q);
    }

    getIssuerUniversalEntityIDType(value) {
        let q = this.seriesQueryBuilder.getStringQuery("00080051_x00400033", value);
        this.addQuery(q);
    }

    getRequestingService(value) {
        let q = this.seriesQueryBuilder.getStringQuery("00321033", value);
        this.addQuery(q);
    }

    getRequestedProcedureID(value) {
        let q = this.seriesQueryBuilder.getStringQuery("00401001", value);
        this.addQuery(q);
    }

    getStudyInstanceUID(value) {
        let q = this.seriesQueryBuilder.getStringQuery("0020000D", value);
        this.addQuery(q);
    }

    addQuery(q) {
        let currentModel = this.isModelIncluded();
        if (currentModel) {
            currentModel.where = {
                ...currentModel.where,
                ...q
            };
        } else {
            this.seriesQueryBuilder.includeQueries.push({
                model: SeriesRequestAttributesModel,
                where: {
                    ...q
                },
                attributes: []
            });
        }
    }

}

module.exports.SeriesQueryBuilder = SeriesQueryBuilder;
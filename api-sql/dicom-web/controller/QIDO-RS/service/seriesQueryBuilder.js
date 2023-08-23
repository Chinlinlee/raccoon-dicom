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
            ...studyQuery,
            required: true
        });

        let seriesInstanceUidInParams = _.get(this.queryOptions.requestParams, "seriesUID");
        if (seriesInstanceUidInParams) {
            this.query = {
                x0020000E: seriesInstanceUidInParams
            };
        }
    }

    getIncludedPerformingPhysicianNameModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => _.get(v, "as", "") === "performingPhysicianName");
        }
        return undefined;
    }

    getIncludedOperatorsNameModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => _.get(v, "as", "") === "operatorsName");
        }
        return undefined;
    }
    getSeriesDate(values) {
        return this.getOrQuery(dictionary.keyword.SeriesDate, values, BaseQueryBuilder.prototype.getDateQuery.bind(this));
    }
    getModality(values) {
        return this.getOrQuery(dictionary.keyword.Modality, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }
    getSeriesDescription(values) {
        return this.getOrQuery(dictionary.keyword.SeriesDescription, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
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

    getPerformingPhysicianName(values) {
        let query = this.getOrQuery(dictionary.keyword.PerformingPhysicianName, values, this.getPersonNameQuery.bind(this));
        let includedPerformingPhysicianNameModel = this.getIncludedPerformingPhysicianNameModel();
        if (!includedPerformingPhysicianNameModel) {
            this.includeQueries.push({
                model: PersonNameModel,
                as: "performingPhysicianName",
                where: {
                    [Op.or]: query[Op.or]
                },
                attributes: []
            });
        }

    }

    getOperatorsName(values) {
        let query = this.getOrQuery(dictionary.keyword.OperatorsName, values, this.getPersonNameQuery.bind(this));
        this.includeQueries.push({
            model: PersonNameModel,
            as: "operatorsName",
            where: {
                [Op.or]: query[Op.or]
            },
            attributes: []
        });
    }

    getSeriesNumber(values) {
        return this.getOrQuery(dictionary.keyword.SeriesNumber, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    getSeriesInstanceUID(values) {
        return this.getOrQuery(dictionary.keyword.SeriesInstanceUID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

}

class SeriesRequestAttributeSequence {
    constructor(seriesQueryBuilder) {
        /** @type {SeriesQueryBuilder} */
        this.seriesQueryBuilder = seriesQueryBuilder;
    }
    isModelIncluded() {
        return this.seriesQueryBuilder.includeQueries.find(v => v.model.getTableName() === "SeriesRequestAttributes");
    }
    getAccessionNumber(values) {
        let q = this.seriesQueryBuilder.getOrQuery(
            dictionary.keyword.AccessionNumber,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.seriesQueryBuilder)
        );
        this.addQuery(q);
    }

    getIssuerLocalNameSpaceEntityID(values) {
        let q = this.seriesQueryBuilder.getOrQuery(
            "00080051_x00400031",
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.seriesQueryBuilder)
        );
        this.addQuery(q);
    }

    getIssuerUniversalEntityID(values) {
        let q = this.seriesQueryBuilder.getOrQuery(
            "00080051_x00400032",
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.seriesQueryBuilder)
        );
        this.addQuery(q);
    }

    getIssuerUniversalEntityIDType(values) {
        let q = this.seriesQueryBuilder.getOrQuery(
            "00080051_x00400033",
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.seriesQueryBuilder)
        );
        this.addQuery(q);
    }

    /**
     *
     * @param {string[]} values - The values to be used in the query generation.
     */
    getRequestingService(values) {
        let q = this.seriesQueryBuilder.getOrQuery(
            dictionary.keyword.RequestingService,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.seriesQueryBuilder)
        );
        this.addQuery(q);
    }

    getRequestedProcedureID(values) {
        let q = this.seriesQueryBuilder.getOrQuery(
            dictionary.keyword.RequestedProcedureID,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.seriesQueryBuilder)
        );
        this.addQuery(q);
    }

    getStudyInstanceUID(values) {
        let q = this.seriesQueryBuilder.getOrQuery(
            dictionary.keyword.StudyInstanceUID,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.seriesQueryBuilder)
        );
        this.addQuery(q);
    }

    addQuery(q) {
        let currentModel = this.isModelIncluded();
        if (currentModel) {
            currentModel.where[Op.and] = [
                ...currentModel.where[Op.and],
                q
            ];
        } else {
            this.seriesQueryBuilder.includeQueries.push({
                model: SeriesRequestAttributesModel,
                where: {
                    [Op.and]: [
                        q
                    ]
                },
                attributes: []
            });
        }
    }

}

module.exports.SeriesQueryBuilder = SeriesQueryBuilder;
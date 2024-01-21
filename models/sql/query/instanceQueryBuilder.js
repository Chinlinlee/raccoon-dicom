const _ = require("lodash");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder, StudyQueryBuilder } = require("./querybuilder");
const { DicomCodeModel } = require("@models/sql/models/dicomCode.model");
const { DicomContentSqModel } = require("@models/sql/models/dicomContentSQ.model");
const { VerifyIngObserverSqModel } = require("@models/sql/models/verifyingObserverSQ.model");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const sequelize = require("@models/sql/instance");
const { SeriesQueryBuilder } = require("./seriesQueryBuilder");
const { Op } = require("sequelize");

class InstanceQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);

        let conceptNameCodeQueryBuilder = new ConceptNameCodeSqQueryBuilder(this);
        this["0040A043.00080100"] = ConceptNameCodeSqQueryBuilder.prototype.getCodeValue.bind(conceptNameCodeQueryBuilder);
        this["0040A043.00080102"] = ConceptNameCodeSqQueryBuilder.prototype.getCodingSchemeDesignator.bind(conceptNameCodeQueryBuilder);
        this["0040A043.00080103"] = ConceptNameCodeSqQueryBuilder.prototype.getCodingSchemeVersion.bind(conceptNameCodeQueryBuilder);
        this["0040A043.00080104"] = ConceptNameCodeSqQueryBuilder.prototype.getCodeMeaning.bind(conceptNameCodeQueryBuilder);

        let contentQueryBuilder = new ContentSqQueryBuilder(this);
        this["0040A730.0040A040"] = ContentSqQueryBuilder.prototype.getValueType.bind(contentQueryBuilder);
        this["0040A730.0040A010"] = ContentSqQueryBuilder.prototype.getRelationshipType.bind(contentQueryBuilder);
        this["0040A730.0040A160"] = ContentSqQueryBuilder.prototype.getTextValue.bind(contentQueryBuilder);
        this["0040A730.0040A043.00080100"] = ContentSqQueryBuilder.prototype.getConceptNameCodeValue.bind(contentQueryBuilder);
        this["0040A730.0040A043.00080102"] = ContentSqQueryBuilder.prototype.getConceptNameCodingSchemeDesignator.bind(contentQueryBuilder);
        this["0040A730.0040A043.00080103"] = ContentSqQueryBuilder.prototype.getConceptNameCodingSchemeVersion.bind(contentQueryBuilder);
        this["0040A730.0040A043.00080104"] = ContentSqQueryBuilder.prototype.getConceptNameCodeMeaning.bind(contentQueryBuilder);
        this["0040A730.0040A168.00080100"] = ContentSqQueryBuilder.prototype.getConceptCodeValue.bind(contentQueryBuilder);
        this["0040A730.0040A168.00080102"] = ContentSqQueryBuilder.prototype.getConceptCodingSchemeDesignator.bind(contentQueryBuilder);
        this["0040A730.0040A168.00080103"] = ContentSqQueryBuilder.prototype.getConceptCodingSchemeVersion.bind(contentQueryBuilder);
        this["0040A730.0040A168.00080104"] = ContentSqQueryBuilder.prototype.getConceptCodeMeaning.bind(contentQueryBuilder);

        let verifyingObserverQueryBuilder = new VerifyingObserverQueryBuilder(this);
        this["0040A073.0040A075"] = VerifyingObserverQueryBuilder.prototype.getName.bind(verifyingObserverQueryBuilder);
        this["0040A073.0040A030"] = VerifyingObserverQueryBuilder.prototype.getDateTime.bind(verifyingObserverQueryBuilder);
        this["0040A073.0040A027"] = VerifyingObserverQueryBuilder.prototype.getOrganization.bind(verifyingObserverQueryBuilder);


        let seriesQueryBuilder = new SeriesQueryBuilder(queryOptions);
        let seriesQuery = seriesQueryBuilder.build();
        this.includeQueries.push({
            model: sequelize.model("Series"),
            attributes: ["x0020000E"],
            ...seriesQuery,
            required: true
        });

        let instanceUidInParams = _.get(this.queryOptions.requestParams, "instanceUID");
        if (instanceUidInParams) {
            this.query = {
                x00080018: instanceUidInParams
            };
        }
    }

    /**
     * 
     * @param {string[]} values
     */
    getSOPClassUID(values) {
        return this.getOrQuery(dictionary.keyword.SOPClassUID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    /**
     * 
     * @param {string[]} values
     */
    getSOPInstanceUID(values) {
        return this.getOrQuery(dictionary.keyword.SOPInstanceUID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    /**
     * 
     * @param {string[]} values
     */
    getContentDate(values) {
        return this.getOrQuery(dictionary.keyword.ContentDate, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    /**
     * 
     * @param {string[]} values
     */
    getContentTime(values) {
        return this.getOrQuery(dictionary.keyword.ContentTime, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    /**
     * 
     * @param {string[]} values 
     */
    getInstanceNumber(values) {
        return this.getOrQuery(dictionary.keyword.InstanceNumber, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }
}

class ConceptNameCodeSqQueryBuilder {
    constructor(instanceQueryBuilder) {
        /** @type {InstanceQueryBuilder} */
        this.instanceQueryBuilder = instanceQueryBuilder;
    }

    isModelIncluded() {
        return this.instanceQueryBuilder.includeQueries.find(v => v.model.getTableName() === "ConceptNameCodeSQ");
    }

    getCodeValue(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodeValue, value);
        this.addQuery(q);
    }

    getCodingSchemeDesignator(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodingSchemeDesignator, value);
        this.addQuery(q);
    }

    getCodingSchemeVersion(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodingSchemeVersion, value);
        this.addQuery(q);
    }

    getCodeMeaning(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodeMeaning, value);
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
            this.instanceQueryBuilder.includeQueries.push({
                model: DicomCodeModel,
                where: {
                    ...q
                },
                attributes: []
            });
        }
    }
}

class ContentSqQueryBuilder {
    constructor(instanceQueryBuilder) {
        /** @type {InstanceQueryBuilder} */
        this.instanceQueryBuilder = instanceQueryBuilder;
        this.conceptNameCodeInclude = undefined;
    }

    isModelIncluded() {
        return this.instanceQueryBuilder.includeQueries.find(v => v.model.getTableName() === "DicomContentSQ");
    }

    getConceptNameCodeInclude() {
        let currentModel = this.isModelIncluded();
        if (currentModel && currentModel.include) {
            return currentModel.include.find(v => v.model.getTableName() === "ConceptNameCode");
        }
        return undefined;
    }

    getConceptCodeInclude() {
        let currentModel = this.isModelIncluded();
        if (currentModel && currentModel.include) {
            return currentModel.include.find(v => v.model.getTableName() === "ConceptCode");
        }
        return undefined;
    }

    getValueType(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.ValueType,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }

    getTextValue(value) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.TextValue,
            value,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }

    getRelationshipType(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.RelationshipType,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }

    getConceptNameCodeValue(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodeValue,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptNameCodeQuery(q);
    }

    getConceptNameCodingSchemeDesignator(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodingSchemeDesignator,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptNameCodeQuery(q);
    }

    getConceptNameCodingSchemeVersion(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodingSchemeVersion,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptNameCodeQuery(q);
    }

    getConceptNameCodeMeaning(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodeMeaning, 
            values, 
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptNameCodeQuery(q);
    }

    getConceptCodeValue(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodeValue, 
            values, 
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptCodeQuery(q);
    }

    getConceptCodingSchemeDesignator(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodingSchemeDesignator,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptCodeQuery(q);
    }

    getConceptCodingSchemeVersion(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodingSchemeVersion,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptCodeQuery(q);
    }

    getConceptCodeMeaning(values) {
        let q = this.getOrQuery(
            dictionary.keyword.CodeMeaning,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addConceptCodeQuery(q);
    }

    addQuery(q) {
        let currentModel = this.isModelIncluded();
        if (!currentModel) {
            this.instanceQueryBuilder.includeQueries.push({
                model: DicomContentSqModel,
                where: {
                    [Op.and]: [
                        q
                    ]
                },
                attributes: []
            });
        } else {
            currentModel.where[Op.and] = {
                ...currentModel.where[Op.and],
                q
            };
        }
    }

    addConceptNameCodeQuery(q) {
        if (!this.conceptNameCodeInclude) {
            this.conceptNameCodeInclude = {
                model: DicomCodeModel,
                as: "ConceptNameCode",
                where: {
                    [Op.and]: [
                        q
                    ]
                },
                attributes: []
            };
        } else {
            this.conceptNameCodeInclude.where[Op.and] = {
                ...this.conceptNameCodeInclude.where[Op.and],
                q
            };
        }

        let conceptNameIncluded = this.getConceptNameCodeInclude();

        if (conceptNameIncluded) {
            conceptNameIncluded = this.conceptNameCodeInclude;
        } else {
            this.addQuery({});
            let currentModel = this.isModelIncluded();
            currentModel.include = currentModel.include ? currentModel.include : [];
            conceptNameIncluded = this.getConceptNameCodeInclude();
            currentModel.include.push(this.conceptNameCodeInclude);
        }
    }

    addConceptCodeQuery(q) {
        if (!this.conceptCodeInclude) {
            this.conceptCodeInclude = {
                model: DicomCodeModel,
                as: "ConceptCode",
                where: {
                    ...q
                },
                attributes: []
            };
        } else {
            this.conceptCodeInclude.where = {
                ...this.conceptCodeInclude.where,
                ...q
            };
        }

        let conceptCodeIncluded = this.getConceptCodeInclude();

        if (conceptCodeIncluded) {
            conceptCodeIncluded = this.conceptCodeInclude;
        } else {
            this.addQuery({});
            let currentModel = this.isModelIncluded();
            currentModel.include = currentModel.include ? currentModel.include : [];
            conceptCodeIncluded = this.getConceptCodeInclude();
            currentModel.include.push(this.conceptCodeInclude);
        }
    }
}

class VerifyingObserverQueryBuilder {
    constructor(instanceQueryBuilder) {
        /** @type {InstanceQueryBuilder} */
        this.instanceQueryBuilder = instanceQueryBuilder;
    }

    isModelIncluded() {
        return this.instanceQueryBuilder.includeQueries.find(v => v.model.getTableName() === "VerifyingObserverSQ");
    }

    isPersonNameIncluded() {
        let currentModel = this.isModelIncluded();
        if (currentModel && currentModel.include) {
            return currentModel.include.find(v => v.model.getTableName() === "PersonName");
        }
        return false;
    }

    getName(values) {
        let query = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.VerifyingObserverName,
            values,
            BaseQueryBuilder.prototype.getPersonNameQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery({});
        let currentModel = this.isModelIncluded();
        currentModel.include = currentModel.include ? currentModel.include : [];
        let personNameIncluded = this.isPersonNameIncluded();
        if (!personNameIncluded) {
            currentModel.include.push({
                model: PersonNameModel,
                where: {
                    [Op.or]: query[Op.or]
                },
                attributes: []
            });
        }
    }

    getDateTime(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.VerificationDateTime,
            values,
            BaseQueryBuilder.prototype.getDateTimeQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }

    getOrganization(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.VerifyingOrganization,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }

    addQuery(q) {
        let currentModel = this.isModelIncluded();
        if (!currentModel) {
            this.instanceQueryBuilder.includeQueries.push({
                model: VerifyIngObserverSqModel,
                where: {
                    [Op.and]: [
                        q
                    ]
                },
                attributes: []
            });
        } else {
            currentModel.where[Op.and] = [
                ...currentModel.where[Op.and],
                q
            ];
        }
    }
}

module.exports.InstanceQueryBuilder = InstanceQueryBuilder;
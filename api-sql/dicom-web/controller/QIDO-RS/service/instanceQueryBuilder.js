const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder, StudyQueryBuilder } = require("./querybuilder");
const { DicomCodeModel } = require("@models/sql/models/dicomCode.model");
const { DicomContentSqModel } = require("@models/sql/models/dicomContentSQ.model");
const { VerifyIngObserverSqModel } = require("@models/sql/models/verifyingObserverSQ.model");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const sequelize = require("@models/sql/instance");
const { SeriesQueryBuilder } = require("./seriesQueryBuilder");

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
        this["0040A730.0040A160"] = ContentSqQueryBuilder.prototype.getValueType.bind(contentQueryBuilder);
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
            ...seriesQuery
        });
    }

    /**
     * 
     * @param {string} value 
     */
    getSOPClassUID(value) {
        let q = this.getStringQuery(dictionary.keyword.SOPClassUID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getSOPInstanceUID(value) {
        let q = this.getStringQuery(dictionary.keyword.SOPInstanceUID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getContentDate(value) {
        let q = this.getDateQuery(dictionary.keyword.ContentDate, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getContentTime(value) {
        let q = this.getTimeQuery(dictionary.keyword.ContentTime, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getInstanceNumber(value) {
        let q = this.getStringQuery(dictionary.keyword.InstanceNumber, value);
        this.query = {
            ...this.query,
            ...q
        };
    }
}

class ConceptNameCodeSqQueryBuilder {
    constructor(instanceQueryBuilder) {
        /** @type {InstanceQueryBuilder} */
        this.instanceQueryBuilder = instanceQueryBuilder;
    }

    isModelIncluded() {
        return this.instanceQueryBuilder.includeQueries.find(v=> v.model.getTableName()  === "ConceptNameCodeSQ");
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
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodingSchemeVersion ,value);
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
        return this.instanceQueryBuilder.includeQueries.find(v=> v.model.getTableName()  === "DicomContentSQ");
    }

    isConceptNameCodeInclude() {
        let currentModel = this.isModelIncluded();
        if (currentModel && currentModel.include) {
            return currentModel.include.find( v => v.model.getTableName() === "ConceptNameCode");
        }
        return false;
    }

    isConceptCodeInclude() {
        let currentModel = this.isModelIncluded();
        if (currentModel && currentModel.include) {
            return currentModel.include.find( v=> v.model.getTableName() === "ConceptCode");
        }
        return false;
    }

    getValueType(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.ValueType, value);
        this.addQuery(q);
    }

    getTextValue(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.TextValue, value);
        this.addQuery(q);
    }

    getRelationshipType(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.RelationshipType, value);
        this.addQuery(q);
    }

    getConceptNameCodeValue(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodeValue, value);
        this.addConceptNameCodeQuery(q);
    }

    getConceptNameCodingSchemeDesignator(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodingSchemeDesignator, value);
        this.addConceptNameCodeQuery(q);
    }

    getConceptNameCodingSchemeVersion(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodingSchemeVersion, value);
        this.addConceptNameCodeQuery(q);
    }

    getConceptNameCodeMeaning(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodeMeaning, value);
        this.addConceptNameCodeQuery(q);
    }

    getConceptCodeValue (value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodeValue, value);
        this.addConceptCodeQuery(q);
    }

    getConceptCodingSchemeDesignator(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodingSchemeDesignator, value);
        this.addConceptCodeQuery(q);
    }

    getConceptCodingSchemeVersion(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodingSchemeVersion, value);
        this.addConceptCodeQuery(q);
    }

    getConceptCodeMeaning(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.CodeMeaning, value);
        this.addConceptCodeQuery(q);
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
                model: DicomContentSqModel,
                where: {
                    ...q
                },
                attributes: []
            });
        }
    }

    addConceptNameCodeQuery(q) {
        if (!this.conceptNameCodeInclude) {
            this.conceptNameCodeInclude  = {
                model: DicomCodeModel,
                as: "ConceptNameCode",
                where: {
                    ...q
                },
                attributes: []
            };
        } else {
            this.conceptNameCodeInclude.where = {
                ...this.conceptNameCodeInclude.where,
                ...q
            };
        }

        let conceptNameIncluded = this.isConceptNameCodeInclude();

        if (conceptNameIncluded) {
            conceptNameIncluded = this.conceptNameCodeInclude;
        } else {
            this.addQuery({});
            let currentModel = this.isModelIncluded();
            currentModel.include = currentModel.include ? currentModel.include : [];
            conceptNameIncluded = this.isConceptNameCodeInclude();
            currentModel.include.push(this.conceptNameCodeInclude);
        }
    }

    addConceptCodeQuery(q) {
        if (!this.conceptCodeInclude) {
            this.conceptCodeInclude  = {
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

        let conceptCodeIncluded = this.isConceptCodeInclude();

        if (conceptCodeIncluded) {
            conceptCodeIncluded = this.conceptCodeInclude;
        } else {
            this.addQuery({});
            let currentModel = this.isModelIncluded();
            currentModel.include = currentModel.include ? currentModel.include : [];
            conceptCodeIncluded = this.isConceptCodeInclude();
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
        return this.instanceQueryBuilder.includeQueries.find(v=> v.model.getTableName()  === "VerifyingObserverSQ");
    }

    isPersonNameIncluded() {
        let currentModel = this.isModelIncluded();
        if (currentModel && currentModel.include) {
            return currentModel.include.find( v => v.model.getTableName() === "PersonName");
        }
        return false;
    }

    getName(value) {
        let q = this.instanceQueryBuilder.getPersonNameQuery(dictionary.keyword.VerifyingObserverName, value);
        this.addQuery({});
        let currentModel = this.isModelIncluded();
        currentModel.include = currentModel.include ? currentModel.include : [];
        let personNameIncluded = this.isPersonNameIncluded();
        if (personNameIncluded) {
            personNameIncluded.where = {
                ...personNameIncluded.where,
                ...q.query
            };
        } else {
            currentModel.include.push({
                model: PersonNameModel,
                where: {
                    ...q.query
                },
                attributes: []
            });
        }
    }

    getDateTime(value) {
        let q = this.instanceQueryBuilder.getDateQuery(dictionary.keyword.VerificationDateTime, value);
        this.addQuery(q);
    }

    getOrganization(value) {
        let q = this.instanceQueryBuilder.getStringQuery(dictionary.keyword.VerifyingOrganization, value);
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
                model: VerifyIngObserverSqModel,
                where: {
                    ...q
                },
                attributes: []
            });
        }
    }
}

module.exports.InstanceQueryBuilder = InstanceQueryBuilder;
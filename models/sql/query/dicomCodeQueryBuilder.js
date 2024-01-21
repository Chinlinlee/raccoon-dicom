const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder } = require("./querybuilder");
const { DicomCodeModel } = require("@models/sql/models/dicomCode.model");
const { Op } = require("sequelize");

class DicomCodeQueryBuilder {
    constructor(queryBuilder, codeTableName) {
        /** @type { import("../../UPS-RS/service/query/upsQueryBuilder") } */
        this.queryBuilder = queryBuilder;
        this.codeTableName = codeTableName;
    }

    isModelIncluded() {
        this.queryBuilder.includeQueries.forEach(v=> console.log(v.model.getTableName()));
        return this.queryBuilder.includeQueries.find(v => v.model.getTableName() === this.codeTableName || v.as === this.codeTableName);
    }

    /**
     * 
     * @param {string[]} values 
     */
    getCodeValue(values) {
        let q = this.queryBuilder.getOrQuery(
            dictionary.keyword.CodeValue,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.queryBuilder)
        );
        this.addQuery(q);
    }

    /**
     * 
     * @param {string[]} values 
     */
    getCodingSchemeDesignator(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodingSchemeDesignator,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }

    /**
     * 
     * @param {string[]} values 
     */
    getCodingSchemeVersion(values) {
        let q = this.instanceQueryBuilder.getOrQuery(
            dictionary.keyword.CodingSchemeVersion,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }

    /**
     * 
     * @param {string[]} values 
     */
    getCodeMeaning(values) {
        let q = this.getOrQuery(
            dictionary.keyword.CodeMeaning,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this.instanceQueryBuilder)
        );
        this.addQuery(q);
    }
    
    addQuery(q) {
        let currentCodeModel = this.isModelIncluded();
        if (currentCodeModel) {
            currentCodeModel.where = {
                ...currentCodeModel.where,
                ...q
            };
        } else {
            this.queryBuilder.includeQueries.push({
                model: DicomCodeModel,
                where: {
                    ...q
                },
                as: this.codeTableName,
                attributes: []
            });
        }
    }
}

module.exports.DicomCodeQueryBuilder = DicomCodeQueryBuilder;
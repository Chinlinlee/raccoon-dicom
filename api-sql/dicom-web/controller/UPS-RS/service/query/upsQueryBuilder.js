const sequelize = require("@models/sql/instance");
const { PatientQueryBuilder } = require("../../../QIDO-RS/service/patientQueryBuilder");
const { BaseQueryBuilder } = require("../../../QIDO-RS/service/querybuilder");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { DicomCodeQueryBuilder } = require("../../../QIDO-RS/service/dicomCodeQueryBuilder");

class UpsQueryBuilder extends BaseQueryBuilder {

    constructor(queryOptions) {
        super(queryOptions);

        let patientQueryBuilder = new PatientQueryBuilder(queryOptions);
        let patientQuery = patientQueryBuilder.build();
        this.includeQueries.push({
            model: sequelize.model("Patient"),
            attributes: ["x00100020"],
            ...patientQuery,
            required: true
        });

        this.createCodeQueries(dictionary.keyword.ScheduledStationNameCodeSequence);
        this.createCodeQueries(dictionary.keyword.ScheduledStationClassCodeSequence);
        this.createCodeQueries(dictionary.keyword.ScheduledStationGeographicLocationCodeSequence);
        this.createCodeQueries(dictionary.keyword.HumanPerformerCodeSequence);
        this.createCodeQueries(dictionary.keyword.ScheduledWorkitemCodeSequence);
        this.createScheduledHumanPerformersSequenceQueries();
        this.createIssuerOfAdmissionIdSequenceQueries();
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getSOPInstanceUID(values) {
        return this.getOrQuery(dictionary.keyword.SOPInstanceUID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getScheduledProcedureStepPriority(values) {
        return this.getOrQuery(
            dictionary.keyword.ScheduledProcedureStepPriority,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getScheduledProcedureStepModificationDateTime(values) {
        return this.getOrQuery(
            dictionary.keyword.ScheduledProcedureStepModificationDateTime,
            values,
            BaseQueryBuilder.prototype.getDateTimeQuery.bind(this)
        );
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getProcedureStepLabel(values) {
        return this.getOrQuery(dictionary.keyword.ProcedureStepLabel, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getWorklistLabel(values) {
        return this.getOrQuery(dictionary.keyword.WorklistLabel, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getScheduledProcedureStepStartDateTime(values) {
        return this.getOrQuery(
            dictionary.keyword.ScheduledProcedureStepStartDateTime,
            values,
            BaseQueryBuilder.prototype.getDateTimeQuery.bind(this)
        );
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getExpectedCompletionDateTime(values) {
        return this.getOrQuery(
            dictionary.keyword.ExpectedCompletionDateTime,
            values,
            BaseQueryBuilder.prototype.getDateTimeQuery.bind(this)
        );
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getScheduledProcedureStepExpirationDateTime(values) {
        return this.getOrQuery(
            dictionary.keyword.ScheduledProcedureStepExpirationDateTime,
            values,
            BaseQueryBuilder.prototype.getDateTimeQuery.bind(this)
        );
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getInputReadinessState(values) {
        return this.getOrQuery(
            dictionary.keyword.InputReadinessState,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getAdmissionID(values) {
        return this.getOrQuery(
            dictionary.keyword.AdmissionID,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    /**
     * 
     * @param {string[]} values 
     * @returns 
     */
    getProcedureStepState(values) {
        return this.getOrQuery(
            dictionary.keyword.ProcedureStepState,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    createCodeQueries(tag) {
        let dicomCodeQueryBuilder = new DicomCodeQueryBuilder(this, dictionary.tag[tag]);
        this[`${tag}.00080100`] = (values) => dicomCodeQueryBuilder.getCodeValue(values);
        this[`${tag}.00080102`] = (values) => dicomCodeQueryBuilder.getCodingSchemeDesignator(values);
        this[`${tag}.00080103`] = (values) => dicomCodeQueryBuilder.getCodingSchemeVersion(values);
        this[`${tag}.00080104`] = (values) => dicomCodeQueryBuilder.getCodeMeaning(values);
    }

    createIssuerOfAdmissionIdSequenceQueries() {
        this[`${dictionary.keyword.IssuerOfAdmissionIDSequence}.${dictionary.keyword.LocalNamespaceEntityID}`] = (values) => {
            return this.getOrQuery(
                `${dictionary.keyword.IssuerOfAdmissionIDSequence}_x${dictionary.keyword.LocalNamespaceEntityID}`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.IssuerOfAdmissionIDSequence}.${dictionary.keyword.UniversalEntityID}`] = (values) => {
            return this.getOrQuery(
                `${dictionary.keyword.IssuerOfAdmissionIDSequence}_x${dictionary.keyword.UniversalEntityID}`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.IssuerOfAdmissionIDSequence}.${dictionary.keyword.UniversalEntityIDType}`] = (values) => {
            return this.getOrQuery(
                `${dictionary.keyword.IssuerOfAdmissionIDSequence}_x${dictionary.keyword.UniversalEntityIDType}`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };
    }

    createScheduledHumanPerformersSequenceQueries() {
        this[`${dictionary.keyword.ScheduledHumanPerformersSequence}.${dictionary.keyword.HumanPerformerName}`] = (values) => {
            let q = this.getOrQuery(
                `${dictionary.keyword.ScheduledHumanPerformersSequence}.${dictionary.keyword.HumanPerformerName}`,
                values,
                BaseQueryBuilder.prototype.getPersonNameQuery.bind(this)
            );
            this.includeQueries.push({
                model: sequelize.model("PersonName"),
                as: dictionary.tag["00404037"],
                where: {
                    ...q
                },
                attributes: []
            });
        };
        this[`${dictionary.keyword.ScheduledHumanPerformersSequence}.${dictionary.keyword.HumanPerformerOrganization}`] = (values) => {
            return this.getOrQuery(
                dictionary.keyword.HumanPerformerOrganization,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };
    }
}

module.exports.UpsQueryBuilder = UpsQueryBuilder;
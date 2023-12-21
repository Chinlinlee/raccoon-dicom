const sequelize = require("@models/sql/instance");
const { PatientQueryBuilder } = require("../../../QIDO-RS/service/patientQueryBuilder");
const { BaseQueryBuilder } = require("../../../QIDO-RS/service/querybuilder");
const { DicomCodeQueryBuilder } = require("../../../QIDO-RS/service/dicomCodeQueryBuilder");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

class MwlQueryBuilder extends BaseQueryBuilder {
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

        this.createCodeQueries(dictionary.keyword.InstitutionalDepartmentTypeCodeSequence);
        this.createCodeQueries(dictionary.keyword.InstitutionCodeSequence);
        this.createCodeQueries(dictionary.keyword.ScheduledProtocolCodeSequence);
        this.createIssuerOfAccessionNumberSequenceQueries();
        this.createIssuerOfAdmissionIdSequenceQueries();
        this.createSpsQueries();
    }

    getStudyInstanceUID(values) {
        return this.getOrQuery(
            dictionary.keyword.StudyInstanceUID,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    getAccessionNumber(values) {
        return this.getOrQuery(
            dictionary.keyword.AccessionNumber,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    getRequestedProcedureID(values) {
        return this.getOrQuery(
            dictionary.keyword.RequestedProcedureID,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    getAdmissionID(values) {
        return this.getOrQuery(
            dictionary.keyword.AdmissionID,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    getInstitutionName(values) {
        return this.getOrQuery(
            dictionary.keyword.InstitutionName,
            values,
            BaseQueryBuilder.prototype.getStringQuery.bind(this)
        );
    }

    getInstitutionDepartmentName(values) {
        return this.getOrQuery(
            dictionary.keyword.InstitutionalDepartmentName,
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

    createIssuerOfAccessionNumberSequenceQueries() {
        this[`${dictionary.keyword.IssuerOfAccessionNumberSequence}.${dictionary.keyword.LocalNamespaceEntityID}`] = (values) => {
            return this.getOrQuery(
                `accno_local_id`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.IssuerOfAccessionNumberSequence}.${dictionary.keyword.UniversalEntityID}`] = (values) => {
            return this.getOrQuery(
                `accno_universal_id`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.IssuerOfAccessionNumberSequence}.${dictionary.keyword.UniversalEntityIDType}`] = (values) => {
            return this.getOrQuery(
                `accno_universal_id_type`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };
    }

    createIssuerOfAdmissionIdSequenceQueries() {
        this[`${dictionary.keyword.IssuerOfAdmissionIDSequence}.${dictionary.keyword.LocalNamespaceEntityID}`] = (values) => {
            return this.getOrQuery(
                `issuer_admission_local_id`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.IssuerOfAdmissionIDSequence}.${dictionary.keyword.UniversalEntityID}`] = (values) => {
            return this.getOrQuery(
                `issuer_admission_universal_id`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.IssuerOfAdmissionIDSequence}.${dictionary.keyword.UniversalEntityIDType}`] = (values) => {
            return this.getOrQuery(
                `issuer_admission_universal_id_type`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };
    }

    createSpsQueries() {
        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.StationAETitle}`] = (values) => {
            return this.getOrQuery(
                `station_ae_title`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.StationName}`] = (values) => {
            return this.getOrQuery(
                `station_name`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledProcedureStepStartDate}`] = (values) => {
            return this.getOrQuery(
                `start_date`,
                values,
                BaseQueryBuilder.prototype.getDateQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledProcedureStepEndDate}`] = (values) => {
            return this.getOrQuery(
                `end_date`,
                values,
                BaseQueryBuilder.prototype.getDateQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledProcedureStepStartTime}`] = (values) => {
            return this.getOrQuery(
                `start_time`,
                values,
                BaseQueryBuilder.prototype.getTimeQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledProcedureStepEndTime}`] = (values) => {
            return this.getOrQuery(
                `end_time`,
                values,
                BaseQueryBuilder.prototype.getTimeQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledPerformingPhysicianName}`] = (values) => {
            let q = this.getOrQuery(
                `physician_name`,
                values,
                BaseQueryBuilder.prototype.getPersonNameQuery.bind(this)
            );
            this.includeQueries.push({
                model: sequelize.model("PersonName"),
                as: dictionary.tag["00400006"],
                where: {
                    ...q
                },
                attributes: []
            });
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledProcedureStepDescription}`] = (values) => {
            return this.getOrQuery(
                `description`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledProcedureStepID}`] = (values) => {
            return this.getOrQuery(
                `sps_id`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };

        this[`${dictionary.keyword.ScheduledProcedureStepSequence}.${dictionary.keyword.ScheduledProcedureStepStatus}`] = (values) => {
            return this.getOrQuery(
                `sps_status`,
                values,
                BaseQueryBuilder.prototype.getStringQuery.bind(this)
            );
        };
    }
}

module.exports.MwlQueryBuilder = MwlQueryBuilder;
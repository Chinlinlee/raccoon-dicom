const _ = require("lodash");
const { default: PatientQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/PatientQueryTask");
const { PatientQueryTaskInjectInterface, createPatientQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/PatientQueryTaskInject");
const { createQueryTaskInjectProxy, QueryTaskInjectInterface } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { default: Attributes } = require("@dcm4che/data/Attributes");
const { default: Tag } = require("@dcm4che/data/Tag");
const { default: VR } = require("@dcm4che/data/VR");
const { SqlDimseQueryBuilder: DimseQueryBuilder } = require("./queryBuilder");
const { Association } = require("@dcm4che/net/Association");
const { PresentationContext } = require("@dcm4che/net/pdu/PresentationContext");
const { PatientQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/patientQueryBuilder");
const { PatientModel } = require("@models/sql/models/patient.model");


class JsPatientQueryTask {
    constructor(as, pc, rq, keys) {
        /** @type { Association } */
        this.as = as;
        /** @type { PresentationContext } */
        this.pc = pc;
        /** @type { Attributes } */
        this.rq = rq;
        /** @type { Attributes } */
        this.keys = keys;

        this.patientAttr = null;
        this.offset = 0;
        this.query = null;
        this.patient = null;
    }

    async get() {
        let patientQueryTask = await PatientQueryTask.newInstanceAsync(
            this.as,
            this.pc,
            this.rq,
            this.keys,
            this.getQueryTaskInjectProxy(),
            this.getPatientQueryTaskInjectProxy()
        );

        await this.initQuery();
        await this.patientQueryTaskInjectMethods.wrappedFindNextPatient();

        return patientQueryTask;
    }

    getQueryTaskInjectProxy() {
        /** @type { QueryTaskInjectInterface } */
        this.patientBasicQueryTaskInjectMethods = {
            hasMoreMatches: () => {
                return !_.isNull(this.patientAttr);
            },
            nextMatch: async () => {
                let tempRecord = this.patientAttr;
                await this.patientQueryTaskInjectMethods.wrappedFindNextPatient();
                return tempRecord;
            },
            adjust: async (match) => {
                return this.patientAdjust(match);
            }
        };

        if (!this.queryTaskInjectProxy) {
            this.queryTaskInjectProxy = createQueryTaskInjectProxy(this.patientBasicQueryTaskInjectMethods);
        }

        return this.queryTaskInjectProxy;
    }

    getPatientQueryTaskInjectProxy() {

        /** @type { PatientQueryTaskInjectInterface }*/
        this.patientQueryTaskInjectMethods = {
            wrappedFindNextPatient: async () => {
                await this.patientQueryTaskInjectMethods.findNextPatient();
            },
            getPatient: async () => {
                await this.nextPatient();
            },
            findNextPatient: async () => {
                await this.patientQueryTaskInjectMethods.getPatient();
                return !_.isNull(this.patientAttr);
            }
        };

        if (!this.patientQueryTaskProxy) {
            this.patientQueryTaskProxy = createPatientQueryTaskInjectProxy(this.patientQueryTaskInjectMethods);
        }

        return this.patientQueryTaskProxy;
    }

    /**
     * 
     * @param {Attributes} match 
     * @returns 
     */
    async basicAdjust(match) {
        if (match == null) {
            return null;
        }

        let filtered = new Attributes(await match.size());

        if (!await this.keys.contains(Tag.SpecificCharacterSet)) {
            let ss = await match.getStrings(Tag.SpecificCharacterSet);
            if (!ss)
                await filtered.setString(Tag.SpecificCharacterSet, VR.CS, ss);
        }
        await filtered.addSelected(match, this.keys);
        await filtered.supplementEmpty(this.keys);
        return filtered;
    }

    async patientAdjust(match) {
        let basicAd = await this.basicAdjust(match);
        await basicAd.remove(Tag.DirectoryRecordType);

        if (await this.keys.contains(Tag.SOPClassUID)) {
            await basicAd.setString(Tag.SOPClassUID, VR.UI, await match.getString(Tag.ReferencedSOPClassUIDInFile));
        }

        if (await this.keys.contains(Tag.SOPInstanceUID)) {
            await basicAd.setString(Tag.SOPInstanceUID, VR.UI, await match.getString(Tag.ReferencedSOPInstanceUIDInFile));
        }

        await basicAd.setString(Tag.QueryRetrieveLevel, VR.CS, await this.keys.getString(Tag.QueryRetrieveLevel));

        return basicAd;
    }

    getReturnKeys(query) {
        let returnKeys = {};
        let queryKeys = Object.keys(query);
        for (let i = 0; i < queryKeys.length; i++) {
            returnKeys[queryKeys[i].split(".").shift()] = 1;
        }
        return returnKeys;
    }

    async initQuery() {
        this.offset = 0;
        let queryBuilder = new DimseQueryBuilder(this.keys, "patient");
        let normalQuery = await queryBuilder.toNormalQuery();
        let sqlQuery = await queryBuilder.getSqlQuery(normalQuery);

        let patientQueryBuilder = new PatientQueryBuilder({
            query: {
                ...sqlQuery
            }
        });
        let q = patientQueryBuilder.build();
        this.query = {
            ...q
        };
    }

    async nextPatient() {
        let patient = await PatientModel.findOne({
            ...this.query,
            attributes: ["json"],
            limit: 1,
            offset: this.offset++
        });

        this.patient = patient;
        this.patientAttr = this.patient ? await this.patient.getAttributes() : null;
    }
}

module.exports.JsPatientQueryTask = JsPatientQueryTask;
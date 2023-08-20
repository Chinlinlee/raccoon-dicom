const _ = require("lodash");
const { default: PatientQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/PatientQueryTask");
const { PatientQueryTaskInjectInterface, createPatientQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/PatientQueryTaskInject");
const { createQueryTaskInjectProxy, QueryTaskInjectInterface } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { default: Attributes } = require("@dcm4che/data/Attributes");
const { default: Tag } = require("@dcm4che/data/Tag");
const { default: VR } = require("@dcm4che/data/VR");
const { DimseQueryBuilder } = require("./queryBuilder");
const patientModel = require("@models/mongodb/models/patient");


class JsPatientQueryTask {
    constructor(as, pc, rq, keys) {
        this.as = as;
        this.pc = pc;
        this.rq = rq;
        this.keys = keys;

        this.patientAttr = null;
        this.init = false;
        this.cursor = null;
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
        return patientQueryTask;
    }

    getQueryTaskInjectProxy() {
        /** @type { QueryTaskInjectInterface } */
        this.queryTaskInjectMethods = {
            hasMoreMatches: () => {
                return !_.isNull(this.patientAttr);
            },
            nextMatch: async () => {
                let tempRecord = this.patientAttr;
                await this.patientQueryTaskInjectMethods.wrappedFindNextPatient();
                return tempRecord;
            },
            adjust: async (match) => {
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
        };

        if (!this.queryTaskInjectProxy) {
            this.queryTaskInjectProxy = createQueryTaskInjectProxy(this.queryTaskInjectMethods);
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
                let queryBuilder = new DimseQueryBuilder(this.keys, "patient");
                let normalQuery = await queryBuilder.toNormalQuery();
                let mongoQuery = await queryBuilder.getMongoQuery(normalQuery);

                if (_.isNull(this.patientAttr) && !this.init) {
                    let returnKeys = this.getReturnKeys(normalQuery);

                    this.cursor = await patientModel.getDimseResultCursor({
                        ...mongoQuery.$match
                    }, returnKeys);

                    this.patient = await this.cursor.next();
                    this.patientAttr = this.patient ? await this.patient.getAttributes() : null;
                } else {
                    this.patient = await this.cursor.next();
                    this.patientAttr = this.patient ? await this.patient.getAttributes() : null;
                }

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

    getReturnKeys(query) {
        let returnKeys = {};
        let queryKeys = Object.keys(query);
        for (let i = 0; i < queryKeys.length; i++) {
            returnKeys[queryKeys[i].split(".").shift()] = 1;
        }
        return returnKeys;
    }
}

module.exports.JsPatientQueryTask = JsPatientQueryTask;
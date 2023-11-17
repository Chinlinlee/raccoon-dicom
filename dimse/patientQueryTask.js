const _ = require("lodash");
const { PatientQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/PatientQueryTask");
const { PatientQueryTaskInjectInterface, createPatientQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/PatientQueryTaskInject");
const { createQueryTaskInjectProxy, QueryTaskInjectInterface } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { Attributes } = require("@dcm4che/data/Attributes");
const { Tag } = require("@dcm4che/data/Tag");
const { VR } = require("@dcm4che/data/VR");
const { DimseQueryBuilder } = require("./queryBuilder");
const { PatientModel } = require("@dbModels/patient.model");
const { Association } = require("@dcm4che/net/Association");
const { PresentationContext } = require("@dcm4che/net/pdu/PresentationContext");
const { logger } = require("@root/utils/logs/log");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { UID } = require("@dcm4che/data/UID");
const { QueryTaskUtils } = require("./utils");


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

        await this.initCursor();
        await this.patientQueryTaskProxy.wrappedFindNextPatient();

        return patientQueryTask;
    }

    getQueryTaskInjectProxy() {
        // for creating one
        if (!this.matchIteratorProxy) {
            this.matchIteratorProxy = new PatientMatchIteratorProxy(this);
        }

        return this.matchIteratorProxy.get();
    }

    getPatientQueryTaskInjectProxy() {
        // for creating once
        if (!this.patientQueryTaskProxy) {
            this.patientQueryTaskProxy =  new PatientQueryTaskInjectProxy(this);
        }
        return this.patientQueryTaskProxy.get();
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

    async initCursor() {
        let queryAuditManager = await QueryTaskUtils.getAuditManager(this.as);
        let dbQuery = await QueryTaskUtils.getDbQuery(this.keys, "patient");
        queryAuditManager.onQuery(
            UID.PatientRootQueryRetrieveInformationModelFind,
            JSON.stringify(dbQuery),
            "UTF-8"
        );

        let returnKeys = await QueryTaskUtils.getReturnKeys(this.keys, "patient");

        logger.info(`do DIMSE Patient query: ${JSON.stringify(dbQuery)}`);
        this.cursor = await PatientModel.getDimseResultCursor({
            ...dbQuery
        }, returnKeys);
    }
}

class PatientQueryTaskInjectProxy {
    /**
     * 
     * @param {JsPatientQueryTask} queryTask 
     */
    constructor(patientQueryTask) {
        /** @type {JsPatientQueryTask} */
        this.patientQueryTask = patientQueryTask;
    }

    get() {
        return createPatientQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            wrappedFindNextPatient: this.wrappedFindNextPatient.bind(this),
            getPatient: this.getPatient.bind(this),
            findNextPatient: this.findNextPatient.bind(this)
        };
    }

    async wrappedFindNextPatient() {
        await this.findNextPatient();
    }

    async findNextPatient() {
        await this.getPatient();
        return !_.isNull(this.patientQueryTask.patientAttr);
    }

    async getPatient() {
        this.patientQueryTask.patient = await this.patientQueryTask.cursor.next();
        this.patientQueryTask.patientAttr = this.patientQueryTask.patient ? await this.patientQueryTask.patient.getAttributes() : null;
    }
}

class PatientMatchIteratorProxy {
    constructor(patientQueryTask) {
        /** @type {JsPatientQueryTask} */
        this.patientQueryTask = patientQueryTask;
    }

    get() {
        return createQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            hasMoreMatches: () => {
                return !_.isNull(this.patientQueryTask.patientAttr);
            },
            nextMatch: async () => {
                let tempRecord = this.patientQueryTask.patientAttr;
                await this.patientQueryTask.patientQueryTaskProxy.wrappedFindNextPatient();
                return tempRecord;
            },
            adjust: async (match) => {
                return this.patientQueryTask.patientAdjust(match);
            }
        };
    }
}

module.exports.JsPatientQueryTask = JsPatientQueryTask;
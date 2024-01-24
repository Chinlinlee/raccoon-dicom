const _ = require("lodash");

const { StudyQueryTask } = require("@chinlinlee/dcm777/net/StudyQueryTask");
const { JsPatientQueryTask } = require("./patientQueryTask");
const { Tag } = require("@dcm4che/data/Tag");
const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { createStudyQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/StudyQueryTaskInject");
const { DimseQueryBuilder } = require("./queryBuilder");
const { StudyModel } = require("@dbModels/study.model");
const { Attributes } = require("@dcm4che/data/Attributes");
const { logger } = require("@root/utils/logs/log");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { UID } = require("@dcm4che/data/UID");
const { QueryTaskUtils } = require("./utils");

class JsStudyQueryTask extends JsPatientQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.studyCursor = false;
        this.study = null;
        /** @type { Attributes | null } */
        this.studyAttr = null;
    }

    async get() {
        let studyQueryTask = await StudyQueryTask.newInstanceAsync(
            this.as,
            this.pc,
            this.rq,
            this.keys,
            this.getQueryTaskInjectProxy(),
            this.getPatientQueryTaskInjectProxy(),
            this.getStudyQueryTaskInjectProxy()
        );

        await super.get();
        await this.studyQueryTaskInjectProxy.wrappedFindNextStudy();

        return studyQueryTask;
    }

    getQueryTaskInjectProxy() {
        if (!this.queryTaskInjectProxy) {
            this.queryTaskInjectProxy = new StudyMatchIteratorProxy(this);
        }

        return this.queryTaskInjectProxy.get();
    }

    getStudyQueryTaskInjectProxy() {
        if (!this.studyQueryTaskInjectProxy) {
            this.studyQueryTaskInjectProxy = new StudyQueryTaskInjectProxy(this);
        }

        return this.studyQueryTaskInjectProxy.get();
    }

    async getNextStudyCursor() {
        let queryAuditManager = await QueryTaskUtils.getAuditManager(this.as);

        let queryAttr = await QueryTaskUtils.getQueryAttribute(this.keys, this.patientAttr);
        let dbQuery = await QueryTaskUtils.getDbQuery(queryAttr, "study");
        queryAuditManager.onQuery(
            UID.StudyRootQueryRetrieveInformationModelFind,
            JSON.stringify(dbQuery),
            "UTF-8"
        );

        logger.info(`do DIMSE Study query: ${JSON.stringify(dbQuery)}`);
        this.studyCursor = await StudyModel.getDimseResultCursor({
            ...dbQuery
        }, await QueryTaskUtils.getReturnKeys(queryAttr, "study"));
    }

    async auditDicomInstancesAccessed() {
        if (!this.study)
            return;

        let auditManager = new AuditManager(
            EventType.QUERY_ACCESSED_INSTANCE, EventOutcomeIndicator.Success,
            await this.as.getRemoteAET(), await this.as.getRemoteHostName(),
            await this.as.getLocalAET(), await this.as.getLocalHostName()
        );
        let studyUID = _.get(this.study, "0020000D.Value.0");
        auditManager.onDicomInstancesAccessed([studyUID]);
    }
}

class StudyQueryTaskInjectProxy {
    constructor(studyQueryTask) {
        /** @type { JsStudyQueryTask } */
        this.studyQueryTask = studyQueryTask;
    }

    get() {
        return createStudyQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            wrappedFindNextStudy: this.wrappedFindNextStudy.bind(this),
            getStudy: this.getStudy.bind(this),
            findNextStudy: this.findNextStudy.bind(this)
        };
    }

    async wrappedFindNextStudy() {
        await this.findNextStudy();
    }

    async getStudy() {
        this.studyQueryTask.study = await this.studyQueryTask.studyCursor.next();
        this.studyQueryTask.auditDicomInstancesAccessed();
        this.studyQueryTask.studyAttr = this.studyQueryTask.study ? await this.studyQueryTask.study.getAttributes() : null;
    }

    async findNextStudy() {
        if (!this.studyQueryTask.patientAttr)
            return false;

        if (!this.studyQueryTask.studyAttr) {
            await this.studyQueryTask.getNextStudyCursor();
            await this.getStudy();
        } else {
            await this.getStudy();
        }

        while (!this.studyQueryTask.studyAttr && await this.studyQueryTask.patientQueryTaskProxy.findNextPatient()) {
            await this.studyQueryTask.getNextStudyCursor();
            await this.getStudy();
        }

        return !_.isNull(this.studyQueryTask.studyAttr);
    }
}

class StudyMatchIteratorProxy {
    constructor(studyQueryTask) {
        /** @type { JsStudyQueryTask } */
        this.studyQueryTask = studyQueryTask;
    }

    get() {
        return createQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            hasMoreMatches: () => {
                return !_.isNull(this.studyQueryTask.studyAttr);
            },
            nextMatch: async () => {
                let returnAttr = await Attributes.newInstanceAsync(
                    await this.studyQueryTask.patientAttr.size() + await this.studyQueryTask.studyAttr.size()
                );
                await Attributes.unifyCharacterSets([
                    this.studyQueryTask.patientAttr,
                    this.studyQueryTask.studyAttr
                ]);
                await returnAttr.addAll(this.studyQueryTask.patientAttr);
                await returnAttr.addAll(this.studyQueryTask.studyAttr);

                await this.studyQueryTask.studyQueryTaskInjectProxy.wrappedFindNextStudy();

                return returnAttr;
            },
            adjust: async (match) => {
                return this.studyQueryTask.patientAdjust(match);
            }
        };
    }
}

module.exports.JsStudyQueryTask = JsStudyQueryTask;
module.exports.StudyMatchIteratorProxy = StudyMatchIteratorProxy;
module.exports.StudyQueryTaskInjectProxy = StudyQueryTaskInjectProxy;
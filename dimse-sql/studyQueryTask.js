const _ = require("lodash");

const { StudyQueryTask } = require("@chinlinlee/dcm777/net/StudyQueryTask");
const { JsPatientQueryTask } = require("./patientQueryTask");
const { createStudyQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/StudyQueryTaskInject");
const { Attributes } = require("@dcm4che/data/Attributes");
const { StudyQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/querybuilder");
const { StudyModel } = require("@models/sql/models/study.model");
const { StudyQueryTaskInjectProxy, StudyMatchIteratorProxy } = require("@root/dimse/studyQueryTask");
const { QueryTaskUtils } = require("@root/dimse/utils");

class JsStudyQueryTask extends JsPatientQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

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
            this.studyQueryTaskInjectProxy = new SqlStudyQueryTaskInjectProxy(this);
        }

        return this.studyQueryTaskInjectProxy.get();
    }

    async getNextStudyCursor() {
        this.studyOffset = 0;
        let queryAttr = await QueryTaskUtils.getQueryAttribute(this.keys, this.patientAttr, "study");
        let sqlQuery = await QueryTaskUtils.getDbQuery(queryAttr, "study");
        
        let studyQueryBuilder = new StudyQueryBuilder({
            query: {
                ...sqlQuery
            }
        });
        let q = studyQueryBuilder.build();
        this.studyQuery = {
            ...q
        };
    }

    async auditDicomInstancesAccessed() {
        if (!this.study)
            return;

        let auditManager = await QueryTaskUtils.getAuditManager(this.as);
        let studyUID = _.get(this.study, "x0020000D");
        auditManager.onDicomInstancesAccessed([studyUID]);
    }
}

class SqlStudyQueryTaskInjectProxy extends StudyQueryTaskInjectProxy {
    constructor(studyQueryTask) {
        super(studyQueryTask);
    }

    get() {
        return createStudyQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    async getStudy() {
        this.studyQueryTask.study = await StudyModel.findOne({
            ...this.studyQueryTask.studyQuery,
            attributes: ["json"],
            limit: 1,
            offset: this.studyQueryTask.studyOffset++
        });

        this.studyQueryTask.auditDicomInstancesAccessed();
        this.studyQueryTask.studyAttr = this.studyQueryTask.study ? await this.studyQueryTask.study.getAttributes() : null;
    }

}

module.exports.JsStudyQueryTask = JsStudyQueryTask;
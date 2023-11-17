const _ = require("lodash");

const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { DimseQueryBuilder } = require("./queryBuilder");
const { JsSeriesQueryTask } = require("./seriesQueryTask");
const { InstanceModel } = require("@dbModels/instance.model");
const { InstanceQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/InstanceQueryTask");
const { Attributes } = require("@dcm4che/data/Attributes");
const { createInstanceQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/InstanceQueryTaskInject");
const { Tag } = require("@dcm4che/data/Tag");
const { logger } = require("@root/utils/logs/log");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { UID } = require("@dcm4che/data/UID");
const { QueryTaskUtils } = require("./utils");


class JsInstanceQueryTask extends JsSeriesQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.instanceCursor = null;
        this.instance = null;
        /** @type { Attributes | null } */
        this.instanceAttr = null;
    }

    async get() {
        let instanceQueryTask = await InstanceQueryTask.newInstanceAsync(
            this.as,
            this.pc,
            this.rq,
            this.keys,
            this.getQueryTaskInjectProxy(),
            this.getPatientQueryTaskInjectProxy(),
            this.getStudyQueryTaskInjectProxy(),
            this.getSeriesQueryTaskInjectProxy(),
            this.getInstanceQueryTaskInjectProxy()
        );

        await super.get();
        await this.instanceQueryTaskInjectProxy.getProxyMethods().wrappedFindNextInstance();

        return instanceQueryTask;
    }

    getQueryTaskInjectProxy() {
        if (!this.matchIteratorProxy) {
            this.matchIteratorProxy = new InstanceMatchIteratorProxy(this);
        }
        return this.matchIteratorProxy.get();
    }

    getInstanceQueryTaskInjectProxy() {
        if (!this.instanceQueryTaskInjectProxy) {
            this.instanceQueryTaskInjectProxy = new InstanceQueryTaskInjectProxy(this);
        }

        return this.instanceQueryTaskInjectProxy.get();
    }

    async getNextInstanceCursor() {
        let queryAuditManager = await QueryTaskUtils.getAuditManager(this.as);

        let queryAttr = await QueryTaskUtils.getQueryAttribute(this.keys, this.seriesAttr);
        let dbQuery = await QueryTaskUtils.getDbQuery(queryAttr, "instance");
        queryAuditManager.onQuery(
            UID.StudyRootQueryRetrieveInformationModelFind,
            JSON.stringify(dbQuery),
            "UTF-8"
        );

        logger.info(`do DIMSE Instance query: ${JSON.stringify(dbQuery)}`);
        this.instanceCursor = await InstanceModel.getDimseResultCursor({
            ...dbQuery
        }, await QueryTaskUtils.getReturnKeys(queryAttr, "instance"));
    }

}

class InstanceQueryTaskInjectProxy {
    constructor(instanceQueryTask) {
        /** @type { JsInstanceQueryTask } */
        this.instanceQueryTask = instanceQueryTask;
    }

    get() {
        return new createInstanceQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            wrappedFindNextInstance: this.wrappedFindNextInstance.bind(this),
            getInstance: this.getInstance.bind(this),
            findNextInstance: this.findNextInstance.bind(this)
        };
    }

    async wrappedFindNextInstance() {
        await this.findNextInstance();
    }

    async findNextInstance() {
        if (!this.instanceQueryTask.seriesAttr)
            return false;

        if (!this.instanceQueryTask.instanceAttr) {
            await this.instanceQueryTask.getNextInstanceCursor();
            await this.getInstance();
        } else {
            await this.getInstance();
        }

        while (!this.instanceQueryTask.instanceAttr && await this.instanceQueryTask.seriesQueryTaskInjectProxy.findNextSeries()) {
            await this.getNextInstanceCursor();
            await this.getInstance();
        }

        return !_.isNull(this.instanceQueryTask.instanceAttr);
    }

    async getInstance() {
        this.instanceQueryTask.instance = await this.instanceQueryTask.instanceCursor.next();
        if (this.instanceQueryTask.instance) this.instanceQueryTask.auditDicomInstancesAccessed();
        this.instanceQueryTask.instanceAttr = this.instanceQueryTask.instance ? await this.instanceQueryTask.instance.getAttributes() : null;
    }

}

class InstanceMatchIteratorProxy {
    constructor(instanceQueryTask) {
        /** @type {JsInstanceQueryTask} */
        this.instanceQueryTask = instanceQueryTask;
    }

    get() {
        return createQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            hasMoreMatches: async () => {
                return !_.isNull(this.instanceQueryTask.instanceAttr);
            },
            nextMatch: async () => {
                let returnAttr = await Attributes.newInstanceAsync(
                    await this.instanceQueryTask.patientAttr.size() +
                    await this.instanceQueryTask.studyAttr.size() +
                    await this.instanceQueryTask.seriesAttr.size() +
                    await this.instanceQueryTask.instanceAttr.size()
                );

                await Attributes.unifyCharacterSets([
                    this.instanceQueryTask.patientAttr,
                    this.instanceQueryTask.studyAttr,
                    this.instanceQueryTask.seriesAttr,
                    this.instanceQueryTask.instanceAttr
                ]);
                await returnAttr.addAll(this.instanceQueryTask.patientAttr);
                await returnAttr.addAll(this.instanceQueryTask.studyAttr, true);
                await returnAttr.addAll(this.instanceQueryTask.seriesAttr, true);
                await returnAttr.addAll(this.instanceQueryTask.instanceAttr, true);

                await this.instanceQueryTask.instanceQueryTaskInjectProxy.wrappedFindNextInstance();

                return returnAttr;
            },
            adjust: async (match) => {
                return await this.instanceQueryTask.patientAdjust(match);
            }
        };
    }
}

module.exports.JsInstanceQueryTask = JsInstanceQueryTask;
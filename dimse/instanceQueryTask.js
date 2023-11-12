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
        await this.instanceQueryTaskInjectMethods.wrappedFindNextInstance();

        return instanceQueryTask;
    }

    getQueryTaskInjectProxy() {
        this.instanceBasicQueryTaskInjectMethods = {
            hasMoreMatches: () => {
                return !_.isNull(this.instanceAttr);
            },
            nextMatch: async () => {
                let returnAttr = await Attributes.newInstanceAsync(
                    await this.patientAttr.size() + await this.studyAttr.size() + await this.seriesAttr.size() + await this.instanceAttr.size()
                );
                await Attributes.unifyCharacterSets([this.patientAttr, this.studyAttr, this.seriesAttr, this.instanceAttr]);
                await returnAttr.addAll(this.patientAttr);
                await returnAttr.addAll(this.studyAttr, true);
                await returnAttr.addAll(this.seriesAttr, true);
                await returnAttr.addAll(this.instanceAttr, true);

                await this.instanceQueryTaskInjectMethods.wrappedFindNextInstance();

                return returnAttr;
            },
            adjust: async (match) => {
                return await this.patientAdjust(match);
            }
        };

        if (!this.queryTaskInjectProxy) {
            this.queryTaskInjectProxy = createQueryTaskInjectProxy(this.instanceBasicQueryTaskInjectMethods);
        }

        return this.queryTaskInjectProxy;
    }

    getInstanceQueryTaskInjectProxy() {
        /** @type { import("@java-wrapper/org/github/chinlinlee/dcm777/net/InstanceQueryTaskInject").InstanceQueryTaskInjectInterface } */
        this.instanceQueryTaskInjectMethods = {
            wrappedFindNextInstance: async () => {
                await this.instanceQueryTaskInjectMethods.findNextInstance();
            },
            getInstance: async () => {
                this.instance = await this.instanceCursor.next();
                if (this.instance) this.auditDicomInstancesAccessed();
                this.instanceAttr = this.instance ? await this.instance.getAttributes() : null;
            },
            findNextInstance: async () => {
                if (!this.seriesAttr)
                    return false;

                if (!this.instanceAttr) {
                    await this.getNextInstanceCursor();
                    await this.instanceQueryTaskInjectMethods.getInstance();
                } else {
                    await this.instanceQueryTaskInjectMethods.getInstance();
                }

                while (!this.instanceAttr && await this.seriesQueryTaskInjectProxy.findNextSeries()) {
                    await this.getNextInstanceCursor();
                    await this.instanceQueryTaskInjectMethods.getInstance();
                }

                return _.isNull(this.instanceAttr);
            }
        };

        if (!this.instanceQueryTaskInjectProxy) {
            this.instanceQueryTaskInjectProxy = createInstanceQueryTaskInjectProxy(this.instanceQueryTaskInjectMethods);
        }

        return this.instanceQueryTaskInjectProxy;
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

module.exports.JsInstanceQueryTask = JsInstanceQueryTask;
const _ = require("lodash");

const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { DimseQueryBuilder } = require("./queryBuilder");
const { JsStudyQueryTask } = require("./studyQueryTask");
const { SeriesModel } = require("@dbModels/series.model");
const { SeriesQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SeriesQueryTask");
const { Attributes } = require("@dcm4che/data/Attributes");
const { createSeriesQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SeriesQueryTaskInject");
const { Tag } = require("@dcm4che/data/Tag");
const { logger } = require("@root/utils/logs/log");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { UID } = require("@dcm4che/data/UID");
const { QueryTaskUtils } = require("./utils");

class JsSeriesQueryTask extends JsStudyQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.seriesCursor = null;
        this.series = null;
        /** @type { Attributes | null } */
        this.seriesAttr = null;
    }

    async get() {
        let seriesQueryTask = await SeriesQueryTask.newInstanceAsync(
            this.as,
            this.pc,
            this.rq,
            this.keys,
            this.getQueryTaskInjectProxy(),
            this.getPatientQueryTaskInjectProxy(),
            this.getStudyQueryTaskInjectProxy(),
            this.getSeriesQueryTaskInjectProxy()
        );

        await super.get();
        await this.seriesQueryTaskInjectProxy.wrappedFindNextSeries();

        return seriesQueryTask;
    }

    getQueryTaskInjectProxy() {
        if (!this.matchIteratorProxy) {
            this.matchIteratorProxy = createQueryTaskInjectProxy(this.seriesBasicQueryTaskInjectMethods);
        }

        return this.matchIteratorProxy;
    }

    getSeriesQueryTaskInjectProxy() {
        if (!this.seriesQueryTaskInjectProxy) {
            this.seriesQueryTaskInjectProxy = new SeriesQueryTaskInjectProxy(this);
        }

        return this.seriesQueryTaskInjectProxy.get();
    }

    async getNextSeriesCursor() {
        let queryAuditManager = await QueryTaskUtils.getAuditManager(this.as);
        
        let queryAttr = await QueryTaskUtils.getQueryAttribute(this.keys, this.studyAttr);
        let dbQuery = await QueryTaskUtils.getDbQuery(queryAttr, "series");
        queryAuditManager.onQuery(
            UID.StudyRootQueryRetrieveInformationModelFind,
            JSON.stringify(dbQuery),
            "UTF-8"
        );

        logger.info(`do DIMSE Series query: ${JSON.stringify(dbQuery)}`);
        this.seriesCursor = await SeriesModel.getDimseResultCursor({
            ...dbQuery
        }, await QueryTaskUtils.getReturnKeys(queryAttr, "series"));
    }
}
class SeriesQueryTaskInjectProxy {
    constructor(seriesQueryTask) {
        /** @type { JsSeriesQueryTask } */
        this.seriesQueryTask = seriesQueryTask;
    }

    get() {
        return new createSeriesQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            wrappedFindNextSeries: this.wrappedFindNextSeries.bind(this),
            getSeries: this.getSeries.bind(this),
            findNextSeries: this.findNextSeries.bind(this)
        };
    }

    async wrappedFindNextSeries() {
        await this.findNextSeries();
    }

    async getSeries() {
        this.seriesQueryTask.series = await this.seriesQueryTask.seriesCursor.next();
        if (this.seriesQueryTask.series) this.seriesQueryTask.auditDicomInstancesAccessed();
        this.seriesQueryTask.seriesAttr = this.seriesQueryTask.series ? await this.seriesQueryTask.series.getAttributes() : null;
    }

    async findNextSeries() {
        if (!this.seriesQueryTask.studyAttr)
            return false;

        if (!this.seriesQueryTask.seriesAttr) {
            await this.seriesQueryTask.getNextSeriesCursor();
            await this.getSeries();
        } else {
            await this.getSeries();
        }

        while (!this.seriesQueryTask.seriesAttr && await this.seriesQueryTask.studyQueryTaskInjectProxy.findNextStudy()) {
            await this.seriesQueryTask.getNextSeriesCursor();
            await this.getSeries();
        }

        return !_.isNull(this.seriesQueryTask.seriesAttr);
    }
}

class SeriesMatchIteratorProxy {
    constructor(seriesQueryTask) {
        /** @type {JsSeriesQueryTask} */
        this.seriesQueryTask = seriesQueryTask;
    }

    get() {
        return createQueryTaskInjectProxy(this.getProxyMethods());
    }

    getProxyMethods() {
        return {
            hasMoreMatches: () => {
                return !_.isNull(this.seriesQueryTask.seriesAttr);
            },
            nextMatch: async () => {
                let returnAttr = await Attributes.newInstanceAsync(
                    await this.seriesQueryTask.patientAttr.size() +
                    await this.seriesQueryTask.studyAttr.size() +
                    await this.seriesQueryTask.seriesAttr.size()
                );
    
                await Attributes.unifyCharacterSets([
                    this.seriesQueryTask.patientAttr,
                    this.seriesQueryTask.studyAttr,
                    this.seriesQueryTask.seriesAttr
                ]);
    
                await returnAttr.addAll(this.seriesQueryTask.patientAttr);
                await returnAttr.addAll(this.seriesQueryTask.studyAttr, true);
                await returnAttr.addAll(this.seriesQueryTask.seriesAttr, true);
    
                await this.seriesQueryTask.seriesQueryTaskProxy.wrappedFindNextSeries();
    
                return returnAttr;
            },
            adjust: async (match) => {
                return this.patientAdjust(match);
            }
        };
    }
}

module.exports.JsSeriesQueryTask = JsSeriesQueryTask;
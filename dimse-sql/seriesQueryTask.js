const _ = require("lodash");

const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { DimseQueryBuilder } = require("@dimse/queryBuilder");
const { JsStudyQueryTask } = require("./studyQueryTask");
const { SeriesQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SeriesQueryTask");
const { Attributes } = require("@dcm4che/data/Attributes");
const { SeriesQueryBuilder } = require("@models/sql/query/seriesQueryBuilder");
const { SeriesModel } = require("@models/sql/models/series.model");
const { Tag } = require("@dcm4che/data/Tag");
const { SeriesQueryTaskInjectProxy, SeriesMatchIteratorProxy } = require("@root/dimse/seriesQueryTask");
const { QueryTaskUtils } = require("@root/dimse/utils");


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
            this.matchIteratorProxy = new SeriesMatchIteratorProxy(this);
        }

        return this.matchIteratorProxy.get();
    }

    getSeriesQueryTaskInjectProxy() {
        if (!this.seriesQueryTaskInjectProxy) {
            this.seriesQueryTaskInjectProxy = new SqlSeriesQueryTaskInjectProxy(this);
        }

        return this.seriesQueryTaskInjectProxy.get();
    }

    async getNextSeriesCursor() {
        this.seriesOffset = 0;
        let queryAttr = await QueryTaskUtils.getQueryAttribute(this.keys, this.studyAttr, "series");
        let sqlQuery = await QueryTaskUtils.getDbQuery(queryAttr, "series");

        let seriesQueryBuilder = new SeriesQueryBuilder({
            query: {
                ...sqlQuery
            }
        });
        let q = seriesQueryBuilder.build();
        this.seriesQuery = {
            ...q
        };
    }

}

class SqlSeriesQueryTaskInjectProxy extends SeriesQueryTaskInjectProxy {
    constructor(seriesQueryTask) {
        super(seriesQueryTask);
    }
    async getSeries() {
        this.seriesQueryTask.series = await SeriesModel.findOne({
            ...this.seriesQueryTask.seriesQuery,
            attributes: ["json"],
            limit: 1,
            offset: this.seriesQueryTask.seriesOffset++
        });

        this.seriesQueryTask.seriesAttr = this.seriesQueryTask.series ? await this.seriesQueryTask.series.getAttributes() : null;
    }
}

module.exports.JsSeriesQueryTask = JsSeriesQueryTask;
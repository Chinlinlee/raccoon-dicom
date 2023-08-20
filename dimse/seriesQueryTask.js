const _ = require("lodash");

const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { DimseQueryBuilder } = require("./queryBuilder");
const { JsStudyQueryTask } = require("./studyQueryTask");
const dicomSeriesModel = require("@models/mongodb/models/dicomSeries");
const { SeriesQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SeriesQueryTask");
const { Attributes } = require("@dcm4che/data/Attributes");

class JsSeriesQueryTask extends JsStudyQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.seriesInit = false;
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
        await this.seriesQueryTaskInjectMethods.wrappedFindNextSeries();

        return seriesQueryTask;
    }

    getQueryTaskInjectProxy() {
        /** @type { QueryTaskInjectInterface } */
        this.seriesBasicQueryTaskInjectMethods = {
            hasMoreMatches: () => {
                return !_.isNull(this.seriesAttr);
            },
            nextMatch: async () => {
                let returnAttr = await Attributes.newInstanceAsync(
                    await this.patientAttr.size() + await this.studyAttr.size() + await this.seriesAttr.size()
                );
                await Attributes.unifyCharacterSets([this.patientAttr, this.studyAttr, this.seriesAttr]);
                returnAttr.addAll(this.patientAttr);
                returnAttr.addAll(this.studyAttr, true);
                returnAttr.addAll(this.seriesAttr, true);

                await this.seriesQueryTaskInjectMethods.wrappedFindNextSeries();

                return returnAttr;
            },
            adjust: async (match) => {
                return await this.patientAdjust(match);
            }
        };

        if (!this.queryTaskInjectProxy) {
            this.queryTaskInjectProxy = createQueryTaskInjectProxy(this.seriesBasicQueryTaskInjectMethods);
        }

        return this.queryTaskInjectProxy;
    }

    getSeriesQueryTaskInjectProxy() {
        /** @type {import("@java-wrapper/org/github/chinlinlee/dcm777/net/SeriesQueryTaskInject").SeriesQueryTaskInjectInterface} */
        this.seriesQueryTaskInjectMethods = {
            wrappedFindNextSeries: async () => {
                await this.seriesQueryTaskInjectMethods.findNextSeries();
            },
            getSeries: async () => {
                this.series = await this.seriesCursor.next();
                this.seriesAttr = this.series ? await this.series.getAttributes() : null;
            },
            findNextSeries: async () => {
                if (!this.studyAttr)
                    return false;

                if (!this.seriesAttr) {
                    await this.getNextSeriesCursor();
                    await this.seriesQueryTaskInjectMethods.getSeries();
                } else {
                    await this.seriesQueryTaskInjectMethods.getSeries();
                }

                while(!this.seriesAttr && await this.studyQueryTaskInjectMethods.findNextStudy()) {
                    await this.getNextSeriesCursor();
                    await this.seriesQueryTaskInjectMethods.getSeries();
                }

                return !_.isNull(this.seriesAttr);
            }
        };
    }

    async getNextSeriesCursor() {
        let queryBuilder = new DimseQueryBuilder(this.keys, "series");
        let normalQuery = await queryBuilder.toNormalQuery();
        let mongoQuery = await queryBuilder.getMongoQuery(normalQuery);

        let returnKeys = this.getReturnKeys(normalQuery);

        console.log(JSON.stringify(mongoQuery, null, 2));
        this.seriesCursor = await dicomSeriesModel.getDimseResultCursor({
            ...mongoQuery.$match
        }, returnKeys);
    }
}

module.exports.JsSeriesQueryTask = JsSeriesQueryTask;
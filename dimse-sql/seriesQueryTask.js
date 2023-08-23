const _ = require("lodash");

const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { SqlDimseQueryBuilder: DimseQueryBuilder } = require("./queryBuilder");
const { JsStudyQueryTask } = require("./studyQueryTask");
const { SeriesQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SeriesQueryTask");
const { Attributes } = require("@dcm4che/data/Attributes");
const { createSeriesQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SeriesQueryTaskInject");
const { SeriesQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/seriesQueryBuilder");
const { SeriesModel } = require("@models/sql/models/series.model");
const { Tag } = require("@dcm4che/data/Tag");

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
                await returnAttr.addAll(this.patientAttr);
                await returnAttr.addAll(this.studyAttr, true);
                await returnAttr.addAll(this.seriesAttr, true);

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
                await this.getNextSeries();
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

                while (!this.seriesAttr && await this.studyQueryTaskInjectMethods.findNextStudy()) {
                    await this.getNextSeriesCursor();
                    await this.seriesQueryTaskInjectMethods.getSeries();
                }

                return !_.isNull(this.seriesAttr);
            }
        };

        if (!this.seriesQueryTaskInjectProxy) {
            this.seriesQueryTaskInjectProxy = createSeriesQueryTaskInjectProxy(this.seriesQueryTaskInjectMethods);
        }

        return this.seriesQueryTaskInjectProxy;
    }

    async getNextSeriesCursor() {
        this.seriesOffset = 0;
        let queryAttr = await Attributes.newInstanceAsync();
        await Attributes.unifyCharacterSets([this.keys, this.patientAttr, this.studyAttr]);
        await queryAttr.addAll(this.keys, true);
        await queryAttr.addSelected(this.studyAttr, [Tag.PatientID]);
        await queryAttr.addSelected(this.studyAttr, [Tag.StudyInstanceUID]);

        let queryBuilder = new DimseQueryBuilder(queryAttr, "series");
        let normalQuery = await queryBuilder.toNormalQuery();
        let sqlQuery = await queryBuilder.getSqlQuery(normalQuery);

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

    async getNextSeries() {
        let series = await SeriesModel.findOne({
            ...this.seriesQuery,
            attributes: ["json"],
            limit: 1,
            offset: this.seriesOffset++
        });

        this.series = series;
        this.seriesAttr = this.series ? await this.series.getAttributes() : null;
    }
}

module.exports.JsSeriesQueryTask = JsSeriesQueryTask;
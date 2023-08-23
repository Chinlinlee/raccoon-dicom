const _ = require("lodash");

const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { SqlDimseQueryBuilder: DimseQueryBuilder } = require("./queryBuilder");
const { JsSeriesQueryTask } = require("./seriesQueryTask");
const { InstanceQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/InstanceQueryTask");
const { Attributes } = require("@dcm4che/data/Attributes");
const { createInstanceQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/InstanceQueryTaskInject");
const { InstanceModel } = require("@models/sql/models/instance.model");
const { InstanceQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/instanceQueryBuilder");
const { Tag } = require("@dcm4che/data/Tag");


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
                await this.getNextInstance();
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

                while (!this.instanceAttr && await this.seriesQueryTaskInjectMethods.findNextSeries()) {
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
        this.instanceOffset = 0;
        let queryAttr = await Attributes.newInstanceAsync();
        await Attributes.unifyCharacterSets([this.keys, this.patientAttr, this.studyAttr, this.seriesAttr]);
        await queryAttr.addAll(this.keys, true);
        await queryAttr.addSelected(this.seriesAttr, [Tag.PatientID]);
        await queryAttr.addSelected(this.seriesAttr, [Tag.StudyInstanceUID]);
        await queryAttr.addSelected(this.seriesAttr, [Tag.SeriesInstanceUID]);

        let queryBuilder = new DimseQueryBuilder(queryAttr, "instance");
        let normalQuery = await queryBuilder.toNormalQuery();
        let sqlQuery = await queryBuilder.getSqlQuery(normalQuery);

        let instanceQueryBuilder = new InstanceQueryBuilder({
            query: {
                ...sqlQuery
            }
        });
        let q = instanceQueryBuilder.build();
        this.instanceQuery = {
            ...q
        };
    }

    async getNextInstance() {
        let instance = await InstanceModel.findOne({
            ...this.instanceQuery,
            attributes: ["json"],
            limit: 1,
            offset: this.instanceOffset++
        });

        this.instance = instance;
        this.instanceAttr = this.instance ? await this.instance.getAttributes() : null;
    }

}

module.exports.JsInstanceQueryTask = JsInstanceQueryTask;
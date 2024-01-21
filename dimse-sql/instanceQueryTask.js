const _ = require("lodash");

const { JsSeriesQueryTask } = require("./seriesQueryTask");
const { InstanceQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/InstanceQueryTask");
const { Attributes } = require("@dcm4che/data/Attributes");
const { InstanceModel } = require("@models/sql/models/instance.model");
const { InstanceQueryBuilder } = require("@models/sql/query/instanceQueryBuilder");
const { InstanceQueryTaskInjectProxy, InstanceMatchIteratorProxy } = require("@root/dimse/instanceQueryTask");
const { QueryTaskUtils } = require("@root/dimse/utils");


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
        await this.instanceQueryTaskInjectProxy.wrappedFindNextInstance();

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
            this.instanceQueryTaskInjectProxy = new SqlInstanceQueryTaskInjectProxy(this);
        }

        return this.instanceQueryTaskInjectProxy.get();
    }

    async getNextInstanceCursor() {
        this.instanceOffset = 0;

        let queryAttr = await QueryTaskUtils.getQueryAttribute(this.keys, this.seriesAttr);
        let dbQuery = await QueryTaskUtils.getDbQuery(queryAttr, "instance");
        let instanceQueryBuilder = new InstanceQueryBuilder({
            query: {
                ...dbQuery
            }
        });
        let q = instanceQueryBuilder.build();
        this.instanceQuery = {
            ...q
        };
    }

}

class SqlInstanceQueryTaskInjectProxy extends InstanceQueryTaskInjectProxy {
    constructor(instanceQueryTask) {
        super(instanceQueryTask);
    }

    async getInstance() {
        this.instanceQueryTask.instance = await InstanceModel.findOne({
            ...this.instanceQueryTask.instanceQuery,
            attributes: ["json"],
            limit: 1,
            offset: this.instanceQueryTask.instanceOffset++
        });

        this.instanceQueryTask.instanceAttr = this.instanceQueryTask.instance ? await this.instanceQueryTask.instance.getAttributes() : null;
    }
}
module.exports.JsInstanceQueryTask = JsInstanceQueryTask;
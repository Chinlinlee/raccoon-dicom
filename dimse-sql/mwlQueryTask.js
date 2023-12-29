const _ = require("lodash");
const { createQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/QueryTaskInject");
const { Attributes } = require("@dcm4che/data/Attributes");
const { Tag } = require("@dcm4che/data/Tag");
const { VR } = require("@dcm4che/data/VR");
const { Association } = require("@dcm4che/net/Association");
const { PresentationContext } = require("@dcm4che/net/pdu/PresentationContext");
const { logger } = require("@root/utils/logs/log");
const { UID } = require("@dcm4che/data/UID");
const { QueryTaskUtils } = require("./utils");
const { default: BasicModQueryTask } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/BasicModQueryTask");
const { MwlItemModel } = require("@models/sql/models/mwlitems.model");
const { JsMwlQueryTask } = require("@root/dimse/mwlQueryTask");
const { MwlQueryBuilder } = require("@root/api-sql/dicom-web/controller/MWL-RS/service/query/mwlQueryBuilder");


class SqlJsMwlQueryTask extends JsMwlQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.offset = 0;
        this.query = null;
    }

    getQueryTaskInjectProxy() {
        // for creating one
        if (!this.matchIteratorProxy) {
            this.matchIteratorProxy = new MwlMatchIteratorProxy(this);
        }

        return this.matchIteratorProxy.get();
    }


    async initCursor() {
        this.offset = 0;
        let queryAuditManager = await QueryTaskUtils.getAuditManager(this.as);
        let dbQuery = await QueryTaskUtils.getDbQuery(this.keys, "mwl");
        queryAuditManager.onQuery(
            UID.ModalityWorklistInformationModelFind,
            JSON.stringify(dbQuery),
            "UTF-8"
        );

        let mwlQueryBuilder = new MwlQueryBuilder({
            query: {
                ...dbQuery
            }
        });
        let q = mwlQueryBuilder.build();
        this.query = {
            ...q
        };
    }
}

class MwlMatchIteratorProxy {
    constructor(mwlQueryTask) {
        /** @type {JsMwlQueryTask} */
        this.mwlQueryTask = mwlQueryTask;
    }

    get() {
        return createQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            hasMoreMatches: async () => {
                this.mwlQueryTask.mwl = await this.getNextMwl();
                return !_.isNull(this.mwlQueryTask.mwl);
            },
            nextMatch: async () => {
                this.mwlQueryTask.mwlAttr = this.mwlQueryTask.mwl ? await this.mwlQueryTask.mwl.getAttributes() : null;
                return this.mwlQueryTask.mwlAttr;
            },
            adjust: async (match) => {
                return this.mwlQueryTask.basicAdjust(match);
            }
        };
    }

    async getNextMwl() {
        let mwl = await MwlItemModel.findOne({
            ...this.mwlQueryTask.query,
            attributes: ["json"],
            limit: 1,
            offset: this.mwlQueryTask.offset++
        });
        return mwl;
    }
}

module.exports.JsMwlQueryTask = SqlJsMwlQueryTask;
module.exports.MwlMatchIteratorProxy = MwlMatchIteratorProxy;
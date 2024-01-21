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
const { MwlItemModel } = require("@dbModels/mwlitems.model");


class JsMwlQueryTask {
    constructor(as, pc, rq, keys) {
        /** @type { Association } */
        this.as = as;
        /** @type { PresentationContext } */
        this.pc = pc;
        /** @type { Attributes } */
        this.rq = rq;
        /** @type { Attributes } */
        this.keys = keys;

        this.mwlAttr = null;
        this.mwl = null;
    }

    async get() {
        let mwlQueryTask = await BasicModQueryTask.newInstanceAsync(
            this.as,
            this.pc,
            this.rq,
            this.keys,
            this.getQueryTaskInjectProxy()
        );

        await this.initCursor();

        return mwlQueryTask;
    }

    getQueryTaskInjectProxy() {
        // for creating one
        if (!this.matchIteratorProxy) {
            this.matchIteratorProxy = new MwlMatchIteratorProxy(this);
        }

        return this.matchIteratorProxy.get();
    }

    /**
     * 
     * @param {Attributes} match 
     * @returns 
     */
    async basicAdjust(match) {
        if (match == null) {
            return null;
        }

        let filtered = new Attributes(await match.size());

        await filtered.setNull(Tag.SpecificCharacterSet, VR.CS);
        await filtered.addSelected(match, this.keys);
        await filtered.supplementEmpty(this.keys);
        return filtered;
    }

    async initCursor() {
        let queryAuditManager = await QueryTaskUtils.getAuditManager(this.as);
        let dbQuery = await QueryTaskUtils.getDbQuery(this.keys, "mwl");
        queryAuditManager.onQuery(
            UID.ModalityWorklistInformationModelFind,
            JSON.stringify(dbQuery),
            "UTF-8"
        );

        let returnKeys = await QueryTaskUtils.getReturnKeys(this.keys, "mwl");

        logger.info(`do DIMSE Modality Work List query: ${JSON.stringify(dbQuery)}`);
        this.cursor = await MwlItemModel.getDimseResultCursor({
            ...dbQuery
        }, returnKeys);
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
                this.mwlQueryTask.mwl = await this.mwlQueryTask.cursor.next();
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
}

module.exports.JsMwlQueryTask = JsMwlQueryTask;
module.exports.MwlMatchIteratorProxy = MwlMatchIteratorProxy;
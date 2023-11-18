const _ = require("lodash");
const { createPatientQueryTaskInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/PatientQueryTaskInject");
const { DimseQueryBuilder } = require("@dimse-query-builder");
const { PatientQueryBuilder } = require("@root/api-sql/dicom-web/controller/QIDO-RS/service/patientQueryBuilder");
const { PatientModel } = require("@models/sql/models/patient.model");
const { JsPatientQueryTask } = require("../dimse/patientQueryTask");
const { QueryTaskUtils } = require("@root/dimse/utils");


class SqlJsPatientQueryTask extends JsPatientQueryTask {
    constructor(as, pc, rq, keys) {
        super(as, pc, rq, keys);

        this.offset = 0;
        this.query = null;
    }

    getPatientQueryTaskInjectProxy() {
        if (!this.patientQueryTaskProxy) {
            this.patientQueryTaskProxy =  new SqlPatientQueryTaskInjectProxy(this);
        }
        return this.patientQueryTaskProxy.get();
    }

    async initCursor() {
        this.offset = 0;
        let sqlQuery = await QueryTaskUtils.getDbQuery(this.keys, "patient");
        let patientQueryBuilder = new PatientQueryBuilder({
            query: {
                ...sqlQuery
            }
        });
        let q = patientQueryBuilder.build();
        this.query = {
            ...q
        };
    }

}

class SqlPatientQueryTaskInjectProxy {
    constructor(patientQueryTask) {
        /** @type {SqlJsPatientQueryTask} */
        this.patientQueryTask = patientQueryTask;
    }

    get() {
        return createPatientQueryTaskInjectProxy(this.getProxyMethods(), {
            keepAsDaemon: true
        });
    }

    getProxyMethods() {
        return {
            wrappedFindNextPatient: this.wrappedFindNextPatient.bind(this),
            getPatient: this.getPatient.bind(this),
            findNextPatient: this.findNextPatient.bind(this)
        };
    }

    async wrappedFindNextPatient() {
        await this.findNextPatient();
    }

    async findNextPatient() {
        await this.getPatient();
        return !_.isNull(this.patientQueryTask.patientAttr);
    }

    async getPatient() {
        let patient = await PatientModel.findOne({
            ...this.patientQueryTask.query,
            attributes: ["json"],
            limit: 1,
            offset: this.patientQueryTask.offset++
        });

        this.patientQueryTask.patient = patient;
        this.patientQueryTask.patientAttr = this.patientQueryTask.patient ? await this.patientQueryTask.patient.getAttributes() : null;
    }
}

module.exports.JsPatientQueryTask = SqlJsPatientQueryTask;
const { default: Attributes } = require("@dcm4che/data/Attributes");
const { default: UID } = require("@dcm4che/data/UID");
const { default: Association } = require("@dcm4che/net/Association");
const { default: Dimse } = require("@dcm4che/net/Dimse");
const { default: Status } = require("@dcm4che/net/Status");
const { default: PresentationContext } = require("@dcm4che/net/pdu/PresentationContext");
const { default: QueryRetrieveLevel2 } = require("@dcm4che/net/service/QueryRetrieveLevel2");
const { default: EnumSet } = require("@java-wrapper/java/util/EnumSet");
const { default: BasicModCFindSCP } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/BasicModCFindSCP");
const { createCFindSCPInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/CFindSCPInject");
const { JsPatientQueryTask } = require("./patientQueryTask");
const { JsStudyQueryTask } = require("./studyQueryTask");
const { JsSeriesQueryTask } = require("./seriesQueryTask");

const PATIENT_ROOT_LEVELS = EnumSet.ofSync(
    QueryRetrieveLevel2.PATIENT,
    QueryRetrieveLevel2.STUDY,
    QueryRetrieveLevel2.SERIES,
    QueryRetrieveLevel2.IMAGE
);

const STUDY_ROOT_LEVELS = EnumSet.ofSync(
    QueryRetrieveLevel2.STUDY,
    QueryRetrieveLevel2.SERIES,
    QueryRetrieveLevel2.IMAGE
);

const PATIENT_STUDY_ONLY_LEVELS = EnumSet.ofSync(
    QueryRetrieveLevel2.PATIENT,
    QueryRetrieveLevel2.STUDY
);

class JsCFindScp {
    constructor() { }

    getPatientRootLevel() {
        const cFindScpInject = createCFindSCPInjectProxy(this.getCFindScpInjectProxyMethods(), {
            keepAsDaemon: true
        });
        let basicModCFindSCP = new BasicModCFindSCP(
            cFindScpInject,
            UID.PatientRootQueryRetrieveInformationModelFind,
            PATIENT_ROOT_LEVELS
        );

        this.scpObj = basicModCFindSCP;
        return basicModCFindSCP;
    }

    getStudyRootLevel() {
        const cFindScpInject = createCFindSCPInjectProxy(this.getCFindScpInjectProxyMethods(), {
            keepAsDaemon: true
        });
        let basicModCFindSCP = new BasicModCFindSCP(
            cFindScpInject,
            UID.StudyRootQueryRetrieveInformationModelFind,
            STUDY_ROOT_LEVELS
        );

        this.scpObj = basicModCFindSCP;
        return basicModCFindSCP;
    }

    getPatientStudyOnlyLevel() {
        const cFindScpInject = createCFindSCPInjectProxy(this.getCFindScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        let basicModCFindSCP = new BasicModCFindSCP(
            cFindScpInject,
            UID.PatientStudyOnlyQueryRetrieveInformationModelFind,
            PATIENT_STUDY_ONLY_LEVELS
        );

        this.scpObj = basicModCFindSCP;
        return basicModCFindSCP;
    }

    getCFindScpInjectProxyMethods() {
        /**
         * @type { import("@java-wrapper/org/github/chinlinlee/dcm777/net/CFindSCPInject").CFindSCPInjectInterface }
         */
        const cFindScpInjectProxyMethods = {
            /**
             * 
             * @param {Association} as 
             * @param {PresentationContext} pc 
             * @param {Dimse} dimse 
             * @param {Attributes} rq 
             * @param {Attributes} keys 
             */
            onDimseRQ: async (as, pc, dimse, rq, keys) => {
                if (await dimse.compareTo(Dimse.C_FIND_RQ) !== 0) {
                    throw new Error(Status.UnrecognizedOperation);
                }
                let queryTask = await cFindScpInjectProxyMethods.calculateMatches(as, pc, rq, keys);
                let applicationEntity = await as.getApplicationEntity();
                let device = await applicationEntity.getDevice();
                await device.execute(queryTask);
            },
            calculateMatches: async (as, pc, rq, keys) => {
                try {
                    let level = await this.scpObj.getQrLevel(as, pc, rq, keys);
                    if (await level.compareTo(QueryRetrieveLevel2.PATIENT) === 0) {
                        return await (new JsPatientQueryTask(as, pc, rq, keys)).get();
                    } else if (await level.compareTo(QueryRetrieveLevel2.STUDY) === 0) {
                        return await (new JsStudyQueryTask(as, pc, rq, keys)).get();
                    } else if (await level.compareTo(QueryRetrieveLevel2.SERIES) === 0) {
                        return await (new JsSeriesQueryTask(as, pc, rq, keys)).get();
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        };

        return cFindScpInjectProxyMethods;
    }
}

module.exports.JsCFindScp = JsCFindScp;
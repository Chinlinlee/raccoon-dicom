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


class JsCFindScp {
    constructor() { }

    getPatientRootLevel() {
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
                    let level = await basicModCFindSCP.getQrLevel(as, pc, rq, keys);
                    if (await level.compareTo(QueryRetrieveLevel2.PATIENT) === 0) {
                        return await (new JsPatientQueryTask(as, pc, rq, keys)).get();
                    }
                } catch(e) {
                    console.error(e);
                }
            }
        };

        const cFindScpInject = createCFindSCPInjectProxy(cFindScpInjectProxyMethods, {
            keepAsDaemon: true
        });
        let basicModCFindSCP = new BasicModCFindSCP(
            cFindScpInject,
            UID.PatientRootQueryRetrieveInformationModelFind,
            EnumSet.ofSync(
                QueryRetrieveLevel2.PATIENT,
                QueryRetrieveLevel2.STUDY,
                QueryRetrieveLevel2.SERIES,
                QueryRetrieveLevel2.IMAGE
            )
        );

        return basicModCFindSCP;
    }
}

module.exports.JsCFindScp = JsCFindScp;
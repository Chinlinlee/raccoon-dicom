const { UID } = require("@dcm4che/data/UID");
const { createCGetSCPInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/CGetSCPInject");
const { SimpleCGetSCP } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SimpleCGetSCP");
const { PATIENT_ROOT_LEVELS, STUDY_ROOT_LEVELS, PATIENT_STUDY_ONLY_LEVELS } = require("./level");
const { getInstancesFromKeysAttr } = require("./utils");
const { RetrieveTaskImpl } = require("@dcm4che/tool/dcmqrscp/RetrieveTaskImpl");
const { Dimse } = require("@dcm4che/net/Dimse");
const { EnumSet } = require("@java-wrapper/java/util/EnumSet");
const { QueryRetrieveLevel2 } = require("@dcm4che/net/service/QueryRetrieveLevel2");

class JsCGetScp {
    constructor() { }

    getPatientRootLevel() {
        const cGetScpInject = createCGetSCPInjectProxy(this.getCGetScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        let simpleCGetScp = new SimpleCGetSCP(
            cGetScpInject,
            UID.PatientRootQueryRetrieveInformationModelGet,
            PATIENT_ROOT_LEVELS
        );

        this.scpObj = simpleCGetScp;

        return simpleCGetScp;
    }

    getStudyRootLevel() {
        const cGetScpInject = createCGetSCPInjectProxy(this.getCGetScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        let simpleCGetScp = new SimpleCGetSCP(
            cGetScpInject,
            UID.StudyRootQueryRetrieveInformationModelGet,
            STUDY_ROOT_LEVELS
        );

        this.scpObj = simpleCGetScp;

        return simpleCGetScp;
    }

    getPatientStudyOnlyLevel() {
        const cGetScpInject = createCGetSCPInjectProxy(this.getCGetScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        let simpleCGetScp = new SimpleCGetSCP(
            cGetScpInject,
            UID.PatientStudyOnlyQueryRetrieveInformationModelGet,
            PATIENT_STUDY_ONLY_LEVELS
        );

        this.scpObj = simpleCGetScp;

        return simpleCGetScp;
    }

    getCompositeLevel() {
        const cGetScpInject = createCGetSCPInjectProxy(this.getCGetScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        let simpleCGetScp = new SimpleCGetSCP(
            cGetScpInject,
            UID.CompositeInstanceRetrieveWithoutBulkDataGet,
            EnumSet.ofSync(QueryRetrieveLevel2.IMAGE)
        );

        this.scpObj = simpleCGetScp;

        return simpleCGetScp;
    }

    getCGetScpInjectProxyMethods() {
        const cGetScpInjectProxyMethods = {
            /**
             * 
             * @param {Association} as 
             * @param {PresentationContext} pc 
             * @param {Attributes} rq 
             * @param {Attributes} keys 
             */
            calculateMatches: async (as, pc, rq, keys) => { 
                let instances = await getInstancesFromKeysAttr(keys);
                if (await instances.isEmpty()) {
                    return null;
                }

                let withoutBulkData = await (await this.scpObj.getQrLevels()).size() == 1;
                let retrieveTask = await RetrieveTaskImpl.newInstanceAsync(
                    Dimse.C_GET_RQ,
                    as,
                    pc,
                    rq,
                    instances,
                    as,
                    withoutBulkData,
                    0
                );
                await retrieveTask.setSendPendingRSP(false);

                return retrieveTask;
            }
        };

        return cGetScpInjectProxyMethods;
    };
}

module.exports.JsCGetScp = JsCGetScp;
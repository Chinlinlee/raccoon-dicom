const { UID } = require("@dcm4che/data/UID");
const { createCGetSCPInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/CGetSCPInject");
const { SimpleCGetSCP } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SimpleCGetSCP");
const { PATIENT_ROOT_LEVELS, STUDY_ROOT_LEVELS, PATIENT_STUDY_ONLY_LEVELS } = require("./level");
const { getInstancesFromKeysAttr } = require("@dimse/utils");
const { RetrieveTaskImpl } = require("@chinlinlee/dcm777/dcmqrscp/RetrieveTaskImpl");
const { createRetrieveAuditInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/dcmqrscp/RetrieveAuditInject");
const { Dimse } = require("@dcm4che/net/Dimse");
const { EnumSet } = require("@java-wrapper/java/util/EnumSet");
const { QueryRetrieveLevel2 } = require("@dcm4che/net/service/QueryRetrieveLevel2");
const { DimseRetrieveAuditService } = require("./service/retrieveAudit.service");

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
                    await this.getAuditInject(as),
                    0
                );
                await retrieveTask.setSendPendingRSP(false);

                return retrieveTask;
            }
        };

        return cGetScpInjectProxyMethods;
    };

    getAuditInject(association) {
        let dimseRetrieveAuditService = new DimseRetrieveAuditService(
            association,
            null,
            null
        );

        return createRetrieveAuditInjectProxy(
            {
                onBeginTransferringDICOMInstances: async (studyUIDs) => {
                    dimseRetrieveAuditService.studyUID = studyUIDs[0];
                    await dimseRetrieveAuditService.onBeginRetrieve();
                },
                onDicomInstancesTransferred: async (studyUIDs) => {
                    dimseRetrieveAuditService.studyUID = studyUIDs[0];
                    await dimseRetrieveAuditService.completedRetrieve();
                },
                setEventResult: (eventResult) => {
                    dimseRetrieveAuditService.eventResult = eventResult;
                }
            }
        );
    }
}

module.exports.JsCGetScp = JsCGetScp;
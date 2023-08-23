const _ = require("lodash");

const { Attributes } = require("@dcm4che/data/Attributes");
const { Tag } = require("@dcm4che/data/Tag");
const { Association } = require("@dcm4che/net/Association");
const { Status } = require("@dcm4che/net/Status");
const { PresentationContext } = require("@dcm4che/net/pdu/PresentationContext");
const { DicomServiceError } = require("@error/dicom-service");
const { createCMoveSCPInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/CMoveSCPInject");
const { SimpleCMoveSCP } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SimpleCMoveSCP");
const { UID } = require("@dcm4che/data/UID");

const { PATIENT_ROOT_LEVELS, STUDY_ROOT_LEVELS, PATIENT_STUDY_ONLY_LEVELS } = require("./level");
const { default: AAssociateRQ } = require("@dcm4che/net/pdu/AAssociateRQ");
const { default: Connection } = require("@dcm4che/net/Connection");
const { default: RetrieveTaskImpl } = require("@dcm4che/tool/dcmqrscp/RetrieveTaskImpl");
const { Dimse } = require("@dcm4che/net/Dimse");
const { getInstancesFromKeysAttr } = require("./utils");

class JsCMoveScp {
    constructor(dcmQrScp) {
        /** @type { import("./index").DcmQrScp } */
        this.dcmQrScp = dcmQrScp;
    }

    getPatientRootLevel() {
        const cMoveScpInject = createCMoveSCPInjectProxy(this.getCMoveScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        return new SimpleCMoveSCP(
            cMoveScpInject,
            UID.PatientRootQueryRetrieveInformationModelMove,
            PATIENT_ROOT_LEVELS
        );
    }

    getStudyRootLevel() {
        const cMoveScpInject = createCMoveSCPInjectProxy(this.getCMoveScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        return new SimpleCMoveSCP(
            cMoveScpInject,
            UID.StudyRootQueryRetrieveInformationModelMove,
            STUDY_ROOT_LEVELS
        );
    }

    getPatientStudyOnlyLevel() {
        const cMoveScpInject = createCMoveSCPInjectProxy(this.getCMoveScpInjectProxyMethods(), {
            keepAsDaemon: true
        });

        return new SimpleCMoveSCP(
            cMoveScpInject,
            UID.PatientStudyOnlyQueryRetrieveInformationModelMove,
            PATIENT_STUDY_ONLY_LEVELS
        );
    }

    getCMoveScpInjectProxyMethods() {
        /** @type { import("@java-wrapper/org/github/chinlinlee/dcm777/net/CMoveSCPInject").CMoveSCPInjectInterface } */
        const cMoveScpInjectProxyMethods = {
            /**
             * 
             * @param {Association} as 
             * @param {PresentationContext} pc 
             * @param {Attributes} rq 
             * @param {Attributes} keys 
             */
            calculateMatches: async (as, pc, rq, keys) => {
                try {
                    let moveDest = await rq.getString(Tag.MoveDestination);
                    const remote = this.dcmQrScp.getRemoteConnection(moveDest);
                    if (!remote) {
                        throw new DicomServiceError(Status.MoveDestinationUnknown, `Move Destination: ${moveDest} unknown`);
                    }

                    let instances = await getInstancesFromKeysAttr(keys);
                    if (await instances.isEmpty()) {
                        return null;
                    }

                    let aAssociateRq = await this.makeAAssociateRQ_(await as.getLocalAET(), moveDest, instances);
                    let storeAssociation = await this.openStoreAssociation_(as, remote, aAssociateRq);
                    let retrieveTask = await RetrieveTaskImpl.newInstanceAsync(
                        Dimse.C_MOVE_RQ,
                        as,
                        pc,
                        rq,
                        instances,
                        storeAssociation,
                        false,
                        0
                    );
                    await retrieveTask.setSendPendingRSPInterval(0);
                    return retrieveTask;
                } catch (e) {
                    console.error(e);
                    throw e;
                }
            }
        };

        return cMoveScpInjectProxyMethods;
    }

    /**
     * @private
     * @param {string} callingAet 
     * @param {string} calledAet 
     * @param {*} matches 
     */
    async makeAAssociateRQ_(callingAet, calledAet, matches) {
        let aAssociateRq = await AAssociateRQ.newInstanceAsync();
        await aAssociateRq.setCallingAET(callingAet);
        await aAssociateRq.setCalledAET(calledAet);
        let matchesArray = await matches.toArray();
        for (let match of matchesArray) {
            if (await aAssociateRq.addPresentationContextFor(match.cuid, match.tsuid)) {

                if (!UID.ExplicitVRLittleEndian === match.tsuid) {
                    await aAssociateRq.addPresentationContextFor(match.cuid, UID.ExplicitVRLittleEndian);
                }

                if (!UID.ImplicitVRLittleEndian === match.tsuid) {
                    await aAssociateRq.addPresentationContextFor(match.cuid, UID.ImplicitVRLittleEndian);
                }
            }
        }
        return aAssociateRq;
    }

    /**
     * @private
     * @param {Association} as 
     * @param {Connection} remote 
     * @param {AAssociateRQ} aAssociateRq 
     * @returns 
     */
    async openStoreAssociation_(as, remote, aAssociateRq) {
        try {
            let applicationEntity = await as.getApplicationEntity();

            return await applicationEntity.connect(
                await as.getConnection(), 
                remote,
                aAssociateRq
            );

        } catch (e) {
            throw new DicomServiceError(Status.UnableToPerformSubOperations, e);
        }
    }
}

module.exports.JsCMoveScp = JsCMoveScp;
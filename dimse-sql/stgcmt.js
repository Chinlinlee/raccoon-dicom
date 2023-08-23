const path = require("path");
const { Commands } = require("@dcm4che/net/Commands");
const { Status } = require("@dcm4che/net/Status");
const { DicomServiceError } = require("@error/dicom-service");
const { createStgCmtSCPInjectProxy } = require("../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm777/net/StgCmtSCPInject");
const { Attributes } = require("@dcm4che/data/Attributes");
const { Tag } = require("@dcm4che/data/Tag");
const { VR } = require("@dcm4che/data/VR");
const { raccoonConfig } = require("@root/config-class");
const { findOneInstanceFromKeysAttr } = require("./utils");
const fileExist = require("@root/utils/file/fileExist");
const { SimpleStgCmtSCP } = require("@chinlinlee/dcm777/net/SimpleStgCmtSCP");
const { SendStgCmtResult } = require("@chinlinlee/dcm777/dcmqrscp/SendStgCmtResult");

class JsStgCmtScp {
    constructor(dcmQrScp) {
        /** @type { import("./index").DcmQrScp } */
        this.dcmQrScp = dcmQrScp;
    }

    get() {
        return new SimpleStgCmtSCP(
            this.getStgCmtInjectProxy()
        );
    }

    getStgCmtInjectProxy() {
        /** @type { import("../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm777/net/StgCmtSCPInject").StgCmtSCPInjectInterface } */
        const stgCmtInjectProxyMethods = {
            onDimseRQ: async (as, pc, dimse, rq, actionInfo) => {
                let rsp = await Commands.mkNActionRSP(rq, Status.Success);
                let callingAet = await as.getCallingAET();
                let calledAet = await as.getCalledAET();

                let remoteConnection = this.dcmQrScp.getRemoteConnection(callingAet);
                if (!remoteConnection)
                    throw new DicomServiceError(Status.ProcessingFailure, `Unknown Calling AET: ${callingAet}`);

                let eventInfo;
                try {
                    eventInfo = await this.calculateStorageCommitmentResult(calledAet, actionInfo);
                } catch(e) {
                    console.error(e);
                    throw e;
                }
                
                try {
                    await as.writeDimseRSP(pc, rsp, null);

                    await this.dcmQrScp.device.execute(
                        await SendStgCmtResult.newInstanceAsync(
                            as,
                            eventInfo,
                            false,
                            remoteConnection
                        )
                    );
                } catch(e) {
                    console.error(`${await as.toString()} << N-ACTION-RSP failed: ${e}`);
                }
            }
        };

        return createStgCmtSCPInjectProxy(stgCmtInjectProxyMethods, {
            keepAsDaemon: true
        });
    }

    /**
     * 
     * @param {string} calledAet 
     * @param {Attributes} actionInfo 
     * @returns { Promise<Attributes> }
     */
    async calculateStorageCommitmentResult(calledAet, actionInfo) {
        let requestReq = await actionInfo.getSequence(Tag.ReferencedSOPSequence);
        let size = await requestReq.size();

        let eventInfo = await Attributes.newInstanceAsync(6);

        await eventInfo.setString(Tag.RetrieveAETitle, VR.AE, calledAet);
        await eventInfo.setString(Tag.StorageMediaFileSetID, VR.SH, raccoonConfig.mediaStorageID);
        await eventInfo.setString(Tag.StorageMediaFileSetUID, VR.SH, raccoonConfig.mediaStorageUID);
        await eventInfo.setString(Tag.TransactionUID, VR.UI, await actionInfo.getString(Tag.TransactionUID));
        let successSeq = await eventInfo.newSequence(Tag.ReferencedSOPSequence, size);
        let failedSeq = await eventInfo.newSequence(Tag.FailedSOPSequence, size);

        let uidMap = {};
        for (let i = 0; i < size; i++) {
            /** @type { Attributes } */
            let item = await requestReq.get(i);
            uidMap[await item.getString(Tag.ReferencedSOPInstanceUID)] = await item.getString(Tag.ReferencedSOPClassUID);
        }

        for (let key in uidMap) {
            let classUid = uidMap[key];
            let attr = await Attributes.newInstanceAsync();
            await attr.setString(Tag.SOPInstanceUID, VR.UI, key);
            await attr.setString(Tag.SOPClassUID, VR.UI, classUid);

            let instance = await findOneInstanceFromKeysAttr(attr);
            if (instance) {
                let isExist = await fileExist(
                    path.join(
                        raccoonConfig.dicomWebConfig.storeRootPath,
                        instance.instancePath
                    )
                );
                if (isExist) {
                    await successSeq.add(
                        await JsStgCmtScp.refSOP(key, classUid, Status.Success)
                    );
                } else {
                    await failedSeq.add(
                        await JsStgCmtScp.refSOP(key, classUid, Status.NoSuchObjectInstance)
                    );
                }
            } else {
                await failedSeq.add(
                    await JsStgCmtScp.refSOP(key, classUid, Status.NoSuchObjectInstance)
                );
            }
        }

        if (await failedSeq.isEmpty())
            await eventInfo.remove(Tag.FailedSOPSequence);

        return eventInfo;
    }

    /**
     * @private
     * @param {string} instanceUid
     * @param {string} classUid
     * @param {number} failureReason
     * @returns { Promise<Attributes> }
     */
    static async refSOP(instanceUid, classUid, failureReason) {
        let attr = await Attributes.newInstanceAsync(3);
        await attr.setString(Tag.ReferencedSOPClassUID, VR.UI, classUid);
        await attr.setString(Tag.ReferencedSOPInstanceUID, VR.UI, instanceUid);
        if (failureReason !== Status.Success) {
            await attr.setInt(Tag.FailureReason, VR.US, failureReason);
        }
        return attr;
    }
}

module.exports.JsStgCmtScp = JsStgCmtScp;
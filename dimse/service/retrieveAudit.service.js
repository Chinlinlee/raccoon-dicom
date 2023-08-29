const { Association } = require("@dcm4che/net/Association");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");

class DimseRetrieveAuditService {
    constructor(association, studyUID, eventResult) {
        /** @type { Association } */
        this.association = association;
        this.studyUID = studyUID;
        this.eventResult = eventResult;
    }

    async onBeginRetrieve() {
        let auditManager = new AuditManager(
            EventType.RETRIEVE_BEGIN,
            this.eventResult,
            await this.association.getRemoteAET(), await this.association.getRemoteHostName(),
            await this.association.getLocalAET(), await this.association.getLocalAET()
        );

        await auditManager.onBeginTransferringDicomInstances([this.studyUID]);
    }

    async completedRetrieve() {
        let auditManager = new AuditManager(
            EventType.RETRIEVE_END,
            this.eventResult,
            await this.association.getRemoteAET(), await this.association.getRemoteHostName(),
            await this.association.getLocalAET(), await this.association.getLocalHostName()
        );

        await auditManager.onDicomInstancesTransferred([this.studyUID]);
    }
}

module.exports.DimseRetrieveAuditService = DimseRetrieveAuditService;
const _ = require("lodash");

const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { DicomWebService } = require("@root/api/dicom-web/service/dicom-web.service");

class RetrieveAuditService {
    constructor(req, studyUID, eventResult) {
        this.request = req;
        this.studyUID = studyUID;
        this.eventResult = eventResult;
    }

    async onBeginRetrieve() {
        let auditManager = new AuditManager(
            EventType.RETRIEVE_BEGIN,
            this.eventResult,
            DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
            DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
        );

        await auditManager.onBeginTransferringDicomInstances([this.studyUID]);
    }

    async completedRetrieve() {
        let auditManager = new AuditManager(
            EventType.RETRIEVE_END,
            this.eventResult,
            DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
            DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
        );

        await auditManager.onDicomInstancesTransferred([this.studyUID]);
    }
}

module.exports.RetrieveAuditService = RetrieveAuditService;
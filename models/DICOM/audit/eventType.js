const { AuditMessages$EventActionCode } = require("@dcm4che/audit/AuditMessages$EventActionCode");
const { AuditMessages$EventID } = require("@dcm4che/audit/AuditMessages$EventID");
const { AuditMessages$RoleIDCode } = require("@dcm4che/audit/AuditMessages$RoleIDCode");
const { EventID } = require("@dcm4che/audit/EventID");

class EventType {
    /** @constant */
    static STORE_CREATE = new EventType(
        AuditMessages$EventID.DICOMInstancesTransferred,
        AuditMessages$EventActionCode.Create,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    /** @constant */
    static RETRIEVE_BEGIN = new EventType(
        AuditMessages$EventID.BeginTransferringDICOMInstances,
        AuditMessages$EventActionCode.Execute,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    /** @constant */
    static RETRIEVE_END = new EventType(
        AuditMessages$EventID.DICOMInstancesTransferred,
        AuditMessages$EventActionCode.Read,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    static WADO_URI = new EventType(
        AuditMessages$EventID.DICOMInstancesTransferred,
        AuditMessages$EventActionCode.Read,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination
    );

    static QUERY = new EventType(
        AuditMessages$EventID.Query,
        AuditMessages$EventActionCode.Execute,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination
    );

    constructor(eventID, eventActionCode, source, destination, eventTypeCode) {
        this.eventID = eventID;
        this.eventActionCode = eventActionCode;
        this.source = source;
        this.destination = destination;
        this.eventTypeCode = eventTypeCode;
    }
}

module.exports.EventType = EventType;
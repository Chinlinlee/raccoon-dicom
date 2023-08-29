const { AuditMessages$EventActionCode } = require("@dcm4che/audit/AuditMessages$EventActionCode");
const { AuditMessages$EventID } = require("@dcm4che/audit/AuditMessages$EventID");
const { AuditMessages$RoleIDCode } = require("@dcm4che/audit/AuditMessages$RoleIDCode");

class EventType {

    static STORE_BEGIN = new EventType(
        "STORE_BEGIN",
        AuditMessages$EventID.BeginTransferringDICOMInstances,
        AuditMessages$EventActionCode.Execute,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    /** @constant */
    static STORE_CREATE = new EventType(
        "STORE_CREATE",
        AuditMessages$EventID.DICOMInstancesTransferred,
        AuditMessages$EventActionCode.Create,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    /** @constant */
    static RETRIEVE_BEGIN = new EventType(
        "RETRIEVE_BEGIN",
        AuditMessages$EventID.BeginTransferringDICOMInstances,
        AuditMessages$EventActionCode.Execute,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    /** @constant */
    static RETRIEVE_END = new EventType(
        "RETRIEVE_END",
        AuditMessages$EventID.DICOMInstancesTransferred,
        AuditMessages$EventActionCode.Read,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    static WADO_URI = new EventType(
        "WADO_URI",
        AuditMessages$EventID.DICOMInstancesTransferred,
        AuditMessages$EventActionCode.Read,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination
    );

    static QUERY = new EventType(
        "QUERY",
        AuditMessages$EventID.Query,
        AuditMessages$EventActionCode.Execute,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination
    );

    static QUERY_ACCESSED_INSTANCE = new EventType(
        "QUERY_ACCESSED_INSTANCE",
        AuditMessages$EventID.DICOMInstancesAccessed,
        AuditMessages$EventActionCode.Read,
        AuditMessages$RoleIDCode.Source,
        AuditMessages$RoleIDCode.Destination,
        undefined
    );

    constructor(eventName, eventID, eventActionCode, source, destination, eventTypeCode) {
        this.eventName = eventName;
        this.eventID = eventID;
        this.eventActionCode = eventActionCode;
        this.source = source;
        this.destination = destination;
        this.eventTypeCode = eventTypeCode;
    }
}

module.exports.EventType = EventType;
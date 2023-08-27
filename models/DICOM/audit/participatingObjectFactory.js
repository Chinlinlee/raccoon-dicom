const { AuditMessages$ParticipantObjectIDTypeCode } = require("@dcm4che/audit/AuditMessages$ParticipantObjectIDTypeCode");
const { AuditMessages$ParticipantObjectTypeCode } = require("@dcm4che/audit/AuditMessages$ParticipantObjectTypeCode");
const { AuditMessages$ParticipantObjectTypeCodeRole } = require("@dcm4che/audit/AuditMessages$ParticipantObjectTypeCodeRole");
const { ParticipantObjectDescription } = require("@dcm4che/audit/ParticipantObjectDescription");
const { ParticipantObjectIdentification } = require("@dcm4che/audit/ParticipantObjectIdentification");
const { SOPClass } = require("@dcm4che/audit/SOPClass");

/**
 * @typedef AuditInstancesInfo
 * @property {string[]} sopClassUIDs
 * @property {string} patientID
 * @property {string} patientName
 */

class ParticipatingObjectFactory {
    constructor(instanceModel, studyUID) {
        this.instanceModel = instanceModel;
        /** @type {string[]} */
        this.studyUID = studyUID;
    }

    async getStudyParticipatingObject() {
        let objectIdentification = await ParticipantObjectIdentification.newInstanceAsync();
        await objectIdentification.setParticipantObjectTypeCode(AuditMessages$ParticipantObjectTypeCode.SystemObject);
        await objectIdentification.setParticipantObjectTypeCodeRole(AuditMessages$ParticipantObjectTypeCodeRole.Report);
        await objectIdentification.setParticipantObjectIDTypeCode(AuditMessages$ParticipantObjectIDTypeCode.StudyInstanceUID);
        await objectIdentification.setParticipantObjectID(this.studyUID);

        let description = await this.getDescription(
            await this.getInstancesInfo()
        );
        await objectIdentification.setParticipantObjectDescription(description);

        return objectIdentification;
    }

    async getDescription(instancesInfo) {
        
        let description = await ParticipantObjectDescription.newInstanceAsync();
        
        for (let i = 0; i < instancesInfo.sopClassUIDs.length; i++) {
            let sopClassUID = instancesInfo.sopClassUIDs[i];
            let sopClass = await SOPClass.newInstanceAsync();
            await sopClass.setUID(sopClassUID);

            await (await description.getSOPClass()).add(sopClass);
        }

        for (let y = 0 ; y < instancesInfo.accessionNumbers.length; y++) {
            let accessionNumber = instancesInfo.accessionNumbers[y];
            await (await description.getAccession()).add(accessionNumber);
        }

        return description;
    }

    async getPatientParticipatingObject() {
        let patientParticipatingObject = await ParticipantObjectIdentification.newInstanceAsync();
        await patientParticipatingObject.setParticipantObjectTypeCode(AuditMessages$ParticipantObjectTypeCode.Person);
        await patientParticipatingObject.setParticipantObjectTypeCodeRole(AuditMessages$ParticipantObjectTypeCodeRole.Patient);
        await patientParticipatingObject.setParticipantObjectIDTypeCode(AuditMessages$ParticipantObjectIDTypeCode.PatientNumber);
        await patientParticipatingObject.setParticipantObjectID(this.instancesInfo.patientID);
        await patientParticipatingObject.setParticipantObjectName(this.instancesInfo.patientName);

        return patientParticipatingObject;
    }

    async getInstancesInfo() {
        this.instancesInfo ? this.instancesInfo: this.instancesInfo = await this.instanceModel.getAuditInstancesInfoFromStudyUID(this.studyUID);
        return this.instancesInfo;
    }
}

module.exports.ParticipatingObjectFactory = ParticipatingObjectFactory;
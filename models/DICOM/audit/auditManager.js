const _ = require("lodash");

const { ActiveParticipant } = require("@dcm4che/audit/ActiveParticipant");
const { AuditMessages } = require("@dcm4che/audit/AuditMessages");
const { AuditMessages$EventActionCode } = require("@dcm4che/audit/AuditMessages$EventActionCode");
const { AuditMessages$EventID } = require("@dcm4che/audit/AuditMessages$EventID");
const { AuditMessages$NetworkAccessPointTypeCode } = require("@dcm4che/audit/AuditMessages$NetworkAccessPointTypeCode");
const { AuditMessages$ParticipantObjectIDTypeCode } = require("@dcm4che/audit/AuditMessages$ParticipantObjectIDTypeCode");
const { AuditMessages$ParticipantObjectTypeCode } = require("@dcm4che/audit/AuditMessages$ParticipantObjectTypeCode");
const { AuditMessages$ParticipantObjectTypeCodeRole } = require("@dcm4che/audit/AuditMessages$ParticipantObjectTypeCodeRole");
const { AuditMessages$RoleIDCode } = require("@dcm4che/audit/AuditMessages$RoleIDCode");
const { EventID } = require("@dcm4che/audit/EventID");
const { EventIdentification } = require("@dcm4che/audit/EventIdentification");
const { ParticipantObjectContainsStudy } = require("@dcm4che/audit/ParticipantObjectContainsStudy");
const { ParticipantObjectDescription } = require("@dcm4che/audit/ParticipantObjectDescription");
const { ParticipantObjectIdentification } = require("@dcm4che/audit/ParticipantObjectIdentification");
const { SOPClass } = require("@dcm4che/audit/SOPClass");
const { Calendar } = require("@java-wrapper/java/util/Calendar");
const { Common } = require("@java-wrapper/org/github/chinlinlee/dcm777/common/Common");

class AuditManager {
    constructor() { }

    /**
     * A.X.3.3 Begin Transferring DICOM Instances
     * 當有DICOM檔案開始傳輸。
     * 該事件通常用於 C-STORE、STOW-RS 或是 C-MOVE、WADO。
     * @param {string} eventResult 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
     * @param {string} clientAETitle 發送者的AETitle
     * @param {string} clientHostname 發送者的位址
     * @param {string} serverAETitle 伺服器端的AETitle
     * @param {string} serverHostname 伺服器端的位址
     * @param {string[]} StudyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     * @param {string[]} SOPClassUIDs 所有此次傳輸有關聯的SOPClassUID
     * @param {string} PatientID 一個此次傳輸關聯的PatientID
     * @param {string} PatientName 一個此次傳輸關聯的PatientName
     */
    async onBeginTransferringDicomInstances(
        eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        StudyInstanceUIDs, SOPClassUIDs,
        PatientID, PatientName
    ) {
        // #region Event
        let theEvent = await EventIdentification.newInstanceAsync();
        await theEvent.setEventID(EventID.BeginTransferringDICOMInstances);
        await theEvent.setEventActionCode(AuditMessages$EventActionCode.Execute);
        await theEvent.setEventDateTime(await Calendar.getInstance()); // 日期時間為當前時間自動取得
        await theEvent.setEventOutcomeIndicator(eventResult);
        // #endregion

        // #region Active Participant: Application started (1)
        let client = await ActiveParticipant.newInstanceAsync();
        await client.setUserID(clientAETitle);
        await client.setAlternativeUserID(clientAETitle);
        await client.setUserName("");
        await client.setUserIsRequestor(false);
        await (await client.getRoleIDCode()).add(AuditMessages$RoleIDCode.Source);
        await client.setNetworkAccessPointTypeCode(AuditMessages$NetworkAccessPointTypeCode.IPAddress);
        await client.setNetworkAccessPointID(clientHostname);
        // #endregion

        // #region Active Participant: Process receiving the data (1); 正在接收者(Server)
        let server = await ActiveParticipant.newInstanceAsync();
        await server.setUserID(serverAETitle);
        await server.setAlternativeUserID(serverAETitle);
        await server.setUserName("");
        await server.setUserIsRequestor(false);
        await (await server.getRoleIDCode()).add(AuditMessages$RoleIDCode.Destination);
        await server.setNetworkAccessPointTypeCode(AuditMessages$NetworkAccessPointTypeCode.IPAddress);
        await server.setNetworkAccessPointID(serverHostname);
        // #endregion

        // #region Participating Object: Studies being transferred (1..N) 接收到的DICOM檔案的所有Study。
        let theStudies = [];
        for (let i = 0; i < SOPClassUIDs.length; i++) {
            let theStudy = await ParticipantObjectIdentification.newInstanceAsync();
            await theStudy.setParticipantObjectTypeCode(AuditMessages$ParticipantObjectTypeCode.SystemObject);
            await theStudy.setParticipantObjectTypeCodeRole(AuditMessages$ParticipantObjectTypeCodeRole.Report);
            await theStudy.setParticipantObjectIDTypeCode(AuditMessages$ParticipantObjectIDTypeCode.StudyInstanceUID);
            await theStudy.setParticipantObjectID(StudyInstanceUIDs[i]);

            let theSOPClass = await SOPClass.newInstanceAsync();
            await theSOPClass.setUID(SOPClassUIDs[i]);
            let theParticipantObjectDescription = await ParticipantObjectDescription.newInstanceAsync();
            await (await theParticipantObjectDescription.getSOPClass()).add(theSOPClass);
            await theStudy.setParticipantObjectDescription(theParticipantObjectDescription);
            theStudies.push(theStudy);
        }
        // #endregion

        // #region Participating Object: Patient (1); 接收到的DICOM，其Patient。
        let thePatient = await ParticipantObjectIdentification.newInstanceAsync();
        await thePatient.setParticipantObjectTypeCode(AuditMessages$ParticipantObjectTypeCode.Person);
        await thePatient.setParticipantObjectTypeCodeRole(AuditMessages$ParticipantObjectTypeCodeRole.Patient);
        await thePatient.setParticipantObjectIDTypeCode(AuditMessages$ParticipantObjectIDTypeCode.PatientNumber);
        await thePatient.setParticipantObjectID(PatientID);
        await thePatient.setParticipantObjectName(PatientName);
        // #endregion

        // #region 將上述已經記錄完成的Real World Entities，組合成一個Audit Message。
        let theActiveParticipants = [client, server];

        let ParticipantObjects = [...theStudies, thePatient];
        let msg = await AuditMessages.createMessage(theEvent, theActiveParticipants, ParticipantObjects);
        // #endregion

        return await AuditManager.toJson(msg);
    }

    /**
     * A.X.3.7 DICOM Instances Transferred
     * 當有DICOM檔案傳輸時。
     * 該事件通常用於 C-STORE、STOW-RS 或是 C-MOVE、WADO。
     * @param {"C" | "R" | "U" | "D"} CRUD 該事件是屬於新增、讀取、更新、刪除哪一個? 必須為"C"、"R"、"U"、"D"其中一個，或是使用EventActionCode類別的CRUD(最終也會取得String)。
     * @param {"0" | "4" | "8" | "12"} eventResult 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
     * @param {string} clientAETitle 發送者的AETitle
     * @param {string} clientHostname 發送者的位址
     * @param {string} serverAETitle 伺服器端的AETitle
     * @param {string} serverHostname 伺服器端的位址
     * @param {string[]} StudyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     * @param {string[]} SOPClassUIDs 所有此次傳輸有關聯的SOPClassUID
     * @param {string} PatientID 一個此次傳輸關聯的PatientID
     * @param {string} PatientName 一個此次傳輸關聯的PatientName
     */
    async onDicomInstancesTransferred(CRUD, eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        StudyInstanceUIDs, SOPClassUIDs,
        PatientID, PatientName
    ) {

        // #region Event
        let theEvent = await EventIdentification.newInstanceAsync();
        await theEvent.setEventID(EventID.DICOMInstancesTransferred);
        await theEvent.setEventActionCode(CRUD);
        await theEvent.setEventDateTime(await Calendar.getInstance()); // 日期時間為當前時間自動取得
        await theEvent.setEventOutcomeIndicator(eventResult);
        // #endregion

        // #region Active Participant: Process that sent the data (1) 發送者(web client 或 STORESCU等...)
        let client = await ActiveParticipant.newInstanceAsync();
        await client.setUserID(clientAETitle);
        await client.setAlternativeUserID(clientAETitle);
        await client.setUserName("");
        await client.setUserIsRequestor(false);
        await (await client.getRoleIDCode()).add(AuditMessages$RoleIDCode.Source);
        await client.setNetworkAccessPointTypeCode(AuditMessages$NetworkAccessPointTypeCode.IPAddress);
        await client.setNetworkAccessPointID(clientHostname);
        // #endregion


        // #region Active Participant: The process that received the data. (1) 接收者(Server)
        let server = await ActiveParticipant.newInstanceAsync();
        await server.setUserID(serverAETitle);
        await server.setAlternativeUserID(serverAETitle);
        await server.setUserName("");
        await server.setUserIsRequestor(false);
        await (await server.getRoleIDCode()).add(AuditMessages$RoleIDCode.Destination);
        await server.setNetworkAccessPointTypeCode(AuditMessages$NetworkAccessPointTypeCode.IPAddress);
        await server.setNetworkAccessPointID(serverHostname);
        // #endregion

        // #region Participating Object: Studies being transferred (1..N) 接收到的DICOM檔案的所有Study
        let theStudies = [];
        for (let i = 0; i < SOPClassUIDs.length; i++) {
            let theStudy = await ParticipantObjectIdentification.newInstanceAsync();
            await theStudy.setParticipantObjectTypeCode(AuditMessages$ParticipantObjectTypeCode.SystemObject);
            await theStudy.setParticipantObjectTypeCodeRole(AuditMessages$ParticipantObjectTypeCodeRole.Report);
            
            await theStudy.setParticipantObjectIDTypeCode(AuditMessages$ParticipantObjectIDTypeCode.StudyInstanceUID);
            await theStudy.setParticipantObjectID(StudyInstanceUIDs[i]);
            
            let theSOPClass = await SOPClass.newInstanceAsync();
            await theSOPClass.setUID(SOPClassUIDs[i]);
            let theParticipantObjectDescription = await ParticipantObjectDescription.newInstanceAsync();
            await (await theParticipantObjectDescription.getSOPClass()).add(theSOPClass);
            await theStudy.setParticipantObjectDescription(theParticipantObjectDescription);
            theStudies.push(theStudy);
        }
        // #endregion

        // #region Participating Object: Patient (1); 接收到的DICOM，其Patient。
        let thePatient = await ParticipantObjectIdentification.newInstanceAsync();
        await thePatient.setParticipantObjectTypeCode(AuditMessages$ParticipantObjectTypeCode.Person);
        await thePatient.setParticipantObjectTypeCodeRole(AuditMessages$ParticipantObjectTypeCodeRole.Patient);
        await thePatient.setParticipantObjectIDTypeCode(AuditMessages$ParticipantObjectIDTypeCode.PatientNumber);
        await thePatient.setParticipantObjectID(PatientID);
        await thePatient.setParticipantObjectName(PatientName);
        // #endregion

        // #region 將上述已經記錄完成的Real World Entities，組合成一個Audit Message。
        let theActiveParticipants = [ client, server ];
        let ParticipantObjects = [...theStudies, thePatient];
        let msg = await AuditMessages.createMessage(theEvent, theActiveParticipants, ParticipantObjects);
        // #endregion

        return await AuditManager.toJson(msg);
    }

    static async toJson(msg) {
        let msgJsonString = await Common.convertAuditMessageToJsonString(msg);
        let msgJson = JSON.parse(msgJsonString);
        return msgJson;
    }
}

module.exports.AuditManager = AuditManager;
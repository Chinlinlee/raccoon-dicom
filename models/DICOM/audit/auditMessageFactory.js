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
const { ParticipantObjectDetail } = require("@dcm4che/audit/ParticipantObjectDetail");
const { AuditUtils } = require("./auditUtils");
const { EventIdentificationBuilder } = require("@dcm4che/audit/EventIdentificationBuilder");
const { EventType } = require("./eventType");
const { default: ActiveParticipantBuilder } = require("@dcm4che/audit/ActiveParticipantBuilder");
const { AuditMessages$UserIDTypeCode } = require("@dcm4che/audit/AuditMessages$UserIDTypeCode");
const { ParticipatingObjectFactory } = require("./participatingObjectFactory");

class AuditMessageFactory {
    constructor() { }

    /**
     * A.X.3.3 Begin Transferring DICOM Instances
     * 獲取 Begin Transferring DICOM Instances (當有 DICOM 檔案開始傳輸時) 事件的訊息。
     * 
     * 該事件通常用於 C-STORE、STOW-RS 或是 C-MOVE、WADO。
     * @param { EventType } eventType
     * @param {string} eventResult 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
     * @param {string} clientAETitle 發送者的AETitle
     * @param {string} clientHostname 發送者的位址
     * @param {string} serverAETitle 伺服器端的AETitle
     * @param {string} serverHostname 伺服器端的位址
     * @param {string[]} StudyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     * @param {string[]} SOPClassUIDs 所有此次傳輸有關聯的SOPClassUID
     * @param {string} PatientID 一個此次傳輸關聯的PatientID
     * @param {string} PatientName 一個此次傳輸關聯的PatientName
     * @return {JSON}
     */
    async getBeginTransferringDicomInstancesMsg(
        eventType, eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        StudyInstanceUIDs
    ) {

        // #region Event
        let theEvent = await this.getGeneralEvent(eventType, eventResult);
        // #endregion

        // #region Active Participants
        let theActiveParticipants = await this.getGeneralActiveParticipant(
            eventType,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname
        );
        // #endregion

        // #region Participating Object: Studies being transferred (1..N) 接收到的DICOM檔案的所有Study。
        let theStudies = [];
        // Participating Object: Patient (1); 接收到的DICOM，其Patient。
        let patientParticipatingObject;
        for (let i = 0; i < StudyInstanceUIDs.length; i++) {
            let participatingObjectFactory = new ParticipatingObjectFactory(
                this.getInstanceModel(),
                StudyInstanceUIDs[i]
            );

            let theStudy = await participatingObjectFactory.getStudyParticipatingObject();
            theStudies.push(theStudy);
            patientParticipatingObject ? null : patientParticipatingObject = await participatingObjectFactory.getPatientParticipatingObject();
        }
        // #endregion


        // #region 將上述已經記錄完成的Real World Entities，組合成一個Audit Message。
        let ParticipantObjects = [...theStudies, patientParticipatingObject];
        let msg = await AuditMessages.createMessage(theEvent, theActiveParticipants, ParticipantObjects);
        // #endregion

        return await AuditUtils.toJson(msg);
    }

    /**
     * A.X.3.7 DICOM Instances Transferred
     * 獲取 DICOM Instances Transferred (當有 DICOM 檔案已進行傳輸交換時) 的訊息
     * 
     * 該事件通常用於 C-STORE、STOW-RS 或是 C-MOVE、WADO。
     * @param {EventType} eventType 
     * @param {"0" | "4" | "8" | "12"} eventResult 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
     * @param {string} clientAETitle 發送者的AETitle
     * @param {string} clientHostname 發送者的位址
     * @param {string} serverAETitle 伺服器端的AETitle
     * @param {string} serverHostname 伺服器端的位址
     * @param {string[]} StudyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     */
    async getDicomInstancesTransferredMsg(
        eventType, eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        StudyInstanceUIDs
    ) {

        // #region Event
        let theEvent = await this.getGeneralEvent(eventType, eventResult);
        // #endregion

        // #region Active Participants
        let theActiveParticipants = await this.getGeneralActiveParticipant(
            eventType,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname,
            eventType.eventName !== "STORE_CREATE"
        );
        // #endregion

        // #region Participating Object: Studies being transferred (1..N) 接收到的DICOM檔案的所有Study
        let theStudies = [];
        // Participating Object: Patient (1); 接收到的DICOM，其Patient。
        let patientParticipatingObject;
        for (let i = 0; i < StudyInstanceUIDs.length; i++) {
            let participatingObjectFactory = new ParticipatingObjectFactory(
                this.getInstanceModel(),
                StudyInstanceUIDs[i]
            );

            let theStudy = await participatingObjectFactory.getStudyParticipatingObject();
            theStudies.push(theStudy);
            patientParticipatingObject ? null : patientParticipatingObject = await participatingObjectFactory.getPatientParticipatingObject();
        }
        // #endregion

        // #region 將上述已經記錄完成的Real World Entities，組合成一個Audit Message。

        let ParticipantObjects = [...theStudies, patientParticipatingObject];
        let msg = await AuditMessages.createMessage(theEvent, theActiveParticipants, ParticipantObjects);
        // #endregion

        return await AuditUtils.toJson(msg);
    }

    /**
     * A.X.3.6 DICOM Instances Accessed
     * 
     * 獲取 DICOM Instances Accessed (當有DICOM被存取時) 的訊息
     * Instances being viewed, utilized, updated, or deleted.
     * 
     * @param {EventType} eventType 該事件是屬於新增、讀取、更新、刪除哪一個? 必須為"C"、"R"、"U"、"D"其中一個，或是使用EventActionCode類別的CRUD(最終也會取得String)。
     * @param eventResult 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
     * @param clientAETitle 發送者的AETitle
     * @param clientHostname 發送者的位址
     * @param serverAETitle 伺服器端的AETitle
     * @param serverHostname 伺服器端的位址
     * @param studyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     * @return {Promise<JSON>}
     */
    async getDicomInstancesAccessedMsg(
        eventType, eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        studyInstanceUIDs
    ) {
        /**
        Event 
        */
        let theEvent = await this.getGeneralEvent(eventType, eventResult);


        /**
        Active Participant: 
        Person and or Process manipulating the data (1..2)
        存取資料的人或程式，這裡假定一定會有請求者(client)與我們本身(server)會去存取資料。
        */
        let theActiveParticipants = await this.getGeneralActiveParticipant(
            eventType,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname
        );

        /**
        Participating Object:
        Studies (1..N) 
        存取的DICOM的Study。
        */
        let theStudies = [];
        // Participating Object: Patient (1); 存取的DICOM，其Patient。
        let patientParticipatingObject;
        for (let i = 0; i < studyInstanceUIDs.length; i++) {
            let participatingObjectFactory = new ParticipatingObjectFactory(
                this.getInstanceModel(),
                studyInstanceUIDs[i]
            );

            let theStudy = await participatingObjectFactory.getStudyParticipatingObject();
            theStudies.push(theStudy);
            patientParticipatingObject ? null : patientParticipatingObject = await participatingObjectFactory.getPatientParticipatingObject();
        }

        /**
        將上述已經記錄完成的Real World Entities，組合成一個Audit Message。
        */

        let ParticipantObjects = [...theStudies, patientParticipatingObject];
        let msg = await AuditMessages.createMessage(theEvent, theActiveParticipants, ParticipantObjects);

        return await AuditUtils.toJson(msg);
    }

    /**
     * A.X.3.10 Query
     * 
     * 獲取 Query 的訊息
     * 該事件通常用於 C-FIND或QIDO。
     * @param {string} eventResult 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
     * @param {string} clientAETitle 發送者的AETitle
     * @param {string} clientHostname 發送者的位址
     * @param {string} serverAETitle 伺服器端的AETitle
     * @param {string} serverHostname 伺服器端的位址
     * @param {string} SOPClassUID SOPClassUID
     * @param {string} queryData Query的本體資料(暫定為只要是字串即可)
     * @param {string} TransferSyntax TransferSyntax
     */
    async getQueryMsg(
        eventType, eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        sopClassUID,
        queryData, transferSyntax
    ) {

        /**
        Event 
        */
        let theEvent = await this.getGeneralEvent(eventType, eventResult);

        /**
        Active Participant: 
        */
        let theActiveParticipants = await this.getGeneralActiveParticipant(
            eventType,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname
        );

        /**
        https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_A.5.3.10.html
        Participating Object: 
        SOP Queried and the Query (1)
        Query本體
        */
        let theQuery = await ParticipantObjectIdentification.newInstanceAsync();
        await theQuery.setParticipantObjectTypeCode(AuditMessages$ParticipantObjectTypeCode.SystemObject);
        await theQuery.setParticipantObjectTypeCodeRole(AuditMessages$ParticipantObjectTypeCodeRole.Report);
        await theQuery.setParticipantObjectIDTypeCode(AuditMessages$ParticipantObjectIDTypeCode.SOPClassUID);
        await theQuery.setParticipantObjectID(sopClassUID); //  this field shall hold the UID of the SOP Class being queried
        await theQuery.setParticipantObjectQuery(
            Buffer.from(queryData, "utf8")
        ); // this field shall hold the Dataset of the DICOM query, xs:base64Binary encoded.
        // 但是他沒有說本體encoded之前的dataset是何種形式，故我們輸入參數字串後直接encode，本體為何種形式我們暫時不管。


        let ObjDetail = await ParticipantObjectDetail.newInstanceAsync();
        await ObjDetail.setType("QueryEncoding");
        await ObjDetail.setValue(
            Buffer.from(transferSyntax, "utf8")
        );
        await (await theQuery.getParticipantObjectDetail()).add(ObjDetail); // A ParticipantObjectDetail element with the XML attribute "TransferSyntax" shall be present. The value of the Transfer Syntax attribute shall be the UID of the transfer syntax of the query. The element contents shall be xs:base64Binary encoding. The Transfer Syntax shall be a DICOM Transfer Syntax.

        /**
        將上述已經記錄完成的Real World Entities，組合成一個Audit Message。
        */
        let msg = await AuditMessages.createMessage(theEvent, theActiveParticipants, [theQuery]);

        return await AuditUtils.toJson(msg);
    }


    /**
     * @param {string} userID 
     * @returns 
     */
    static userIDTypeCode(userID) {
        return userID.indexOf('/') != -1
            ? AuditMessages$UserIDTypeCode.URI
            : userID.indexOf('|') != -1
                ? AuditMessages$UserIDTypeCode.ApplicationFacility
                : AuditMessages$UserIDTypeCode.StationAETitle;
    }


    async getGeneralEvent(eventType, eventResult) {
        let eventIdentificationBuilder = await EventIdentificationBuilder.newInstanceAsync(
            eventType.eventID,
            eventType.eventActionCode,
            await Calendar.getInstance(), // 日期時間為當前時間自動取得
            eventResult
        );
        return await eventIdentificationBuilder.build();
    }

    /**
     * Client and Server
     * @param { EventType } eventType
     * @param {string} clientAETitle 
     * @param {string} clientHostname 
     * @param {string} serverAETitle 
     * @param {string} serverHostname
     * @param {boolean}  sourceDestSwap
     */
    async getGeneralActiveParticipant(
        eventType,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        sourceDestSwap = false
    ) {
        // #region Active Participant 1
        let clientBuilder = await ActiveParticipantBuilder.newInstanceAsync(
            clientAETitle,
            clientHostname
        );
        await clientBuilder.userIDTypeCode(AuditMessageFactory.userIDTypeCode(clientAETitle));
        await clientBuilder.altUserID(clientAETitle);
        await clientBuilder.roleIDCode([sourceDestSwap ? eventType.destination : eventType.source]);
        sourceDestSwap ? null : await clientBuilder.isRequester();
        let client = await clientBuilder.build();
        // #endregion

        // #region Active Participant 2
        let serverBuilder = await ActiveParticipantBuilder.newInstanceAsync(
            serverAETitle,
            serverHostname
        );
        await serverBuilder.userIDTypeCode(AuditMessageFactory.userIDTypeCode(serverAETitle));
        await serverBuilder.altUserID(serverAETitle);
        await serverBuilder.roleIDCode([sourceDestSwap ? eventType.source : eventType.destination]);
        let server = await serverBuilder.build();
        // #endregion

        let activateParticipants = sourceDestSwap ? [server, client] : [client, server];
        return activateParticipants;
    }

    getInstanceModel() {
        const sequelizeInstance = require("@models/sql/instance");
        return sequelizeInstance.model("Instance");
    }
}


module.exports.AuditMessageFactory = AuditMessageFactory;
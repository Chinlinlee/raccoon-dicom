const _ = require("lodash");

const { AuditMessageFactory } = require("./auditMessageFactory");

/**
 * @typedef AuditMessageModel
 * @property {(json: JSON) => Promise<void>} createMessage
 */

class AuditManager {
    constructor(auditMessageModel) {
        /** @type { AuditMessageModel } */
        this.auditMessageModel = auditMessageModel;
    }

    /**
     * A.X.3.3 Begin Transferring DICOM Instances
     * 當有DICOM檔案"開始"傳輸時，進行以下動作
     * 1. 獲取該事件的 message
     * 2. 儲存 message 至 db
     * 
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
        let msg = await AuditMessageFactory.getBeginTransferringDicomInstancesMsg(
            eventResult,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname,
            StudyInstanceUIDs, SOPClassUIDs,
            PatientID, PatientName
        );

        await this.saveToDb_(msg);
    }


    /**
     * A.X.3.7 DICOM Instances Transferred
     * 當有DICOM檔案傳輸時，進行以下動作
     * 1. 獲取 Dicom Instances Transferred 的訊息
     * 2. 儲存 message 至 db
     * 
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

        let msg = await AuditMessageFactory.getDicomInstancesTransferredMsg(
            CRUD, eventResult,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname,
            StudyInstanceUIDs, SOPClassUIDs,
            PatientID, PatientName
        );

        await this.saveToDb_(msg);
    }

    /**
     * A.X.3.6 DICOM Instances Accessed
     * 
     * Instances being viewed, utilized, updated, or deleted.
     * 
     * 1. 獲取 DICOM Instances Accessed (當有DICOM被存取時) 的訊息
     * 2. 儲存 message 至 db
     * 
     * @param CRUD 該事件是屬於新增、讀取、更新、刪除哪一個? 必須為"C"、"R"、"U"、"D"其中一個，或是使用EventActionCode類別的CRUD(最終也會取得String)。
     * @param eventResult 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
     * @param clientAETitle 發送者的AETitle
     * @param clientHostname 發送者的位址
     * @param serverAETitle 伺服器端的AETitle
     * @param serverHostname 伺服器端的位址
     * @param StudyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     * @param SOPClassUIDs 所有此次傳輸有關聯的SOPClassUID
     * @param PatientID 一個此次傳輸關聯的PatientID
     * @param PatientName 一個此次傳輸關聯的PatientName
     */
    async onDicomInstancesAccessed(CRUD, eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        StudyInstanceUIDs, SOPClassUIDs,
        PatientID, PatientName
    ) {
        let msg = await AuditMessageFactory.getDicomInstancesAccessedMsg(
            CRUD, eventResult,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname,
            StudyInstanceUIDs, SOPClassUIDs,
            PatientID, PatientName
        );

        await this.saveToDb_(msg);
    }

    /**
     * 	A.X.3.10 Query
     * 
     * 1. 獲取 Query (當有查詢發生時) 的訊息
     * 2. 儲存 message 至 db
     * 
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
    async onQuery(eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname,
        SOPClassUID,
        queryData, TransferSyntax
    ) {
        let msg = await AuditMessageFactory.getQueryMsg(eventResult,
            clientAETitle, clientHostname,
            serverAETitle, serverHostname,
            SOPClassUID,
            queryData, TransferSyntax
        );

        await this.saveToDb_(msg);
    }

    /**
     * @private
     * @param {JSON} msg 
     */
    async saveToDb_(msg) {
        try {
            await this.auditMessageModel.createMessage(msg);
        } catch (e) {
            throw e;
        }
    }
}

module.exports.AuditManager = AuditManager;
const _ = require("lodash");

const { AuditMessageFactory } = require("./auditMessageFactory");
const { EventType } = require("./eventType");

/**
 * @typedef AuditMessageModel
 * @property {(json: JSON) => Promise<void>} createMessage
 */

class AuditManager {
    constructor(eventType, eventResult,
        clientAETitle, clientHostname,
        serverAETitle, serverHostname
    ) {
        /** @type { EventType } */
        this.eventType = eventType;

        /**
         * 該事件最終的結果? 必須為"0"、"4"、"8"、"12"其中一個，分別對應到Success、MinorFailure、SeriousFailure、MajorFailure，或是使用EventOutcomeIndicator類別(最終也會取得String)。
         * @type { string }
         */
        this.eventResult = eventResult;

        /**
         * 發送者的AETitle
         * @type { string }
         */
        this.clientAETitle = clientAETitle;

        /**
         * 發送者的位址
         * @type { string }
         */
        this.clientHostname = clientHostname;

        /**
         * 伺服器端的AETitle
         * @type { string }
         */
        this.serverAETitle = serverAETitle;

        /**
         * 伺服器端的位址
         * @type { string }
         */
        this.serverHostname = serverHostname;
    }

    /**
     * A.X.3.3 Begin Transferring DICOM Instances
     * 當有DICOM檔案"開始"傳輸時，進行以下動作
     * 1. 獲取該事件的 message
     * 2. 儲存 message 至 db
     * 
     * 該事件通常用於 C-STORE、STOW-RS 或是 C-MOVE、WADO。
     * @param {string[]} studyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     */
    async onBeginTransferringDicomInstances(studyInstanceUIDs) {
        let auditMessageFactory = new AuditMessageFactory();

        let msg = await auditMessageFactory.getBeginTransferringDicomInstancesMsg(
            this.eventType, this.eventResult,
            this.clientAETitle, this.clientHostname,
            this.serverAETitle, this.serverHostname,
            studyInstanceUIDs
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
     * @param {string[]} studyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     */
    async onDicomInstancesTransferred(studyInstanceUIDs) {

        let auditMessageFactory = new AuditMessageFactory();
        let msg = await auditMessageFactory.getDicomInstancesTransferredMsg(
            this.eventType, this.eventResult,
            this.clientAETitle, this.clientHostname,
            this.serverAETitle, this.serverHostname,
            studyInstanceUIDs
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
     * @param StudyInstanceUIDs 所有此次傳輸有關聯的StudyInstanceUID
     * @param SOPClassUIDs 所有此次傳輸有關聯的SOPClassUID
     * @param PatientID 一個此次傳輸關聯的PatientID
     * @param PatientName 一個此次傳輸關聯的PatientName
     */
    async onDicomInstancesAccessed(studyInstanceUIDs) {
        let auditMessageFactory = new AuditMessageFactory();

        let msg = await auditMessageFactory.getDicomInstancesAccessedMsg(
            this.eventType, this.eventResult,
            this.clientAETitle, this.clientHostname,
            this.serverAETitle, this.serverHostname,
            studyInstanceUIDs
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
     * @param {string} sopClassUID SOPClassUID
     * @param {string} queryData Query的本體資料(暫定為只要是字串即可)
     * @param {string} TransferSyntax TransferSyntax
     */
    async onQuery(
        sopClassUID,
        queryData, TransferSyntax
    ) {
        let auditMessageFactory = new AuditMessageFactory();

        let msg = await auditMessageFactory.getQueryMsg(
            this.eventType, this.eventResult,
            this.clientAETitle, this.clientHostname,
            this.serverAETitle, this.serverHostname,
            sopClassUID,
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
            await AuditManager.getAuditMessageModel().createMessage(msg);
        } catch (e) {
            throw e;
        }
    }

    static getAuditMessageModel() {
        const mongoose = require("mongoose");
        return mongoose.model("auditMessage");
    }
}

module.exports.AuditManager = AuditManager;
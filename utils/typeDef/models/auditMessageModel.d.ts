export interface AuditMessageModel {
    createMessage(msg: any): Promise<void>;
}
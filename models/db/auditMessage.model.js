class AuditMessageModel {
    constructor(dbModel) {
        this.dbModel = dbModel;
    }
    async createMessage(msg) {
        return await this.dbModel.createMessage(msg);
    }
}


module.exports.AuditMessageModel = AuditMessageModel;
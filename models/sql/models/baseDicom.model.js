const { raccoonConfig } = require("@root/config-class");
const { Model } = require("sequelize");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}
class BaseDicomModel extends Model {
    async getAttributes() {
        let obj = this.toJSON();
        let jsonStr = JSON.stringify(obj.json);
        return await Common.getAttributesFromJsonString(jsonStr);
    }

    async incrementDeleteStatus() {
        let deleteStatus = this.getDataValue("deleteStatus");
        this.setDataValue("deleteStatus", deleteStatus + 1);
        await this.save();
    }

    toDicomJson() {
        return this.json;
    }
};

module.exports.BaseDicomModel = BaseDicomModel;
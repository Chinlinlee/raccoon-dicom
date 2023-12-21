const _ = require("lodash");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { ChangeMwlItemStatusService } = require("@root/api/dicom-web/controller/MWL-RS/service/change-mwlItem-status");
const { MwlItemModel } = require("@models/sql/models/mwlitems.model");
const { Op } = require("sequelize");

class SqlChangeMwlItemStatusService extends ChangeMwlItemStatusService {
    constructor(req, res) {
        super(req, res);
    }

    async changeMwlItemsStatus() {
        let { status } = this.request.params;
        let mwlItem = await this.getMwlItemByStudyUIDAndSpsID();
        if (!mwlItem) {
            throw new DicomWebServiceError(DicomWebStatusCodes.NoSuchObjectInstance, "No such object instance", 404);
        }

        mwlItem.sps_status = status;
        _.set(mwlItem.json, `${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStatus}.Value.0`, status);
        mwlItem.changed("json", true);
        await mwlItem.save();

        return mwlItem.json;
    }

    async getMwlItemByStudyUIDAndSpsID() {
        return await MwlItemModel.findOne({
            where: {
                [Op.and]: [
                    {
                        sps_id: this.request.params.spsID
                    },
                    {
                        study_instance_uid: this.request.params.studyUID
                    }
                ]
            }
        });
    }
}

module.exports.ChangeMwlItemStatusService = SqlChangeMwlItemStatusService;
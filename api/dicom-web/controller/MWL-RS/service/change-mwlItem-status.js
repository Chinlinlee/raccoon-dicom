const _ = require("lodash");
const { MwlItemModel } = require("@dbModels/mwlitems.model");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

class ChangeMwlItemStatusService {
    constructor(req, res) {
        /** @type {import("express").Request} */
        this.request = req;
        /** @type {import("express").Response} */
        this.response = res;
    }

    async changeMwlItemsStatus() {
        let { status } = this.request.params;
        let mwlItem = await this.getMwlItemByStudyUIDAndSpsID();
        if (!mwlItem) {
            throw new DicomWebServiceError(DicomWebStatusCodes.NoSuchObjectInstance, "No such object instance", 404);
        }

        _.set(mwlItem, `${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStatus}.Value.0`, status);
        await mwlItem.save();

        return mwlItem.toGeneralDicomJson();
    }

    async getMwlItemByStudyUIDAndSpsID() {
        return await MwlItemModel.findOne({
            $and: [
                {
                    "00400100.Value.0.00400009.Value.0": this.request.params.spsID
                },
                {
                    "0020000D.Value.0": this.request.params.studyUID
                }
            ]
        });
    }
}

module.exports.ChangeMwlItemStatusService = ChangeMwlItemStatusService;
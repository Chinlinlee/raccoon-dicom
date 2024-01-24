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

        await mwlItem.updateStatus(status);

        return mwlItem.toGeneralDicomJson();
    }

    async getMwlItemByStudyUIDAndSpsID() {
        return await MwlItemModel.findOneByStudyInstanceUIDAndSpsID(this.request.params.studyUID, this.request.params.spsID);
    }
}

module.exports.ChangeMwlItemStatusService = ChangeMwlItemStatusService;
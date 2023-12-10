const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { MwlItemModel } = require("@models/mongodb/models/mwlitems.model");

class DeleteMwlItemService {
    constructor(req, res) {
        /** @type { import("express").Request } */
        this.request = req;
        /** @type { import("express").Response } */
        this.response = res;
    }

    async deleteMwlItem() {
        const { studyUID, spsID } = this.request.params;
        let { deletedCount } = await MwlItemModel.deleteByStudyInstanceUIDAndSpsID(studyUID, spsID);

        if (!deletedCount) {
            throw new DicomWebServiceError(DicomWebStatusCodes.NoSuchSOPInstance, "Modality Worklist Item not found.", 404);
        }
    }
}

module.exports.DeleteMwlItemService = DeleteMwlItemService;
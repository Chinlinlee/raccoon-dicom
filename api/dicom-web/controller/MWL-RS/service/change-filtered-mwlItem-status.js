const _ = require("lodash");
const { MwlItemModel } = require("@dbModels/mwlitems.model");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { convertRequestQueryToMongoQuery } = require("@models/mongodb/convertQuery");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");

class ChangeFilteredMwlItemStatusService extends BaseQueryService {
    constructor(req, res) {
        super(req, res);
    }

    async changeMwlItemsStatus() {
        let { status } = this.request.params;

        let updatedCount = await MwlItemModel.updateStatusByQuery(this.query, status);
        
        return updatedCount;
    }
}

module.exports.ChangeFilteredMwlItemStatusService = ChangeFilteredMwlItemStatusService;
const _ = require("lodash");
const { MwlItemModel } = require("@models/mongodb/models/mwlitems.model");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { convertRequestQueryToMongoQuery } = require("../../QIDO-RS/service/query-dicom-json-factory");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");

class ChangeFilteredMwlItemStatusService extends BaseQueryService {
    constructor(req, res) {
        super(req, res);
    }

    async changeMwlItemsStatus() {
        let { status } = this.request.params;
        let mwlItems = await this.getMwlItems();
        if (mwlItems.length === 0) {
            throw new DicomWebServiceError(DicomWebStatusCodes.NoSuchObjectInstance, "Can not found any MWL item from query", 404);
        }

        for (let mwlItem of mwlItems) {
            _.set(mwlItem, `${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStatus}.Value.0`, status);
            await mwlItem.save();
        }
        
        return mwlItems.length;
    }

    async getMwlItems() {
        let query = (await convertRequestQueryToMongoQuery(this.query)).$match;
        return await MwlItemModel.find(query);
    }
}

module.exports.ChangeFilteredMwlItemStatusService = ChangeFilteredMwlItemStatusService;
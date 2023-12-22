const { MwlItemModel } = require("@models/sql/models/mwlitems.model");
const { ChangeFilteredMwlItemStatusService } = require("@root/api/dicom-web/controller/MWL-RS/service/change-filtered-mwlItem-status");
const { cloneDeep, set } = require("lodash");
const { convertAllQueryToDicomTag } = require("@root/api/dicom-web/service/base-query.service");
const { MwlQueryBuilder } = require("./query/mwlQueryBuilder");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

class SqlChangeFilteredMwlItemStatusService extends ChangeFilteredMwlItemStatusService {
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
            mwlItem.status = status;
            set(mwlItem.json, `${dictionary.keyword.ScheduledProcedureStepSequence}.Value.0.${dictionary.keyword.ScheduledProcedureStepStatus}.Value.0`, status);
            mwlItem.changed("json", true);
            await mwlItem.save();
        }
        
        return mwlItems.length;
    }

    async getMwlItems() {
        let queryBuilder = new MwlQueryBuilder({
            query: this.query
        });
        let q = queryBuilder.build();
        return await MwlItemModel.findAll(q);
    }

    initQuery_() {
        let query = cloneDeep(this.request.query);
        let queryKeys = Object.keys(query).sort();
        for (let i = 0; i < queryKeys.length; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }

        this.query = convertAllQueryToDicomTag(query, false);
    }
}

module.exports.ChangeFilteredMwlItemStatusService = SqlChangeFilteredMwlItemStatusService;
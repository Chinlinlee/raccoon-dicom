const { PatientModel } = require("@dbModels/patient.model");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const { WorkItemModel } = require("@dbModels/workItems.model");
const { CreateWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/create-workItem.service");
const { get, set } = require("lodash");
const { UpsWorkItemPersistentObject } = require("@models/sql/po/upsWorkItem.po");
const { PatientPersistentObject } = require("@models/sql/po/patient.po");

class SqlCreateWorkItemService extends CreateWorkItemService {
    constructor(req, res) {
        super(req, res);
    }

    async createUps() {
        let uid = get(this.request, "query.workitem",
            await UIDUtils.createUID()
        );
        await this.dataAdjustBeforeCreatingUps(uid);
        await this.validateWorkItem(uid);

        let patient = await PatientModel.updateOrCreatePatient(this.requestWorkItem.dicomJson);
        let workItem = new UpsWorkItemPersistentObject(this.requestWorkItem.dicomJson, patient);
        let savedWorkItem = await workItem.save();

        this.triggerCreateEvent(savedWorkItem);

        return workItem;
    }

    async isUpsExist(uid) {
        return await WorkItemModel.findOne({
            where: {
                upsInstanceUID: uid
            }
        });
    }
}

module.exports.CreateWorkItemService = SqlCreateWorkItemService;
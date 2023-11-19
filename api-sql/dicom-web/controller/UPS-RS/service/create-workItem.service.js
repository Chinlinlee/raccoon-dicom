const { PatientModel } = require("@dbModels/patient.model");
const { UIDUtils } = require("@dcm4che/util/UIDUtils");
const { WorkItemModel } = require("@models/sql/models/workItems.model");
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

        let patientId = this.requestWorkItem.getString("00100020");
        let patient = await this.findOneOrCreatePatient(patientId);
        let workItem = new UpsWorkItemPersistentObject(this.requestWorkItem.dicomJson, patient);
        let savedWorkItem = await workItem.save();

        //TODO: subscription
        //this.triggerCreateEvent(savedWorkItem);

        return workItem;
    }

    async findOneOrCreatePatient(patientId) {
        /** @type {PatientModel | null} */
        let patientPersistent = new PatientPersistentObject(this.requestWorkItem.dicomJson);
        let patient = await patientPersistent.createPatient();

        return patient;
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
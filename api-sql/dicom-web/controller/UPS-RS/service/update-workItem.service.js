const { WorkItemModel } = require("@dbModels/workitems.model");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { DicomJsonModel } = require("@dicom-json-model");
const { UpdateWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/update-workItem.service");
const { UpsWorkItemPersistentObject } = require("@models/sql/po/upsWorkItem.po");
const { set, get } = require("lodash");
const { PatientModel } = require("@models/sql/models/patient.model");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { UPS_EVENT_TYPE } = require("@root/api/dicom-web/controller/UPS-RS/service/workItem-event");

class SqlUpdateWorkItemService extends UpdateWorkItemService {
    constructor(req, res) {
        super(req, res);
        this.transactionUID = this.requestWorkItem.getString("00081195");
        set(this.requestWorkItem.dicomJson, "upsInstanceUID", this.request.params.workItem);
    }

    async updateUps() {
        this.workItem = await WorkItemModel.findOneWorkItemDicomJsonModel(this.request.params.workItem);
        await this.checkRequestUpsIsValid();
        this.adjustRequestWorkItem();

        let patient = await PatientModel.updateOrCreatePatient(this.requestWorkItem.dicomJson);
        let workItem = new UpsWorkItemPersistentObject(this.requestWorkItem.dicomJson, patient);
        let savedWorkItem = await workItem.save();

        this.triggerUpdateWorkItemEvent(savedWorkItem);
    }

    /**
     * replace not allowed updating attribute in request work item
     */
    adjustRequestWorkItem() {
        for (let i = 0; i < UpdateWorkItemService.notAllowedAttributes.length; i++) {
            let notAllowedAttr = UpdateWorkItemService.notAllowedAttributes[i];
            let originalValueOfNotAllowedAttr = get(this.workItem.dicomJson, notAllowedAttr);
            set(this.requestWorkItem.dicomJson, originalValueOfNotAllowedAttr);
        }
    }

    /**
     * 
     * @param {WorkItemModel} workItem 
     * @returns 
     */
    async triggerUpdateWorkItemEvent(workItem) {
        let updateWorkItemDicomJson = new DicomJsonModel(workItem);
        let hitSubscriptions = await this.getHitSubscriptions(updateWorkItemDicomJson);
        if (hitSubscriptions.length === 0) {
            return workItem;
        }
        let hitSubscriptionAeTitleArray = hitSubscriptions.map(sub => sub.aeTitle);

        //Each time the SCP changes the Input Readiness State (0040,4041) Attribute for a UPS instance, the SCP shall send a UPS State Report Event to subscribed SCUs.
        let modifiedInputReadLineState = this.requestWorkItem.getString(`${dictionary.keyword.InputReadinessState}`);
        let originalInputReadLineState = this.workItem.getString(`${dictionary.keyword.InputReadinessState}`);
        if (modifiedInputReadLineState && modifiedInputReadLineState !== originalInputReadLineState) {
            this.addUpsEvent(
                UPS_EVENT_TYPE.StateReport,
                this.workItem.dicomJson.upsInstanceUID,
                this.stateReportOf(workItem.toDicomJsonModel()),
                hitSubscriptionAeTitleArray
            );
        }

        this.addProgressInfoUpdatedEvent(workItem.toDicomJsonModel(), hitSubscriptionAeTitleArray);
        this.addAssignedEvents(workItem.toDicomJsonModel(), hitSubscriptionAeTitleArray);

        this.triggerUpsEvents();
    }
}

module.exports.UpdateWorkItemService = SqlUpdateWorkItemService;
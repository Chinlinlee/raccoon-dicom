const { WorkItemModel } = require("@dbModels/workitems.model");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { DicomJsonModel } = require("@dicom-json-model");
const { UpdateWorkItemService } = require("@root/api/dicom-web/controller/UPS-RS/service/update-workItem.service");
const { UpsWorkItemPersistentObject } = require("@models/sql/po/upsWorkItem.po");
const { set, get } = require("lodash");
const { CreateWorkItemService } = require("./create-workItem.service");

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

        let createService = new CreateWorkItemService(this.request, this.response);
        let patient = await createService.findOneOrCreatePatient();
        let workItem = new UpsWorkItemPersistentObject(this.requestWorkItem.dicomJson, patient);
        let savedWorkItem = await workItem.save();
        //TODO: update UPS event
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
}

module.exports.UpdateWorkItemService = SqlUpdateWorkItemService;
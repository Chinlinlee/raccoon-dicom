const _ = require("lodash");
const { StudyModel } = require("@dbModels/dicomStudy");
const { SeriesModel } = require("@dbModels/dicomSeries");
const { InstanceModel } = require("@dbModels/dicom");
const fsP = require("fs/promises");
const { NotFoundInstanceError } = require("../../../../../../error/dicom-instance");

class DeleteService {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param { "study" | "series" | "instance" } level
     */
    constructor(req, res, level = "study") {
        this.request = req;
        this.response = res;
        this.level = level;
    }

    async delete() {
        let deleteFns = {};
        deleteFns["study"] = async () => this.deleteStudy();
        deleteFns["series"] = async () => this.deleteSeries();
        deleteFns["instance"] = async () => this.deleteInstance();

        await deleteFns[this.level]();
    }

    async deleteStudy() {
        let study = await StudyModel.findOne({
            ...this.request.params
        });

        if (!study) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID} instances' files`);
        }

        try {
            await study.incrementDeleteStatus();
        } catch (e) {
            console.error(e);
            throw e;
        }

    }

    async deleteSeries() {
        let aSeries = await SeriesModel.findOne({
            ...this.request.params
        });

        if (!aSeries) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID}, seriesUID: ${this.request.params.seriesUID}' files`);
        }

        try {
            await aSeries.incrementDeleteStatus();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }


    async deleteInstance() {
        let instance = await InstanceModel.findOne({
            ...this.request.params
        });

        if (!instance) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID}, seriesUID: ${this.request.params.seriesUID}, instanceUID: ${this.request.params.instanceUID} instances' files`);
        }

        try {
            await instance.incrementDeleteStatus();

        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

module.exports.DeleteService = DeleteService;
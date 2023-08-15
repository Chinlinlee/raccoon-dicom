const _ = require("lodash");
const dicomSeriesModel = require("../../../../../../models/mongodb/models/dicomSeries");
const dicomModel = require("../../../../../../models/mongodb/models/dicom");
const fsP = require("fs/promises");
const { NotFoundInstanceError } = require("../../../../../../error/dicom-instance");
const { StudyModel } = require("@models/sql/models/study.model");
const { SeriesModel } = require("@models/sql/models/series.model");
const { InstanceModel } = require("@models/sql/models/instance.model");

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
            where: {
                x0020000D: this.request.params.studyUID
            }
        });

        if (!study) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID} instances' files`);
        }

        await study.incrementDeleteStatus();
    }

    async deleteSeries() {
        let aSeries = await SeriesModel.findOne({
            where: {
                x0020000D: this.request.params.studyUID,
                x0020000E: this.request.params.seriesUID
            }
        });

        if (!aSeries) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID}, seriesUID: ${this.request.params.seriesUID}' files`);
        }

        await aSeries.incrementDeleteStatus();
    }

    async deleteInstance() {
        let instance = await InstanceModel.findOne({
            where: {
                x0020000D: this.request.params.studyUID,
                x0020000E: this.request.params.seriesUID,
                x00080018: this.request.params.instanceUID
            }
        });

        if (!instance) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID}, seriesUID: ${this.request.params.seriesUID}, instanceUID: ${this.request.params.instanceUID} instances' files`);
        }

        await instance.incrementDeleteStatus();
    }
}

module.exports.DeleteService = DeleteService;
const moment = require("moment");
const _ = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { SeriesModel } = require("../models/series.model");

const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");
const sequelize = require("../instance");
const { SeriesRequestAttributesModel } = require("../models/seriesRequestAttributes.model");

class SeriesPersistentObject {
    constructor(dicomJson, study) {

        this.json = {};
        Object.keys({
            ...tagsNeedStore.Study,
            ...tagsNeedStore.Series
        }).forEach(key => {
            let value = _.get(dicomJson, key);
            value ? _.set(this.json, key, value) : undefined;
        });
        this.study = study;
        this.seriesPath = _.get(dicomJson, "seriesPath", "");

        this.x0020000D = this.study.x0020000D;
        this.x0020000E = _.get(dicomJson, "0020000E.Value.0", "");
        this.x00080021 = _.get(dicomJson, "00080021.Value.0", undefined);
        this.x00080060 = _.get(dicomJson, "00080060.Value.0", "");
        this.x0008103E = _.get(dicomJson, "0008103E.Value.0", "");
        this.x0008103F = _.get(dicomJson, "0008103F.Value", undefined);
        this.x00081050 = _.get(dicomJson, "00081050.Value", "");
        this.x00081052 = _.get(dicomJson, "00081052.Value.0", "");
        this.x00081070 = _.get(dicomJson, "00081070.Value", "");
        this.x00081072 = _.get(dicomJson, "00081072.Value", "");
        this.x00081250 = _.get(dicomJson, "00081250.Value", "");
        this.x00200011 = _.get(dicomJson, "00200011.Value.0", "");
        this.x00400244 = _.get(dicomJson, "00400244.Value.0", undefined);
        this.x00400245 = _.get(dicomJson, "00400245.Value.0", "");
        this.x00400275 = _.get(dicomJson, "00400275.Value.0", "");
        this.x00080031 = _.get(dicomJson, "00080031.Value.0", "");
    }

    async createReferringPhysicianName() {
        return await PersonNameModel.createPersonName(this.x00080090);
    }

    async addPerformingPhysicianNames(series) {
        let performingPhysicianNames = await PersonNameModel.createPersonNames(series, "x00081050");
        for (let performingPhysicianName of performingPhysicianNames) {
            await series.addPerformingPhysicianName(performingPhysicianName);
        }
    }

    async updatePerformingPhysicianNames(series) {
        // The value multiplicity of PerformingPhysicianName is 1-n
        // We cannot sure the length of data is changed
        // So, destroy all and recreate
        for(let personName of series.performingPhysicianName) {
            await personName.destroy();
        }
        await this.addPerformingPhysicianNames(series);
    }

    async addOperatorsNames(series) {
        let operationsNames = await PersonNameModel.createPersonNames(series, "x00081070");
        for (let operationsName of operationsNames) {
            await series.addOperatorsName(operationsName);
        }
    }

    async updateOperatorsNames(series) {
        for(let personName of series.operatorsName) {
            await personName.destroy();
        }
        await this.addOperatorsNames(series);
    }

    getRequestAttributesInJson() {
        if (this.x00400275) {
            return {
                x0020000E: this.x0020000E,
                x00080050: _.get(this.x00400275, "00080050.Value.0"),
                x00080051_x00400031: _.get(this.x00400275, "00080051.Value.0.00400031.Value.0"),
                x00080051_x00400032: _.get(this.x00400275, "00080051.Value.0.00400032.Value.0"),
                x00080051_x00400033: _.get(this.x00400275, "00080051.Value.0.00400033.Value.0"),
                x00321033: _.get(this.x00400275, "00321033.Value.0"),
                x00401001: _.get(this.x00400275, "00401001.Value.0"),
                x0020000D: _.get(this.x00400275, "0020000D.Value.0")
            };
        }
        return undefined;
    }

    /**
     * 
     * @param {SeriesModel} series 
     */
    async updateRequestAttribute(series) {
        let requestAttributes = this.getRequestAttributesInJson();
        if (requestAttributes) {
            if (await series.getSeriesRequestAttribute()) {
                await SeriesRequestAttributesModel.update(requestAttributes, {
                    where: {
                        x0020000E: series.dataValues.x0020000E
                    }
                });
            } else {
                await series.createSeriesRequestAttribute(requestAttributes);
            }
        } else {
            await SeriesRequestAttributesModel.destroy({
                where: {
                    x0020000E: series.dataValues.x0020000E
                }
            });
        }
    }

    async createSeries() {
        let item = {
            json: this.json,
            x0020000D: this.x0020000D,
            x0020000E: this.x0020000E,
            x00080021: this.x00080021,
            x00080060: this.x00080060,
            x0008103E: this.x0008103E,
            x0008103F: this.x0008103F,
            x00081052: this.x00081052,
            x00081072: this.x00081072,
            x00081250: this.x00081250,
            x00200011: this.x00200011,
            x00400244: this.x00400244,
            x00400245: this.x00400245 ? Number(this.x00400245) : undefined,
            x00080031: this.x00080031 ? Number(this.x00080031) : undefined,
            seriesPath: this.seriesPath,
            deleteStatus: 0
        };

        let [series, created] = await SeriesModel.findOrCreate({
            where: {
                x0020000D: this.x0020000D,
                x0020000E: this.x0020000E
            },
            defaults: item
        });

        if (created) {
            await this.addPerformingPhysicianNames(series);
            await this.addOperatorsNames(series);
            let requestAttributes = this.getRequestAttributesInJson();
            if (requestAttributes) {
                await series.createSeriesRequestAttribute(requestAttributes);
            }
            
            await series.save();
        } else {
            await SeriesModel.update(item, {
                where: {
                    x0020000E: series.dataValues.x0020000E
                }
            });
            await this.updateRequestAttribute(series);

            let seriesWithIncludeItem = await SeriesModel.findByPk(series.dataValues.x0020000E, {
                include: [
                    {
                        model: sequelize.model("PersonName"),
                        as: "performingPhysicianName",
                        attributes: ["id"]
                    },
                    {
                        model: sequelize.model("PersonName"),
                        as: "operatorsName",
                        attributes: ["id"]
                    }
                ],
                attributes: ["x0020000E"]
            });
            await this.updatePerformingPhysicianNames(seriesWithIncludeItem);
        }
        
        return series;
    }

}

module.exports.SeriesPersistentObject = SeriesPersistentObject;
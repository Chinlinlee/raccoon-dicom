const moment = require("moment");
const _ = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { InstanceModel } = require("../models/instance.mode");

const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");
const { DicomCodeModel } = require("../models/dicomCode.model");
const { DicomContentSqModel } = require("../models/dicomContentSQ.model");

const INSTANCE_STORE_TAGS = {
    "00080016": true,
    "00080018": true,
    "00080023": true,
    "00080033": true,
    "00200013": true,
    "0040A043": true,
    "0040A073": true,
    "0040A491": true,
    "0040A493": true,
    "0040A730": true,
    "00080008": true,
    "0040A032": true,
    "00081115": true,
    "00280008": true,
    "00280010": true,
    "00280011": true,
    "00280100": true,
    "0040A370": true,
    "0040A375": true,
    "0040A504": true,
    "0040A525": true,
    "00420010": true,
    "00420012": true,
    "00700080": true,
    "00700081": true,
    "00700082": true,
    "00700083": true,
    "00700084": true,
    "00080005": true,
    "00081190": true,
    "00080054": true,
    "00080056": true,
    ...tagsNeedStore.Patient,
    ...tagsNeedStore.Study,
    ...tagsNeedStore.Series
};

class InstancePersistentObject {
    constructor(dicomJson, series) {
        this.json = {};
        Object.keys(INSTANCE_STORE_TAGS).forEach(key => {
            let value = _.get(dicomJson, key);
            value ? _.set(this.json, key, value) : undefined;
        });
        this.series = series;
        this.instancePath = _.get(dicomJson, "instancePath", "");

        this.x0020000D = this.series.x0020000D;
        this.x0020000E = this.series.x0020000E;
        this.x00080018 = _.get(dicomJson, "00080018.Value.0", undefined);
        this.x00080016 = _.get(dicomJson, "00080016.Value.0", undefined);
        this.x00080023 = _.get(dicomJson, "00080023.Value.0", undefined);
        this.x00080033 = _.get(dicomJson, "00080033.Value.0", undefined);
        this.x00200013 = _.get(dicomJson, "00200013.Value.0", undefined);
        this.x0040A043 = _.get(dicomJson, "0040A043.Value.0", undefined);
        this.x0040A073 = _.get(dicomJson, "0040A073.Value.0", undefined);
        this.x0040A491 = _.get(dicomJson, "0040A491.Value.0", undefined);
        this.x0040A493 = _.get(dicomJson, "0040A493.Value.0", undefined);
        this.x0040A730 = _.get(dicomJson, "0040A730.Value.0", undefined);
    }

    async createConceptNameCodeSq(instance) {
        if (this.x0040A043) {
            let nameCodeSq = {
                "x00080100": _.get(this.x0040A043, "00080100.Value.0", undefined),
                "x00080102": _.get(this.x0040A043, "00080102.Value.0", undefined),
                "x00080103": _.get(this.x0040A043, "00080103.Value.0", undefined),
                "x00080104": _.get(this.x0040A043, "00080104.Value.0", undefined)
            };
            await instance.createDicomCode(nameCodeSq);
        }
    }

    /**
     * 
     * @param {InstanceModel} instance 
     */
    async createOrUpdateConceptNameCode(instance) {
        let instanceConceptNameCode = await instance.getDicomCode();
        if (this.x0040A043) {
            let nameCodeSq = {
                "x00080100": _.get(this.x0040A043, "00080100.Value.0", undefined),
                "x00080102": _.get(this.x0040A043, "00080102.Value.0", undefined),
                "x00080103": _.get(this.x0040A043, "00080103.Value.0", undefined),
                "x00080104": _.get(this.x0040A043, "00080104.Value.0", undefined)
            };
            if (!instanceConceptNameCode) {
                // Create
                await instance.createDicomCode(nameCodeSq);
            } else {
                // Update
                await DicomCodeModel.update(nameCodeSq, {
                    where: {
                        SOPInstanceUID: instance.dataValues.x00080018
                    }
                });
            }
        } else {
            // Delete when no concept name code
            await DicomCodeModel.destroy({
                where: {
                    SOPInstanceUID: instance.dataValues.x00080018
                }
            });
        }
    }

    async createContentItem(instance) {
        if (this.x0040A730) {
            let contentItem = {
                "x0040A040": _.get(this.x0040A730, "0040A040.Value.0", undefined),
                "x0040A010": _.get(this.x0040A730, "0040A010.Value.0", undefined),
                "x0040A160": _.get(this.x0040A730, "0040A160.Value.0", undefined)
            };
            let nameCodeSq = {
                "x00080100": _.get(this.x0040A730, "0040A043.Value.0.00080100.Value.0", undefined),
                "x00080102": _.get(this.x0040A730, "0040A043.Value.0.00080102.Value.0", undefined),
                "x00080103": _.get(this.x0040A730, "0040A043.Value.0.00080103.Value.0", undefined),
                "x00080104": _.get(this.x0040A730, "0040A043.Value.0.00080104.Value.0", undefined)
            };
            let conceptCodeSq = {
                "x00080100": _.get(this.x0040A730, "0040A168.Value.0.00080100.Value.0", undefined),
                "x00080102": _.get(this.x0040A730, "0040A168.Value.0.00080102.Value.0", undefined),
                "x00080103": _.get(this.x0040A730, "0040A168.Value.0.00080103.Value.0", undefined),
                "x00080104": _.get(this.x0040A730, "0040A168.Value.0.00080104.Value.0", undefined)
            };

            if (Object.values(contentItem).some(v => v)) {
                let createdContentItem = await instance.createDicomContentSQ(contentItem);

                if (Object.values(nameCodeSq).some(v => v)) {
                    await createdContentItem.createConceptNameCode(nameCodeSq);
                }
    
                if (Object.values(conceptCodeSq).some(v => v)) {
                    await createdContentItem.createConceptCode(conceptCodeSq);
                }
            }

        }
    }

    async createOrUpdateContentItem(instance) {
        let contentItemPo = new ContentItemPersistentObject(this.x0040A730, instance);
        // Create or Update
        await contentItemPo.createOrUpdateContentItem();
        
    }

    async createInstance() {

        let item = {
            json: this.json,
            x0020000D: this.x0020000D,
            x0020000E: this.x0020000E,
            x00080018: this.x00080018,
            x00080016: this.x00080016,
            x00080023: this.x00080023,
            x00080033: this.x00080033 ? Number(this.x00080033) : undefined,
            x00200013: this.x00200013,
            x0040A073: this.x0040A073,
            x0040A491: this.x0040A491,
            x0040A493: this.x0040A493,
            x0040A730: this.x0040A730,
            instancePath: this.instancePath
        };

        let [instance, created] = await InstanceModel.findOrCreate({
            where: {
                x0020000D: this.x0020000D,
                x0020000E: this.x0020000E,
                x00080018: this.x00080018
            },
            defaults: item
        });

        if (created) {
            // do nothing
            await this.createContentItem(instance);
        } else {
            await InstanceModel.update(item, {
                where: {
                    x00080018: instance.dataValues.x00080018
                }
            });
        }
        await this.createOrUpdateConceptNameCode(instance);
        await this.createOrUpdateContentItem(instance);

        return instance;
    }

}

class ContentItemPersistentObject {
    /**
     * 
     * @param {any} contentItem 
     * @param {InstanceModel} instance 
     */
    constructor(contentItem, instance) {
        this.contentSq = {
            "x0040A040": _.get(contentItem, "0040A040.Value.0", undefined),
            "x0040A010": _.get(contentItem, "0040A010.Value.0", undefined),
            "x0040A160": _.get(contentItem, "0040A160.Value.0", undefined)
        };
        this.nameCodeSq = {
            "x00080100": _.get(contentItem, "0040A043.Value.0.00080100.Value.0", undefined),
            "x00080102": _.get(contentItem, "0040A043.Value.0.00080102.Value.0", undefined),
            "x00080103": _.get(contentItem, "0040A043.Value.0.00080103.Value.0", undefined),
            "x00080104": _.get(contentItem, "0040A043.Value.0.00080104.Value.0", undefined)
        };
        this.conceptCodeSq = {
            "x00080100": _.get(contentItem, "0040A168.Value.0.00080100.Value.0", undefined),
            "x00080102": _.get(contentItem, "0040A168.Value.0.00080102.Value.0", undefined),
            "x00080103": _.get(contentItem, "0040A168.Value.0.00080103.Value.0", undefined),
            "x00080104": _.get(contentItem, "0040A168.Value.0.00080104.Value.0", undefined)
        };
        this.instance = instance;
    }
    
    async getExistContentItem() {
        return await this.instance.getDicomContentSQ();
    }

    async createOrUpdateContentItem () {
        if (!await this.getExistContentItem()) {
            // Create
            await this.createDicomContentSq();
            await this.createConceptNameCodeInContentItem();
            await this.createConceptCodeInContentItem();
        } else {
            // Update
            await this.updateConceptNameCodeInContentItem();
            await this.updateConceptCodeInContentItem();
            await this.updateDicomContentSq();
        }
    }

    async createDicomContentSq() {
        if (Object.values(this.contentSq).some(v => v)) {
            await this.instance.createDicomContentSQ(this.contentSq);
        }
    }

    async updateDicomContentSq() {
        if (Object.values(this.contentSq).some(v => v)) {
            // Update value
            await DicomContentSqModel.update(this.contentSq, {
                where: {
                    SOPInstanceUID: this.instance.dataValues.x00080018
                }
            });
        } else {
            // Remove item because of given item does not exist
            await DicomContentSqModel.destroy({
                where: {
                    SOPInstanceUID: this.instance.dataValues.x00080018
                }
            });
        }
    }

    async createConceptNameCodeInContentItem() {
        if (Object.values(this.nameCodeSq).some(v => v)) {
            if (this.createdContentSq)
                await this.createdContentSq.createConceptNameCode(this.nameCodeSq);
        }
    }

    async updateConceptNameCodeInContentItem() {
        let contentItemInInstance = await this.getExistContentItem();
        if (Object.values(this.nameCodeSq).some(v => v)) {
            if (contentItemInInstance) {
                let nameCode = await contentItemInInstance.getConceptNameCode();
                if (nameCode) {
                    await DicomCodeModel.update(this.nameCodeSq, {
                        where: {
                            ConceptNameCodeId: contentItemInInstance.dataValues.id
                        }
                    });
                } else {
                    await contentItemInInstance.createConceptNameCode(this.nameCodeSq);
                }
            }
        } else {
            if (contentItemInInstance) {
                await DicomCodeModel.destroy({
                    where: {
                        ConceptNameCodeId: contentItemInInstance.dataValues.id
                    }
                });
            }
        }
    }

    async createConceptCodeInContentItem() {
        if (Object.values(this.conceptCodeSq).some(v => v)) {
            if (this.createdContentSq)
                await this.createdContentSq.createConceptCode(this.conceptCodeSq);
        }
    }

    async updateConceptCodeInContentItem() {
        let contentItemInInstance = await this.getExistContentItem();
        if (Object.values(this.nameCodeSq).some(v => v)) {
            if (contentItemInInstance) {
                let conceptCode = await contentItemInInstance.getConceptCode();
                if (conceptCode) {
                    await DicomCodeModel.update(this.conceptCodeSq, {
                        where: {
                            ConceptCodeId: contentItemInInstance.dataValues.id
                        }
                    });
                } else {
                    await contentItemInInstance.createConceptCode(this.nameCodeSq);
                }
            }
        } else {
            if (contentItemInInstance) {
                await DicomCodeModel.destroy({
                    where: {
                        ConceptCodeId: contentItemInInstance.dataValues.id
                    }
                });
            }
        }
    }
}

module.exports.InstancePersistentObject = InstancePersistentObject;
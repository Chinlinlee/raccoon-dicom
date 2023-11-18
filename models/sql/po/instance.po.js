const moment = require("moment");
const _ = require("lodash");
const { PersonNameModel } = require("../models/personName.model");
const { InstanceModel } = require("../models/instance.model");

const { tagsNeedStore } = require("@models/DICOM/dicom-tags-mapping");
const { DicomCodeModel } = require("../models/dicomCode.model");
const { DicomContentSqModel } = require("../models/dicomContentSQ.model");
const { VerifyIngObserverSqModel } = require("../models/verifyingObserverSQ.model");

const INSTANCE_STORE_TAGS = {
    "00020010": true,
    "00080016": true,
    "00080018": true,
    "00080022": true,
    "00080023": true,
    "0008002A": true,
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

        this.x00020010 = _.get(dicomJson, "00020010.Value.0", undefined);
        this.x0020000D = this.series.x0020000D;
        this.x0020000E = this.series.x0020000E;
        this.x00080018 = _.get(dicomJson, "00080018.Value.0", undefined);
        this.x00080016 = _.get(dicomJson, "00080016.Value.0", undefined);
        this.x00080022 = _.get(dicomJson, "00080022.Value.0", undefined);
        this.x00080023 = _.get(dicomJson, "00080023.Value.0", undefined);
        this.x0008002A = _.get(dicomJson, "0008002A.Value.0", undefined);
        this.x00080033 = _.get(dicomJson, "00080033.Value.0", undefined);
        this.x00200013 = _.get(dicomJson, "00200013.Value.0", undefined);
        this.x00280008 = _.get(dicomJson, "00280008.Value.0", undefined);
        this.x00281050 = _.get(dicomJson, "00281050.Value", undefined);
        this.x00281051 = _.get(dicomJson, "00281051.Value", undefined);
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

    async createOrUpdateVerifyingObserverSq(instance) {
        let verifyingObserverSqPo = new VerifyingObserverSqPersistentObject(this.x0040A073, this.x0040A493, instance);
        await verifyingObserverSqPo.createOrUpdate();
    }


    async createInstance() {

        let item = {
            json: this.json,
            x00020010: this.x00020010,
            x0020000D: this.x0020000D,
            x0020000E: this.x0020000E,
            x00080018: this.x00080018,
            x00080016: this.x00080016,
            x00080022: this.x00080022 ? this.x00080022 : undefined,
            x00080023: this.x00080023,
            x0008002A: this.x0008002A ? moment(this.x0008002A, "YYYYMMDDhhmmss.SSSSSSZZ").toISOString(): undefined,
            x00080033: this.x00080033 ? Number(this.x00080033) : undefined,
            x00200013: this.x00200013,
            x00280008: this.x00280008,
            x00281050: this.x00281050 ? this.x00281050.join("\\"): undefined,
            x00281051: this.x00281051 ? this.x00281051.join("\\"): undefined,
            x0040A073: this.x0040A073,
            x0040A491: this.x0040A491,
            x0040A493: this.x0040A493,
            x0040A730: this.x0040A730,
            instancePath: this.instancePath,
            deleteStatus: 0
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
        await this.createOrUpdateVerifyingObserverSq(instance);

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

    async createOrUpdateContentItem() {
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

class VerifyingObserverSqPersistentObject {
    constructor(verifyingObserverSq, verificationFlag, instance) {
        if (verificationFlag === "VERIFIED" && !verifyingObserverSq) {
            throw new Error("Verifying observer is required when Verification Flag (0040,A493) is VERIFIED");
        }
        this.verifyingObserverSq = verifyingObserverSq;
        this.instance = instance;
    }

    async getExistItem() {
        return await this.instance.getVerifyingObserverSQ();
    }

    async createOrUpdate() {
        let verifyingObserverSq = {
            "x0040A027": _.get(this.verifyingObserverSq, "0040A027.Value.0", undefined),
            "x0040A030": _.get(this.verifyingObserverSq, "0040A030.Value.0", undefined)
        };


        verifyingObserverSq.x0040A030 = verifyingObserverSq.x0040A030 ?
            moment(verifyingObserverSq.x0040A030, "YYYYMMDDhhmmss.SSSSSSZZ").toISOString() :
            undefined;

        if (!await this.getExistItem()) {
            // create
            let name = await this.createName();
            let personNameId = name ? name.dataValues.id : undefined;

            let identificationCode = await this.createIdentificationCode();
            let identificationCodeId = identificationCode ? identificationCode.dataValues.id : undefined;

            await this.instance.createVerifyingObserverSQ({
                ...verifyingObserverSq,
                x0040A088: identificationCodeId,
                x0040A075: personNameId
            });
        } else {
            let name = await this.updateName();
            let personNameId = name ? name.dataValues.id : undefined;

            let identificationCode = await this.updateIdentificationCode();
            let identificationCodeId = identificationCode ? identificationCode.dataValues.id : undefined;

            await VerifyIngObserverSqModel.update({
                ...verifyingObserverSq,
                x0040A088: identificationCodeId,
                x0040A075: personNameId
            }, {
                where: {
                    SOPInstanceUID: this.instance.dataValues.x00080018
                }
            });
        }

    }

    /**
     * create Verifying Observer Name
     */
    async createName() {
        let nameItem = _.get(this.verifyingObserverSq, "0040A075.Value.0");
        if (nameItem && Object.values(nameItem).some(v => v)) {
            return await PersonNameModel.create({
                alphabetic: _.get(nameItem, "Alphabetic", undefined),
                ideographic: _.get(nameItem, "Ideographic", undefined),
                phonetic: _.get(nameItem, "Phonetic", undefined)
            });
        }
        return undefined;
    }

    async updateName() {
        let verifyingObserverSq = await this.getExistItem();
        let name = await verifyingObserverSq.getPersonName();
        let nameItem = _.get(this.verifyingObserverSq, "0040A075.Value.0");
        
        if (name) {
            if (nameItem && Object.values(nameItem).some(v => v)) {
                await PersonNameModel.update({
                    alphabetic: _.get(nameItem, "Alphabetic", undefined),
                    ideographic: _.get(nameItem, "Ideographic", undefined),
                    phonetic: _.get(nameItem, "Phonetic", undefined)
                }, {
                    where: {
                        id: name.dataValues.id
                    }
                });
                return name;
            }
 
            await VerifyIngObserverSqModel.update({
                x0040A075: null
            }, {
                where: {
                    SOPInstanceUID: this.instance.dataValues.x00080018
                }
            });
            await PersonNameModel.destroy({
                where: {
                    id: name.dataValues.id
                }
            });

        } else {
            return await this.createName();
        }
        return undefined;
    }

    async createIdentificationCode() {
        let codeItem = _.get(this.verifyingObserverSq, "0040A088.Value.0");
        if (codeItem && Object.values(codeItem).some(v => v)) {
            return await DicomCodeModel.create({
                "x00080100": _.get(codeItem, "00080100.Value.0", undefined),
                "x00080102": _.get(codeItem, "00080102.Value.0", undefined),
                "x00080103": _.get(codeItem, "00080103.Value.0", undefined),
                "x00080104": _.get(codeItem, "00080104.Value.0", undefined)
            });
        }
        return undefined;
    }

    async updateIdentificationCode() {
        let verifyingObserverSq = await this.getExistItem();
        let code = await verifyingObserverSq.getDicomCode();
        let newCodeItem = _.get(this.verifyingObserverSq, "0040A088.Value.0");

        if (code) {
            if (newCodeItem && Object.values(newCodeItem).some(v => v)) {
                await DicomCodeModel.update({
                    "x00080100": _.get(newCodeItem, "00080100.Value.0", undefined),
                    "x00080102": _.get(newCodeItem, "00080102.Value.0", undefined),
                    "x00080103": _.get(newCodeItem, "00080103.Value.0", undefined),
                    "x00080104": _.get(newCodeItem, "00080104.Value.0", undefined)
                }, {
                    where: {
                        id: code.dataValues.id
                    }
                });
                return code;
            }

            // delete when empty code
            await VerifyIngObserverSqModel.update({
                x0040A088: null
            }, {
                where: {
                    SOPInstanceUID: this.instance.dataValues.x00080018
                }
            });
            await DicomCodeModel.destroy({
                where: {
                    id: code.dataValues.id
                }
            });
        } else {
            return await this.createIdentificationCode();
        }
    }
}

module.exports.InstancePersistentObject = InstancePersistentObject;
const fsP = require("fs/promises");
const path = require("path");
const mkdirp = require("mkdirp");
const mongoose = require("mongoose");
const moment = require("moment");
const _ = require("lodash");
const {
    dcm2jsonV8
} = require("./dcmtk");
const flat = require("flat");
const shortHash = require("shorthash2");
const { DicomBulkDataModel } = require("@dbModels/dicomBulkData.model");
const { logger } = require("../../utils/logs/log");
const { tagsNeedStore } = require("./dicom-tags-mapping");

const { raccoonConfig } = require("../../config-class");
const { JSONPath } = require("jsonpath-plus");
const { dictionary } = require("./dicom-tags-dic");

/**
 * *The SQ of Whole slide may have over thousand of length cause process block.
 * *Remove tags when processing that not use them.
 */
const BIG_VALUE_TAGS = [
    "52009230",
    "00480200"
];

class BaseDicomJson {
    /**
     * 
     * @param {Object} dicomJson 
     * @param  {...string} selection 
     */
    constructor(dicomJson, ...selection) {
        this.dicomJson = dicomJson;
        if (selection.length > 0) {
            this.initSelectionJson(selection);
        }
    }

    /**
     * 
     * @param {string[]} selection 
     */
    initSelectionJson(selection) {
        let selectionJson = {};
        for (let i = 0; i < selection.length; i++) {
            let tag = selection[i];
            let item = this.getItem(tag);
            if (item) {
                _.set(selectionJson, tag, item);
            }
        }
        this.dicomJson = selectionJson;
    }

    getItem(tag) {
        return _.get(this.dicomJson, tag, undefined);
    }

    getValues(tag) {
        return _.get(this.dicomJson, `${tag}.Value`, undefined);
    }

    getValue(tag) {
        return _.get(this.dicomJson, `${tag}.Value.0`, undefined);
    }

    /**
     * 
     * @param {string} tag 
     */
    getString(tag) {
        let tagSplit = tag.split(".");
        let seqTag = tagSplit.join(".Value.0.");
        return String(_.get(this.dicomJson, `${seqTag}.Value.0`, ""));
    }

    getSequenceItem(tag) {
        return JSONPath({
            path: `$..${tag}`,
            json: this.dicomJson
        });
    }

    setValue(tag, value) {
        let lastTag = tag.split(".").at(-1);
        let vrOfTag = _.get(dictionary.tagVR, `${lastTag}.vr`);
        _.set(this.dicomJson, `${tag}.vr`, vrOfTag);
        _.set(this.dicomJson, `${tag}.Value`, [value]);
    }

    static getKeywordOfTag(tag) {
        return _.get(dictionary.tag, `${tag}`);
    }

    static getTagOfKeyword(keyword) {
        return _.get(dictionary.keyword, `${keyword}`);
    }

    static getTagVrOfTag(tag) {
        return _.get(dictionary.tagVR, `${tag}.vr`);
    }
}

class DicomJsonModel {
    constructor(dicomJson) {
        this.dicomJson = dicomJson;

        //For temp property that have big value that mongodb cannot save and cause performance issue
        this.tempBigTagValue = {};

        /** @type {import("@root/utils/typeDef/dicom").DicomUid} */
        this.uidObj = {};
    }

    setMinifyDicomJsonAndTempBigValueTags() {
        let dicomJsonClone = _.cloneDeep(this.dicomJson);
        _.omit(dicomJsonClone, BIG_VALUE_TAGS);
        let tempBigTagValue = {};
        for (let bigValueTag of BIG_VALUE_TAGS) {
            let bigValue = _.get(this.dicomJson, bigValueTag);
            if (bigValue) {
                _.set(tempBigTagValue, `${bigValueTag}`, _.cloneDeep(bigValue));
            } else {
                _.set(tempBigTagValue, `${bigValueTag}`, undefined);
            }
            bigValue = undefined;
        }

        this.tempBigTagValue = tempBigTagValue;
        this.dicomJson = dicomJsonClone;
    }

    setUidObj() {
        this.uidObj = {
            sopClass: dcm2jsonV8.dcmString(
                this.dicomJson,
                "00080016"
            ),
            instanceUID: dcm2jsonV8.dcmString(
                this.dicomJson,
                "00080018"
            ),
            studyUID: dcm2jsonV8.dcmString(
                this.dicomJson,
                "0020000D"
            ),
            seriesUID: dcm2jsonV8.dcmString(
                this.dicomJson,
                "0020000E"
            ),
            patientID: dcm2jsonV8.dcmString(
                this.dicomJson,
                "00100020"
            )
        };
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/STOW-RS/STOW-RS").DicomFileSaveInfo} dicomFileSaveInfo 
     */
    async storeToDb(dicomFileSaveInfo) {
        let dbJson = this.getCleanDataBeforeStoringToDb(dicomFileSaveInfo);
        try {
            await Promise.all([
                this.storeInstanceCollection(dbJson),
                this.storeStudyCollection(dbJson),
                this.storeSeriesCollection(dbJson),
                this.storePatientCollection(dbJson)
            ]);
        } catch (e) {
            throw e;
        }
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/STOW-RS/STOW-RS").DicomFileSaveInfo} dicomFileSaveInfo 
     * @returns {import("@root/utils/typeDef/dicom").GeneralDicomJson}
     */
    getCleanDataBeforeStoringToDb(dicomFileSaveInfo) {
        let dicomJsonClone = _.cloneDeep(this.dicomJson);
        let mediaStorage = this.getMediaStorageInfo();
        _.merge(dicomJsonClone, this.uidObj);
        _.merge(dicomJsonClone, {
            studyPath: dicomFileSaveInfo.studyPath,
            seriesPath: dicomFileSaveInfo.seriesPath,
            instancePath: dicomFileSaveInfo.relativePath
        });
        _.merge(dicomJsonClone, mediaStorage);

        delete dicomJsonClone.sopClass;
        delete dicomJsonClone.instanceUID;
        return dicomJsonClone;
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/dicom").GeneralDicomJson} dicomJson 
     */
    async storeInstanceCollection(dicomJson) {
        let query = {
            $and: [
                {
                    studyUID: this.uidObj.studyUID
                },
                {
                    seriesUID: this.uidObj.seriesUID
                },
                {
                    instanceUID: this.uidObj.instanceUID
                }
            ]
        };

        await mongoose.model("dicom").findOneAndUpdate(query, dicomJson, {
            upsert: true,
            new: true
        });
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/dicom").GeneralDicomJson} dicomJson 
     */
    async storeStudyCollection(dicomJson) {
        await mongoose.model("dicomStudy").findOneAndUpdate(
            {
                studyUID: this.uidObj.studyUID
            },
            this.getStudyDicomJson(dicomJson),
            {
                upsert: true,
                new: true
            }
        );
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/dicom").GeneralDicomJson} dicomJson 
     */
    async storeSeriesCollection(dicomJson) {
        await mongoose.model("dicomSeries").findOneAndUpdate(
            {
                $and: [
                    {
                        studyUID: this.uidObj.studyUID
                    },
                    {
                        seriesUID: this.uidObj.seriesUID
                    }
                ]
            },
            this.getSeriesDicomJson(dicomJson),
            {
                upsert: true,
                new: true
            }
        );
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/dicom").GeneralDicomJson} dicomJson 
     */
    async storePatientCollection(dicomJson) {
        await mongoose.model("patient").findOneAndUpdate(
            {
                patientID: this.uidObj.patientID
            },
            {
                ...this.getPatientDicomJson(dicomJson),
                $addToSet: {
                    studyPaths: dicomJson.studyPath
                }
            },
            {
                upsert: true,
                new: true
            }
        );
    }

    /**
     * 
     * @param {string} storeFullPath 
     */
    async saveMetadataToFile(storeFullPath) {
        try {
            let dicomJsonClone = _.cloneDeep(this.dicomJson);
            for (let keys in this.tempBigTagValue) {
                if (this.tempBigTagValue[keys]) {
                    _.set(dicomJsonClone, keys, this.tempBigTagValue[keys]);
                }
            }
            let instanceUID = dcm2jsonV8.dcmString(dicomJsonClone, "00080018");

            let metadataFullStorePath = path.join(
                storeFullPath,
                `${instanceUID}.metadata.json`
            );

            await fsP.writeFile(
                metadataFullStorePath,
                JSON.stringify(dicomJsonClone, null, 4)
            );

            logger.info(
                `[STOW-RS] [Store metadata json to ${metadataFullStorePath}]`
            );
        } catch (e) {
            throw e;
        }
    }

    getMediaStorageInfo() {
        return {
            "00880130": {
                "vr": "SH",
                "Value": [
                    raccoonConfig.mediaStorageID
                ]
            },
            "00880140": {
                "vr": "UI",
                "Value": [
                    raccoonConfig.mediaStorageUID
                ]
            }
        };
    }

    getWindowCenter() {
        return _.get(this.dicomJson, "00281050.Value.0");
    }

    getWindowWidth() {
        return _.get(this.dicomJson, "00281051.Value.0");
    }

    getFrameNumber() {
        return _.get(this.dicomJson, "00280008.Value.0", 1);
    }

    getTransferSyntax() {
        return _.get(this.dicomJson, "00020010.Value.0");
    }

    getSopClassUid() {
        return _.get(this.dicomJson, "00080016.Value.0");
    }

    getStudyDate() {
        return _.get(this.dicomJson, "00080020.Value.0");
    }

    getStudyTime() {
        return _.get(this.dicomJson, "00080030.Value.0");
    }

    getStartedDate() {
        let startedDate = "";
        let studyDate = this.getStudyDate();
        let studyTime = this.getStudyTime();

        if (studyDate && studyTime) {
            startedDate = studyDate + studyTime;
        }

        if (!startedDate) {
            startedDate = moment().format("YYYYMMDDhhmmss");
        } else {
            startedDate = moment(startedDate, "YYYYMMDDhhmmss").toISOString();
        }

        return startedDate;
    }

    getStudyDateYearAndMonth() {
        let studyDateYYYYMMDD = moment(this.getStudyDate(), "YYYYMMDD").format("YYYY-MM-DD");

        let [year, month] = studyDateYYYYMMDD.split("-");
        return {
            year: year,
            month: month
        };
    }

    getPatientDicomJson(dicomJson = undefined) {
        if (!dicomJson) dicomJson = this.dicomJson;

        let patientDicomJson = {
            patientID: dicomJson.patientID
        };

        for (let tag in tagsNeedStore.Patient) {
            let value = _.get(dicomJson, tag);
            if (value)
                _.set(patientDicomJson, tag, value);
        }

        return patientDicomJson;
    }

    getStudyDicomJson(dicomJson = undefined) {

        if (!dicomJson) dicomJson = this.dicomJson;

        let studyDicomJson = {
            studyUID: dicomJson.studyUID,
            studyPath: dicomJson.studyPath
        };

        for (let tag in tagsNeedStore.Study) {
            let value = _.get(dicomJson, tag);
            if (value)
                _.set(studyDicomJson, tag, value);
        }

        let patientDicomJson = this.getPatientDicomJson(dicomJson);

        return {
            ...patientDicomJson,
            ...studyDicomJson
        };
    }

    getSeriesDicomJson(dicomJson = undefined) {
        if (!dicomJson) dicomJson = this.dicomJson;

        let seriesDicomJson = {
            studyUID: dicomJson.studyUID,
            seriesUID: dicomJson.seriesUID,
            seriesPath: dicomJson.seriesPath
        };

        for (let tag in tagsNeedStore.Series) {
            let value = _.get(dicomJson, tag);
            if (value)
                _.set(seriesDicomJson, tag, value);
        }

        let studyDicomJson = this.getStudyDicomJson(dicomJson);

        return {
            ...studyDicomJson,
            ...seriesDicomJson
        };
    }

}


class DicomJsonBinaryDataModel {
    constructor(dicomJsonModel, bulkDataModelClass = BulkData) {

        /** @type {DicomJsonModel} */
        this.dicomJsonModel = dicomJsonModel;

        /** @type {string[]} */
        this.binaryKeys = this.getBinaryKeys_();

        /** @type {string[]} */
        this.pathGroupOfBinaryProperties = this.getPathGroupOfBinaryProperties_();

        this.bulkDataModelClass = bulkDataModelClass;
    }

    getBinaryKeys_() {
        let binaryKeys = [];
        let flatDicomJson = flat(this.dicomJsonModel.dicomJson);
        for (let key in flatDicomJson) {
            if (key.includes("7FE00010")) continue;
            if (flatDicomJson[key] == "OW" || flatDicomJson[key] == "OB") {
                binaryKeys.push(key.substring(0, key.lastIndexOf(".vr")));
            }
        }
        return binaryKeys;
    }

    getPathGroupOfBinaryProperties_() {
        let pathGroupOfBinaryProperties = [];

        for (let binaryKey of this.binaryKeys) {

            if (_.get(this.dicomJsonModel.dicomJson, `${binaryKey}.Value.0`)) {
                pathGroupOfBinaryProperties.push(`${binaryKey}.Value.0`);
            } else if (_.get(this.dicomJsonModel.dicomJson, `${binaryKey}.InlineBinary`)) {
                pathGroupOfBinaryProperties.push(`${binaryKey}.InlineBinary`);
            }

        }

        return pathGroupOfBinaryProperties;
    }

    replaceAllBinaryToURI() {

        let {
            studyUID,
            seriesUID,
            instanceUID
        } = this.dicomJsonModel.uidObj;

        for (let i = 0; i < this.binaryKeys.length; i++) {
            let binaryKey = this.binaryKeys[i];

            // Reset VR to UR, because BulkDataURI is URI
            _.set(
                this.dicomJsonModel.dicomJson,
                `${binaryKey}.vr`,
                "UR"
            );

            let pathOfBinaryProperty = this.pathGroupOfBinaryProperties[i];
            // Set the binary data to BulkDataURI
            _.set(
                this.dicomJsonModel.dicomJson,
                `${binaryKey}.BulkDataURI`,
                `/studies/${studyUID}/series/${seriesUID}/instances/${instanceUID}/bulkdata/${pathOfBinaryProperty}`
            );

            _.unset(this.dicomJsonModel.dicomJson, `${binaryKey}.InlineBinary`);
        }

        this.dicomJsonModel.dicomJson["7FE00010"] = {
            vr: "UR",
            BulkDataURI: `/studies/${studyUID}/series/${seriesUID}/instances/${instanceUID}`
        };
    }

    async storeAllBinaryDataToFileAndDb() {
        let {
            instanceUID
        } = this.dicomJsonModel.uidObj;

        let shortInstanceUID = shortHash(instanceUID);


        for (let i = 0; i < this.pathGroupOfBinaryProperties.length; i++) {
            let relativeFilename = `files/bulkData/${shortInstanceUID}/`;
            let pathOfBinaryProperty = this.pathGroupOfBinaryProperties[i];

            let binaryData = _.get(this.dicomJsonModel.dicomJson, pathOfBinaryProperty);

            if (binaryData) {
                relativeFilename += `${pathOfBinaryProperty}.raw`;
                let filename = path.join(
                    raccoonConfig.dicomWebConfig.storeRootPath,
                    relativeFilename
                );

                mkdirp.sync(
                    path.join(
                        raccoonConfig.dicomWebConfig.storeRootPath,
                        `files/bulkData/${shortInstanceUID}`
                    )
                );

                await fsP.writeFile(filename, Buffer.from(binaryData, "base64"));
                logger.info(`[STOW-RS] [Store binary data to ${filename}]`);

                let bulkData = new this.bulkDataModelClass(this.dicomJsonModel.uidObj, relativeFilename, pathOfBinaryProperty);
                await bulkData.storeToDb();
            }

        }
    }

}

class BulkData {
    constructor(uidObj, filename, pathOfBinaryProperty) {
        /** @type {import("@root/utils/typeDef/dicom").DicomUid} */
        this.uidObj = uidObj;
        this.filename = filename;
        this.pathOfBinaryProperty = pathOfBinaryProperty;
    }

    async storeToDb() {

        let item = {
            studyUID: this.uidObj.studyUID,
            seriesUID: this.uidObj.seriesUID,
            instanceUID: this.uidObj.instanceUID,
            filename: this.filename,
            binaryValuePath: this.pathOfBinaryProperty
        };

        await DicomBulkDataModel.createOrUpdateBulkData(
            {
                instanceUID: this.uidObj.instanceUID,
                binaryValuePath: this.pathOfBinaryProperty
            },
            {
                studyUID: this.uidObj.studyUID,
                seriesUID: this.uidObj.seriesUID,
                instanceUID: this.uidObj.instanceUID,
                filename: this.filename,
                binaryValuePath: this.pathOfBinaryProperty
            }
        );
        logger.info(`[STOW-RS] [Store bulkdata ${JSON.stringify(item)} successful]`);
    }
}

module.exports.DicomJsonModel = DicomJsonModel;
module.exports.DicomJsonBinaryDataModel = DicomJsonBinaryDataModel;
module.exports.BaseDicomJson = BaseDicomJson;
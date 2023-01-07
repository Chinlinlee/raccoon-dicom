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
const dicomBulkDataModel = require("../mongodb/models/dicomBulkData");
const { logger } = require("../../utils/log");

const { raccoonConfig } = require("../../config-class");

const {
    rootPath: STORE_DICOM_ROOT_PATH
} = raccoonConfig.dicomWebConfig;

/**
 * *The SQ of Whole slide may have over thousand of length cause process block.
 * *Remove tags when processing that not use them.
 */
const BIG_VALUE_TAGS = [
    "52009230", 
    "00480200"
];

class DicomJsonModel {
    constructor(dicomJson) {
        this.dicomJson = dicomJson;

        //For temp property that have big value that mongodb cannot save and cause performance issue
        this.tempBigTagValue = {};

        /** @type {import("../../utils/typeDef/dicom").UIDObject} */
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
            sopInstanceUID: dcm2jsonV8.dcmString(
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
            )
        };
    }

    async storeToDb(dicomFileSaveInfo) {
        let dicomJsonClone = _.cloneDeep(this.dicomJson);
        try {
            _.merge(dicomJsonClone, this.uidObj);
            _.merge(dicomJsonClone, {
                studyPath: dicomFileSaveInfo.studyPath,
                seriesPath: dicomFileSaveInfo.seriesPath,
                instancePath: dicomFileSaveInfo.relativePath
            });

            delete dicomJsonClone.sopClass;
            delete dicomJsonClone.sopInstanceUID;

            await Promise.all([
                this.storeToDbInstanceCollection(dicomJsonClone),
                this.storeToDbStudyCollection(dicomJsonClone),
                this.storeToDbSeriesCollection(dicomJsonClone)
            ]);
        } catch(e) {
            throw e;
        }
    }

    async storeToDbInstanceCollection(dicomJson) {
        let query = {
            $and: [
                {
                    studyUID: this.uidObj.studyUID
                },
                {
                    seriesUID: this.uidObj.seriesUID
                },
                {
                    instanceUID: this.uidObj.sopInstanceUID
                }
            ]
        };

        await mongoose.model("dicom").findOneAndUpdate(query, dicomJson, {
            upsert: true,
            new: true
        });
    }

    async storeToDbStudyCollection(dicomJson) {
        await mongoose.model("dicomStudy").findOneAndUpdate(
            {
                studyUID: this.uidObj.studyUID
            },
            dicomJson,
            {
                upsert: true,
                new: true
            }
        );
    }

    async storeToDbSeriesCollection(dicomJson) {
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
            dicomJson,
            {
                upsert: true,
                new: true
            }
        );
    }

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

    getStartedDate() {
        let startedDate = "";
        startedDate =
            dcm2jsonV8.dcmString(this.dicomJson, "00080020") +
            dcm2jsonV8.dcmString(this.dicomJson, "00080030");

        if (!startedDate) startedDate = Date.now();
        startedDate = moment(startedDate, "YYYYMMDDhhmmss").toISOString();
        return startedDate;
    }

    getStartedDateYearAndMonth() {
        let startedDate = this.getStartedDate();
        let [year, month] = startedDate.split("-");
        return {
            year: year,
            month: month
        };
    }

}


class DicomJsonBinaryDataModel {
    constructor(dicomJsonModel) {

        /** @type {DicomJsonModel} */
        this.dicomJsonModel = dicomJsonModel;

        /** @type {string[]} */
        this.binaryKeys = this.getBinaryKeys_();

        /** @type {string[]} */
        this.pathGroupOfBinaryProperties = this.getPathGroupOfBinaryProperties_();
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

        for(let binaryKey of this.binaryKeys) {

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
            sopInstanceUID
        } = this.dicomJsonModel.dicomJson;

        for(let i = 0; i < this.binaryKeys.length ; i++) {
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
                `/studies/${studyUID}/series/${seriesUID}/instances/${sopInstanceUID}/bulkdata/${pathOfBinaryProperty}`
            );
        }

        this.dicomJsonModel.dicomJson["7FE00010"] = {
            vr: "UR",
            BulkDataURI: `/studies/${studyUID}/series/${seriesUID}/instances/${sopInstanceUID}`
        };
    }

    async storeAllBinaryDataToFileAndDb() {
        let {
            sopInstanceUID
        } = this.dicomJsonModel.uidObj;

        let shortInstanceUID = shortHash(sopInstanceUID);

        
        for(let i = 0; i < this.pathGroupOfBinaryProperties.length ; i++) {
            let relativeFilename = `files/bulkData/${shortInstanceUID}/`;
            let pathOfBinaryProperty = this.pathGroupOfBinaryProperties[i];

            let binaryData = _.get(this.dicomJsonModel.dicomJson, pathOfBinaryProperty);

            if(binaryData) {
                relativeFilename += `${pathOfBinaryProperty}.raw`;
                let filename = path.join(
                    STORE_DICOM_ROOT_PATH,
                    relativeFilename
                );

                mkdirp.sync(
                    path.join(
                        STORE_DICOM_ROOT_PATH,
                        `files/bulkData/${shortInstanceUID}`
                    )
                );

                await fsP.writeFile(filename, Buffer.from(binaryData, "base64"));
                logger.info(`[STOW-RS] [Store binary data to ${filename}]`);

                let bulkData = new BulkData(this.dicomJsonModel.uidObj, relativeFilename, pathOfBinaryProperty);
                await bulkData.storeToDb();
            }

        }
    }

}

class BulkData {
    constructor(uidObj, filename, pathOfBinaryProperty) {
        /** @type {import("../../utils/typeDef/dicom").UIDObject} */
        this.uidObj = uidObj;
        this.filename = filename;
        this.pathOfBinaryProperty = pathOfBinaryProperty;
    }

    async storeToDb() {

        let item = {
            studyUID: this.uidObj.studyUID,
            seriesUID: this.uidObj.seriesUID,
            instanceUID: this.uidObj.sopInstanceUID,
            filename: this.filename,
            binaryValuePath: this.pathOfBinaryProperty
        };

        await dicomBulkDataModel.updateOne(
            {
                $and: [
                    {
                        instanceUID: this.uidObj.sopInstanceUID
                    },
                    {
                        binaryValuePath: this.pathOfBinaryProperty
                    }
                ]
            },
            {
                studyUID: this.uidObj.studyUID,
                seriesUID: this.uidObj.seriesUID,
                instanceUID: this.uidObj.sopInstanceUID,
                filename: this.filename,
                binaryValuePath: this.pathOfBinaryProperty
            },
            {
                upsert: true
            }
        );
        logger.info(`[STOW-RS] [Store bulkdata ${JSON.stringify(item)} successful]`);
    }
}

module.exports.DicomJsonModel = DicomJsonModel;
module.exports.DicomJsonBinaryDataModel = DicomJsonBinaryDataModel;
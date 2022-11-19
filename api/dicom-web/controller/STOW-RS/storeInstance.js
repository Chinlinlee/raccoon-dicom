const path = require("node:path");
const fs = require("node:fs");
const fsP = require("node:fs/promises");
const { performance } = require("node:perf_hooks");
const formidable = require("formidable");
const _ = require("lodash");
const uuid = require("uuid");
const flatten = require("flat");
const shortHash = require("shorthash2");
const moment = require("moment");
const mkdirp = require("mkdirp");
const moveFile = require("../../../../utils/file/moveFile");
const errorResponseMessage = require("../../../../utils/errorResponse/errorResponseMessage");
const {
    dcm2jsonV8,
    dcmtkSupportTransferSyntax,
    dcm2jpegCustomCmd
} = require("../../../../models/DICOM/dcmtk");
const { logger, pythonLogger, fhirLogger } = require("../../../../utils/log");
const dicomBulkDataModel = require("../../../../models/mongodb/models/dicomBulkData");
const mongoose = require("mongoose");
const {
    DICOMFHIRConverter
} = require("../../../../models/FHIR/DICOM/DICOMToFHIR");
const notImageSOPClass = require("../../../../models/DICOM/dicomWEB/notImageSOPClass");
const PyDicomJpegConvert = require("../../../../python").getJpeg;
/**@type {import('socket.io').Server} */
const io = require("../../../../socket").get();
const { raccoonConfig } = require("../../../../config-class");

const {
    apiPath: dicomWebApiPath,
    rootPath: dicomRootPath
} = raccoonConfig.dicomWebConfig;
const {
    baseUrl: fhirBaseUrl,
    syncToFhir
} = raccoonConfig.fhirConfig;


/**
 * *The SQ of Whole slide may have over thousand of length cause process block.
 * *Remove tags when processing that not use them.
 */
const bigValueTags = ["52009230", "00480200"];

/**
 *  @openapi
 *  /dicom-web/studies:
 *    post:
 *      tags:
 *        - STOW-RS
 *      description: store DICOM instance
 *      requestBody:
 *        content:
 *          multipart/related:
 *            schema:
 *              type: object
 *              properties:
 *                file:
 *                  type: string
 *                  format: binary
 *            encoding:
 *              file:
 *                contentType: application/dicom;
 *      responses:
 *        "200":
 *          description: The DICOM instance store successfully
 */

/**
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */
module.exports = async function (req, res) {
    let startSTOWTime = performance.now();
    let retCode;
    let storeMessage;
    try {
        let multipartData = await parseMultipart(req);
        if (multipartData.status) {
            let storeInstanceResult = await storeInstance(req, multipartData);
            retCode = storeInstanceResult.code;
            storeMessage = storeInstanceResult.storeMessage;
        }
        let endSTOWTime = performance.now();
        let elapsedTime = (endSTOWTime - startSTOWTime).toFixed(3);
        logger.info(
            `[STOW-RS] [Finished STOW-RS, elapsed time: ${elapsedTime} ms]`
        );
        res.writeHead(retCode);
        return res.end(JSON.stringify(storeMessage));
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[STOW-RS] [${errorStr}]`);
        let errorMessage =
            errorResponseMessage.getInternalServerErrorMessage(errorStr);
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        return res.end(JSON.stringify(errorMessage));
    }
};

async function storeInstance(req, multipartData) {
    let storeMessage = {
        "00081190": {
            //Study retrieve URL
            vr: "UT",
            Value: []
        },
        "00081198": {
            //Failed SOP Sequence
            vr: "SQ",
            Value: [] // Use SOPSeq
        },
        "00081199": {
            //ReferencedSOPSequence
            vr: "SQ",
            Value: [] // Use SOPSeq
        }
    };
    let retCode = 200;
    let uploadFiles = multipartData.multipart.files;
    for (let i = 0; i < uploadFiles.length; i++) {
        let currentFile = uploadFiles[i];
        fixEmptyUploadFileName(currentFile);
        let dicomJson = await getDICOMJson(currentFile.filepath);
        let removedTagsDicomJson = getRemoveBigValueTagsDicomJson(dicomJson);

        let uidObj = {
            sopClass: dcm2jsonV8.dcmString(
                removedTagsDicomJson.dicomJson,
                "00080016"
            ),
            sopInstanceUID: dcm2jsonV8.dcmString(
                removedTagsDicomJson.dicomJson,
                "00080018"
            ),
            studyUID: dcm2jsonV8.dcmString(
                removedTagsDicomJson.dicomJson,
                "0020000D"
            ),
            seriesUID: dcm2jsonV8.dcmString(
                removedTagsDicomJson.dicomJson,
                "0020000E"
            )
        };

        let isSameStudyID = checkStudyId(req, uidObj, storeMessage);
        if (!isSameStudyID) {
            retCode = 409;
        }

        let replacedBinaryDicomJson = await processBinaryData(
            req,
            removedTagsDicomJson,
            uidObj
        );
        let saveDICOMFileResult = await saveDICOMFile(
            currentFile,
            replacedBinaryDicomJson.dicomJson,
            uidObj
        );
        await storeMetadata(
            replacedBinaryDicomJson,
            saveDICOMFileResult.fullPath
        );
        await storeDICOMJsonToDB(uidObj, saveDICOMFileResult);
        let retrieveUrlObj = getRetrieveUrl(req, uidObj);
        storeMessage["00081190"].Value.push(retrieveUrlObj.study);
        storeMessage["00081190"].Value = _.uniq(storeMessage["00081190"].Value);

        let sopSeq = getSOPSeq(uidObj.sopClass, uidObj.sopInstanceUID);
        _.set(sopSeq, "00081190.vr", "UT");
        _.set(sopSeq, "00081190.Value", [retrieveUrlObj.instance]);
        storeMessage["00081199"]["Value"].push(sopSeq);

        if (syncToFhir) {
            await dicomToFHIR(req, removedTagsDicomJson.dicomJson, uidObj);
        }

        if (!notImageSOPClass.includes(uidObj.sopClass)) {
            generateJpeg(
                removedTagsDicomJson.dicomJson,
                uidObj,
                saveDICOMFileResult.instancePath
            );
        }
    }
    return {
        code: retCode,
        storeMessage: storeMessage
    };
}

/**
 *
 * @param {import('http').IncomingMessage} req
 * @param {JSON} dicomJson
 * @param {import('../../../../utils/typeDef/dicom').UIDObject} uidObj
 */
async function dicomToFHIR(req, dicomJson, uidObj) {
    try {
        let dicomFHIRConverter = new DICOMFHIRConverter();
        dicomFHIRConverter.dicomWeb.name = `raccoon-dicom-web-server`;

        let protocol = req.secure ? "https" : "http";
        dicomFHIRConverter.dicomWeb.retrieveStudiesUrl = `${protocol}://${req.headers.host}/${dicomWebApiPath}/studies`;

        await dicomFHIRConverter.dicomJsonToFHIR(dicomJson);

        dicomFHIRConverter.fhir.baseUrl = fhirBaseUrl;
        await dicomFHIRConverter.postDicomFhir();
        let logObj = {
            studyUID: uidObj.studyUID,
            seriesUID: uidObj.seriesUID,
            instanceUID: uidObj.sopInstanceUID,
            status: true,
            message: "success"
        };
        await storeSyncedFHIRLog(uidObj, logObj);
        io.emit("fhir_synced", {
            ...dicomFHIRConverter.dicomFHIR,
            status: true
        });
    } catch (e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        fhirLogger.error(
            `[FHIR] [DICOM sync to FHIR server error] [${errorStr}]`
        );
        let errorObj = {
            studyUID: uidObj.studyUID,
            seriesUID: uidObj.seriesUID,
            instanceUID: uidObj.sopInstanceUID,
            status: false,
            message: errorStr
        };
        await storeSyncedFHIRLog(uidObj, errorObj);
        io.emit("fhir_synced", {
            message: errorStr,
            status: false
        });
    }
}

/**
 * Store the log of processing result of DICOM converting to FHIR Resources and syncing to FHIR server.
 * @param {import("../../../../utils/typeDef/dicom").UIDObject} uidObj 
 */
async function storeSyncedFHIRLog(uidObj, logObj) {
    try {
        await mongoose.model("syncFHIRLog").findOneAndUpdate(
            {
                $and: [
                    {
                        studyUID: uidObj.studyUID
                    },
                    {
                        seriesUID: uidObj.seriesUID
                    },
                    {
                        instanceUID: uidObj.sopInstanceUID
                    }
                ]
            },
            logObj,
            {
                upsert: true
            }
        );
    } catch(e) {
        throw e;
    }
}

/**
 *
 * @param {import('http').IncomingMessage} req
 * @return {Promise<import('../../../../utils/typeDef/STOW-RS/STOW-RS.def').MultipartResult>}
 */
async function parseMultipart(req) {
    return new Promise((resolve, reject) => {
        new formidable.IncomingForm({
            uploadDir: path.join(process.cwd(), "/tempUploadFiles"),
            maxFileSize: 100 * 1024 * 1024 * 1024,
            multiples: true,
            isGetBoundaryInData: true
        }).parse(req, async (err, fields, files) => {
            if (err) {
                logger.error(err);
                return reject(err);
            }
            let fileField = Object.keys(files).pop();
            let uploadFiles = files[fileField];
            if (!_.isArray(uploadFiles)) uploadFiles = [uploadFiles];
            return resolve({
                status: true,
                multipart: {
                    fields: fields,
                    files: uploadFiles
                }
            });
        });
    });
}

function fixEmptyUploadFileName(file) {
    if (!file.originalFilename) file.originalFilename = `${uuid.v4()}.dcm`;
}

async function getDICOMJson(filename) {
    try {
        let dicomJson = await dcm2jsonV8.exec(filename);
        return dicomJson;
    } catch (e) {
        throw e;
    }
}

/**
 *
 * @param {import('formidable').File} file
 * @param {JSON} dicomJson
 * @param {import('../../../../utils/typeDef/dicom').UIDObject} uidObj
 * @return {Promise<import("../../../../utils/typeDef/STOW-RS/STOW-RS.def").SaveDicomFileResult>}
 */
async function saveDICOMFile(file, dicomJson, uidObj) {
    try {
        let started_date = "";
        started_date =
            dcm2jsonV8.dcmString(dicomJson, "00080020") +
            dcm2jsonV8.dcmString(dicomJson, "00080030");
        if (!started_date) started_date = Date.now();
        started_date = moment(started_date, "YYYYMMDDhhmmss").toISOString();
        let [year, month] = started_date.split("-");
        let studyUID = uidObj.studyUID;
        let seriesUID = uidObj.seriesUID;
        let shortStudyUID = shortHash(studyUID);
        let shortSeriesUID = shortHash(seriesUID);

        let relativeStorePath = `files/${year}/${month}/${shortStudyUID}/${shortSeriesUID}/`;
        let fullStorePath = path.join(
            dicomRootPath,
            relativeStorePath
        );
        let instanceStorePath = path.join(fullStorePath, file.originalFilename);
        mkdirp.sync(fullStorePath, "0755");
        await moveFile(file.filepath, instanceStorePath, {
            overwrite: true
        });
        logger.info(
            `[STOW-RS] [Move uploaded temp DICOM file "${file.filepath}" to "${instanceStorePath}"`
        );
        return {
            fullPath: fullStorePath,
            relativePath: `${relativeStorePath}${file.originalFilename}`,
            instancePath: instanceStorePath,
            seriesPath: `files/${year}/${month}/${shortStudyUID}/${shortSeriesUID}`,
            studyPath: `files/${year}/${month}/${shortStudyUID}`,
            dicomJson: dicomJson
        };
    } catch (e) {
        throw e;
    }
}

async function storeMetadata(removedTagsDicomJson, dest) {
    try {
        let { dicomJson, tempTagsValue } = removedTagsDicomJson;
        for (let keys in tempTagsValue) {
            if (tempTagsValue[keys]) {
                _.set(dicomJson, keys, tempTagsValue[keys]);
            }
        }
        let instanceUID = dcm2jsonV8.dcmString(dicomJson, "00080018");
        let metadataFullStorePath = path.join(
            dest,
            `${instanceUID}.metadata.json`
        );
        await fsP.writeFile(
            metadataFullStorePath,
            JSON.stringify(dicomJson, null, 4)
        );
        logger.info(
            `[STOW-RS] [Store metadata json to ${metadataFullStorePath}]`
        );
    } catch (e) {
        throw e;
    }
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {JSON} dicomJson
 */
async function processBinaryData(req, removedTagsDicomJson, uidObj) {
    try {

        let dicomJson = removedTagsDicomJson.dicomJson;
        let binaryKeys = [];
        let flatDicomJson = flatten(dicomJson);
        for (let key in flatDicomJson) {
            if (key.includes("7FE00010")) continue;
            if (flatDicomJson[key] == "OW" || flatDicomJson[key] == "OB") {
                binaryKeys.push(key.substring(0, key.lastIndexOf(".vr")));
            }
        }
        for (let key of binaryKeys) {
            let studyUID = uidObj.studyUID;
            let seriesUID = uidObj.seriesUID;
            let instanceUID = uidObj.sopInstanceUID;
            let binaryData = "";
            let binaryValuePath = "";
            let shortInstanceUID = shortHash(instanceUID);
            let relativeFilename = `files/bulkData/${shortInstanceUID}/`;
            if (_.get(dicomJson, `${key}.Value.0`)) {
                binaryValuePath = `${key}.Value.0`;
                binaryData = _.get(dicomJson, binaryValuePath);
                dicomJson = _.omit(dicomJson, [`${key}.Value`]);
            } else if (_.get(dicomJson, `${key}.InlineBinary`)) {
                binaryValuePath = `${key}.InlineBinary`;
                binaryData = _.get(dicomJson, `${binaryValuePath}`);
                dicomJson = _.omit(dicomJson, [`${binaryValuePath}`]);
            }

            // Reset VR to UR, because BulkDataURI is URI
            _.set(
                dicomJson,
                "vr",
                "UR"
            );

            // Set the binary data to BulkDataURI
            _.set(
                dicomJson,
                `${key}.BulkDataURI`,
                `/studies/${studyUID}/series/${seriesUID}/instances/${instanceUID}/bulkdata/${binaryValuePath}`
            );
            relativeFilename += `${binaryValuePath}.raw`;

            let filename = path.join(
                dicomRootPath,
                relativeFilename
            );
            mkdirp.sync(
                path.join(
                    dicomRootPath,
                    `files/bulkData/${shortInstanceUID}`
                )
            );
            if (binaryData)
                fs.writeFileSync(filename, Buffer.from(binaryData, "base64"));
            logger.info(`[STOW-RS] [Store binary data to ${filename}]`);
            let bulkData = {
                studyUID: studyUID,
                seriesUID: seriesUID,
                instanceUID: instanceUID,
                filename: relativeFilename,
                binaryValuePath: binaryValuePath
            };

            await dicomBulkDataModel.updateOne(
                {
                    $and: [
                        {
                            instanceUID: instanceUID
                        },
                        {
                            binaryValuePath: binaryValuePath
                        }
                    ]
                },
                bulkData,
                {
                    upsert: true
                }
            );
        }
        dicomJson["7FE00010"] = {
            vr: "UR",
            BulkDataURI: `/studies/${dicomJson["0020000D"].Value[0]}/series/${dicomJson["0020000E"].Value[0]}/instances/${dicomJson["00080018"].Value[0]}`
        };
        return {
            dicomJson: dicomJson,
            tempTagsValue: removedTagsDicomJson.tempTagsValue
        };
    } catch (e) {
        console.error(e);
        throw e;
    }
}

function getRemoveBigValueTagsDicomJson(dicomJson) {
    let dicomJsonClone = _.cloneDeep(dicomJson);
    _.omit(dicomJsonClone, bigValueTags);
    let tempBigTagValue = {};
    for (let bigValueTag of bigValueTags) {
        let bigValue = _.get(dicomJson, bigValueTag);
        if (bigValue) {
            _.set(tempBigTagValue, `${bigValueTag}`, _.cloneDeep(bigValue));
        } else {
            _.set(tempBigTagValue, `${bigValueTag}`, undefined);
        }
        bigValue = undefined;
    }
    return {
        dicomJson: dicomJsonClone,
        tempTagsValue: tempBigTagValue
    };
}

function checkStudyId(req, uidObj, storeMessage) {
    let reqStudyId = req.params.studyID;
    let dataStudyId = uidObj.studyUID;
    let sopSeq = getSOPSeq(uidObj.sopClass, uidObj.sopInstanceUID);
    let result = true;
    if (reqStudyId) {
        if (reqStudyId !== dataStudyId) {
            logger.error(
                `[STOW-RS] [The UID is not consist, request UID: (${req.params.studyID}, DICOM file UID: ${dataStudyId})]`
            );
            let failureMessage = {
                "00081197": {
                    vr: "US",
                    Value: ["43264"]
                }
            };
            Object.assign(sopSeq, failureMessage);
            storeMessage["00081198"].Value.push(sopSeq);
            result = false;
        }
    }
    return result;
}

/* Failure Reason
http://dicom.nema.org/medical/dicom/current/output/chtml/part02/sect_J.4.2.html
A7xx - Refused out of Resources

    The STOW-RS Service did not store the instance because it was out of resources.
A9xx - Error: Data Set does not match SOP Class

    The STOW-RS Service did not store the instance because the instance does not conform to its specified SOP Class.
Cxxx - Error: Cannot understand

    The STOW-RS Service did not store the instance because it cannot understand certain Data Elements.
C122 - Referenced Transfer Syntax not supported

    The STOW-RS Service did not store the instance because it does not support the requested Transfer Syntax for the instance.
0110 - Processing failure

    The STOW-RS Service did not store the instance because of a general failure in processing the operation.
0122 - Referenced SOP Class not supported

    The STOW-RS Service did not store the instance because it does not support the requested SOP Class. 
 */
function getSOPSeq(referencedSOPClassUID, referencedSOPInstanceUID) {
    let result = {
        "00081150": {
            vr: "UI",
            Value: [referencedSOPClassUID]
        },
        "00081155": {
            vr: "UI",
            Value: [referencedSOPInstanceUID]
        }
    };
    return result;
}

function getRetrieveUrl(req, uidObj) {
    let protocol = req.secure ? "https" : "http";
    let url = `${protocol}://${req.headers.host}/${dicomWebApiPath}/studies`;

    return {
        study: `${url}/${uidObj.studyUID}`,
        series: `${url}/${uidObj.studyUID}/series/${uidObj.seriesUID}`,
        instance: `${url}/${uidObj.studyUID}/series/${uidObj.seriesUID}/instances/${uidObj.sopInstanceUID}`
    };
}

/**
 *
 * @param {import('../../../../utils/typeDef/dicom').UIDObject} uidObj
 * @param {*} dicomJson
 */
async function storeDICOMJsonToDB(uidObj, saveDICOMFileResult) {
    let dicomJson = saveDICOMFileResult.dicomJson;
    try {
        _.merge(dicomJson, uidObj);
        _.merge(dicomJson, {
            studyPath: saveDICOMFileResult.studyPath,
            seriesPath: saveDICOMFileResult.seriesPath,
            instancePath: saveDICOMFileResult.relativePath
        });
        let query = {
            $and: [
                {
                    studyUID: uidObj.studyUID
                },
                {
                    seriesUID: uidObj.seriesUID
                },
                {
                    instanceUID: uidObj.sopInstanceUID
                }
            ]
        };
        delete dicomJson.sopClass;
        delete dicomJson.sopInstanceUID;
        await Promise.all([
            mongoose.model("dicom").findOneAndUpdate(query, dicomJson, {
                upsert: true,
                new: true
            }),
            mongoose.model("dicomStudy").findOneAndUpdate(
                {
                    studyUID: uidObj.studyUID
                },
                dicomJson,
                {
                    upsert: true,
                    new: true
                }
            ),
            mongoose.model("dicomSeries").findOneAndUpdate(
                {
                    $and: [
                        {
                            studyUID: uidObj.studyUID
                        },
                        {
                            seriesUID: uidObj.seriesUID
                        }
                    ]
                },
                dicomJson,
                {
                    upsert: true,
                    new: true
                }
            )
        ]);
    } catch (e) {
        throw e;
    }
}

async function insertDicomToJpegTask(item) {
    try {
        await mongoose.model("dicomToJpegTask").updateOne(
            {
                studyUID: item.studyUID,
                seriesUID: item.seriesUID,
                instanceUID: item.instanceUID
            },
            item,
            {
                upsert: true
            }
        );
        return true;
    } catch (e) {
        throw e;
    }
}

/**
 * @param {Object} options
 * @param {string} options.windowCenter
 * @param {string} options.windowWidth
 * @param {string} options.frameNumber
 * @param {string} options.dicomFilename
 * @param {string} options.jpegFilename
 */
function getDICOMToJpegCommandString(options) {
    let execCmd = "";
    if (process.env.OS === "windows") {
        if (options.windowCenter && options.windowWidth) {
            execCmd = `models/DICOM/dcmtk/dcmtk-3.6.5-win64-dynamic/bin/dcmj2pnm.exe --write-jpeg "${
                options.dicomFilename
            }" "${options.jpegFilename}.${
                options.frameNumber - 1
            }.jpg" --frame ${options.frameNumber} +Ww ${options.windowCenter} ${
                options.windowWidth
            }`;
        } else {
            execCmd = `models/DICOM/dcmtk/dcmtk-3.6.5-win64-dynamic/bin/dcmj2pnm.exe --write-jpeg "${
                options.dicomFilename
            }" "${options.jpegFilename}.${
                options.frameNumber - 1
            }.jpg" --frame ${options.frameNumber}`;
        }
    } else if (process.env.OS === "linux") {
        if (options.windowCenter && options.windowWidth) {
            execCmd = `dcmj2pnm --write-jpeg "${options.dicomFilename}" "${
                options.jpegFilename - 1
            }.${options.frameNumber}.jpg" --frame ${options.frameNumber} +Ww ${
                options.windowCenter
            } ${options.windowWidth}`;
        } else {
            execCmd = `dcmj2pnm --write-jpeg "${options.dicomFilename}" "${
                options.jpegFilename - 1
            }.${options.frameNumber}.jpg" --frame ${options.frameNumber}`;
        }
    }
    return execCmd;
}

/**
 *
 * @param {JSON} dicomJson
 * @param {import('../../../../utils/typeDef/dicom').UIDObject} uidObj
 * @param {*} dicomFilename
 */
async function generateJpeg(dicomJson, uidObj, dicomFilename) {
    try {
        let startTaskObj = {
            studyUID: uidObj.studyUID,
            seriesUID: uidObj.seriesUID,
            instanceUID: uidObj.sopInstanceUID,
            status: false,
            message: "processing",
            taskTime: new Date(),
            finishedTime: null,
            fileSize: (fs.statSync(dicomFilename).size / 1024 / 1024).toFixed(3)
        };
        await insertDicomToJpegTask(startTaskObj);
        io.emit("dicomToJpegTask", startTaskObj);
        let windowCenter = _.get(dicomJson, "00281050.Value.0");
        let windowWidth = _.get(dicomJson, "00281051.Value.0");
        let frameNumber = _.get(dicomJson, "00280008.Value.0", 1);
        let transferSyntax = _.get(dicomJson, "00020010.Value.0");
        let jpegFilename = dicomFilename.replace(/\.dcm/gi, "");

        let execCmdList = [];
        if (dcmtkSupportTransferSyntax.includes(transferSyntax)) {
            for (let i = 1; i <= frameNumber; i++) {
                let execCmd = getDICOMToJpegCommandString({
                    windowCenter: windowCenter,
                    windowWidth: windowWidth,
                    frameNumber: i,
                    dicomFilename: dicomFilename,
                    jpegFilename: jpegFilename
                });
                execCmdList.push(execCmd);
                if (i % 4 === 0) {
                    await Promise.allSettled(
                        execCmdList.map((cmd) => dcm2jpegCustomCmd(cmd))
                    );
                    execCmdList = new Array();
                }
            }
            logger.info(
                `[STOW-RS] [Background generating jpeg finished, ${JSON.stringify(
                    uidObj
                )}]`
            );
        } else {
            for (let i = 1; i <= frameNumber; i++) {
                await PyDicomJpegConvert[process.env.OS].getJpegByPyDicom(
                    dicomFilename,
                    i
                );
            }
            pythonLogger.info(
                `[STOW-RS] [Background generating jpeg finished, ${JSON.stringify(
                    uidObj
                )}]`
            );
        }
        let endTaskObj = {
            studyUID: uidObj.studyUID,
            seriesUID: uidObj.seriesUID,
            instanceUID: uidObj.instanceUID,
            status: true,
            message: "generated",
            finishedTime: new Date()
        };
        await insertDicomToJpegTask(endTaskObj);
        io.emit("dicomToJpegTask", endTaskObj);
    } catch (e) {
        let errorTaskObj = {
            studyUID: uidObj.studyUID,
            seriesUID: uidObj.seriesUID,
            instanceUID: uidObj.instanceUID,
            status: false,
            message: e.toString(),
            finishedTime: new Date()
        };
        await insertDicomToJpegTask(errorTaskObj);
        logger.error(e);
        io.emit("dicomToJpegTask", errorTaskObj);
    }
}

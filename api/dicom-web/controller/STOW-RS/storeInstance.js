const path = require('node:path');
const fs = require('node:fs');
const fsP = require('node:fs/promises');
const { performance } = require('node:perf_hooks');
const formidable = require('formidable');
const _ = require('lodash');
const uuid = require('uuid');
const flatten = require('flat');
const shortHash = require('shorthash2');
const moment = require('moment');
const mkdirp = require('mkdirp');
const moveFile = require('../../../../utils/file/moveFile');
const errorResponseMessage = require('../../../../utils/errorResponse/errorResponseMessage');
const { dcm2jsonV8 } = require('../../../../models/DICOM/dcmtk');
const { logger } = require('../../../../utils/log');
const dicomBulkDataModel = require('../../../../models/mongodb/models/dicomBulkData');
const dicomModel = require('../../../../models/mongodb/models/dicom');
const mongoose = require('mongoose');
const { dicomJsonToFHIRImagingStudy } = require('../../../../models/FHIR/DICOMToFHIRImagingStudy');

/**
 * *The SQ of Whole slide may have over thousand of length cause process block.
 * *Remove tags when processing that not use them.
 */
const bigValueTags = ["52009230", "00480200"];

/**
 * 
 * @param {import('http').IncomingMessage} req 
 * @param {import('http').ServerResponse} res 
 */
module.exports = async function(req, res) {
    //store the successFiles;
    let successFiles = [];
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
        logger.info(`[STOW-RS] [Finished STOW-RS, elapsed time: ${elapsedTime} ms]`);
        res.writeHead(retCode);
        return res.end(JSON.stringify(storeMessage));
    } catch(e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        logger.error(`[STOW-RS] [${errorStr}]`);
        let errorMessage = errorResponseMessage.getInternalServerErrorMessage(errorStr);
        res.writeHead(500, {
            "Content-Type": "application/dicom-json"
        });
        return res.end(JSON.stringify(errorMessage));
    }
}

async function storeInstance(req, multipartData) {
    let storeMessage = {
        "00081190": {  //Study retrieve URL
            "vr": "UT",
            "Value": []
        },
        "00081198": {  //Failed SOP Sequence
            "vr": "SQ",
            "Value": [] // Use SOPSeq
        },
        "00081199": { //ReferencedSOPSequence
            "vr": "SQ",
            "Value": [] // Use SOPSeq
        }
    }
    let retCode = 200;
    let uploadFiles = multipartData.multipart.files;
    for (let i = 0 ; i< uploadFiles.length; i++) {
        let currentFile = uploadFiles[i];
        fixEmptyUploadFileName(currentFile);
        let dicomJson = await getDICOMJson(currentFile.filepath);
        let removedTagsDicomJson = getRemoveBigValueTagsDicomJson(dicomJson);
        
        let uidObj = {
            sopClass: dcm2jsonV8.dcmString(removedTagsDicomJson.dicomJson, "00080016"),
            sopInstanceUID: dcm2jsonV8.dcmString(removedTagsDicomJson.dicomJson, "00080018"),
            studyUID: dcm2jsonV8.dcmString(removedTagsDicomJson.dicomJson, "0020000D"),
            seriesUID: dcm2jsonV8.dcmString(removedTagsDicomJson.dicomJson, "0020000E")
        };

        let isSameStudyID = checkStudyId(req, uidObj, storeMessage);
        if (!isSameStudyID) {
            retCode = 409;
        }

        let replacedBinaryDicomJson = await processBinaryData(req, removedTagsDicomJson, uidObj);
        let { fullPath } = await saveDICOMFile(currentFile, removedTagsDicomJson.dicomJson);
        await storeMetadata(replacedBinaryDicomJson, fullPath);
        await storeDICOMJsonToDB(uidObj, removedTagsDicomJson.dicomJson);
        let retrieveUrlObj = getRetrieveUrl(req, uidObj);
        storeMessage["00081190"].Value.push(retrieveUrlObj.study);
        storeMessage["00081190"].Value = _.uniq(storeMessage["00081190"].Value);

        let sopSeq = getSOPSeq(uidObj.sopClass, uidObj.sopInstanceUID);
        _.set(sopSeq, "00081190.vr", "UT");
        _.set(sopSeq, "00081190.Value", [retrieveUrlObj.instance]);
        storeMessage["00081199"]["Value"].push(sopSeq);

        // dicomJsonToFHIRImagingStudy(removedTagsDicomJson.dicomJson);
    }
    return {
        code: retCode,
        storeMessage: storeMessage
    };
}

/**
 * 
 * @param {import('http').IncomingMessage} req 
 * @return {Promise<import('../../../../utils/typeDef/STOW-RS/STOW-RS.def').MultipartResult>}
 */
async function parseMultipart(req) {
    return new Promise( (resolve, reject) => {
        new formidable.IncomingForm({
            uploadDir: path.join(process.cwd(), "/tempUploadFiles"),
            maxFileSize: 100 * 1024 * 1024 * 1024,
            multiples: true,
            isGetBoundaryInData: true
        }).parse(req, async(err, fields, files) => {
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
    } catch(e) {
        throw e;
    }
}

/**
 * 
 * @param {import('formidable').File} file 
 * @param {JSON} dicomJson 
 */
async function saveDICOMFile(file, dicomJson) {
    try {
        let started_date = "";
        started_date = dcm2jsonV8.dcmString(dicomJson, "00080020") + dcm2jsonV8.dcmString(dicomJson, "00080030");
        if (!started_date) started_date = Date.now();
        started_date = moment(started_date, "YYYYMMDDhhmmss").toISOString();
        let [year, month] = started_date.split('-');
        let uid = dcm2jsonV8.dcmString(dicomJson, "0020000E");
        let shortUID = shortHash(uid);
        let relativeStorePath = `files/${year}/${month}/${shortUID}/`;
        let fullStorePath = path.join(process.env.DICOM_STORE_ROOTPATH, relativeStorePath);
        let instanceStorePath = path.join(fullStorePath, file.originalFilename);
        mkdirp.sync(fullStorePath, 0755);
        await moveFile(file.filepath, instanceStorePath, {
            overwrite: true
        });
        logger.info(`[STOW-RS] [Move uploaded temp DICOM file "${file.filepath}" to "${instanceStorePath}"`);
        return {
            fullPath: fullStorePath,
            relativePath: relativeStorePath,
            instancePath: instanceStorePath,
            dicomJson: dicomJson
        };
    } catch(e) {
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
        let instanceUID = dcm2jsonV8.dcmString(dicomJson, '00080018');
        let metadataFullStorePath = path.join(dest, `${instanceUID}.metadata.json`);
        await fsP.writeFile(metadataFullStorePath, JSON.stringify(dicomJson, null, 4));
        logger.info(`[STOW-RS] [Store metadata json to ${metadataFullStorePath}]`);
    } catch(e) {
        throw e;
    }
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {JSON} dicomJson
 */
async function processBinaryData(req, removedTagsDicomJson, uidObj) {
    try {
        // console.log(req.secure);
        // console.log(req.headers.host);
        let protocol = req.secure? "https" : "http";
        let url = `${protocol}://${req.headers.host}/${process.env.DICOMWEB_API}/studies`;

        let dicomJson = removedTagsDicomJson.dicomJson;
        let binaryKeys = [];
        let flatDicomJson = flatten(dicomJson);
        for (let key in flatDicomJson) {
            if (key.includes("7FE00010")) continue;
            if (flatDicomJson[key] == "OW" || flatDicomJson[key] == "OB") {
                binaryKeys.push(key.substring(0, key.lastIndexOf(".vr")));
            }
        }
        let port = process.env.DICOMWEB_PORT || "";
        port = (port) ? `:${port}` : "";
        for (let key of binaryKeys) {
            let studyUID = uidObj.studyUID;
            let seriesUID = uidObj.seriesUID;
            let instanceUID = uidObj.sopInstanceUID;
            let binaryData = "";
            let binaryValuePath = "";
            let shortInstanceUID = shortHash(instanceUID);
            let relativeFilename = `files/bulkData/${shortInstanceUID}/`;
            if (_.get(dicomJson, `${key}.Value.0`) ) {
                binaryValuePath = `${key}.Value.0`;
                binaryData = _.get(data, binaryValuePath);
                dicomJson = _.omit(dicomJson, [`${key}.Value`]);
            } else if (_.get(dicomJson, `${key}.InlineBinary`)) {
                binaryValuePath = `${key}.InlineBinary`;
                binaryData = _.get(dicomJson, `${binaryValuePath}`);
                dicomJson = _.omit(dicomJson, [`${binaryValuePath}`]);
            }
            _.set(dicomJson, `${key}.BulkDataURI`, `${url}/${studyUID}/series/${seriesUID}/instances/${instanceUID}/bulkdata/${binaryValuePath}`);
            relativeFilename += `${ binaryValuePath }.raw`;
            
            let filename = path.join(process.env.DICOM_STORE_ROOTPATH, relativeFilename);
            mkdirp.sync(path.join(process.env.DICOM_STORE_ROOTPATH, `files/bulkData/${shortInstanceUID}`));
            if (binaryData)
            fs.writeFileSync(filename, Buffer.from(binaryData, "base64"));
            logger.info(`[STOW-RS] [Store binary data to ${filename}]`);
            let bulkData = {
                studyUID: studyUID,
                seriesUID: seriesUID,
                instanceUID: instanceUID,
                filename: relativeFilename,
                binaryValuePath: binaryValuePath
            }

            await dicomBulkDataModel.updateOne({
                $and: [
                    {
                        instanceUID: instanceUID
                    },
                    {
                        binaryValuePath: binaryValuePath
                    }
                ]
            }, bulkData , {
                upsert: true
            });
        }
        dicomJson["7FE00010"] = {
            "vr": "OW",
            "BulkDataURI": `${url}/${dicomJson['0020000D'].Value[0]}/series/${dicomJson['0020000E'].Value[0]}/instances/${dicomJson['00080018'].Value[0]}`
        }
        return {
            dicomJson: dicomJson,
            tempTagsValue: removedTagsDicomJson.tempTagsValue
        };
    } catch(e) {
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
            logger.error(`[STOW-RS] [The UID is not consist, request UID: (${req.params.studyID}, DICOM file UID: ${dataStudyId})]`);
            let failureMessage = {
                "00081197": {
                    vr: "US",
                    Value: ["43264"]
                }
            }
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
    }
    return result;
}


function getRetrieveUrl(req, uidObj) {
    let protocol = req.secure? "https" : "http";
    let url = `${protocol}://${req.headers.host}/${process.env.DICOMWEB_API}/studies`;

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
async function storeDICOMJsonToDB(uidObj, dicomJson) {
    try {
        _.merge(dicomJson, uidObj);
        let query = {
            "$and": [
                {
                    studyUID: uidObj.studyUID,
                },
                {
                    seriesUID: uidObj.seriesUID
                },
                {
                    instanceUID: uidObj.sopInstanceUID
                }
            ]
        }
        delete dicomJson.sopClass;
        delete dicomJson.sopInstanceUID;
        await dicomModel.findOneAndUpdate(query,  dicomJson, {
            upsert: true
        });
    } catch(e) {
        throw e;
    }
}
const _ = require("lodash");
const path = require("path");
const mongoose = require("mongoose");
const { MultipartWriter } = require("../../../../../utils/multipartWriter");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const flatten = require("flat");
/**
 *
 * @param {import("http").IncomingMessage} req
 * @return { string }
 */
function getAcceptType(req) {
    return req.headers.accept
        .match(/type=(.*)/gi)[0]
        .split(/[,;]/)[0]
        .substring(5)
        .replace(/"/g, "");
}

/**
 * Get path list of all study's instances with specific study UID
 * @param {Object} iParam
 * @return { Promise<import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[]> | undefined }
 */
async function getStudyImagesPath(iParam) {
    let { studyUID } = iParam;
    try {
        let query = [
            {
                $match: {
                    studyUID: studyUID
                }
            },
            {
                $group: {
                    _id: "$studyUID",
                    pathList: {
                        $addToSet: {
                            studyUID: "$studyUID",
                            seriesUID: "$seriesUID",
                            instanceUID: "$instanceUID",
                            instancePath: "$instancePath"
                        }
                    }
                }
            }
        ];
        let docs = await mongoose.model("dicom").aggregate(query).exec();
        let pathList = _.get(docs, "0.pathList", []);
        if (pathList.length > 0) {
            for (let i = 0; i < pathList.length; i++) {
                pathList[i].instancePath = path.join(
                    process.env.DICOM_STORE_ROOTPATH,
                    pathList[i].instancePath
                );
            }
            return pathList;
        }
        return undefined;
    } catch (e) {
        throw e;
    }
}

/**
 * Get path list of all study's series' instances with specific study UID
 * @param {Object} iParam
 * @return { Promise<import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[]> | undefined }
 * @returns
 */
async function getSeriesImagesPath(iParam) {
    let { studyUID, seriesUID } = iParam;
    try {
        let query = [
            {
                $match: {
                    $and: [
                        {
                            seriesUID: seriesUID
                        },
                        {
                            studyUID: studyUID
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: "$seriesUID",
                    pathList: {
                        $addToSet: {
                            studyUID: "$studyUID",
                            seriesUID: "$seriesUID",
                            instanceUID: "$instanceUID",
                            instancePath: "$instancePath"
                        }
                    }
                }
            }
        ];
        let docs = await mongoose.model("dicom").aggregate(query);
        let pathList = _.get(docs, "0.pathList", []);
        if (pathList.length > 0) {
            for (let i = 0; i < pathList.length; i++) {
                pathList[i].instancePath = path.join(
                    process.env.DICOM_STORE_ROOTPATH,
                    pathList[i].instancePath
                );
            }
            return pathList;
        }
        return undefined;
    } catch (e) {
        throw e;
    }
}

/**
 * Get path
 * @param {Object} iParam
 * @return { Promise<import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj> | undefined }
 */
async function getInstanceImagePath(iParam) {
    let { studyUID, seriesUID, instanceUID } = iParam;
    try {
        let query = {
                $and: [
                    {
                        studyUID: studyUID
                    },
                    {
                        seriesUID: seriesUID
                    },
                    {
                        instanceUID: instanceUID
                    }
                ]
        };
        let doc = await mongoose.model("dicom").findOne(query, {
            studyUID: 1,
            seriesUID: 1,
            instanceUID: 1,
            instancePath: 1
        }).exec();
        if (doc) {
            let docObj = doc.toObject();
            docObj.instancePath = path.join(
                process.env.DICOM_STORE_ROOTPATH,
                docObj.instancePath
            );
            return docObj;
        }
        return undefined;
    } catch (e) {
        throw e;
    }
}

const multipartFunc = {
    "application/dicom": {
        getStudyDICOMFiles: async (iParam, req, res, type) => {
            let imagesPath = await getStudyImagesPath(iParam);
            if (!imagesPath) return {
                status: false,
                code: 404,
                message: `not found, Study UID: ${iParam.studyUID}`
            };
            let multipartWriter = new MultipartWriter(imagesPath, res, req);
            return multipartWriter.writeDICOMFiles(type);
        },
        getSeriesDICOMFiles: async (iParam, req, res, type) => {
            let imagesPath = await getSeriesImagesPath(iParam);
            if (!imagesPath) return {
                status: false,
                code: 404,
                message: `not found, Series UID: ${iParam.seriesUID}, Study UID: ${iParam.studyUID}`
            };
            let multipartWriter = new MultipartWriter(imagesPath, res, req);
            return multipartWriter.writeDICOMFiles(type);
        },
        getInstanceDICOMFile: async (iParam, req, res, type) => {
            let imagePath = await getInstanceImagePath(iParam);
            if (!imagePath) return {
                status: false,
                code: 404,
                message: `not found, Instance UID: ${iParam.instanceUID}, Series UID: ${iParam.seriesUID}, Study UID: ${iParam.studyUID}`
            };
            let multipartWriter = new MultipartWriter([imagePath], res, req);
            return multipartWriter.writeDICOMFiles(type);
        }
    }
};

multipartFunc["application/octet-stream"] = {
    getStudyDICOMFiles: multipartFunc["application/dicom"]["getStudyDICOMFiles"],
    getSeriesDICOMFiles: multipartFunc["application/dicom"]["getSeriesDICOMFiles"],
    getInstanceDICOMFile: multipartFunc["application/dicom"]["getInstanceDICOMFile"]
};
const supportInstanceMultipartType = ["application/dicom", "application/octet-stream"];

/**
 * 
 * @param { import('http').ServerResponse } res 
 * @param { string } type 
 * @returns 
 */
function sendNotSupportedMediaType(res, type) {
    let errorMessage = errorResponse.getNotSupportedErrorMessage(`The type ${type} is not supported, server supported \`multipart/related; type="application/dicom"\`, \`multipart/related; type="application/octet-stream"\` and \`application/zip\``);
    res.writeHead(errorMessage.HttpStatus, {
        "Content-Type": "application/dicom+json" 
    });
    return res.end(JSON.stringify(errorMessage));
}

function addHostnameOfBulkDataUrl(metadata, req) {
    let flattenMetadata = flatten(metadata);
    let objKeys = Object.keys(flattenMetadata);
    let binaryTag = objKeys
    .filter(
        v => v.indexOf(".vr") > -1
    )
    .filter(
        v => {
            let value = _.get(flattenMetadata, v);
            return (value.indexOf("OB") > -1) || 
            (value.indexOf("OW") > -1);
        }
    )
    .map(
        v => v.substring(0 , v.lastIndexOf(".vr"))
    );

    let protocol = req.secure ? "https" : "http";
    for (let i = 0 ; i < binaryTag.length; i++) {
        let tag = binaryTag[i];
        let relativeUrl = flattenMetadata[`${tag}.BulkDataURI`];
        _.set(metadata, `${tag}.BulkDataURI`, `${protocol}://${req.headers.host}${relativeUrl}`);
    }
}

module.exports.getAcceptType = getAcceptType;
module.exports.getStudyImagesPath = getStudyImagesPath;
module.exports.getSeriesImagesPath = getSeriesImagesPath;
module.exports.getInstanceImagePath = getInstanceImagePath;
module.exports.multipartFunc = multipartFunc;
module.exports.supportInstanceMultipartType = supportInstanceMultipartType;
module.exports.sendNotSupportedMediaType = sendNotSupportedMediaType;
module.exports.addHostnameOfBulkDataUrl = addHostnameOfBulkDataUrl;

const _ = require("lodash");
const path = require("path");
const mongoose = require("mongoose");
const { MultipartWriter } = require("../../../../../utils/multipartWriter");
/**
 *
 * @param {import("http").IncomingMessage} req
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
        if (doc) return doc;
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
            let multipartWriter = new MultipartWriter(imagePath, res, req);
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

module.exports.getAcceptType = getAcceptType;
module.exports.getStudyImagesPath = getStudyImagesPath;
module.exports.getSeriesImagesPath = getSeriesImagesPath;
module.exports.getInstanceImagePath = getInstanceImagePath;
module.exports.multipartFunc = multipartFunc;
module.exports.supportInstanceMultipartType = supportInstanceMultipartType;

const _ = require("lodash");
const path = require("path");
const mongoose = require("mongoose");
const { MultipartWriter } = require("../../../../../utils/multipartWriter");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const flatten = require("flat");
const { raccoonConfig } = require("../../../../../config-class");
const {
    rootPath: dicomStoreRootPath
} = raccoonConfig.dicomWebConfig;


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

const multipartFunc = {
    "application/dicom": {
        getStudyDICOMFiles: async (iParam, req, res, type) => {
            let imagesPath = await mongoose.model("dicomStudy").getPathGroupOfInstances(iParam);
            if (imagesPath.length === 0) return {
                status: false,
                code: 404,
                message: `not found, Study UID: ${iParam.studyUID}`
            };
            let multipartWriter = new MultipartWriter(imagesPath, res, req);
            return multipartWriter.writeDICOMFiles(type);
        },
        getSeriesDICOMFiles: async (iParam, req, res, type) => {
            let imagesPath = await mongoose.model("dicomSeries").getPathGroupOfInstances(iParam);
            if (imagesPath.length === 0) return {
                status: false,
                code: 404,
                message: `not found, Series UID: ${iParam.seriesUID}, Study UID: ${iParam.studyUID}`
            };
            let multipartWriter = new MultipartWriter(imagesPath, res, req);
            return multipartWriter.writeDICOMFiles(type);
        },
        getInstanceDICOMFile: async (iParam, req, res, type) => {
            let imagePath = await mongoose.model("dicom").getPathGroupOfInstances(iParam);
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
        // Reset VR to UR, because BulkDataURI is URI
        _.set(metadata, `${tag}.vr`, "UR");
        _.set(metadata, `${tag}.BulkDataURI`, `${protocol}://${req.headers.host}${relativeUrl}`);
    }
}

module.exports.getAcceptType = getAcceptType;
module.exports.multipartFunc = multipartFunc;
module.exports.supportInstanceMultipartType = supportInstanceMultipartType;
module.exports.sendNotSupportedMediaType = sendNotSupportedMediaType;
module.exports.addHostnameOfBulkDataUrl = addHostnameOfBulkDataUrl;

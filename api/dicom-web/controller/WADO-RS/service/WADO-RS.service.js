const _ = require("lodash");
const path = require("path");
const fsP = require("fs/promises");
const mongoose = require("mongoose");
const { MultipartWriter } = require("../../../../../utils/multipartWriter");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { raccoonConfig } = require("../../../../../config-class");
const { JSONPath } = require("jsonpath-plus");
const { DicomWebService } = require("../../../service/dicom-web.service");
const dicomModel = require("../../../../../models/mongodb/models/dicom");
const { logger } = require("../../../../../utils/logs/log");

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

class ImageMultipartWriter {
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {typeof ImagePathFactory} imagePathFactory 
     * @param {typeof ContentTypeWriter} contentTypeWriter 
     */
    constructor(req, res, imagePathFactory, contentTypeWriter) {
        this.request = req;
        this.response = res;
        this.imagePathFactory = new imagePathFactory(req.params);
        this.contentTypeWriterClass = contentTypeWriter;
    }

    async write() {
        await this.imagePathFactory.getImagePaths();
        let checkAllImageExistResult = await this.imagePathFactory.checkAllImageExist();
        this.response.statusCode = checkAllImageExistResult.code;
        if (!checkAllImageExistResult.status) {
            this.response.setHeader("Content-Type", "application/dicom+json");
            return this.response.json(checkAllImageExistResult);
        }
        logger.info(`retrieve study's images: ${this.imagePathFactory.getPartialImagesPathString()}`);

        /** @type { ContentTypeWriter } */
        let contentTypeWriter = new this.contentTypeWriterClass(
            this.imagePathFactory.imagePaths,
            this.request,
            this.response
        );
        let writeResult = await contentTypeWriter.write();
        if (!writeResult.status) {
            this.response.setHeader("Content-Type", "application/dicom+json");
            return this.response.status(writeResult.code).json(writeResult);
        }

        return this.response.end();
    }
}


class ImagePathFactory {

    /**
     * 
     * @param {import("../../../../../utils/typeDef/dicom").Uids} uids 
     */
    constructor(uids) {
        /** @type { import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[] } */
        this.imagePaths = [];
        /** @type {Uids} */
        this.uids = uids;
    }

    async getImagePaths() { }

    async checkAllImageExist() {
        if (this.imagePaths.length === 0) {
            return {
                status: false,
                code: 404,
                message: `not found, ${this.getUidsString()}`
            };
        }

        let existArr = await this.getImageExistArray();
        if (existArr.every(v => v)) {
            return {
                status: true,
                code: 200
            };
        } else if (existArr.some(v => v)) {
            return {
                status: true,
                code: 206
            };
        } else {
            return {
                status: false,
                code: 410,
                message: "Images gone, but data exist"
            };
        }
    }

    async getImageExistArray() {
        /** @type {boolean[]} */
        let existArr = [];
        let imagePathsClone = _.cloneDeep(this.imagePaths);
        for (let i = 0; i < imagePathsClone.length; i++) {
            let imagePathObj = imagePathsClone[i];
            try {
                await fsP.access(imagePathObj.instancePath, fsP.constants.F_OK);
                existArr.push(true);
            } catch (e) {
                this.imagePaths.splice(i, 1);
                existArr.push(false);
            }
        }
        return existArr;
    }

    getUidsString() {
        let uidsKeys = Object.keys(this.uids);
        let strArr = [];
        for (let i = 0; i < uidsKeys.length; i++) {
            let key = uidsKeys[i];
            strArr.push(`${key}: ${this.uids[key]}`);
        }
        return strArr.join(", ");
    }

    getPartialImagesPathString() {
        return JSON.stringify(this.imagePaths.slice(0, 10).map(v => v.instancePath));
    }
}

class StudyImagePathFactory extends ImagePathFactory {
    constructor(uids) {
        super(uids);
    }

    async getImagePaths() {
        this.imagePaths = await mongoose.model("dicomStudy").getPathGroupOfInstances(this.uids);
    }
}

class SeriesImagePathFactory extends ImagePathFactory {
    constructor(uids) {
        super(uids);
    }

    async getImagePaths() {
        this.imagePaths = await mongoose.model("dicomSeries").getPathGroupOfInstances(this.uids);
    }
}

class InstanceImagePathFactory extends ImagePathFactory {
    constructor(uids) {
        super(uids);
    }

    async getImagePaths() {
        let imagePath = await dicomModel.getPathOfInstance(this.uids);

        if(imagePath)
            this.imagePaths = [imagePath];
        else
            this.imagePaths = [];
    }
}

class ContentTypeWriter {
    constructor(imagePaths, req, res) {
        this.imagePaths = imagePaths;
        this.request = req;
        this.response = res;
    }

    /**
     * For image pre-processing, such as converting to compressed bulk data (i.e. image/jpeg, image/dicom-rle, etc.)
     */
    async preprocess() { }

    async write() { }
}

class DicomTypeWriter extends ContentTypeWriter {
    constructor(imagePaths, req, res) {
        super(imagePaths, req, res);
    }

    async preprocess() { }

    async write() {
        let multipartWriter = new MultipartWriter(this.imagePaths, this.request, this.response);
        return await multipartWriter.writeDICOMFiles("application/dicom");
    }
}

const multipartContentTypeWriter = {
    "application/dicom": DicomTypeWriter,
    "application/octet-stream": DicomTypeWriter
};

const supportInstanceMultipartType = ["application/dicom", "application/octet-stream"];

/**
 * 
 * @param { import('express').Response } res 
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
    let dicomWebService = new DicomWebService(req, undefined);

    let urItems = JSONPath({
        path: "$..BulkDataURI",
        json: metadata,
        resultType: "all"
    });

    for (let urItem of urItems) {
        let bulkDataUriPath = JSONPath.toPathArray(urItem.path).join(".").substring(2);
        let relativeUrl = _.get(metadata, bulkDataUriPath);

        _.set(metadata, bulkDataUriPath, `${dicomWebService.getBasicURL()}${relativeUrl}`);
    }
}

module.exports.getAcceptType = getAcceptType;
module.exports.supportInstanceMultipartType = supportInstanceMultipartType;
module.exports.sendNotSupportedMediaType = sendNotSupportedMediaType;
module.exports.addHostnameOfBulkDataUrl = addHostnameOfBulkDataUrl;
module.exports.ImagePathFactory = ImagePathFactory;
module.exports.StudyImagePathFactory = StudyImagePathFactory;
module.exports.SeriesImagePathFactory = SeriesImagePathFactory;
module.exports.InstanceImagePathFactory = InstanceImagePathFactory;
module.exports.multipartContentTypeWriter = multipartContentTypeWriter;
module.exports.ImageMultipartWriter = ImageMultipartWriter;

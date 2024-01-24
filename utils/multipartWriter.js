const { logger } = require("../utils/logs/log");
const uuid = require("uuid");
const fs = require("fs");
const _ = require("lodash");
const { streamToBuffer } = require("@jorgeferrero/stream-to-buffer");
const { Dcm2JpgExecutor } = require("../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const { Dcm2JpgExecutor$Dcm2JpgOptions } = require("../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");
const { URL } = require("url");
const path = require("path");
const { raccoonConfig } = require("../config-class");
/**
 * @typedef {Object} ImagePathObj
 * @property {string} studyUID
 * @property {string} seriesUID
 * @property {string} instanceUID
 * @property {string} instancePath
 */

class MultipartWriter {
    /**
     *
     * @param {Array<ImagePathObj>} imagePathObjList The path list of the images
     * @param {import('express').Request} req
     * @param {import('express').Response} res The express response
     */
    constructor(imagePathObjList, req = {}, res) {
        this.BOUNDARY = `${uuid.v4()}-${uuid.v4()}-raccoon`;
        this.imagePathObjList = imagePathObjList;
        this.req = req;
        this.res = res;
    }

    /**
     * Write the boundary
     * @param {boolean} isFirst Do not write \r\n\r\n when start if true
     */
    async writeBoundary() {
        this.res.write(`--${this.BOUNDARY}\r\n`);
    }

    /**
     * Write final boundary
     */
    async writeFinalBoundary() {
        this.res.write(`--${this.BOUNDARY}--`);
    }
    /**
     * Write the content-type. <br/>
     * If have transferSyntax, write content-type and transfer-syntax.
     * @param {string} type
     * @param {string} transferSyntax
     */
    async writeContentType(type, transferSyntax = "") {
        if (transferSyntax) {
            this.res.write(
                `Content-Type: ${type};transfer-syntax=${transferSyntax}\r\n`
            );
        } else {
            this.res.write(`Content-Type: ${type}\r\n`);
        }
    }

    /**
     * Write the content-length
     * @param {number} length length of content
     */
    async writeContentLength(length) {
        this.res.write("Content-length: " + length + "\r\n");
    }

    async writeContentLocation(subPath = "") {
        let protocol = this.req.secure ? "https" : "http";
        if (subPath) {
            let urlObj = new URL(
                subPath,
                `${protocol}://${this.req.headers.host}`
            );
            this.res.write(`Content-Location: ${urlObj.href}\r\n`);
        } else {
            this.res.write(
                `Content-Location: ${protocol}://${this.req.headers.host}${this.req.originalUrl}\r\n`
            );
        }
    }

    /**
     * Write the buffer in response
     * @param {Buffer} buffer
     */
    async writeBufferData(buffer) {
        this.res.write("\r\n");
        this.res.write(buffer);
        this.res.write("\r\n");
    }

    /**
     * Set the content-type to "multipart/related; type=${type}; boundary=${boundary}"
     * @param {string} type the type of the whole content
     */
    async setHeaderMultipartRelatedContentType(type) {
        this.res.setHeader(
            "content-type",
            `multipart/related; type="${type}"; boundary=${this.BOUNDARY}`
        );
    }

    /**
     * Write the files of DICOM in multipart content
     * @param {string} type
     */
    async writeDICOMFiles(type) {
        try {
            if (this.imagePathObjList) {
                this.setHeaderMultipartRelatedContentType(type);
                for (let i = 0; i < this.imagePathObjList.length; i++) {
                    let { studyUID, seriesUID, instanceUID } = this.imagePathObjList[i];
                    let imagePath = this.imagePathObjList[i].instancePath;
                    let fileBuffer = await streamToBuffer(
                        fs.createReadStream(
                            imagePath
                        )
                    );
                    this.writeBoundary();
                    this.writeContentType(type);
                    this.writeContentLength(fileBuffer.length);
                    let instanceUrlPath = `/dicom-web/studies/${studyUID}/series/${seriesUID}/instances/${instanceUID}`;
                    this.writeContentLocation(instanceUrlPath);
                    this.writeBufferData(fileBuffer);
                }
                this.writeFinalBoundary();
                return {
                    status: true
                };
            }
            return {
                status: false
            };
        } catch (e) {
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            logger.error(errorStr);
            return {
                status: false,
                code: 500,
                message: errorStr
            };
        }
    }

    writeBuffer(buffer, headers) {
        try {
            this.writeBoundary();
            this.writeContentType(headers["Content-Type"]);
            this.writeContentLength(buffer.length);
            let bulkDataUrlPath = headers["Content-Location"];
            this.writeContentLocation(bulkDataUrlPath);
            this.writeBufferData(buffer);
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }
}

module.exports.MultipartWriter = MultipartWriter;

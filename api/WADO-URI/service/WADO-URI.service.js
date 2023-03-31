const mongoose = require("mongoose");
const fs = require("fs");
const _ = require("lodash");
const renderedService = require("../../dicom-web/controller/WADO-RS/service/rendered.service");
const { JsDcm2Jpeg } = require("../../../models/DICOM/dcm4che/Dcm2Jpeg");
const sharp = require('sharp');
const Magick = require("../../../models/magick");
const { NotFoundInstanceError, InvalidFrameNumberError } = require("../../../error/dicom-instance");

class WadoUriService {

    /**
     * 
     * @param {import("http").IncomingMessage} req 
     * @param {import("http").ServerResponse} res 
     */
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async getAndResponseDicomInstance() {
        try {

            let dicomInstanceReadStream = await this.getDicomInstanceReadStream();

            this.response.setHeader("Content-Type", "application/dicom");
            dicomInstanceReadStream.pipe(this.response);

        } catch (e) {

            if (e instanceof NotFoundInstanceError) {
                this.response.writeHead(204, {
                    "Content-Type": "application/dicom+json"
                });
                return this.response.end();
            }

            throw e;
        }
    }

    async getAndResponseJpeg() {
        try {

            let jpegBuffer = await this.handleRequestQueryAndGetJpeg();

            this.response.setHeader("Content-Type", "image/jpeg");

            this.response.end(jpegBuffer, "buffer");

        } catch (e) {

            if (e instanceof NotFoundInstanceError) {

                this.response.writeHead(204, {
                    "Content-Type": "application/dicom+json"
                });
                return this.response.end();

            } else if (e instanceof InvalidFrameNumberError) {

                this.response.writeHead(400, {
                    "Content-Type": "application/dicom+json"
                });

                return this.response.end(JSON.stringify({
                    Details: e.message,
                    HttpStatus: 400,
                    Message: "Bad request",
                    Method: "GET"
                }));

            }

            throw e;
        }
    }


    /**
     * @throws {NotFoundInstanceError}
     * @returns {Promise<fs.ReadStream>}
     */
    async getDicomInstanceReadStream() {

        let imagePathObj = await this.getDicomInstancePathObj();

        return fs.createReadStream(imagePathObj.instancePath);
    }

    async getDicomInstancePathObj() {
        let {
            studyUID,
            seriesUID,
            objectUID: instanceUID
        } = this.request.query;

        let imagePathObj = await mongoose.model("dicom").getPathOfInstance({
            studyUID,
            seriesUID,
            instanceUID
        });

        if (imagePathObj) {
            return imagePathObj;
        }

        throw new NotFoundInstanceError("Not found instance");
    }

    /**
     * Only for image/jpeg
     */
    async handleRequestQueryAndGetJpeg() {

        let {
            imageSharp,
            magick
        } = await this.handleFrameNumberAndGetImageObj();

        await this.handleImageQuality(magick);
        await this.handleRegion(this.request.query, imageSharp, magick);
        await this.handleRowsAndColumns(this.request.query, imageSharp, magick);
        await this.handleImageICCProfile(this.request.query, magick, this.request.query.objectUID);

        await magick.execCommand();

        return magick.toBuffer();
    }

    async handleFrameNumberAndGetImageObj() {
        let imagePathObj = await this.getDicomInstancePathObj();
        let instanceFramesObj = await renderedService.getInstanceFrameObj(imagePathObj, {
            "00281050": 1,
            "00281051": 1
        });
        let instanceTotalFrameNumber = _.get(instanceFramesObj, "00280008.Value.0", 1);
        let windowCenter = _.get(instanceFramesObj, "00281050.Value.0", "");
        let windowWidth = _.get(instanceFramesObj, "00281051.Value.0", "");

        let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
        let frameNumber = parseInt(_.get(this.request.query, "frameNumber", 1));

        if (frameNumber > instanceTotalFrameNumber) {
            throw new InvalidFrameNumberError(`Invalid Frame Number, total ${instanceTotalFrameNumber}, but requested ${frameNumber}`);
        }

        let otherOptions = {};

        if (windowCenter && windowWidth) {
            _.set(otherOptions, "windowCenter", windowCenter);
            _.set(otherOptions, "windowWidth", windowWidth);
        }

        let jsDcm2Jpeg = await new JsDcm2Jpeg({
            ...JsDcm2Jpeg.defaultOptions,
            ...otherOptions
        }).init();

        let getFrameImageStatus = await jsDcm2Jpeg.getFrameImage(instanceFramesObj.instancePath, frameNumber);

        if (getFrameImageStatus.status) {
            let imagePath = getFrameImageStatus.imagePath;

            return {
                imageSharp: sharp(imagePath),
                magick: new Magick(imagePath)
            };
        }

        throw new NotFoundInstanceError("Not found DICOM Instance's Jpeg, may convert error");
    }

    async handleImageQuality(magick) {
        renderedService.handleImageQuality({
            quality: _.get(this.request.query, "imageQuality", "")
        }, magick);
    }

    async handleRegion(param, imageSharp, magick) {
        if (param.region) {
            let [xMin, yMin, xMax, yMax] = param.region.split(",").map(v => parseFloat(v));
            let imageMetadata = await imageSharp.metadata();
            let imageWidth = imageMetadata.width;
            let imageHeight = imageMetadata.height;
            let extractLeft = imageWidth * xMin;
            let extractTop = imageHeight * yMin;
            let extractWidth = imageWidth * xMax - extractLeft;
            let extractHeight = imageHeight * yMax - extractTop;
            magick.crop(extractLeft, extractTop, extractWidth, extractHeight);
        }
    }

    async handleRowsAndColumns(param, imageSharp, magick) {
        let imageMetadata = await imageSharp.metadata();
        let rows = Number(param.rows);
        let columns = Number(param.columns);
        if (param.rows && param.columns) {
            magick.resize(rows, columns);
        } else if (param.rows) {
            magick.resize(rows, imageMetadata.height);
        } else if (param.columns) {
            magick.resize(imageMetadata.width, columns);
        }
    }

    async handleImageICCProfile(magick) {
        await renderedService.handleImageICCProfile(this.request.query, magick, this.request.query.objectUID);
    }

}

module.exports.WadoUriService = WadoUriService;
module.exports.NotFoundInstanceError = NotFoundInstanceError;
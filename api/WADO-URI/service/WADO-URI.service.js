const mongoose = require("mongoose");
const fs = require("fs");
const _ = require("lodash");
const { RenderedImageProcessParameterHandler, getInstanceFrameObj } = require("../../dicom-web/controller/WADO-RS/service/rendered.service");
const { Dcm2JpgExecutor } = require("../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const { Dcm2JpgExecutor$Dcm2JpgOptions } = require("../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");
const imageSizeOf = require("image-size");
const { promisify } = require("util");
const imageSizeOfPromise = promisify(imageSizeOf);
const Magick = require("../../../models/magick");
const { NotFoundInstanceError, InvalidFrameNumberError, InstanceGoneError } = require("../../../error/dicom-instance");
const { InstanceModel } = require("@dbModels/instance.model");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { DicomWebService } = require("@root/api/dicom-web/service/dicom-web.service");
const { ApiErrorArrayHandler } = require("@error/api-errors.handler");

class WadoUriService {

    /**
     * 
     * @param {import("http").IncomingMessage} req 
     * @param {import("http").ServerResponse} res 
     */
    constructor(req, res, apiLogger) {
        this.request = req;
        this.response = res;
        this.apiLogger = apiLogger;
        this.auditBeginTransferring();

        let clonedRequestQuery = _.cloneDeep(this.request?.query);
        _.set(clonedRequestQuery, "imageQuality", _.get(this.request.query, "imageQuality", ""));
        this.renderedImageProcessParameterHandler = new RenderedImageProcessParameterHandler(clonedRequestQuery);
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

        let imagePathObj = await InstanceModel.getPathOfInstance({
            studyUID,
            seriesUID,
            instanceUID
        });

        if (imagePathObj) {

            try {
                await fs.promises.access(imagePathObj.instancePath, fs.constants.F_OK);
            } catch (e) {
                console.error(e);
                throw new InstanceGoneError("The image is deleted permanently, but meta data remain");
            }

            return imagePathObj;
        }

        throw new NotFoundInstanceError("Not found instance");
    }

    /**
     * Only for image/jpeg
     */
    async handleRequestQueryAndGetJpeg() {

        let {
            imageSize,
            magick
        } = await this.handleFrameNumberAndGetImageObj();

        await this.handleImageQuality(magick);
        await this.handleRegion(this.request.query, imageSize, magick);
        await this.handleRowsAndColumns(this.request.query, imageSize, magick);
        await this.handleImageICCProfile(this.request.query, magick, this.request.query.objectUID);

        await magick.execCommand();

        return magick.toBuffer();
    }

    async handleFrameNumberAndGetImageObj() {
        let imagePathObj = await this.getDicomInstancePathObj();
        let instanceFramesObj = await getInstanceFrameObj(imagePathObj);
        let instanceTotalFrameNumber = _.get(instanceFramesObj, "00280008.Value.0", 1);
        let windowCenter = _.get(instanceFramesObj, "00281050.Value.0", "");
        let windowWidth = _.get(instanceFramesObj, "00281051.Value.0", "");

        let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
        let frameNumber = parseInt(_.get(this.request.query, "frameNumber", 1));

        if (frameNumber > instanceTotalFrameNumber) {
            throw new InvalidFrameNumberError(`Invalid Frame Number, total ${instanceTotalFrameNumber}, but requested ${frameNumber}`);
        }

        /** @type {Dcm2JpgExecutor$Dcm2JpgOptions} */
        let options = await Dcm2JpgExecutor$Dcm2JpgOptions.newInstanceAsync();
        options.frameNumber = frameNumber;

        if (windowCenter && windowWidth) {
            options.windowCenter = windowCenter;
            options.windowWidth = windowWidth;
        }

        let dicomFilename = instanceFramesObj.instancePath;
        let jpegFile = dicomFilename.replace(/\.dcm\b/gi, `.${frameNumber - 1}.jpg`);

        let getFrameImageStatus = await Dcm2JpgExecutor.convertDcmToJpgFromFilename(
            dicomFilename,
            jpegFile,
            options
        );

        if (getFrameImageStatus.status) {

            return {
                imageSize: await imageSizeOfPromise(jpegFile),
                magick: new Magick(jpegFile)
            };
        }

        throw new NotFoundInstanceError("Not found DICOM Instance's Jpeg, may convert error");
    }

    async handleImageQuality(magick) {
        this.renderedImageProcessParameterHandler.handleImageQuality(magick);
    }

    /**
     * 
     * @param {Object} param 
     * @param {string} param.region
     * @param {{height: number, width: number}} imageSize 
     * @param {Magick} magick 
     */
    async handleRegion(param, imageSize, magick) {
        if (param.region) {
            let [xMin, yMin, xMax, yMax] = param.region.split(",").map(v => parseFloat(v));
            let imageWidth = imageSize.width;
            let imageHeight = imageSize.height;
            let extractLeft = imageWidth * xMin;
            let extractTop = imageHeight * yMin;
            let extractWidth = imageWidth * xMax - extractLeft;
            let extractHeight = imageHeight * yMax - extractTop;
            magick.crop(extractLeft, extractTop, extractWidth, extractHeight);
        }
    }

    /**
     * 
     * @param {Object} param 
     * @param {string} param.rows
     * @param {string} param.columns
     * @param {{height: number, width: number}} imageSize 
     * @param {Magick} magick 
     */
    async handleRowsAndColumns(param, imageSize, magick) {
        let rows = Number(param.rows);
        let columns = Number(param.columns);
        if (param.rows && param.columns) {
            magick.resize(rows, columns);
        } else if (param.rows) {
            magick.resize(rows, imageSize.height);
        } else if (param.columns) {
            magick.resize(imageSize.width, columns);
        }
    }

    async handleImageICCProfile(magick) {
        await this.renderedImageProcessParameterHandler.handleImageICCProfile(magick, this.request.query.objectUID);
    }

    async auditBeginTransferring() {
        let auditManager = new AuditManager(
            EventType.RETRIEVE_BEGIN, EventOutcomeIndicator.Success,
            DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
            DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
        );

        let { studyUID } = this.request.query;
        auditManager.onBeginTransferringDicomInstances([studyUID]);
    }

    async auditInstanceTransferred(eventResult = EventOutcomeIndicator.Success) {
        let auditManager = new AuditManager(
            EventType.RETRIEVE_END, eventResult,
            DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
            DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
        );

        let { studyUID } = this.request.query;
        auditManager.onDicomInstancesTransferred([studyUID]);
    }
}

module.exports.WadoUriService = WadoUriService;
module.exports.NotFoundInstanceError = NotFoundInstanceError;
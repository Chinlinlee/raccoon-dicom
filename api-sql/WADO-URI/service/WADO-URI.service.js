const fs = require("fs");
const _ = require("lodash");
const renderedService = require("../../dicom-web/controller/WADO-RS/service/rendered.service");
const { Dcm2JpgExecutor } = require("@models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const { Dcm2JpgExecutor$Dcm2JpgOptions } = require("@models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");
const sharp = require('sharp');
const Magick = require("@models/magick");
const { NotFoundInstanceError, InvalidFrameNumberError, InstanceGoneError } = require("@error/dicom-instance");
const { WadoUriService } = require("@root/api/WADO-URI/service/WADO-URI.service");
const { InstanceModel } = require("@models/sql/models/instance.model");
const { ApiLogger } = require("@root/utils/logs/api-logger");
class SqlWadoUriService extends WadoUriService{

    /**
     * 
     * @param {import("http").IncomingMessage} req 
     * @param {import("http").ServerResponse} res 
     */
    constructor(req, res, apiLogger) {
        super(req, res);
        this.apiLogger = apiLogger;
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
            } catch(e) {
                console.error(e);
                throw new InstanceGoneError("The image is deleted permanently, but meta data remain");
            }

            return imagePathObj;
        }

        throw new NotFoundInstanceError("Not found instance");
    }

    async handleFrameNumberAndGetImageObj() {
        let imagePathObj = await this.getDicomInstancePathObj();
        let instanceFramesObj = await renderedService.getInstanceFrameObj(imagePathObj);
        let instanceTotalFrameNumber = _.get(instanceFramesObj, "x00280008") ? _.get(instanceFramesObj, "x00280008") : 1;

        let windowCenter = _.get(instanceFramesObj, "x00281050.0", "");
        let windowWidth = _.get(instanceFramesObj, "x00281051.0", "");

        let transferSyntax = _.get(instanceFramesObj, "x00020010");
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
        let jpegFile = dicomFilename.replace(/\.dcm\b/gi , `.${frameNumber-1}.jpg`);

        let getFrameImageStatus = await Dcm2JpgExecutor.convertDcmToJpgFromFilename(
            dicomFilename,
            jpegFile,
            options
        );

        if (getFrameImageStatus.status) {

            return {
                imageSharp: sharp(jpegFile),
                magick: new Magick(jpegFile)
            };
        }

        throw new NotFoundInstanceError("Not found DICOM Instance's Jpeg, may convert error");
    }

}

module.exports.WadoUriService = SqlWadoUriService;
module.exports.NotFoundInstanceError = NotFoundInstanceError;
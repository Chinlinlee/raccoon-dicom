const { 
    postProcessFrameImage,
    writeRenderedImages,
    writeSpecificFramesRenderedImages,
    RenderedImageMultipartWriter
} = require("@root/api/dicom-web/controller/WADO-RS/service/rendered.service");

const path = require("path");
const _ = require("lodash");
const { MultipartWriter } = require("@root/utils/multipartWriter");
const notImageSOPClass = require("@models/DICOM/dicomWEB/notImageSOPClass");
const errorResponse = require("@root/utils/errorResponse/errorResponseMessage");
const { logger } = require("@root/utils/logs/log");

const { raccoonConfig } = require("@root/config-class");
const { Op } = require("sequelize");
const { InstanceModel } = require("@models/sql/models/instance.model.js");

class FramesWriter {
    /**
     * 
     * @param {import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[]} imagePaths 
     */
    constructor(req, res, imagePaths) {
        this.request = req;
        this.response = res;
        this.imagePaths = imagePaths;
    }

    async write() {
        let multipartWriter = new MultipartWriter([], this.request, this.response);
        for (let imagePathObj of this.imagePaths) {
            let instanceFramesObj = await getInstanceFrameObj(imagePathObj);
            if (_.isUndefined(instanceFramesObj)) continue;
            let dicomNumberOfFrames = _.get(instanceFramesObj, "x00280008", 1);
            dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
            await writeRenderedImages(this.request, dicomNumberOfFrames, instanceFramesObj, multipartWriter);
        }
        multipartWriter.writeFinalBoundary();
    }
}

class StudyFramesWriter extends FramesWriter {
    /**
     * 
     * @param {import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[]} imagePaths 
     */
    constructor(req, res, imagePaths) {
        super(req, res, imagePaths);
    }
}

class SeriesFramesWriter extends FramesWriter {
    constructor(req, res, imagePaths) {
        super(req, res, imagePaths);
    }
}

class InstanceFramesWriter extends FramesWriter {
    constructor(req, res, imagePaths) {
        super(req, res, imagePaths);
    }

    async write() {
        let multipartWriter = new MultipartWriter([], this.request, this.response);
        let instanceFramesObj = await getInstanceFrameObj(this.imagePaths[0]);
        if (_.isUndefined(instanceFramesObj)) {
            return this.response.status(400).json(
                errorResponse.getBadRequestErrorMessage(`instance: ${this.request.params.instanceUID} doesn't have pixel data`)
            );
        }
        let dicomNumberOfFrames = _.get(instanceFramesObj, "x00280008", 1);
        dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
        await writeRenderedImages(this.request, dicomNumberOfFrames, instanceFramesObj, multipartWriter);
        multipartWriter.writeFinalBoundary();
    }
}

class InstanceFramesListWriter extends FramesWriter {
    constructor(req, res, imagePaths) {
        super(req, res, imagePaths);
        this.instanceFramesObj = {};
        this.dicomNumberOfFrames = 1;
    }

    async write() {
        let { frameNumber } = this.request.params;

        this.instanceFramesObj = await getInstanceFrameObj(this.imagePaths[0]);
        if (_.isUndefined(this.instanceFramesObj)) {
            return this.response.status(400).json(
                errorResponse.getBadRequestErrorMessage(`instance: ${this.request.params.instanceUID} doesn't have pixel data`)
            );
        }
        this.dicomNumberOfFrames = _.get(this.instanceFramesObj, "x00280008", 1);
        this.dicomNumberOfFrames = parseInt(this.dicomNumberOfFrames);

        if (this.isInvalidFrameNumber()) return;

        if (frameNumber.length == 1) {
            return this.writeSingleFrame();
        } else {
            let multipartWriter = new MultipartWriter([], this.request, this.response);
            await writeSpecificFramesRenderedImages(this.request, frameNumber, this.instanceFramesObj, multipartWriter);
            multipartWriter.writeFinalBoundary();
            return true;
        }
    }

    isInvalidFrameNumber() {
        for (let i = 0; i < this.request.params.frameNumber.length; i++) {
            let frame = this.request.params.frameNumber[i];
            if (frame > this.dicomNumberOfFrames) {
                let badRequestMessage = errorResponse.getBadRequestErrorMessage(`Bad frame number , \
This instance NumberOfFrames is : ${this.dicomNumberOfFrames} , But request ${JSON.stringify(this.request.params.frameNumber)}`);
                this.response.writeHead(badRequestMessage.HttpStatus, {
                    "Content-Type": "application/dicom+json"
                });

                let badRequestMessageStr = JSON.stringify(badRequestMessage);

                logger.warn(badRequestMessageStr);

                return this.response.end(JSON.stringify(badRequestMessageStr));
            }
        }
        return false;
    }

    async writeSingleFrame() {
        let postProcessResult = await postProcessFrameImage(this.request, this.request.params.frameNumber[0], this.instanceFramesObj);
        if (postProcessResult.status) {
            this.response.writeHead(200, {
                "Content-Type": "image/jpeg"
            });

            return postProcessResult.magick.toBuffer();
        }
        throw new Error(`Can not process this image, instanceUID: ${this.instanceFramesObj.instanceUID}, frameNumber: ${this.request.frameNumber[0]}`);
    }
}

/**
 * SQL 的彈性比較低，此 function 採與 MongoDB 相同呼叫方式，但在欄位設計上較死，otherFields 無用處
 * 
 * SQL has lower flexibility compared to MongoDB. 
 * This function adopts the same calling method as MongoDB, but it is more rigid in terms of field design. 
 * Note that otherFields is not used.
 * @param {Object} iParam 
 * @return { Promise<import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").InstanceFrameObj> | Promise<undefined> }
 */
async function getInstanceFrameObj(iParam, otherFields = {}) {
    let { studyUID, seriesUID, instanceUID } = iParam;
    try {
        /** @type { import("sequelize").FindOptions } */
        let query = {
            where: {
                x0020000D: studyUID,
                x0020000E: seriesUID,
                x00080018: instanceUID,
                x00080016: {
                    [Op.notIn]: notImageSOPClass
                }
            },
            attributes: [
                "instancePath",
                "x00020010",
                "x0020000D",
                "x0020000E",
                "x00080018",
                "x00280008",
                "x00281050",
                "x00281051"
            ]
        };

        let instance = await InstanceModel.findOne(query);
        if (instance) {
            let instanceJson = instance.toJSON();

            _.set(instanceJson, "studyUID", instanceJson.x0020000D);
            _.set(instanceJson, "seriesUID", instanceJson.x0020000E);
            _.set(instanceJson, "instanceUID", instanceJson.x00080018);
            _.set(instanceJson, "instancePath", path.join(
                raccoonConfig.dicomWebConfig.storeRootPath,
                instanceJson.instancePath
            ));

            return instanceJson;
        }

        return undefined;
    } catch (e) {
        throw e;
    }
}


module.exports.postProcessFrameImage = postProcessFrameImage;
module.exports.writeRenderedImages = writeRenderedImages;
module.exports.writeSpecificFramesRenderedImages = writeSpecificFramesRenderedImages;
module.exports.getInstanceFrameObj = getInstanceFrameObj;
module.exports.RenderedImageMultipartWriter = RenderedImageMultipartWriter;
module.exports.StudyFramesWriter = StudyFramesWriter;
module.exports.SeriesFramesWriter = SeriesFramesWriter;
module.exports.InstanceFramesWriter = InstanceFramesWriter;
module.exports.InstanceFramesListWriter = InstanceFramesListWriter;
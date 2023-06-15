const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");
const _ = require("lodash");
const { Dcm2JpgExecutor } = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor");
const { Dcm2JpgExecutor$Dcm2JpgOptions } = require("../../../../../models/DICOM/dcm4che/wrapper/org/github/chinlinlee/dcm2jpg/Dcm2JpgExecutor$Dcm2JpgOptions");
const { MultipartWriter } = require("../../../../../utils/multipartWriter");
const notImageSOPClass = require("../../../../../models/DICOM/dicomWEB/notImageSOPClass");
const Magick = require("../../../../../models/magick");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const { logger } = require("../../../../../utils/logs/log");

const { raccoonConfig } = require("../../../../../config-class");

/**
 * 
 * @param {*} param The req.query
 * @param {Magick} magick
 */
 function handleImageQuality(param, magick) {
    if (param.quality) {
        magick.quality(param.quality);
    }
}

/**
 *
 * @param {*} param The req.query
 * @param {Magick} magick
 * @param {string} instanceID
 */
 async function handleImageICCProfile(param, magick, instanceID) {
    let iccProfileAction = {
        "no" : async ()=> {},
        "yes": async ()=> {
            let iccProfileBinaryFile = await mongoose.model("dicomBulkData").findOne({
                $and: [
                    {
                        binaryValuePath: "00480105.Value.0.00282000.InlineBinary"
                    },
                    {
                        instanceUID: instanceID
                    }
                ]
            });
            if(!iccProfileBinaryFile) throw new Error("The Image dose not have icc profile tag");
            let iccProfileSrc = path.join(raccoonConfig.dicomWebConfig.storeRootPath, iccProfileBinaryFile.filename);
            let dest = path.join(raccoonConfig.dicomWebConfig.storeRootPath, iccProfileBinaryFile.filename + `.icc`);
            if (!fs.existsSync(dest)) fs.copyFileSync(iccProfileSrc, dest);
            magick.iccProfile(dest);
        },
        "srgb": async ()=> {
            magick.iccProfile(path.join(process.cwd(), "models/DICOM/dicomWEB/iccprofiles/sRGB.icc"));
        },
        "adobergb": async () => {
            magick.iccProfile(path.join(process.cwd(), "models/DICOM/dicomWEB/iccprofiles/adobeRGB.icc"));
        },
        "rommrgb": async ()=> {
            magick.iccProfile(path.join(process.cwd(), "models/DICOM/dicomWEB/iccprofiles/rommRGB.icc"));
        }
    };
    try {
        if (param.iccprofile) {
            await iccProfileAction[param.iccprofile]();
        }
    } catch(e) {
        console.error("set icc profile error:" , e);
        throw e;
    }
}

/**
 *
 * @param {*} param
 * @param {sharp.Sharp} imageSharp
 * @param {Magick} magick
 */
 async function handleViewport(param, imageSharp, magick) {
    if (param.viewport) {
        let imageMetadata = await imageSharp.metadata();
        let viewportSplit = param.viewport.split(",").map(v => Number(v));
        if (viewportSplit.length == 2) {
            let [vw, vh] = viewportSplit;
            magick.resize(vw, vh);
        } else {
            let [vw, vh, sx, sy, sw, sh] = viewportSplit;
            magick.resize(vw, vh);
            if (sw == 0) sw = imageMetadata.width - sx;
            if (sh == 0) sh = imageMetadata.height - sy;

            if (sw < 0) {
                magick.flip();
                sw = Math.abs(sw);
            }
            if (sh < 0) {
                magick.flop();
                sh = Math.abs(sw);
            }
            magick.crop(sx, sy, sw, sh);
        }
    }
}

class RenderedImageMultipartWriter {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {boolean} isMultiple
     * @param {typeof import('./WADO-RS.service.js').ImagePathFactory} imagePathFactory 
     * @param {typeof FramesWriter}
     */
    constructor(req, res, imagePathFactory, framesWriterClass) {
        /** @type {import('express').Request} */
        this.request = req;
        /** @type {import('express').Response} */
        this.response = res;
        /** @type {import('./WADO-RS.service.js').ImagePathFactory} */
        this.imagePathFactory = new imagePathFactory(req.params);
        /** @type {typeof FramesWriter} */
        this.framesWriterClass = framesWriterClass;
    }

    async write() {
        await this.imagePathFactory.getImagePaths();
        let checkAllImageExistResult = await this.imagePathFactory.checkAllImageExist();
        this.response.statusCode = checkAllImageExistResult.code;
        if (!checkAllImageExistResult.status) {
            this.response.setHeader("Content-Type", "application/dicom+json");
            return this.response.json(checkAllImageExistResult);
        }

        let framesWriter = new this.framesWriterClass(
            this.request,
            this.response,
            this.imagePathFactory.imagePaths
        );
        return await framesWriter.write();
    }
}

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
        for(let imagePathObj of this.imagePaths) {
            let instanceFramesObj = await getInstanceFrameObj(imagePathObj);
            if(_.isUndefined(instanceFramesObj)) continue;
            let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
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
        let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
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
        let {frameNumber} = this.request.params;

        this.instanceFramesObj = await getInstanceFrameObj(this.imagePaths[0]);
        if (_.isUndefined(this.instanceFramesObj)) {
            return this.response.status(400).json(
                errorResponse.getBadRequestErrorMessage(`instance: ${this.request.params.instanceUID} doesn't have pixel data`)
            );
        }
        this.dicomNumberOfFrames = _.get(this.instanceFramesObj, "00280008.Value.0", 1);
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
        for(let i = 0; i < this.request.params.frameNumber.length ; i++) {
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
 * 
 * @param {Object} iParam 
 * @return { Promise<import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").InstanceFrameObj> | Promise<undefined> }
 */
async function getInstanceFrameObj(iParam, otherFields={}) {
    let { studyUID, seriesUID, instanceUID } = iParam;
    try {
        /** @type { import("mongoose").FilterQuery<any> } */
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
                },
                {
                    "00080016.Value": {
                        $nin: notImageSOPClass
                    }
                }
            ]
        };
        let doc = await mongoose.model("dicom").findOne(query, {
            studyUID: 1,
            seriesUID: 1,
            instanceUID: 1,
            instancePath: 1,
            "00280008": 1, //number of frames
            "00020010": 1, //transfer syntax UID
            ...otherFields
        }).exec();
        if (doc) {
            let docObj = doc.toObject();
            docObj.instancePath = path.join(
                raccoonConfig.dicomWebConfig.storeRootPath,
                docObj.instancePath
            );
            return docObj;
        }
        return undefined;
    } catch (e) {
        throw e;
    }
}

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").InstanceFrameObj} instanceFramesObj 
 * @returns 
 */
async function postProcessFrameImage(req, frameNumber, instanceFramesObj) {
    try {

        let dicomFilename = instanceFramesObj.instancePath;
        let jpegFile = dicomFilename.replace(/\.dcm\b/gi , `.${frameNumber-1}.jpg`);

        let dcm2jpgOptions = await Dcm2JpgExecutor$Dcm2JpgOptions.newInstanceAsync();
        dcm2jpgOptions.frameNumber = frameNumber;
        let getFrameImageStatus = await Dcm2JpgExecutor.convertDcmToJpgFromFilename(
            dicomFilename,
            jpegFile,
            dcm2jpgOptions
        );

        if (getFrameImageStatus.status) {
            let imageSharp = sharp(jpegFile);
            let magick = new Magick(jpegFile);
            handleImageQuality(
                req.query,
                magick
            );
            await handleImageICCProfile(
                req.query,
                magick,
                instanceFramesObj.instanceUID
            );
            await handleViewport(
                req.query,
                imageSharp,
                magick
            );
            await magick.execCommand();
            return {
                status: true,
                message: "process successful",
                magick: magick
            };
        }
        return {
            status: false,
            message: "get frame image failed",
            magick: undefined
        };
    } catch(e) {
        console.error(e);
        return {
            status: false,
            message: e,
            magick: undefined
        };
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {number} dicomNumberOfFrames 
 * @param {import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj} instanceFramesObj 
 * @param {import("../../../../../utils/multipartWriter").MultipartWriter} multipartWriter 
 */
async function writeRenderedImages(req, dicomNumberOfFrames, instanceFramesObj, multipartWriter) {
    try {
        for (let i = 0 ; i < dicomNumberOfFrames; i++) {
            let postProcessResult = await postProcessFrameImage(req, i+1, instanceFramesObj);
            let buffer = postProcessResult.magick.toBuffer();
            multipartWriter.writeBuffer(buffer, {
                "Content-Type": "image/jpeg",
                "Content-Location": `/dicom-web/studies/${instanceFramesObj.studyUID}/series/${instanceFramesObj.seriesUID}/instances/${instanceFramesObj.instanceUID}/frames/${i+1}/rendered`
            });
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {number[]} frames
 * @param {import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj} instanceFramesObj 
 * @param {import("../../../../../utils/multipartWriter").MultipartWriter} multipartWriter 
 */
async function writeSpecificFramesRenderedImages(req, frames, instanceFramesObj, multipartWriter) {
    try {
        for (let i = 0 ; i < frames.length; i++) {
            let frameNumber = frames[i];
            let postProcessResult = await postProcessFrameImage(req, frameNumber, instanceFramesObj);
            let buffer = postProcessResult.magick.toBuffer();
            multipartWriter.writeBuffer(buffer, {
                "Content-Type": "image/jpeg",
                "Content-Location": `/dicom-web/studies/${instanceFramesObj.studyUID}/series/${instanceFramesObj.seriesUID}/instances/${instanceFramesObj.instanceUID}/frames/${i+1}/rendered`
            });
        }
    } catch(e) {
        console.error(e);
        throw e;
    }
}

module.exports.handleImageQuality = handleImageQuality;
module.exports.handleImageICCProfile = handleImageICCProfile;
module.exports.handleViewport = handleViewport;
module.exports.getInstanceFrameObj = getInstanceFrameObj;
module.exports.postProcessFrameImage = postProcessFrameImage;
module.exports.writeRenderedImages = writeRenderedImages;
module.exports.writeSpecificFramesRenderedImages = writeSpecificFramesRenderedImages;
module.exports.RenderedImageMultipartWriter = RenderedImageMultipartWriter;
module.exports.StudyFramesWriter = StudyFramesWriter;
module.exports.SeriesFramesWriter = SeriesFramesWriter;
module.exports.InstanceFramesWriter = InstanceFramesWriter;
module.exports.InstanceFramesListWriter = InstanceFramesListWriter;
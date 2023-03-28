const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");
const pythonService = require("../../../../../python");
const dcmtk = require("../../../../../models/DICOM/dcmtk");
const Magick = require("../../../../../models/magick");
const _ = require("lodash");

const { raccoonConfig } = require("../../../../../config-class");
const {
    rootPath: dicomStoreRootPath
} = raccoonConfig.dicomWebConfig;

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
            let iccProfileSrc = path.join(dicomStoreRootPath, iccProfileBinaryFile.filename);
            let dest = path.join(dicomStoreRootPath, iccProfileBinaryFile.filename + `.icc`);
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
/**
 * 
 * @param {Object} iParam 
 * @return { Promise<import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").InstanceFrameObj> | Promise<undefined> }
 */
async function getInstanceFrameObj(iParam) {
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
            instancePath: 1,
            "00280008": 1, //number of frames
            "00020010": 1 //transfer syntax UID
        }).exec();
        if (doc) {
            let docObj = doc.toObject();
            docObj.instancePath = path.join(
                dicomStoreRootPath,
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
 * @param {*} instanceFramesObj 
 * @param {string} transferSyntax 
 * @returns 
 */
async function postProcessFrameImage(req, frameNumber, instanceFramesObj, transferSyntax) {
    try {
        let getFrameImageStatus;
        if (dcmtk.dcmtkSupportTransferSyntax.includes(transferSyntax)) {
            getFrameImageStatus = await dcmtk.getFrameImage(
                instanceFramesObj.instancePath,
                frameNumber
            );
        } else {
            getFrameImageStatus = await pythonService.getFrameImage(
                instanceFramesObj.instancePath,
                frameNumber
            );
        }
        if (getFrameImageStatus.status) {
            let imagePath = getFrameImageStatus.imagePath;
            let imageSharp = sharp(imagePath);
            let magick = new Magick(imagePath);
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
            let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
            let postProcessResult = await postProcessFrameImage(req, i+1, instanceFramesObj, transferSyntax);
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
            let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
            let postProcessResult = await postProcessFrameImage(req, frameNumber, instanceFramesObj, transferSyntax);
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
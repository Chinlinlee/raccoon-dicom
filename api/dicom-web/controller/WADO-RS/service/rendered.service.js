const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");
const sharp = require("sharp");
const pythonService = require("../../../../../python");
const dcmtk = require("../../../../../models/DICOM/dcmtk");
const Magick = require("../../../../../models/magick");

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
            let iccProfileSrc = path.join(process.env.DICOM_STORE_ROOTPATH, iccProfileBinaryFile.filename);
            let dest = path.join(process.env.DICOM_STORE_ROOTPATH, iccProfileBinaryFile.filename + `.icc`);
            if (!fs.existsSync(dest)) fs.copyFileSync(iccProfileSrc, dest);
            magick.iccProfile(dest);
        },
        "srgb": async ()=> {
            magick.iccProfile(path.join(process.cwd(), "models/DICOMWeb/iccprofiles/sRGB.icc"));
        },
        "adobergb": async () => {
            magick.iccProfile(path.join(process.cwd(), "models/DICOMWeb/iccprofiles/adobeRGB.icc"));
        },
        "rommrgb": async ()=> {
            magick.iccProfile(path.join(process.cwd(), "models/DICOMWeb/iccprofiles/rommRGB.icc"));
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
 * @return { import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").InstanceFrameObj | undefined }
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
                process.env.DICOM_STORE_ROOTPATH,
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
async function postProcessFrameImage(req, instanceFramesObj, transferSyntax) {
    try {
        let getFrameImageStatus;
        if (dcmtk.dcmtkSupportTransferSyntax.includes(transferSyntax)) {
            getFrameImageStatus = await dcmtk.getFrameImage(
                instanceFramesObj.instancePath,
                req.params.frameNumber
            );
        } else {
            getFrameImageStatus = await pythonService.getFrameImage(
                instanceFramesObj.instancePath,
                req.params.frameNumber
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
                req.params.instanceUID
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

module.exports.handleImageQuality = handleImageQuality;
module.exports.handleImageICCProfile = handleImageICCProfile;
module.exports.handleViewport = handleViewport;
module.exports.getInstanceFrameObj = getInstanceFrameObj;
module.exports.postProcessFrameImage = postProcessFrameImage;
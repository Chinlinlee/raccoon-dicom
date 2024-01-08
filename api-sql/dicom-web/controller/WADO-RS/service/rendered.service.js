const { 
    RenderedImageProcessParameterHandler,
    writeRenderedImages,
    RenderedImageMultipartWriter,
    InstanceFramesWriter,
    InstanceFramesListWriter,
    getInstanceFrameObj,
    StudyFramesWriter,
    SeriesFramesWriter,
    postProcessFrameImage
} = require("@root/api/dicom-web/controller/WADO-RS/service/rendered.service");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const Magick = require("@models/magick");

const { raccoonConfig } = require("@root/config-class");
const { DicomBulkDataModel } = require("@models/sql/models/dicomBulkData.model");

/**
 *
 * @param {Magick} magick
 * @param {string} instanceID
 */
RenderedImageProcessParameterHandler.prototype.handleImageICCProfile = async function (magick, instanceID) {
    let iccProfileAction = {
        "no" : async ()=> {},
        "yes": async ()=> {
            let iccProfileBinaryFile = await DicomBulkDataModel.findOne({
                where: {
                    binaryValuePath: "00480105.Value.0.00282000.InlineBinary",
                    instanceUID: instanceID
                }
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
        if (this.params.iccprofile) {
            await iccProfileAction[this.params.iccprofile]();
        }
    } catch(e) {
        console.error("set icc profile error:" , e);
        throw e;
    }
};

module.exports.postProcessFrameImage = postProcessFrameImage;
module.exports.writeRenderedImages = writeRenderedImages;
module.exports.getInstanceFrameObj = getInstanceFrameObj;
module.exports.RenderedImageMultipartWriter = RenderedImageMultipartWriter;
module.exports.StudyFramesWriter = StudyFramesWriter;
module.exports.SeriesFramesWriter = SeriesFramesWriter;
module.exports.InstanceFramesWriter = InstanceFramesWriter;
module.exports.InstanceFramesListWriter = InstanceFramesListWriter;
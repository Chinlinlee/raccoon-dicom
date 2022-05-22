const _ = require("lodash");
const wadoService = require("./service/WADO-RS.service");
const renderedService = require("./service/rendered.service");
const { MultipartWriter } = require("../../../../utils/multipartWriter");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { logger } = require("../../../../utils/log");

/**
 * 
 * @param {import("http").incomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let headerAccept = _.get(req.headers, "accept", "");
    logger.info(`[WADO-RS] [Get study's rendered instances, study UID: ${req.params.studyUID}]`);
    if (!headerAccept == `multipart/related; type="image/jpeg"`) {
        let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow \`multipart/related; type="image/jpeg"\`, exception : ${headerAccept}`);
        res.writeHead(badRequestMessage.HttpStatus, {
            "Content-Type": "application/dicom+json"
        });
        return res.end(JSON.stringify(badRequestMessage));
    }
    
    try {
        let instancesInStudy = await wadoService.getStudyImagesPath(req.params);

        if (instancesInStudy) {
            let multipartWriter = new MultipartWriter([], res, req);
            
            for(let imagePathObj of instancesInStudy) {
                let instanceFramesObj = await renderedService.getInstanceFrameObj(imagePathObj);
                let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
                dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
                await writeStudyRenderedImages(req, dicomNumberOfFrames, instanceFramesObj, multipartWriter);
            }
            multipartWriter.writeFinalBoundary();
        }
        
        return res.end();
    } catch(e) {
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify(e));
    }
};

async function writeStudyRenderedImages(req, dicomNumberOfFrames, instanceFramesObj, multipartWriter) {
    try {
        for (let i = 0 ; i < dicomNumberOfFrames; i++) {
            let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
            _.set(req, "params.frameNumber", i+1);
            let postProcessResult = await renderedService.postProcessFrameImage(req, instanceFramesObj, transferSyntax);
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
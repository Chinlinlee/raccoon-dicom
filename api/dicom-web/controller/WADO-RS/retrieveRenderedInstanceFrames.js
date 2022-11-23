const _ = require("lodash");
const renderedService = require("./service/rendered.service");
const { MultipartWriter } = require("../../../../utils/multipartWriter");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { apiInfoLog, apiWarningLog } = require("../../../../utils/log");

/**
 * 
 * @param {import("http").incomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let {
        studyUID,
        seriesUID,
        instanceUID,
        frameNumber
    } = req.params;

    apiInfoLog("WADO-RS", req.originalUrl, `[Get study's series' rendered instances' frames, study UID: ${studyUID}, series UID: ${seriesUID}, instance UID: ${instanceUID}, frame: ${frameNumber}]`);

    let headerAccept = _.get(req.headers, "accept", "");
    if (!headerAccept.includes("*/*") && !headerAccept.includes("image/jpeg")) {
        let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow */* or image/jpeg , exception : ${headerAccept}`);
        res.writeHead(badRequestMessage.HttpStatus, {
            "Content-Type": "application/dicom+json"
        });
        return res.end(JSON.stringify(badRequestMessage));
    }

    try {
        let instanceFramesObj = await renderedService.getInstanceFrameObj(req.params);
        if (!instanceFramesObj) {
            res.writeHead(404, {
                "Content-Type": "application/dicom+json"
            });
            let notFoundMessage = errorResponse.getNotFoundErrorMessage(`Not Found Instance, Instance UID: ${
                instanceUID
            }, Series UID: ${
                seriesUID
            }, Study UID: ${
                studyUID
            }`);
            
            let notFoundMessageStr = JSON.stringify(notFoundMessage);

            apiWarningLog("WADO-RS", req.originalUrl, `[${notFoundMessageStr}]`);

            return res.end(notFoundMessageStr);
        }
        let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
        dicomNumberOfFrames = parseInt(dicomNumberOfFrames);

        for(let i = 0; i < frameNumber.length ; i++) {
            let frame = frameNumber[i];
            if (frame > dicomNumberOfFrames) {
                let badRequestMessage = errorResponse.getBadRequestErrorMessage(`Bad frame number , This instance NumberOfFrames is : ${dicomNumberOfFrames} , But request ${frameNumber}`);
                res.writeHead(badRequestMessage.HttpStatus, {
                    "Content-Type": "application/dicom+json"
                });

                let badRequestMessageStr = JSON.stringify(badRequestMessage);

                apiWarningLog("WADO-RS", req.originalUrl, badRequestMessageStr);

                return res.end(JSON.stringify(badRequestMessageStr));
            }
        }
        
        let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
        if (frameNumber.length == 1) {
            let postProcessResult = await renderedService.postProcessFrameImage(req, frameNumber[0], instanceFramesObj, transferSyntax);
            if (postProcessResult.status) {
                res.writeHead(200, {
                    "Content-Type": "image/jpeg"
                });

                apiInfoLog("WADO-RS", req.originalUrl, `[Get instance's frame successfully, instance UID: ${instanceUID}, frame number: ${frameNumber[0]}]`);
                return res.end(postProcessResult.magick.toBuffer(), "binary");
            }
            throw new Error(`Can not process this image, instanceUID: ${instanceFramesObj.instanceUID}, frameNumber: ${req.frameNumber[0]}`);
        } else {
            let multipartWriter = new MultipartWriter([], res, req);
            await renderedService.writeSpecificFramesRenderedImages(req, frameNumber, instanceFramesObj, multipartWriter);
            multipartWriter.writeFinalBoundary();

            apiInfoLog("WADO-RS", req.originalUrl, `[Get instance's frame successfully, instance UID: ${instanceUID}, frame numbers: ${frameNumber}]`);

            return res.end();
        }
    } catch(e) {
        console.error(e);
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify(e, Object.getOwnPropertyNames(e), 4), "utf8");
    }
};
const _ = require("lodash");
const renderedService = require("./service/rendered.service");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");

/**
 * 
 * @param {import("http").incomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
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
        let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
        dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
        if (req.params.frameNumber > dicomNumberOfFrames) {
            let badRequestMessage = errorResponse.getBadRequestErrorMessage(`Bad frame number , This instance NumberOfFrames is : ${dicomNumberOfFrames} , But request ${req.params.frameNumber}`);
            res.writeHead(badRequestMessage.HttpStatus, {
                "Content-Type": "application/dicom+json"
            });
            return res.end(JSON.stringify(badRequestMessage));
        }

        let transferSyntax = _.get(instanceFramesObj, "00020010.Value.0");
        let postProcessResult = await renderedService.postProcessFrameImage(req, instanceFramesObj, transferSyntax);
        if (postProcessResult.status) {
            res.writeHead(200, {
                "Content-Type": "image/jpeg"
            });
            return res.end(postProcessResult.magick.toBuffer(), "binary");
        }
    } catch(e) {
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify(e));
    }
};
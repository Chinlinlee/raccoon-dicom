const _ = require("lodash");
const wadoService = require("./service/WADO-RS.service");
const renderedService = require("./service/rendered.service");
const { MultipartWriter } = require("../../../../utils/multipartWriter");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { ApiLogger } = require("../../../../utils/logs/api-logger");

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 * @returns 
 */
module.exports = async function(req, res) {
    let apiLogger = new ApiLogger(req, "WADO-RS");
    let headerAccept = _.get(req.headers, "accept", "");

    apiLogger.info(`[Get study's series' rendered instances, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}]`);
    
    if (!headerAccept == `multipart/related; type="image/jpeg"`) {
        let badRequestMessage = errorResponse.getBadRequestErrorMessage(`header accept only allow \`multipart/related; type="image/jpeg"\`, exception : ${headerAccept}`);
        res.writeHead(badRequestMessage.HttpStatus, {
            "Content-Type": "application/dicom+json"
        });
        return res.end(JSON.stringify(badRequestMessage));
    }
    
    try {
        let imagePathObj = await wadoService.getInstanceImagePath(req.params);

        if (imagePathObj) {
            let multipartWriter = new MultipartWriter([], res, req);
            let instanceFramesObj = await renderedService.getInstanceFrameObj(imagePathObj);
            let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
            dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
            await renderedService.writeRenderedImages(req, dicomNumberOfFrames, instanceFramesObj, multipartWriter);
            multipartWriter.writeFinalBoundary();
        }

        apiLogger.info(`[Write Multipart Successfully, study's series' instances' rendered images, study UID: ${req.params.studyUID}, series UID: ${req.params.seriesUID}, instance UID: ${req.params.instanceUID}]`);
        return res.end();
    } catch(e) {
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        res.end(JSON.stringify(e));
    }
};

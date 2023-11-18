const renderedService = require("@rendered-service");
const _ = require("lodash");
const {
    ThumbnailService,
    StudyThumbnailFactory,
    SeriesThumbnailFactory,
    InstanceThumbnailFactory
} = require("@root/api/dicom-web/controller/WADO-RS/service/thumbnail.service");

ThumbnailService.prototype.getThumbnailByInstance = async function (instanceFramesObj) {
    let dicomNumberOfFrames = _.get(instanceFramesObj, "x00280008", 1);
    dicomNumberOfFrames = parseInt(dicomNumberOfFrames);
    let medianFrame = 1;
    if (dicomNumberOfFrames > 1) medianFrame = dicomNumberOfFrames >> 1;
    if (this.request.params.frameNumber) {
        medianFrame = this.request.params.frameNumber[0];
    }

    let postProcessResult = await renderedService.postProcessFrameImage(this.request, medianFrame, instanceFramesObj);
    if (postProcessResult.status) {
        this.response.writeHead(200, {
            "Content-Type": "image/jpeg"
        });
        this.apiLogger.logger.info(`Get instance's thumbnail successfully, instance UID: ${instanceFramesObj.instanceUID}`);
        return postProcessResult.magick.toBuffer();
    }
    return undefined;
};

module.exports.ThumbnailService = ThumbnailService;
module.exports.StudyThumbnailFactory = StudyThumbnailFactory;
module.exports.SeriesThumbnailFactory = SeriesThumbnailFactory;
module.exports.InstanceThumbnailFactory = InstanceThumbnailFactory;
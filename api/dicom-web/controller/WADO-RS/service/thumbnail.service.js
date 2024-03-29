const { InstanceModel } = require("@dbModels/instance.model");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const renderedService = require("@api/dicom-web/controller/WADO-RS/service/rendered.service");
const _ = require("lodash");
const { DicomWebService } = require("@api/dicom-web/service/dicom-web.service");
const { NotFoundInstanceError } = require("@error/dicom-instance");
class ThumbnailService {

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {typeof ThumbnailFactory} thumbnailFactory 
     */
    constructor(req, res, apiLogger, thumbnailFactory) {
        this.request = req;
        this.response = res;
        this.thumbnailFactory = new thumbnailFactory(this.request.params);
        this.apiLogger = apiLogger;
    }

    async getThumbnail() {
        if (!_.get(this.request, "query.viewport")) {
            _.set(this.request, "query.viewport", "100,100");
        }

        let instanceFramesObj = await this.thumbnailFactory.getThumbnailInstance();
        this.checkInstanceExists(instanceFramesObj);

        let thumbnail = await this.getThumbnailByInstance(instanceFramesObj);
        if (!thumbnail) {
            throw new Error(`Can not process this image, instanceUID: ${instanceFramesObj.instanceUID}`);
        }
        return thumbnail;
    }

    async getThumbnailByInstance(instanceFramesObj) {
        let dicomNumberOfFrames = _.get(instanceFramesObj, "00280008.Value.0", 1);
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
    }

    checkInstanceExists(instanceFramesObj) {
        if (!instanceFramesObj) {
            throw new NotFoundInstanceError(`Not Found, ${DicomWebService.getUidsString(this.thumbnailFactory.uids)}`);
        }
    }
}

class ThumbnailFactory {
    /**
     * 
     * @param {Pick<import("@root/utils/typeDef/dicom").DicomUid, "studyUID" | "seriesUID" | "instanceUID">} uids 
     */
    constructor(uids) {
        this.uids = uids;
    }

    async getThumbnailInstance() { }
}

class StudyThumbnailFactory extends ThumbnailFactory {
    constructor(uids) {
        super(uids);
    }

    /**
     * 
     * @param {Pick<import("@root/utils/typeDef/dicom").DicomUid, "studyUID" | "seriesUID" | "instanceUID">} uids 
     */
    async getThumbnailInstance() {
        let medianInstance = await InstanceModel.getInstanceOfMedianIndex({
            studyUID: this.uids.studyUID
        });
        if (!medianInstance) return undefined;

        let instanceFramesObj = await renderedService.getInstanceFrameObj({
            studyUID: this.uids.studyUID,
            seriesUID: medianInstance.seriesUID,
            instanceUID: medianInstance.instanceUID
        });

        return instanceFramesObj;
    }

}

class SeriesThumbnailFactory extends ThumbnailFactory {
    constructor(uids) {
        super(uids);
    }

    /**
     * 
     * @param {Pick<import("@root/utils/typeDef/dicom").DicomUid, "studyUID" | "seriesUID" | "instanceUID">} uids 
     */
    async getThumbnailInstance() {
        let medianInstance = await InstanceModel.getInstanceOfMedianIndex({
            studyUID: this.uids.studyUID,
            seriesUID: this.uids.seriesUID
        });
        if (!medianInstance) return undefined;

        let instanceFramesObj = await renderedService.getInstanceFrameObj({
            studyUID: this.uids.studyUID,
            seriesUID: this.uids.seriesUID,
            instanceUID: medianInstance.instanceUID
        });

        return instanceFramesObj;
    }

}

class InstanceThumbnailFactory extends ThumbnailFactory {
    constructor(uids) {
        super(uids);
    }

    /**
     * 
     * @param {Pick<import("@root/utils/typeDef/dicom").DicomUid, "studyUID" | "seriesUID" | "instanceUID">} uids 
     */
    async getThumbnailInstance() {
        let instanceFramesObj = await renderedService.getInstanceFrameObj({
            studyUID: this.uids.studyUID,
            seriesUID: this.uids.seriesUID,
            instanceUID: this.uids.instanceUID
        });

        return instanceFramesObj;
    }

}

module.exports.ThumbnailService = ThumbnailService;
module.exports.StudyThumbnailFactory = StudyThumbnailFactory;
module.exports.SeriesThumbnailFactory = SeriesThumbnailFactory;
module.exports.InstanceThumbnailFactory = InstanceThumbnailFactory;
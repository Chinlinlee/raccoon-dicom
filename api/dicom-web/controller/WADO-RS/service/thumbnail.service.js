const dicomModel = require("../../../../../models/mongodb/models/dicom");
const dicomSeriesModel = require("../../../../../models/mongodb/models/dicomSeries");
const errorResponse = require("../../../../../utils/errorResponse/errorResponseMessage");
const renderedService = require("../service/rendered.service");
const _ = require("lodash");
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

    async getThumbnailAndResponse() {
        if (!_.get(this.request, "query.viewport")) {
            _.set(this.request, "query.viewport", "100,100");
        }

        let instanceFramesObj = await this.thumbnailFactory.getThumbnailInstance();
        if (this.checkInstanceExists(instanceFramesObj)) {
            return;
        }

        let thumbnail = await this.getThumbnailByInstance(instanceFramesObj);
        if (thumbnail) {
            return this.response.end(thumbnail, "binary");
        }
        throw new Error(`Can not process this image, instanceUID: ${instanceFramesObj.instanceUID}`);
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
            this.response.writeHead(404, {
                "Content-Type": "application/dicom+json"
            });
            let notFoundMessage = errorResponse.getNotFoundErrorMessage(`Not Found, ${this.thumbnailFactory.getUidsString()}`);

            let notFoundMessageStr = JSON.stringify(notFoundMessage);

            this.apiLogger.logger.warn(`[${notFoundMessageStr}]`);

            return this.response.end(notFoundMessageStr);
        }
        return undefined;
    }
}

class ThumbnailFactory {
    /**
     * 
     * @param {import("../../../../../utils/typeDef/dicom").Uids} uids 
     */
    constructor(uids) {
        this.uids = uids;
    }

    async getThumbnailInstance() { }

    getUidsString() {
        let uidsKeys = Object.keys(this.uids);
        let strArr = [];
        for (let i = 0; i < uidsKeys.length; i++) {
            let key = uidsKeys[i];
            strArr.push(`${key}: ${this.uids[key]}`);
        }
        return strArr.join(", ");
    }
}

class StudyThumbnailFactory extends ThumbnailFactory {
    constructor(uids) {
        super(uids);
    }

    /**
     * 
     * @param {import("../../../../../utils/typeDef/dicom").Uids} uids 
     */
    async getThumbnailInstance() {
        let medianInstance = await dicomModel.getInstanceOfMedianIndex({
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
     * @param {import("../../../../../utils/typeDef/dicom").Uids} uids 
     */
    async getThumbnailInstance() {
        let medianInstance = await dicomModel.getInstanceOfMedianIndex({
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
     * @param {import("../../../../../utils/typeDef/dicom").Uids} uids 
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
const { Controller } = require("@root/api/controller.class");
const { RetrieveAuditService } = require("./service/retrieveAudit.service");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { WADOZip } = require("./service/WADOZip");
const { ApiLogger } = require("@root/utils/logs/api-logger");
const { sendNotSupportedMediaType, getAcceptType, supportInstanceMultipartType, ImageMultipartWriter, InstanceImagePathFactory, multipartContentTypeWriter, StudyImagePathFactory, SeriesImagePathFactory } = require("./service/WADO-RS.service");
const { ControllerErrorHandler } = require("@error/controller.handler");

class BaseRetrieveController extends Controller {
    constructor(req, res) {
        super(req, res);
        this.apiLogger = new ApiLogger(this.request, "WADO-RS");
        this.apiLogger.addTokenValue();
        this.zipResponseHandlerType = BaseZipResponseHandler;
        this.multipartResponseHandlerType = BaseMultipartRelatedResponseHandler;
    }

    logAction() {
        throw new Error("Not implemented.");
    }

    async mainProcess() {
        try {
            if (this.request.headers.accept.toLowerCase() === "application/zip") {
                return await this.responseZip();
            } else if (this.request.headers.accept.includes("multipart/related")) {
                return await this.responseMultipartRelated();
            } else if (this.request.headers.accept.includes("*")) {
                this.request.headers.accept = "multipart/related; type=\"application/dicom\"";
                return await this.responseMultipartRelated();
            }

            return sendNotSupportedMediaType(this.response, this.request.headers.accept);
        } catch (e) {
            return ControllerErrorHandler.raiseInternalServerError(e, this.apiLogger, this.response);
        }
    }

    async responseZip() {
        let zipResponseHandler = new this.zipResponseHandlerType(this.request, this.response);
        await zipResponseHandler.doResponse();
    }

    async responseMultipartRelated() {
        let multipartResponseHandler = new this.multipartResponseHandlerType(this.request, this.response);
        await multipartResponseHandler.doResponse();
    }
}


class BaseZipResponseHandler {
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.wadoZip = new WADOZip(this.request, this.response);
        this.zipGetter = this.wadoZip.getZipOfInstanceDICOMFile.bind(this.wadoZip);
    }

    async doResponse() {
        let retrieveAuditService = new RetrieveAuditService(this.request, this.request.params.studyUID, EventOutcomeIndicator.Success);

        await retrieveAuditService.onBeginRetrieve();

        let zipResult = await this.zipGetter();
        if (zipResult.status) {
            await retrieveAuditService.completedRetrieve();
            return this.response.end();
        } else {
            retrieveAuditService.eventResult = EventOutcomeIndicator.MajorFailure;
            await retrieveAuditService.completedRetrieve();
            this.response.writeHead(zipResult.code, {
                "Content-Type": "application/dicom+json"
            });
            return this.response.end(JSON.stringify(zipResult));
        }
    }
}

class StudyZipResponseHandler extends BaseZipResponseHandler {
    constructor(req, res) {
        super(req, res);
        this.zipGetter = this.wadoZip.getZipOfStudyDICOMFiles.bind(this.wadoZip);
    }
}

class SeriesZipResponseHandler extends BaseZipResponseHandler {
    constructor(req, res) {
        super(req, res);
        this.zipGetter = this.wadoZip.getZipOfSeriesDICOMFiles.bind(this.wadoZip);
    }
}

class InstanceZipResponseHandler extends BaseZipResponseHandler {
    constructor(req, res) {
        super(req, res);
        this.zipGetter = this.wadoZip.getZipOfInstanceDICOMFile.bind(this.wadoZip);
    }
}

class BaseMultipartRelatedResponseHandler {
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.imagePathFactoryType = StudyImagePathFactory;
    }

    async doResponse() {
        let type = getAcceptType(this.request);
        let isSupported = supportInstanceMultipartType.indexOf(type) > -1;
        if (!isSupported) {
            return sendNotSupportedMediaType(this.response, type);
        }

        let imageMultipartWriter = new ImageMultipartWriter(
            this.request,
            this.response,
            this.imagePathFactoryType ,
            multipartContentTypeWriter[type]
        );

        return await imageMultipartWriter.write();
    }
}

class StudyMultipartRelatedResponseHandler extends BaseMultipartRelatedResponseHandler {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactoryType = StudyImagePathFactory;
    }
}

class SeriesMultipartRelatedResponseHandler extends BaseMultipartRelatedResponseHandler {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactoryType = SeriesImagePathFactory;
    }
}

class InstanceMultipartRelatedResponseHandler extends BaseMultipartRelatedResponseHandler {
    constructor(req, res) {
        super(req, res);
        this.imagePathFactoryType = InstanceImagePathFactory;
    }
}

module.exports.BaseRetrieveController = BaseRetrieveController;
module.exports.StudyZipResponseHandler = StudyZipResponseHandler;
module.exports.SeriesZipResponseHandler = SeriesZipResponseHandler;
module.exports.InstanceZipResponseHandler = InstanceZipResponseHandler;
module.exports.StudyMultipartRelatedResponseHandler = StudyMultipartRelatedResponseHandler;
module.exports.SeriesMultipartRelatedResponseHandler = SeriesMultipartRelatedResponseHandler;
module.exports.InstanceMultipartRelatedResponseHandler = InstanceMultipartRelatedResponseHandler;
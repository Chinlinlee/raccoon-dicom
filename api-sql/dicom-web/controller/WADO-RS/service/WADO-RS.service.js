const { InstanceModel } = require("@models/sql/models/instance.model");
const { StudyModel } = require("@models/sql/models/study.model");
const { SeriesModel } = require("@models/sql/models/series.model");
const {
    getAcceptType,
    supportInstanceMultipartType,
    sendNotSupportedMediaType,
    addHostnameOfBulkDataUrl,
    multipartContentTypeWriter,
    ImageMultipartWriter,
    getUidsString,
    ImagePathFactory,
    StudyImagePathFactory,
    SeriesImagePathFactory,
    InstanceImagePathFactory
} = require("@root/api/dicom-web/controller/WADO-RS/service/WADO-RS.service");


StudyImagePathFactory.prototype.getImagePaths = async function () {
    this.imagePaths = await StudyModel.getPathGroupOfInstances(this.uids);
};

SeriesImagePathFactory.prototype.getImagePaths = async function () {
    this.imagePaths = await SeriesModel.getPathGroupOfInstances(this.uids);
};

InstanceImagePathFactory.prototype.getImagePaths = async function () {
    let imagePath = await InstanceModel.getPathOfInstance(this.uids);

        if (imagePath)
            this.imagePaths = [imagePath];
        else
            this.imagePaths = [];
};

module.exports.getAcceptType = getAcceptType;
module.exports.supportInstanceMultipartType = supportInstanceMultipartType;
module.exports.sendNotSupportedMediaType = sendNotSupportedMediaType;
module.exports.addHostnameOfBulkDataUrl = addHostnameOfBulkDataUrl;
module.exports.ImagePathFactory = ImagePathFactory;
module.exports.StudyImagePathFactory = StudyImagePathFactory;
module.exports.SeriesImagePathFactory = SeriesImagePathFactory;
module.exports.InstanceImagePathFactory = InstanceImagePathFactory;
module.exports.multipartContentTypeWriter = multipartContentTypeWriter;
module.exports.ImageMultipartWriter = ImageMultipartWriter;
module.exports.getUidsString = getUidsString;
const _ = require("lodash");
const fsP = require("fs/promises");
const { InstanceModel } = require("@models/sql/models/instance.model");
const { StudyModel } = require("@models/sql/models/study.model");
const { SeriesModel } = require("@models/sql/models/series.model");
const { 
    getAcceptType,
    supportInstanceMultipartType, 
    sendNotSupportedMediaType, 
    addHostnameOfBulkDataUrl, 
    multipartContentTypeWriter, 
    ImageMultipartWriter 
} = require("@root/api/dicom-web/controller/WADO-RS/service/WADO-RS.service");


class ImagePathFactory {

    /**
     * 
     * @param {import("../../../../../utils/typeDef/dicom").Uids} uids 
     */
    constructor(uids) {
        /** @type { import("../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj[] } */
        this.imagePaths = [];
        /** @type {Uids} */
        this.uids = uids;
    }

    async getImagePaths() { }

    async checkAllImageExist() {
        if (this.imagePaths.length === 0) {
            return {
                status: false,
                code: 404,
                message: `not found, ${this.getUidsString()}`
            };
        }

        let existArr = await this.getImageExistArray();
        if (existArr.every(v => v)) {
            return {
                status: true,
                code: 200
            };
        } else if (existArr.some(v => v)) {
            return {
                status: true,
                code: 206
            };
        } else {
            return {
                status: false,
                code: 410,
                message: "Images gone, but data exist"
            };
        }
    }

    async getImageExistArray() {
        /** @type {boolean[]} */
        let existArr = [];
        let imagePathsClone = _.cloneDeep(this.imagePaths);
        for (let i = 0; i < imagePathsClone.length; i++) {
            let imagePathObj = imagePathsClone[i];
            try {
                await fsP.access(imagePathObj.instancePath, fsP.constants.F_OK);
                existArr.push(true);
            } catch (e) {
                this.imagePaths.splice(i, 1);
                existArr.push(false);
            }
        }
        return existArr;
    }

    getUidsString() {
        let uidsKeys = Object.keys(this.uids);
        let strArr = [];
        for (let i = 0; i < uidsKeys.length; i++) {
            let key = uidsKeys[i];
            strArr.push(`${key}: ${this.uids[key]}`);
        }
        return strArr.join(", ");
    }

    getPartialImagesPathString() {
        return JSON.stringify(this.imagePaths.slice(0, 10).map(v => v.instancePath));
    }
}

class StudyImagePathFactory extends ImagePathFactory {
    constructor(uids) {
        super(uids);
    }

    async getImagePaths() {
        this.imagePaths = await StudyModel.getPathGroupOfInstances(this.uids);
    }
}

class SeriesImagePathFactory extends ImagePathFactory {
    constructor(uids) {
        super(uids);
    }

    async getImagePaths() {
        this.imagePaths = await SeriesModel.getPathGroupOfInstances(this.uids);
    }
}

class InstanceImagePathFactory extends ImagePathFactory {
    constructor(uids) {
        super(uids);
    }

    async getImagePaths() {
        let imagePath = await InstanceModel.getPathOfInstance(this.uids);

        if (imagePath)
            this.imagePaths = [imagePath];
        else
            this.imagePaths = [];
    }
}

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

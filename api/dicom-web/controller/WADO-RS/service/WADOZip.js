const fs = require("fs");
const path = require("path");
const { StudyModel } = require("@dbModels/study.model");
const { SeriesModel } = require("@dbModels/series.model");
const { InstanceModel } = require("@dbModels/instance.model");
const { SevenZip } = require("@root/utils/sevenZip");
const { v4: uuidV4 } = require("uuid");
class WADOZip {
    constructor(iReq, iRes) {
        this.requestParams = iReq.params;
        this.studyUID = this.requestParams.studyUID;
        this.seriesUID = this.requestParams.seriesUID;
        this.instanceUID = this.requestParams.instanceUID;
        this.res = iRes;

        /** @type { ZipFactory } */
        this.zipFactory = undefined;
    }

    setHeaders(uid) {
        this.res.attachment = `${uid}.zip`;
        this.res.setHeader('Content-Type', 'application/zip');
        this.res.setHeader('Content-Disposition', `attachment; filename=${uid}.zip`);
    }

    async getZipOfStudyDICOMFiles() {
        let imagesPathList = await StudyModel.getPathGroupOfInstances(this.requestParams);
        if (imagesPathList.length > 0) {
            this.zipFactory = StudyZipFactory;
            await this.#adjustImagesPathList(imagesPathList);
            let zipFile = await this.#getZipFile(imagesPathList);
            await this.#streamZipToResponse(zipFile);

            return {
                status: true,
                code: 200,
                message: "success"
            };
        }
        return {
            status: false,
            code: 404,
            message: `not found, Study UID: ${this.requestParams.studyUID}`
        };
    }

    async getZipOfSeriesDICOMFiles() {
        let imagesPathList = await SeriesModel.getPathGroupOfInstances(this.requestParams);
        if (imagesPathList.length > 0) {
            this.zipFactory = SeriesZipFactory;
            await this.#adjustImagesPathList(imagesPathList);
            let zipFile = await this.#getZipFile(imagesPathList);
            await this.#streamZipToResponse(zipFile);
            return {
                status: true,
                code: 200,
                message: "success"
            };
        }
        return {
            status: false,
            code: 404,
            message: `not found, Series UID: ${this.requestParams.seriesUID}, Study UID: ${this.requestParams.studyUID}`
        };
    }

    async getZipOfInstanceDICOMFile() {
        let imagePath = await InstanceModel.getPathOfInstance(this.requestParams);
        if (imagePath) {
            this.zipFactory = InstanceZipFactory;
            await this.#adjustImagesPathList([imagePath]);
            let zipFile = await this.#getZipFile([imagePath]);
            await this.#streamZipToResponse(zipFile);
            return {
                status: true,
                code: 200,
                message: "success"
            };
        }
        return {
            status: false,
            code: 404,
            message: `not found, Instance UID: ${this.requestParams.instanceUID}, Series UID: ${this.requestParams.seriesUID}, Study UID: ${this.requestParams.studyUID}`
        };
    }

    async #getZipFile(imagesPathList) {
        let randomFilename = uuidV4();
        this.setHeaders(randomFilename);

        let zipFile = path.join(__dirname, `../../../../../tempUploadFiles/${randomFilename}.zip`);
        await this.zipFactory.compressToZipFile(zipFile, imagesPathList);

        return zipFile;
    }

    /**
     * 
     * @param {string} zipFile 
     */
    async #streamZipToResponse(zipFile) {
        this.setHeaders(path.basename(zipFile, ".zip"));

        fs.createReadStream(zipFile).pipe(this.res);

        this.res.on("finish", () => {
            fs.unlink(zipFile, () => { });
        });
    }

    async #adjustImagesPathList(imagesPathList) {
        for (let i = 0; i < imagesPathList.length; i++) {
            let imagesPath = imagesPathList[i];
            let instancePathSplit = imagesPath.instancePath.split(/[\/|\\]/gm);
            let relativePath = instancePathSplit.slice(instancePathSplit.length - 3, instancePathSplit.length).join("/");
            imagesPath.relativePath = relativePath;
        }
    }
}

class ZipFactory {
    /**
     * 
     * @param {string} zipFile 
     * @param {import("@root/utils/typeDef/dicomImage").ImagePathObj[]} imagePaths 
     */
    static async compressToZipFile(zipFile, imagePaths) {
        throw new Error("Not implement");
    }
}

class StudyZipFactory extends ZipFactory {
    static async compressToZipFile(zipFile, imagePaths) {
        let sevenZip = new SevenZip("zip", undefined, zipFile);
        
        for (let i = 0; i < imagePaths.length; i++) {
            sevenZip.addCmd(imagePaths[i].relativePath);
        }

        sevenZip.overwrite("a");

        let instancePathSplit = imagePaths[0].instancePath.split(/[\/|\\]/gm);
        // Study Folder
        let cwd = path.resolve(instancePathSplit.slice(0, instancePathSplit.length - 3).join("/"));
        await sevenZip.pack({
            cwd
        });
    }
}

class SeriesZipFactory extends ZipFactory {
    static async compressToZipFile(zipFile, imagePaths) {
        return StudyZipFactory.compressToZipFile(zipFile, imagePaths);
    }
}

class InstanceZipFactory extends ZipFactory {
    static async compressToZipFile(zipFile, imagePaths) {
        let sevenZip = new SevenZip("zip", imagePaths[0].instancePath, zipFile);

        sevenZip.overwrite("a");
        await sevenZip.pack();
    }
}

module.exports.WADOZip = WADOZip;

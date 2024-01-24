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
    }

    setHeaders(uid) {
        this.res.attachment = `${uid}.zip`;
        this.res.setHeader('Content-Type', 'application/zip');
        this.res.setHeader('Content-Disposition', `attachment; filename=${uid}.zip`);
    }

    async getZipOfStudyDICOMFiles() {
        let imagesPathList = await StudyModel.getPathGroupOfInstances(this.requestParams);
        if (imagesPathList.length > 0) {
            await this.#streamZipToResponse(imagesPathList);

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
            await this.#streamZipToResponse(imagesPathList);
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
            await this.#streamZipToResponse([imagePath]);
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

    async #streamZipToResponse(imagesPathList) {
        let randomFilename = uuidV4();
        this.setHeaders(randomFilename);

        let zipFile = path.join(__dirname, `../../../../../tempUploadFiles/${randomFilename}.zip`);
        await ZipFactory.compressToZipFile(zipFile, imagesPathList);

        fs.createReadStream(zipFile).pipe(this.res);

        this.res.on("finish", () => {
            fs.unlink(zipFile, () => { });
        });
    }
}

class ZipFactory {
    static async compressToZipFile(zipFile, imagePaths) {
        let sevenZip = new SevenZip("zip", undefined, zipFile);

        for (let i = 0; i < imagePaths.length; i++) {
            sevenZip.addCmd(imagePaths[i].instancePath);
        }

        // prevent same filename
        if (imagePaths.length >= 2)
            sevenZip.useFullyQualifiedFilePaths();

        sevenZip.overwrite("a");
        await sevenZip.pack();
    }
}

module.exports.WADOZip = WADOZip;

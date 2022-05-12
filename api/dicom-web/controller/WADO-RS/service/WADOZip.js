const archiver = require("archiver");
const wadoService = require("./WADO-RS.service");
const path = require("path");

class WADOZip {
    constructor(iParam, iRes) {
        this.requestParams = iParam;
        this.studyUID = iParam.studyUID;
        this.seriesUID = iParam.seriesUID;
        this.instanceUID = iParam.instanceUID;
        this.res = iRes;
    }

    setHeaders(uid) {
        this.res.attachment = `${uid}.zip`;
        this.res.setHeader('Content-Type', 'application/zip');
        this.res.setHeader('Content-Disposition', `attachment; filename=${uid}.zip`);
    }

    async getZipOfStudyDICOMFiles() {
        let imagesPathList = await wadoService.getStudyImagesPath(this.requestParams);
        if (imagesPathList) {
            this.setHeaders(this.studyUID);
            
            let folders = [];
            for (let i = 0; i < imagesPathList.length; i++) {
                let imagesFolder = path.dirname(imagesPathList[i]);
                if (!folders.includes(imagesFolder)) {
                    folders.push(imagesFolder);
                }
            }
            return await toZip(this.res, folders);
        }
    }

    async getZipOfSeriesDICOMFiles() {
        let seriesPathList = await wadoService.getSeriesImagesPath(
            this.studyUID, 
            this.seriesUID
        );
        
    }
}

function toZip(res, folders=[]) {
    return new Promise((resolve)=> {
        let archive = archiver('zip', {
            gzip: true,
            zlib: { level: 9 } // Sets the compression level.
        });
        archive.on('error', function (err) {
            console.error(err);
            resolve({
                status: false,
                data: err
            });
        });
        archive.pipe(res);
        if (folders.length > 0) {
            for (let i = 0; i < folders.length; i++) {
                let folderName = path.basename(folders[i]);
                //archive.append(null, {name : folderName});
                archive.glob("*.dcm", {cwd: folders[i]}, {prefix: folderName});
            }
        }
        archive.finalize().then(()=> {
            resolve({
                status: true,
                data: "success"
            });
        });
    });
}

module.exports.WADOZip = WADOZip;

const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { DicomDir } = require("@models/DICOM/dcm4che/dicomdir");
const { InstanceModel } = require("@models/mongodb/models/instance.model");
const { BaseQueryService } = require("@root/api/dicom-web/service/base-query.service");
const { raccoonConfig } = require("@root/config-class");
const { SevenZip } = require("@root/utils/sevenZip");
const path = require("path");
const shortHash = require("shorthash2");
const { v4: uuidV4 } = require("uuid");

class GetDicomDirService extends BaseQueryService {
    constructor(req, res) {
        super(req, res);
    }

    async getDicomDirSevenZip() {
        let instanceFiles = await this.#getInstanceFiles();

        if (instanceFiles.length === 0) throw new DicomWebServiceError(DicomWebStatusCodes.ProcessingFailure, "No any instance found", 404);

        let dicomDirFilename = path.join(raccoonConfig.dicomWebConfig.storeRootPath, "DICOMDIR" + shortHash(uuidV4()));
        
        let relativePaths = [
            path.relative(raccoonConfig.dicomWebConfig.storeRootPath, dicomDirFilename)
        ];
        for(let file of instanceFiles) {
            let relativePath = path.relative(raccoonConfig.dicomWebConfig.storeRootPath, file.instancePath);
            relativePaths.push(relativePath);
        }

        let dicomDirInstance = new DicomDir(dicomDirFilename, ...instanceFiles.map(v=> v.instancePath));
        await dicomDirInstance.exec();

        await this.compressTo7zip(`${dicomDirFilename}.7z`, relativePaths);
        return `${dicomDirFilename}.7z`;
    }

    async #getInstanceFiles() {
        return await InstanceModel.getInstancePathsByQueryOpts({
            query: this.query,
            requestParams: this.request.params
        });
    }

    /**
     * 
     * @param {string} zipFile
     * @param {string[]} relativePaths 
     */
    async compressTo7zip(zipFile, relativePaths) {
        let sevenZip = new SevenZip("7z", undefined, zipFile);

        for(let i = 0 ; i < relativePaths.length ; i++) {
            sevenZip.addCmd(relativePaths[i]);
        }

        let cwd = path.normalize(raccoonConfig.dicomWebConfig.storeRootPath);
        await sevenZip.pack({
            cwd: cwd
        });
    }
}

module.exports.GetDicomDirService = GetDicomDirService;
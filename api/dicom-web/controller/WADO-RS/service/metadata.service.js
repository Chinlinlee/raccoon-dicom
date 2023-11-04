const path = require("path");
const fs = require("fs");
const fileExist = require("@root/utils/file/fileExist.js");
const { addHostnameOfBulkDataUrl } = require("./WADO-RS.service.js");

class MetadataService {
    /**
     * @param {import("express").Request} request
     * @param {typeof import('./WADO-RS.service.js').ImagePathFactory} imagePathFactory 
     */
    constructor(request, imagePathFactory) {
        this.request = request;
        this.imagePathFactory = new imagePathFactory(request.params);
    }

    /**
     * 
     * @returns 
     */
    async getMetadata() {
        let metadata = [];
        await this.imagePathFactory.getImagePaths();
        for (let imagePathObj of this.imagePathFactory.imagePaths) {
            let instanceDir = path.dirname(imagePathObj.instancePath);
            let metadataPath = path.join(instanceDir, `${imagePathObj.instanceUID}.metadata.json`);
            
            if (await fileExist(metadataPath)) {
                let metadataJsonStr = fs.readFileSync(metadataPath, { encoding: "utf-8" });
                let metadataJson = JSON.parse(metadataJsonStr);
                addHostnameOfBulkDataUrl(metadataJson, this.request);
                metadata.push(metadataJson);
            }
        }
        return metadata;
    }

}

module.exports.MetadataService = MetadataService;
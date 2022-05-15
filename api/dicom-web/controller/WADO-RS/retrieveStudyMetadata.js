const mongoose = require("mongoose");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const fileExist = require("../../../../utils/file/fileExist");
const wadoService = require("./service/WADO-RS.service");
const errorResponse = require("../../../../utils/errorResponse/errorResponseMessage");
const { logger } = require("../../../../utils/log");

/**
 * 
 * @param {import("http").IncomingMessage} req 
 * @param {import("http").ServerResponse} res 
 */
module.exports = async function(req, res) {
    logger.info(`[WADO-RS] [Get Study's Instances Metadata] [study UID: ${req.params.studyUID}]`);
    try {
        let responseMetadata = [];
        let imagesPathList = await wadoService.getStudyImagesPath(req.params);
        if (imagesPathList) {
            for (let imagePathObj of imagesPathList) {
                let instanceDir = path.dirname(imagePathObj.instancePath);
                let metadataPath = path.join(instanceDir, `${imagePathObj.instanceUID}.metadata.json`);
                if (await fileExist(metadataPath)) {
                    let metadataJsonStr = fs.readFileSync(metadataPath, { encoding: "utf-8" });
                    let metadataJson = JSON.parse(metadataJsonStr);
                    wadoService.addHostnameOfBulkDataUrl(metadataJson, req);
                    responseMetadata.push(metadataJson);
                }
            }
            res.writeHead(200, {
                "Content-Type": "application/dicom+json"
            });
            return res.end(JSON.stringify(responseMetadata));
        }
        res.writeHead(404);
        return res.end(JSON.stringify(
            errorResponse.getNotFoundErrorMessage(
                `Not found metadata of study UID: ${req.params.studyUID}`
            )
        ));
    } catch(e) {
        let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
        console.error(errorStr);
        res.writeHead(500, {
            "Content-Type": "application/dicom+json"
        });
        return res.end();
    }
};
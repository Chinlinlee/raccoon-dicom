const path = require("path");
const fs = require("fs");
const { DicomFhirService } = require("./dicom-fhir.service");
let pluginConfigFile = path.join(__dirname, "../config.template.js");

if (fs.existsSync(path.join(__dirname, "../config.js"))) pluginConfigFile = path.join(__dirname, "../config.js");

const { pluginsConfig } = require(pluginConfigFile);

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
module.exports = async function (req, res) {
    if (!pluginsConfig?.["syncToFhirServer-SQL"]?.enable) return;

    setImmediate(async () => {
        for (let i = 0; i < res.locals.storeInfos.length; i++) {
            /** @type { import("./storeInfo").StoreInfo } */
            let storeInfo = res.locals.storeInfos[i];
            let dicomFhirService = new DicomFhirService(req, storeInfo.dicomJsonModel);
            await dicomFhirService.initDicomFhirConverter();
            await dicomFhirService.postDicomToFhirServerAndStoreLog();
        }
    });

};
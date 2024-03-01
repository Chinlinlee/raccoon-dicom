const { app } = require("@root/app");
const fs = require("fs");
const path = require("path");
const { GetDicomDirService } = require("./getDicomDirService");

let pluginConfigFile = path.join(__dirname, "../config.template.js");
if (fs.existsSync(path.join(__dirname, "../config.js"))) pluginConfigFile = path.join(__dirname, "../config.js");

const { pluginsConfig } = require(pluginConfigFile);

app.get("/dicom-web/dicomdir", async (req, res) => {
    let getDicomDirService = new GetDicomDirService(req, res);

    let dicomDirSevenZipFilename = await getDicomDirService.getDicomDirSevenZip();
    return fs.createReadStream(dicomDirSevenZipFilename).pipe(res);
});

module.exports = [];
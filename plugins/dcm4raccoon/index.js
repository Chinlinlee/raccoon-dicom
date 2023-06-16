const path = require("path");
const fs = require("fs");
const { pluginsConfig } = require("@root/plugins/config");
const { runDCM } = require("./executeDcm");
const configData = pluginsConfig.dcm4raccoon;
const dicomFilePath = configData.storepath;

module.exports = function (req, res) {
};

if (configData.enable) {
    // Create folder for dicom files.
    if (!fs.existsSync(dicomFilePath)) {
        console.log(`[dcm4raccoon] File temp folder (${dicomFilePath}) not exist, creating.`);
        fs.mkdirSync(dicomFilePath);
    }
    fs.chmodSync(dicomFilePath, 0o777);

    let dcmQrScpConfigFilename = path.join(__dirname, "./dcmqrscp.cfg");
    let defaultDcmQrSCPConfigFilename = path.join(__dirname, "./dcmqrscp.example.cfg");
    if (!fs.existsSync(dcmQrScpConfigFilename)) {
        fs.copyFileSync(defaultDcmQrSCPConfigFilename, dcmQrScpConfigFilename);
    }

    let mongoConfigFilename = path.join(__dirname, "./dcmtk/dcmqrscpMongoConfig.cfg");
    let defaultMongoConfigFilename = path.join(__dirname, "./dcmtk/dcmqrscpMongoConfig.example.cfg");
    if (!fs.existsSync(mongoConfigFilename)) {
        fs.copyFileSync(defaultMongoConfigFilename, mongoConfigFilename);
    }

    // Start services.
    runDCM();
}
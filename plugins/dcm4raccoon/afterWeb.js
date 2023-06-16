const router = require("express").Router();
const { spawn } = require('node:child_process');
const { logger } = require("../../utils/log");
const fs = require('fs');
const path = require("path");
const { pluginsConfig } = require("../dcmqrscp4raccoon/Export/raccoon-dicom_plugin/config.js");
const configData = pluginsConfig.dcm4raccoon;

// Saving Files
router.post("/dicom-web/studies", afterStow);
router.post("/dicom-web/studies/:studyID", afterStow);

// deleting files
router.delete('/api/fhir/ImagingStudy/:studyID' , afterDelete);
router.delete('/api/fhir/ImagingStudy/:studyID/series/:seriesID' , afterDelete);
router.delete('/api/fhir/ImagingStudy/:studyID/series/:seriesID/instances/:instanceID' , afterDelete);

module.exports = router;

// storescu after web stow.
async function afterStow(req, res) {
    let storeResults = res.locals.storeInstanceResultList;
    for(let i = 0; i < storeResults.length; i++) {
        let filePathList = storeResults[i].storedFilesPath;
        console.log(filePathList);
        for(let j = 0; j < filePathList.length; j++) {
            // run storescu for each file
            let sourceFile = path.resolve(process.env.DICOM_STORE_ROOTPATH + filePathList[j].storeFullPath);
            let theFile = process.cwd() + "/temp/dcm4raccoon/" + path.basename(filePathList[j].storeFullPath);
            fs.renameSync(sourceFile, theFile);
            let storeResult = await storeSCU(theFile);
            if(storeResult == true) {
                logger.info(`[dcm4raccoon] Store Finished`);
                //return res.status(res.locals.retCode).send(res.locals.resMessage);
            }
            else {
                logger.error('[dcm4raccoon]/dicom-web/studies "STOW Api" err, ', "storescu failed.");
                //return res.status(500).send(errMsg);
            }
            fs.rmSync(theFile);
        }
    }
}

async function storeSCU(filePath) {
    return new Promise( (resolve,reject) => {
        console.log(filePath);
        const storeService = spawn(`./models/dcmtk/dcmtk-3.6.5-win64-dynamic/bin/storescu.exe`,["-aec","MYSTORESCP","127.0.0.1",configData.port,filePath]);
        storeService.on("spawn", (data) => { logger.info(`[dcm4raccoon] Storing Image ${filePath} from dicomweb to dimse.`); });
        storeService.on('error', (data) => { logger.info(`[dcm4raccoon] ${data}`); reject(false);});
        storeService.stdout.on('data', (data) => { logger.info(`[dcm4raccoon] ${data}`); });
        storeService.on("close", (data) => { logger.info(`[dcm4raccoon] Store Finished.`); resolve(true); });
    });
}

// delete the file link and file guide after deletion command from web.
function afterDelete(req, res) {
    let deletedFileList = res.locals.deletedFileList;
    logger.info(`[dcm4raccoon] These dicom files has been deleted:\n${deletedFileList}`);
    // get the dcm file from the file guide
    for(let i = 0; i < deletedFileList.length; i++) {
        let linkGuide = path.dirname(deletedFileList[i]) + "/" + path.basename(deletedFileList[i],path.extname(deletedFileList[i]))+".dcmfilename";
        if(fs.existsSync("./"+ linkGuide)) {
            // delete the dcm file
            let dcmFileName = fs.readFileSync("./"+linkGuide,"utf-8");
            logger.info(`[dcm4raccoon]Deleting dcm File:${dcmFileName}`);
            fs.unlinkSync(configData.storepath + "/" + dcmFileName);
            // we also need to delete the record in dcm database.
            // we can use a modified dcmqridx to do that.
            // dcmqridx -dbf relativeFilePath(in stored path) dirToStorepath
            // ex: dcmqridx -dbf ./plugins/dcm4raccoon/dicomFiles\CT_641351bf37ea4adb.dcm D:\Programming\Nodejs\raccoon_gitlab\plugins\dcm4raccoon\dicomFiles
            let dirName = path.dirname(configData.storepath) + "/" + path.basename(configData.storepath);
            let deletionProcess = spawn("./plugins/dcm4raccoon/dcmtk/dcmqridx.exe", ["-dbf",`${dirName}\\${dcmFileName}`,`${configData.storepath}`]);
            deletionProcess.stdout.on('data', (data) => { logger.info(`[dcm4raccoon] ${data}`); });
            // delete the guide
            logger.info(`[dcm4raccoon]Deleting link guide:${"./"+linkGuide}`);
            fs.rmSync("./"+linkGuide);
        }
    }
}
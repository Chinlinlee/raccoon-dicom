const fs = require('fs');
const path = require("path");
const uuid = require("uuid");
const request = require('request-compose').extend({
    Request: {
        multipart: require('request-multipart')
    }
}).client;
const { raccoonConfig } = require("../../config-class");
const { pluginsConfig } = require("../config");
const configData = pluginsConfig.dcm4raccoon;

const stowRSUrl = `http://${raccoonConfig.serverConfig.host}:${raccoonConfig.serverConfig.port}/${raccoonConfig.dicomWebConfig.apiPath}/studies`;
let tempDir = configData.storepath; // 建立隨機產生的暫存目錄

// 遞歸遍歷目錄下的所有Dicom文件，將它們移動到暫存目錄
function moveDicomFilesToTempDir(dirPath) {
    let fileList = readDirFiles(dirPath);
    for (let i = 0; i < fileList.length; i++) {
        const filePath = fileList[i];
        console.log(filePath);
        if (fs.existsSync(filePath)) {
            if (fs.statSync(filePath).isDirectory()) {
                moveDicomFilesToTempDir(filePath);
            } else {
                // 創建暫存目錄，如果不存在的話
                if (!fs.existsSync(tempDir)) {
                    console.log("creating folder:" + tempDir);
                    fs.mkdirSync(tempDir);
                }
                // 使用uuid模組生成唯一的檔名，然後將Dicom文件移動到暫存目錄中
                const newFileName = `${uuid.v4()}.dcm`;
                console.log("moving:" + filePath + "->" + newFileName);
                if (fs.existsSync(filePath)) {
                    fs.renameSync(filePath, path.join(tempDir, newFileName));
                }
            }
        }
    }
};

// 將資料夾所有檔案路徑產生一個陣列存放
function readDirFiles(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(readDirFiles(file));
        } else {
            /* Is a file */
            results.push(file);
        }
    });
    return results;
};

// 上傳Dicom文件到伺服器
async function uploadDicomFile(filePath) {
    const url = stowRSUrl; // 指定StowRS伺服器的URL
    console.log("Uploading:" + filePath);

    let stream = fs.createReadStream(filePath);

    let response = await request({
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "multipart/related; type=application/dicom"
        },
        multipart: [
            {
                "Content-Type": "application/dicom",
                "Content-Disposition": `attachment; filename="${path.basename(filePath)}"`,
                body: stream
            }
        ],
        timeout: 300000
    });
    return response;
}

// 上傳暫存目錄下的所有Dicom文件到伺服器
async function uploadDicomFilesInTempDir() {
    const files = await fs.promises.readdir(tempDir);
    for (const file of files) {
        const filePath = path.join(tempDir, file);
        try {
            if (file != "index.dat") {
                await uploadDicomFile(filePath); // 上傳Dicom文件到伺服器
                await fs.promises.unlink(filePath); // 刪除已上傳的Dicom文件
            }
        } catch (err) {
            console.error(`Error uploading file ${filePath}: ${err}`);
        }
    }
};

// 刪除暫存目錄及其中的所有文件
function deleteTempDir() {
    fs.readdir(tempDir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (file != "index.dat") {
                fs.unlink(path.join(tempDir, file), (err) => {
                    if (err) throw err;
                });
            }
        }
    });
};

module.exports.moveDicomFilesToTempDir = moveDicomFilesToTempDir;
module.exports.readDirFiles = readDirFiles;
module.exports.uploadDicomFilesInTempDir = uploadDicomFilesInTempDir;
module.exports.deleteTempDir = deleteTempDir;
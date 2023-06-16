/**
 * dcmqrscp service for raccoon.
 */
const fs = require('fs');
const path = require("path");
const { spawn } = require('node:child_process');
const { exec } = require('child_process');
const { moveDicomFilesToTempDir, uploadDicomFilesInTempDir, deleteTempDir } = require("./stowUploader");
const { raccoonConfig } = require("../../config-class");
const { pluginsConfig } = require("../config");
const configData = pluginsConfig.dcm4raccoon;
const dicomFilePath = configData.storepath;
const maxRetryTimes = 3;
let retryTimes = 0;
let isChecking = false;
let isShuttingDown = false;

module.exports.runDCM = async function () {
    executeDCM();
};

// 將dcmqrscp的MongoDB設定調整成與raccoon相同
function updateDcmqrscpMongoConfig() {
    let conn_string = `mongodb://${raccoonConfig.mongoDbConfig.hosts[0]}/?appname=dcmqrscp4raccoon`;
    let user = raccoonConfig.mongoDbConfig.user;
    let password = raccoonConfig.mongoDbConfig.password;
    if (user && password) {
        conn_string = `mongodb://${user}:${password}@${raccoonConfig.mongoDbConfig.hosts[0]}:${raccoonConfig.mongoDbConfig.ports[0]}/?appname=dcmqrscp4raccoon&authSource=${raccoonConfig.mongoDbConfig.authSource}`;
    }
    let mongoDB_name = `${raccoonConfig.mongoDbConfig.dbName}`;
    let collection_name = `dicom`;
    let DICOM_STORE_ROOTPATH = `${path.resolve(raccoonConfig.dicomWebConfig.storeRootPath)}`;
    let _w = `conn_string=${conn_string}
mongoDB_name=${mongoDB_name}
collection_name=${collection_name}
DICOM_STORE_ROOTPATH=${DICOM_STORE_ROOTPATH}`;
    fs.writeFileSync("./plugins/dcm4raccoon/dcmtk/dcmqrscpMongoConfig.cfg", _w);
}

// 等待sleep
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 每秒執行檢查是否資料夾內有檔案如果有就上傳
async function onEverySec() {
    // 執行程序
    isChecking = true;
    // 創建暫存目錄，如果不存在的話
    if (!fs.existsSync(dicomFilePath)) {
        console.log("creating folder:" + dicomFilePath);
        fs.mkdirSync(dicomFilePath);
    }
    await uploadDicomFilesInTempDir();
    // 刪除暫存目錄及其中的所有文件
    deleteTempDir();
    await sleep(1000);
    //console.log("one sec passed.");
    await onEverySec();
}
function checkProcessRunning(processName) {
    return new Promise((resolve, reject) => {
        let command = '';
        if (process.platform === 'win32') {
            command = `tasklist /FI "IMAGENAME eq ${processName}" /NH`;
        } else {
            command = `pgrep ${processName}`;
        }

        exec(command, (error, stdout) => {
            if (error) {
                if (process.platform === 'win32') {
                    reject(error);
                    return;
                } else {
                    resolve(false);
                }
            }

            const output = stdout.toString().trim();
            const isRunning = process.platform === 'win32' ? output.includes(processName) : output !== '';
            console.log("checkprocessoutput:" + output);
            resolve(isRunning);
        });
    });
}


let processName = '';
if (process.platform === 'win32') {
    processName = 'dcmqrscp.exe';
} else {
    processName = 'dcmqrscp';
}

async function cleanupDCM() {
    return checkProcessRunning(processName)
        .then((isRunning) => {
            if (isRunning) {
                console.log(`[dcm4raccoon] Closing ${processName}...`);
                return killProcess(processName);
            }
            else {
                console.log(`[dcm4raccoon] ${processName} is not running.`);
            }
        })
        .catch((error) => {
            console.error('[dcm4raccoon] Error:', error);
        });
}

async function executeDCM() {
    if (!isChecking) {
        onEverySec();
    }
    checkProcessRunning(processName)
        .then(async (isRunning) => {
            if (isRunning) {
                console.log(`[dcm4raccoon] ${processName} is running, killing it.`);
            }
            await cleanupDCM();
            // Start the dcmqrscp.
            console.log("[dcm4raccoon] Starting dcmqrscp.");
            updateDcmqrscpMongoConfig();
            let dcmService;
            if (process.platform === "win32") { // windows
                dcmService = spawn(`./plugins/dcm4raccoon/dcmtk/dcmqrscp.exe`, ["-c", path.resolve("./plugins/dcm4raccoon/dcmqrscp.cfg"), configData.port]);
            }
            else { // linux maybe?
                dcmService = spawn(`./plugins/dcm4raccoon/dcmtk/dcmqrscp`, ["-c", path.resolve("./plugins/dcm4raccoon/dcmqrscp.cfg"), configData.port]);
            }
            dcmService.on("spawn", (data) => onDCMStart(data));
            dcmService.stdout.on('data', (data) => onDCMOutput(data));
            dcmService.on("close", (data) => onDCMExit(data));
        })
        .catch((error) => {
            console.error('[dcm4raccoon] Error:', error);
        });

}

function onDCMStart(data) {
    console.log(`[dcm4raccoon] dcmqrscp has started!`);
}

function onDCMOutput(data) {
    if (data.toString().startsWith("E:")) {
        console.error(`[dcm4raccoon] ${data}`);
    }
}

function onDCMExit(data) {
    console.error(`[dcm4raccoon] Storescp exited, the message follows as below:\n${data}`);
    if (retryTimes < maxRetryTimes) {
        retryTimes += 1;
        if (!isShuttingDown) {
            console.log(`[dcm4raccoon] dcmqrscp exited, restarting.`);
            executeDCM();
        }
    }
    else {
        console.error(`[dcm4raccoon] Cannot Start dcmqrscp.`);
        process.exit(1);
    }
}

function killProcess(processName) {
    return new Promise((resolve, reject) => {
        let killCommand = '';
        if (process.platform === 'win32') {
            killCommand = `taskkill /F /IM ${processName}`;
        } else {
            killCommand = `pkill ${processName}`;
        }

        exec(killCommand, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stdout.toString().trim());
        });
    });
}



let rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("SIGINT", function () {
    process.emit("SIGINT");
});

process.on("SIGINT", async function () {
    console.log("\n[dcm4raccoon] Gracefully shutting down from SIGINT (Crtl-C)");
    isShuttingDown = true;
    await cleanupDCM();
    process.exit();
});
process.on("exit", async function () {
    console.log("[dcm4raccoon] Exiting");
    isShuttingDown = true;
    await cleanupDCM();
});

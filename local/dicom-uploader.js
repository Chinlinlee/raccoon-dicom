require("../models/mongodb");
const mongoose = require("mongoose");
const { StowRsService } = require("../api/dicom-web/controller/STOW-RS/service/stow-rs.service");
const { program } = require("commander");
const path = require("path");
const fs = require("fs");
const fsP = require("fs/promises");
const glob = require("glob");
const { greenBright } = require("colorette");

program.requiredOption("-i, --input <string>", "The input can be directory that contains DICOM files or a DICOM file that need to upload")
    .option("--resume <string>", "Resume from log file");
program.parse();

const options = program.opts();
const input = options.input;
const resumeFile = options.resume;

function getResumeFiles() {

    let logUploadedFiles = [];
    let successFiles = [];

    if (resumeFile && !fs.existsSync(resumeFile)) {
        console.error("resume file not exist");
        process.exit(1);
    } else if (fs.existsSync(resumeFile)) {
        let logInfo = JSON.parse(fs.readFileSync(resumeFile, "utf-8"));
        logUploadedFiles = logInfo.successFiles;
        successFiles = [...logUploadedFiles];
    }

    return {
        logUploadedFiles,
        successFiles
    };

}

async function storeInstance(filePath) {
    let stowRsService = new StowRsService({
        headers: {
            host: "fake-host"
        },
        params: {}
    }, { locals: {} }, []);

    /** @type {formidable.File} */
    let fileObj = {
        filepath: path.resolve(filePath),
        originalFilename: path.basename(filePath)
    };

    try {
        await stowRsService.storeInstance(fileObj);
    } catch (e) {
        throw e;
    }
}

async function storeFromDir(dir) {
    console.log(`Input Directory: ${dir}`);

    let {
        logUploadedFiles,
        successFiles
    } = getResumeFiles();
    let errorFiles = [];

    return new Promise((resolve, reject) => {
        glob("**/*.dcm", {
            cwd: dir
        }, async function (err, matches) {
            if (err) {
                console.error(err);
                process.exit(1);
            }

            for (let file of matches) {
                let fullFilename = path.join(dir, file);

                if (logUploadedFiles.includes(fullFilename))
                    continue;

                try {
                    await storeInstance(fullFilename);
                    console.log(`${greenBright("success:")} ` + fullFilename);
                    successFiles.push(fullFilename);
                } catch (e) {
                    console.error(e);
                    errorFiles.push(fullFilename);
                }
            }

            await fsP.writeFile(path.join(__dirname, "local-upload-log.json"), JSON.stringify({
                successFiles,
                errorFiles
            }, null, 4));

            return resolve();
        });
    });

}
async function main() {
    console.log(`input: ${input}`);
    try {
        let fileLstat = await fsP.lstat(input);
        if (fileLstat.isFile()) {
            await storeInstance(input);
        } else if (fileLstat.isDirectory()) {
            await storeFromDir(input);
        }
        process.exit();
    } catch (e) {
        console.error(e);
        throw e;
    }
}

(async () => {
    await main();
})();

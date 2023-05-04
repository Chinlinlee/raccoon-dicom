const path = require("path");
const fs = require("fs");
const fsP = require("fs/promises");
const glob = require("glob");
const request = require('request-compose').extend({
    Request: {
        multipart: require('request-multipart')
    }
}).client;
const {
    greenBright
} = require("colorette");
const { program } = require("commander");

program.requiredOption("-i, --input <string>", "The input can be directory that contains DICOM files or a DICOM file that need to upload")
    .requiredOption("-u, --url <string>", "STOW-RS URL", "http://127.0.0.1:8081/dicom-web/studies")
    .option("--resume <string>", "Resume from log file");
program.parse();

const options = program.opts();
const STOW_URL = options.url;
const resumeFile = options.resume;
const input = options.input;


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

async function storeInstance(filename, stowUrl) {
    console.log(`upload ${filename}`);
    let stream = fs.createReadStream(filename);

    let response = await request({
        method: "POST",
        url: stowUrl,
        headers: {
            "Content-Type": "multipart/related; type=application/dicom"
        },
        multipart: [
            {
                "Content-Type": "application/dicom",
                "Content-Disposition": `attachment; filename="${path.basename(filename)}"`,
                body: stream
            }
        ],
        timeout: 300000
    });
    return response;
}

async function storeFromDir(dir) {
    console.log(`Input Directory: ${dir}`);

    let {
        logUploadedFiles,
        successFiles
    } = getResumeFiles();
    let errorFiles = [];

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
                let response = await storeInstance(fullFilename, STOW_URL);
                let statusCode = response.res.statusCode;
                if (statusCode === 200) {
                    console.log(`${greenBright("success:")} ` + fullFilename);
                    successFiles.push(fullFilename);
                } else {
                    console.error("error: " + response.body.result);
                    errorFiles.push(fullFilename);
                }

            } catch (e) {
                console.error(e);
            }
        }

        fs.writeFileSync(path.join(__dirname, "local-upload-wado-log.json"), JSON.stringify({
            successFiles,
            errorFiles
        }, null, 4));

    });
}

async function main() {

    let fileLstat = await fsP.lstat(input);

    if (fileLstat.isFile()) {
        let response = await storeInstance(input, STOW_URL);
        let statusCode = response.res.statusCode;
        if (statusCode !== 200) {
            console.error("error: " + response.body.result);
            process.exit(1);
        } else {
            console.log(`upload successful: ${input}`);
        }
    } else if (fileLstat.isDirectory()) {
        await storeFromDir(input);
    }
}

(async () => {
    await main();
})();

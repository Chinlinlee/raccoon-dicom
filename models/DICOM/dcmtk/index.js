const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const iconv = require("iconv-lite");

const dcmtkSupportTransferSyntax = [
    "1.2.840.10008.1.2",
    "1.2.840.10008.1.2.1",
    "1.2.840.10008.1.2.1.99",
    "1.2.840.10008.1.2.2",
    "1.2.840.10008.1.2.4.50",
    "1.2.840.10008.1.2.4.51",
    "1.2.840.10008.1.2.4.53",
    "1.2.840.10008.1.2.4.55",
    "1.2.840.10008.1.2.4.57",
    "1.2.840.10008.1.2.4.70",
    "1.2.840.10008.1.2.5"
];

const { dcm2json } = require("dicom-to-json");
const dcm2jsonV8 = {
    exec: function (dcmfile) {
        return new Promise((resolve) => {
            try {
                dcm2json(dcmfile, function (data) {
                    data = data.replace(/,\\u0000/g, "");
                    data = data.replace(/\\u0000/g, "");
                    let obj = JSON.parse(data);
                    return resolve(obj);
                });
            } catch (e) {
                console.error(e);
                return resolve(false);
            }
        });
    },
    dcmString: function (json, tag) {
        let data = _.get(json, tag);
        //console.log("d" , data);
        let value = _.get(data, "Value.0");
        //console.log(value);
        return value;
    }
};

async function dcm2jpegCustomCmd(execCmd) {
    return new Promise((resolve, reject) => {
        let [dcmtk, ...cmd] = execCmd.split(" ");
        if (process.env.OS == "windows") dcmtk = path.resolve(dcmtk);
        let dcm2jpegSpawn = child_process.spawn(dcmtk, cmd, {
            cwd: process.cwd(),
            shell: true
        });

        dcm2jpegSpawn.stdout.on("data", function (data) {
            if (data) console.log(data);
            resolve(data);
        });

        dcm2jpegSpawn.on("close", function () {
            resolve(true);
        });

        dcm2jpegSpawn.stderr.on("data", function (stderr) {
            stderr = iconv.decode(stderr, "cp950");
            console.error(stderr);
            reject(new Error(stderr));
        });
    });
}

module.exports = {
    dcm2jsonV8: dcm2jsonV8,
    dcmtkSupportTransferSyntax: dcmtkSupportTransferSyntax,
    dcm2jpegCustomCmd: dcm2jpegCustomCmd
};

const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const iconv = require("iconv-lite");

const dcm2jsonV8 = {
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
    dcm2jsonV8: dcm2jsonV8
};

const { pluginsConfig } = require("../config");
const app = require("../../api/dicom-web/index");

module.exports = function(req, res) {

    console.log(req);

    console.log(res);

    console.log("hello world!");

    return res.end(JSON.stringify({
        message: "hello world"
    }));
};
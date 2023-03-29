const java = require('java-bridge');
const glob = require("glob");
const path = require("path");

java.ensureJvm();

let jarFiles = glob.sync("**/*.jar", {
    cwd: path.join(__dirname, "./javaNode"),
    absolute: true
});

java.appendClasspath(jarFiles);

module.exports.java = java;
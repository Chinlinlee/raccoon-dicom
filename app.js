// const mongodb = require("./models/mongodb/index");
require("./plugins/sql/init");
const express = require("express");
const { createServer } = require("http");
const app = express();
module.exports.app = app;
module.exports.server = createServer(app);

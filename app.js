// const mongodb = require("./models/mongodb/index");
require("./models/sql/init").then(()=> console.log("Sequelize initialized"));
const express = require("express");
const { createServer } = require("http");
const app = express();
module.exports.app = app;
module.exports.server = createServer(app);

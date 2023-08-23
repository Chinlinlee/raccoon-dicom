const myMongoDB = require("./connector")();
require("./deleteSchedule");
module.exports = myMongoDB;

const { app } = require('../../app');

//#region QIDO-RS

app.get("/studies" , require("./controller/QIDO-RS/queryAllStudies"));
app.get("/studies/:studyUID/series", require("./controller/QIDO-RS/queryStudies-Series"));
app.get("/studies/:studyUID/series/:seriesUID/instances", require("./controller/QIDO-RS/queryStudies-Series-Instance"));

//#endregion

//#region STOW-RS

app.post("/studies", require("./controller/STOW-RS/storeInstance"));

//#endregion

module.exports = app;
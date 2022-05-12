const { app } = require("../../app");

//#region QIDO-RS

app.get("/studies", require("./controller/QIDO-RS/queryAllStudies"));
app.get(
    "/studies/:studyUID/series",
    require("./controller/QIDO-RS/queryStudies-Series")
);
app.get(
    "/studies/:studyUID/instances",
    require("./controller/QIDO-RS/queryStudies-Instances")
);
app.get(
    "/studies/:studyUID/series/:seriesUID/instances",
    require("./controller/QIDO-RS/queryStudies-Series-Instance")
);
app.get(
    "/series",
    require("./controller/QIDO-RS/queryAllSeries")
);
app.get(
    "/instances",
    require("./controller/QIDO-RS/queryAllInstances")
);

//#endregion

//#region STOW-RS

app.post("/studies", require("./controller/STOW-RS/storeInstance"));

//#endregion

//#region WADO-RS

app.get(
    "/studies/:studyUID",
    require("./controller/WADO-RS/retrieveStudyInstances")
);

//#endregion

module.exports = app;

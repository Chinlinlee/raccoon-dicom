const { app } = require('../../app');

//#region QIDO-RS

app.get('/studies' , require('./controller/QIDO-RS/queryAllStudies'));

//#endregion

//#region STOW-RS

app.post("/studies", require("./controller/STOW-RS/storeInstance"));

//#endregion

module.exports = app;
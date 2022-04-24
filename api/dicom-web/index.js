const { app } = require('../../app');

app.post("/studies", require("./controller/STOW-RS/storeInstance"));

module.exports = app;
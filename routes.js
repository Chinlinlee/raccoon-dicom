module.exports = function(app) {
    app.use("/dicom-web", require("./api/dicom-web"));
}
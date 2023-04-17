const { Plugin, pluginGroup } = require("./plugins/plugin.class");
const { pluginsConfig } = require("./plugins/config");

function loadAllPlugin() {
    for (let pluginName in pluginsConfig) {
        let plugin = new Plugin(pluginName, pluginsConfig[pluginName]);
        plugin.load();
        pluginGroup.add(plugin);
    }
}

module.exports = function (app) {

    loadAllPlugin();

    app.use("/dicom-web", require("./api/dicom-web/stow-rs.route"));
    app.use("/dicom-web", require("./api/dicom-web/qido-rs.route"));
    app.use("/dicom-web", require("./api/dicom-web/wado-rs-instance.route"));
    app.use("/dicom-web", require("./api/dicom-web/wado-rs-metadata.route"));
    app.use("/dicom-web", require("./api/dicom-web/wado-rs-rendered.route"));
    app.use("/dicom-web", require("./api/dicom-web/wado-rs-bulkdata.route"));
    app.use("/dicom-web", require("./api/dicom-web/delete.route"));

    app.use("/wado", require("./api/WADO-URI"));
};

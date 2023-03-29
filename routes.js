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

    app.use("/dicom-web", require("./api/dicom-web"));

    app.use("/wado", require("./api/WADO-URI"));
};

module.exports.pluginsConfig = {
    "helloWorld": {
        enable: false,
        before: true,
        routers: [
            {
                path: "/dicom-web/studies",
                method: "get"
            },
            {
                path: "/dicom-web/studies/:studyUID/instances",
                method: "get"
            }
        ]
    },
    "dcm4raccoon": {
        // Please setup the dcmqrscp config in the plugin's dcmtk folder if needed.
        // Please config the HostTable in dcmqrscp.cfg in order for people to connect.
        enable: true,
        before: false,
        routers: [],
        // this is temp folder for storing files from c-store.
        storepath: "./plugins/dcm4raccoon/dicomFiles/",
        port: 6066
    }
};
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
    }
};
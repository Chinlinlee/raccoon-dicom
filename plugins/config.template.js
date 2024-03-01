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
    "syncToFhirServer": {
        enable: false,
        before: false,
        routers: [
            {
                path: "/dicom-web/studies",
                method: "post"
            }
        ],
        fhir: {
            server: {
                baseUrl: "http://127.0.0.1/fhir"
            }
        }
    },
    "dicomdir": {
        enable: false,
        before: true,
        routers: [
            {
                path: "/dicom-web/dicomdir",
                method: "get"
            }
        ]
    }
};
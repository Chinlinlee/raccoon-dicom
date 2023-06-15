RegExp.prototype.toJSON = RegExp.prototype.toString;
require('module-alias')(__dirname);

const { app, server } = require("./app");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const os = require("os");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const passport = require("passport");
const { raccoonConfig } = require("./config-class");
require("dotenv");
require("./websocket");

app.use(compress());
app.use(cookieParser());

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev") {
    app.use(cors());
}

//#region body parser

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(
    bodyParser.json({
        type: ["application/json", "application/dicom+json"]
    })
);

//#endregion

//#region session

app.use(
    session({
        secret: raccoonConfig.serverConfig.secretKey || "secretKey",
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
            dbName: raccoonConfig.mongoDbConfig.dbName
        })
    })
);

//#endregion

//#region passport

app.use(passport.initialize());
app.use(passport.session());

//#endregion


require("./routes.js")(app);

const PORT = raccoonConfig.serverConfig.port;
server.listen(PORT, () => {
    console.log(`http server is listening on port:${PORT}`);
});


let osPlatform = os.platform().toLocaleLowerCase();
if (osPlatform.includes("linux")) {
    process.env.OS = "linux";
} else if (osPlatform.includes("win")) {
    process.env.OS = "windows";
}


// #region DIMSE

(async () => {
    if (raccoonConfig.dicomDimseConfig.enableDimse) {
        const { java } = require("./models/DICOM/dcm4che/java-instance");
        let dcmQrScpClass = await java.importClassAsync("org.dcm4che3.tool.dcmqrscp.DcmQRSCP");
        const net = require("net");
        let checkPortServer = net.createServer()
            .once("listening", async function () {
                checkPortServer.close();
                await dcmQrScpClass.main(raccoonConfig.dicomDimseConfig.dcm4cheQrscpArgv);
            })
            .once("error", function (err) {
                if (err.code === "EADDRINUSE") {
                    console.log("QRSCP's port is already in use, please check is QRSCP running or another app running");
                }
            })
            .listen(raccoonConfig.dicomDimseConfig.getPort());
    }
})();

// #endregion
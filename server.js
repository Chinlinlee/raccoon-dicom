const { app } = require("./app");

const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const os = require("os");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const passport = require("passport");
const axios = require("axios");
const { exec } = require("child_process");
let io = require("./socket").init();
const { pythonLogger } = require("./utils/log");
const { raccoonConfig } = require("./config-class");
require("dotenv");

app.use(compress());
app.use(cookieParser());

//#region body parser

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(
    bodyParser.json({
        type: ["application/json"]
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

//#region global headers

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept ,Authorization"
    );
    res.setHeader("Vary", "Origin");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

//#endregion

require("./routes.js")(app);
// require('./services/user/passport')(passport);

const PORT = raccoonConfig.serverConfig.port;
app.listen(PORT, () => {
    console.log(`http server is listening on port:${PORT}`);
    io.on("connection", (socket) => {
        console.log("Connect successfully, " + socket.id);
    });
});

let osPlatform = os.platform().toLocaleLowerCase();
if (osPlatform.includes("linux")) {
    process.env.OS = "linux";
} else if (osPlatform.includes("win")) {
    process.env.OS = "windows";
}

const {
    useConda,
    condaPath,
    condaGdcmEnvName: condaEnvName,
    apiHost: dcm2JpegApiHost,
    apiPort: dcm2JpegApiPort,
    enable: isEnableDcm2Jpeg
} = raccoonConfig.dcm2JpegConfig;
async function runPythonAPI() {
    process.env.isPythonAPIRunning = false;
    try {
        let { data } = await axios.get(
            `http://${dcm2JpegApiHost}:${dcm2JpegApiPort}/`
        );
        if (data.status) {
            process.env.isPythonAPIRunning = true;
            return Promise.resolve(true);
        }
    } catch (e) {
        if (e.code) {
            if (e.code === "ECONNREFUSED") {
                console.log("Wait python API setup....");
            }
        } else {
            console.error(e);
            throw e;
        }
    }

    if (isEnableDcm2Jpeg) {
        if (process.env.isPythonAPIRunning !== "true") {
            if (process.env.OS == "windows") {
                let cmd = `python python/DICOM2JPEGAPI.py ${dcm2JpegApiPort}`;
                if (useConda)
                    cmd = `${condaPath} run -n ${condaEnvName} python python/DICOM2JPEGAPI.py ${dcm2JpegApiPort}`;
                exec(
                    `${cmd}`,
                    {
                        cwd: process.cwd()
                    },
                    function (err, stdout, stderr) {
                        if (err) {
                            console.error(err);
                            process.exit(1);
                        } else if (stderr) {
                            console.error(stderr);
                            process.exit(1);
                        }
                        return Promise.resolve(true);
                    }
                );
            } else {
                exec(
                    `python3 python/DICOM2JPEGAPI.py ${dcm2JpegApiPort}`,
                    {
                        cwd: process.cwd()
                    },
                    function (err, stdout, stderr) {
                        if (err) {
                            console.error(err);
                            process.exit(1);
                        } else if (stderr) {
                            console.error(stderr);
                        }
                        return Promise.resolve(true);
                    }
                );
            }
        }
    }
}

function checkPythonAPIIsRunning() {
    return new Promise((resolve) => {
        let checkAPITimes = 0;
        if (isEnableDcm2Jpeg) {
            let checkAPIInterval = setInterval(async () => {
                if (checkAPITimes >= 30) {
                    pythonLogger.error(
                        "The dcm2jpeg python flask api set up failure"
                    );
                    clearInterval(checkAPIInterval);
                    return resolve(false);
                }
                try {
                    let res = await axios.get(
                        `http://${dcm2JpegApiHost}:${dcm2JpegApiPort}/`
                    );
                    clearInterval(checkAPIInterval);
                    return resolve(true);
                } catch (e) {
                    checkAPITimes++;
                }
            }, 1000);
        }
    });
}

(async () => {
    runPythonAPI();
    process.env.isPythonAPIRunning = await checkPythonAPIIsRunning();
    pythonLogger.info(
        `[Python] [Python API running status: ${process.env.isPythonAPIRunning}]`
    );
})();
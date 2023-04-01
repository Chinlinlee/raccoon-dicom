RegExp.prototype.toJSON = RegExp.prototype.toString;

const { app } = require("./app");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const os = require("os");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const passport = require("passport");
let io = require("./socket").init();
const { raccoonConfig } = require("./config-class");
require("dotenv");

app.use(compress());
app.use(cookieParser());
app.use(cors());

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


require("./routes.js")(app);


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
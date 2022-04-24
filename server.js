const { app } = require('./app');

const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const compress = require('compression');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const passport = require('passport');
require('dotenv');

app.use(compress());
app.use(cookieParser());

//#region body parser

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({
    type: ["application/json"]
}));

//#endregion

//#region session

app.use(session({
    secret: process.env.SERVER_SESSION_SECRET_KEY || 'secretKey',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        dbName: process.env.MONGODB_NAME
    })
}));

//#endregion

//#region passport

app.use(passport.initialize());
app.use(passport.session());

//#endregion

//#region global headers

app.use((req, res , next)=> {
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept ,Authorization");
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

//#endregion

require('./routes.js')(app);
require('./services/user/passport')(passport);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, ()=> {
    console.log(`http server is listening on port:${PORT}`);
});

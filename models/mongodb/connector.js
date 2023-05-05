"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
const { raccoonConfig } = require("../../config-class");
const {
    dbName,
    hosts,
    ports,
    user,
    password,
    authSource,
    isShardingMode,
    urlOptions
} = raccoonConfig.mongoDbConfig;
module.exports = exports = function () {

    const collection = {};
    let databaseUrl = "";

    hosts.forEach((host, index) => {
        if (index == 0) {
            databaseUrl += `mongodb://${host}:${ports[0]}`;
        } else {
            databaseUrl += `,${host}:${ports[index]}`;
        }
    });
    databaseUrl += `/${dbName}`;

    if (urlOptions) {
        databaseUrl += `?${urlOptions}`;
    }

    console.log(databaseUrl);
    /**@type {mongoose.ConnectOptions} */
    let connectionOptions = {};
    if (user && password) {
        connectionOptions.user = user;
        connectionOptions.pass = password;
        connectionOptions.authSource = authSource;
    }

    mongoose
        .connect(databaseUrl, connectionOptions)
        .then(() => {
            if (isShardingMode) {
                mongoose.connection.db
                    .admin()
                    .command({
                        enableSharding: dbName
                    })
                    .then((res) => {
                        console.log(`sharding database ${dbName} successfully`);
                        shardCollection("/model");
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("we're connected!");
    });

    getCollections("/models", collection);

    return collection;
};

function getCollections(dirname, collectionObj) {
    let jsFilesInDir = fs
        .readdirSync(__dirname + dirname)
        .filter(
            (file) =>
                file.indexOf(".") !== 0 &&
                file !== basename &&
                file.slice(-3) === ".js"
        );
    for (let file of jsFilesInDir) {
        const moduleName = file.split(".")[0];
        console.log("moduleName :: ", moduleName);
        console.log("path : ", __dirname + dirname);
        collectionObj[moduleName] = require(__dirname +
            dirname +
            "/" +
            moduleName)(mongoose);
    }
}

function shardCollection(dirname) {
    let jsFilesInDir = fs
        .readdirSync(__dirname + dirname)
        .filter(
            (file) =>
                file.indexOf(".") !== 0 &&
                file !== basename &&
                file.slice(-3) === ".js"
        );
    for (let file of jsFilesInDir) {
        const moduleName = file.split(".")[0];
        if (isShardingMode) {
            mongoose.connection.db
                .admin()
                .command({
                    shardCollection: `${dbName}.${moduleName}`,
                    key: { id: "hashed" }
                })
                .then((res) => {
                    console.log(
                        `sharding collection ${moduleName} successfully`
                    );
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
}

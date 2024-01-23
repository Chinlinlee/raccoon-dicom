const fs = require("fs");
const path = require("path");
const { URL } = require("url");

let dotenvPath = path.join(__dirname, ".env");
if (!fs.existsSync(dotenvPath)) {
    dotenvPath = path.join(__dirname, ".env.template");
}

require("dotenv").config({
    path: dotenvPath
});
const { logger } = require("env-var");
const uuid = require("uuid");

const env = require("env-var").from(process.env, {}, logger);
const { DimseConfig } = require("./dimse.config.class");

const NAME_SPACE = "be81894e-49fc-50cf-8c11-5983da942dac";

function generateUidFromGuid(iGuid) {
    let guidBytes = `0x${iGuid.replace(/-/g, "")}`; //add prefix 0 and remove `-`
    let bigInteger = BigInt(guidBytes, 16);        //As big integer are not still in all browser supported I use BigInteger **) packaged to parse the integer with base 16 from uuid string
    return `2.25.${bigInteger.toString()}`;       //Output the previus parsed integer as string by adding `2.25.` as prefix
}

class SqlDbConfig {
    constructor() {
        this.host = env.get("SQL_HOST").default("127.0.0.1").asString();
        this.port = env.get("SQL_PORT").default("5432").asString();
        this.database = env.get("SQL_DB").default("raccoon").asString();
        this.dialect = env.get("SQL_TYPE").default("postgres").asString();
        this.username = env.get("SQL_USERNAME").default("postgres").asString();
        this.password = env.get("SQL_PASSWORD").default("postgres").asString();
        this.logging = env.get("SQL_LOGGING").default("false").asBool();
        this.forceSync = env.get("SQL_FORCE_SYNC").default("false").asBool();
        this.dbName = this.database;
    }
}

class ServerConfig {
    constructor() {
        this.host = env.get("SERVER_HOST").default("127.0.0.1").asString();
        this.port = env.get("SERVER_PORT").default("8081").asInt();
        this.secretKey = env.get("SERVER_SESSION_SECRET_KEY").asString();
        this.dbType = env.get("SERVER_DB_TYPE").default("mongodb").asEnum(["mongodb", "sql"]);
    }
}

class DicomWebConfig {
    constructor() {
        this.storeRootPath = env.get("DICOM_STORE_ROOTPATH").default("/dicomFiles").asString();
        this.host = env.get("DICOMWEB_HOST").default("127.0.0.1").asString();
        this.port = env.get("DICOMWEB_PORT").default("8081").asInt();
        this.apiPath = env.get("DICOMWEB_API").default("dicom-web").asString();
        this.aeTitle = env.get("DICOMWEB_AE").default("RACCOON").asString();
    }
}

class RaccoonConfig {
    constructor() {
        this.serverConfig = new ServerConfig();

        this.dbConfig = new SqlDbConfig();

        this.dicomWebConfig = new DicomWebConfig();
        this.dicomDimseConfig = new DimseConfig();
        
        /** @type {string} */
        this.mediaStorageUID = generateUidFromGuid(
            uuid.v5(this.dbConfig.dbName, NAME_SPACE)
        );
        
        /** @type {string} */
        this.mediaStorageID = this.dbConfig.dbName;

        this.aeTitle = this.dicomWebConfig.aeTitle;

        this.aeTitle = this.dicomDimseConfig.enableDimse ? this.dicomDimseConfig.aeTitle : this.dicomWebConfig.aeTitle;
        if (!this.aeTitle)
            throw new Error("Missing required config `aeTitle`");
    }
}

const raccoonConfig = new RaccoonConfig();

module.exports.raccoonConfig = raccoonConfig;

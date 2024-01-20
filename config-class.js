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


class MongoDbConfig {
    constructor() {
        this.dbName = env.get("MONGODB_NAME").default("raccoon").asString();
        this.hosts = env.get("MONGODB_HOSTS").required().asJsonArray();
        this.ports = env.get("MONGODB_PORTS").required().asJsonArray();
        this.user = env.get("MONGODB_USER").default("").asString();
        this.password = env.get("MONGODB_PASSWORD").default("").asString();
        this.authSource = env.get("MONGODB_AUTH_SOURCE").default("admin").asString();
        this.urlOptions = env.get("MONGODB_OPTIONS").default("").asString();
        this.isShardingMode = env.get("MONGODB_IS_SHARDING_MODE").default("false").asBool();
    }
}

class ServerConfig {
    constructor() {
        this.host = env.get("SERVER_HOST").default("127.0.0.1").asString();
        this.port = env.get("SERVER_PORT").default("8081").asInt();
        this.secretKey = env.get("SERVER_SESSION_SECRET_KEY").asString();
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

        this.dbConfig = new MongoDbConfig();

        this.dicomWebConfig = new DicomWebConfig();
        this.dicomDimseConfig = new DimseConfig();
        
        /** @type {string} */
        this.mediaStorageUID = generateUidFromGuid(
            uuid.v5(this.dbConfig.dbName, NAME_SPACE)
        );
        
        /** @type {string} */
        this.mediaStorageID = this.dbConfig.dbName;

        this.aeTitle = this.dicomDimseConfig.enableDimse ? this.dicomDimseConfig.aeTitle : this.dicomWebConfig.aeTitle;
        if (!this.aeTitle)
            throw new Error("Missing required config `aeTitle`");
    }
}

const raccoonConfig = new RaccoonConfig();

module.exports.raccoonConfig = raccoonConfig;

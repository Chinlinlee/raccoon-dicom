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

/**
 *  @type {import("sequelize").Options}
 */
const SqlDbConfig = {
    host: env.get("SQL_HOST").default("127.0.0.1").asString(),
    port: env.get("SQL_PORT").default("5432").asString(),
    database: env.get("SQL_DB").default("raccoon").asString(),
    dialect: env.get("SQL_TYPE").default("postgres").asString(),
    username: env.get("SQL_USERNAME").default("postgres").asString(),
    password: env.get("SQL_PASSWORD").default("postgres").asString(),
    logging: env.get("SQL_LOGGING").default("false").asBool()
};


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

class FhirConfig {
    constructor() {
        this.isSyncToFhir = env.get("SYCN_TO_FHIR_SERVER").default("true").asBool();
        this.baseUrl = env.get("FHIRSERVER_BASE_URL").default("http://127.0.0.1:8089/fhir").asString();
    }
}


class RaccoonConfig {
    constructor() {
        this.sqlDbConfig = SqlDbConfig;
        this.serverConfig = new ServerConfig();
        this.dicomWebConfig = new DicomWebConfig();
        this.dicomDimseConfig = new DimseConfig();
        this.fhirConfig = new FhirConfig();
        
        /** @type {string} */
        this.mediaStorageUID = generateUidFromGuid(
            uuid.v5(this.sqlDbConfig.database, NAME_SPACE)
        );
        
        /** @type {string} */
        this.mediaStorageID = this.sqlDbConfig.database;

        this.aeTitle = this.dicomWebConfig.aeTitle;
        // this.aeTitle = this.dicomDimseConfig.enableDimse ? this.dicomDimseConfig.getAeTitle() : this.dicomWebConfig.aeTitle;

        this.aeTitle = this.dicomDimseConfig.enableDimse ? this.dicomDimseConfig.aeTitle : this.dicomWebConfig.aeTitle;
        if (!this.aeTitle)
            throw new Error("Missing required config `aeTitle`");
    }
}

const raccoonConfig = new RaccoonConfig();

module.exports.raccoonConfig = raccoonConfig;

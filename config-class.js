const fs = require("fs");
const path = require("path");

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

class DicomDimseConfig {
    constructor() {
        this.enableDimse = env.get("ENABLE_DIMSE").default("true").asBool();

        if (this.enableDimse) {
            this.dcm4cheQrscpArgv = env.get("DCM4CHE_QRSCP_COMMAND").required().asJsonArray();
            this.replacePathInArgv();
        }
    }
    
    replacePathInArgv() {
        for(let i = 0 ; i < this.dcm4cheQrscpArgv.length ; i++) {
            this.dcm4cheQrscpArgv[i] = this.dcm4cheQrscpArgv[i].replace(/{project}/gm, __dirname);
        }
    }

    getPort() {
        let bindArgIndex = this.dcm4cheQrscpArgv.findIndex(v => v === "-b");
        /** @type {string} */
        let bindInfo = this.dcm4cheQrscpArgv[bindArgIndex + 1];
        return bindInfo.split(":").pop();
    }

    getAeTitle() {
        let bindArgIndex = this.dcm4cheQrscpArgv.findIndex(v => v === "-b");
        /** @type {string} */
        let bindInfo = this.dcm4cheQrscpArgv[bindArgIndex + 1];

        let aeTitleAndIp = bindInfo.split(":").shift();
        let aeTitle = aeTitleAndIp.includes("@") ? aeTitleAndIp.split("@").shift() : aeTitleAndIp;
        return aeTitle;
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
        this.mongoDbConfig = new MongoDbConfig();
        this.serverConfig = new ServerConfig();
        this.dicomWebConfig = new DicomWebConfig();
        this.dicomDimseConfig = new DicomDimseConfig();
        this.fhirConfig = new FhirConfig();
        
        /** @type {string} */
        this.mediaStorageUID = generateUidFromGuid(
            uuid.v5(this.mongoDbConfig.dbName, NAME_SPACE)
        );
        
        /** @type {string} */
        this.mediaStorageID = this.mongoDbConfig.dbName;

        this.aeTitle = this.dicomDimseConfig.enableDimse ? this.dicomDimseConfig.getAeTitle() : this.dicomWebConfig.aeTitle;
        if (!this.aeTitle)
            throw new Error("Missing required config `aeTitle`");
    }
}

const raccoonConfig = new RaccoonConfig();

module.exports.raccoonConfig = raccoonConfig;

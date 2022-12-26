require("dotenv").config();
const { logger } = require("env-var");
const env = require("env-var").from(process.env, {}, logger);

class MongoDbConfig {
    constructor() {
        this.dbName = env.get("MONGODB_NAME").default("raccoon").asString();
        this.hosts = env.get("MONGODB_HOSTS").required().asJsonArray();
        this.ports = env.get("MONGODB_PORTS").required().asJsonArray();
        this.user = env.get("MONGODB_USER").default("").asString();
        this.password = env.get("MONGODB_PASSWORD").default("").asString();
        this.authSource = env.get("MONGODB_AUTH_SOURCE").default("admin").asString();
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
        this.rootPath = env.get("DICOM_STORE_ROOTPATH").default("/dicomFiles").asString();
        this.host = env.get("DICOMWEB_HOST").default("127.0.0.1").asString();
        this.port = env.get("DICOMWEB_PORT").default("8081").asInt();
        this.apiPath = env.get("DICOMWEB_API").default("dicom-web").asString();

    }
}

class FhirConfig {
    constructor() {
        this.isSyncToFhir = env.get("SYCN_TO_FHIR_SERVER").default("true").asBool();
        this.baseUrl = env.get("FHIRSERVER_BASE_URL").default("http://127.0.0.1:8089/fhir").asString();
    }
}

class Dcm2JpegConfig {
    constructor() {
        this.enable = env.get("USE_DCM2JPEG_PYTHONAPI").default("true").asBool();
        this.apiHost = env.get("DCM2JPEG_PYTHONAPI_HOST").default("127.0.0.1").asString();
        this.apiPort = env.get("DCM2JPEG_PYTHONAPI_PORT").default("5000").asInt();

        this.useConda = env.get("USE_CONDA").default("false").asBool();
        this.condaPath = env.get("CONDA_PATH").default("~/anaconda3/Scripts/conda.exe").asString();
        this.condaGdcmEnvName = env.get("CONDA_GDCM_ENV_NAME").default("gdcm").asString();
    }
}

class RaccoonConfig {
    constructor() {
        this.mongoDbConfig = new MongoDbConfig();
        this.serverConfig = new ServerConfig();
        this.dicomWebConfig = new DicomWebConfig();
        this.dcm2JpegConfig = new Dcm2JpegConfig();
        this.fhirConfig = new FhirConfig();
    }
}

const raccoonConfig = new RaccoonConfig();

module.exports.raccoonConfig = raccoonConfig;

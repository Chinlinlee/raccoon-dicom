const path = require("path");
const fs = require("fs");

let dotenvPath = path.join(__dirname, ".env");
if (!fs.existsSync(dotenvPath)) {
    dotenvPath = path.join(__dirname, ".env.template");
}

require("dotenv").config({
    path: dotenvPath
});
const { logger } = require("env-var");
const env = require("env-var").from(process.env, {}, logger);

class DimseConfig {
    constructor() {
        this.enableDimse = env.get("ENABLE_DIMSE").default("true").asBool();

        this.aeTitle = env.get("DIMSE_AE_TITLE").default("RACCOONQRSCP").asString();
        this.hostname = env.get("DIMSE_HOSTNAME").default("127.0.0.1").asString();
        this.port = env.get("DIMSE_PORT").default(11112).asInt();

        // General Config
        this.maxPduLenRcv = env.get("DIMSE_MAX_PDULEN_RCV").default(16378).asInt();
        this.maxPduLenSnd = env.get("DIMSE_MAX_PDULEN_SND").default(16378).asInt();
        this.notAsync = env.get("DIMSE_NOT_ASYNC").default("false").asBool();
        this.maxOpsInvoked = env.get("DIMSE_MAX_OPS_INVOKED").default(0).asInt();
        this.maxOpsPerformed = env.get("DIMSE_MAX_OPS_PERFORMED").default(0).asInt();
        this.notPackPdv = env.get("DIMSE_NOT_PACK_PDV").default("false").asBool();
        this.connectTimeout = env.get("DIMSE_CONNECT_TIMEOUT").default(0).asInt();
        this.requestTimeout = env.get("DIMSE_REQUEST_TIMEOUT").default(0).asInt();
        this.acceptTimeout = env.get("DIMSE_ACCEPT_TIMEOUT").default(0).asInt();
        this.releaseTimeout = env.get("DIMSE_RELEASE_TIMEOUT").default(0).asInt();
        this.sendTimeout = env.get("DIMSE_SEND_TIMEOUT").default(0).asInt();
        this.storeTimeout = env.get("DIMSE_STORE_TIMEOUT").default(0).asInt();
        this.responseTimeout = env.get("DIMSE_RESPONSE_TIMEOUT").default(0).asInt();
        this.retrieveTimeout = env.get("DIMSE_RETRIEVE_TIMEOUT").default(0).asInt();
        this.retrieveTimeoutTotal = env.get("DIMSE_RETRIEVE_TIMEOUT_TOTAL").default(0).asInt();
        this.idleTimeout = env.get("DIMSE_IDLE_TIMEOUT").default(0).asInt();
        this.soCloseDelay = env.get("DIMSE_SOCLOSE_DELAY").default(0).asInt();
        this.soSndBuffer = env.get("DIMSE_SOSND_BUFFER").default(0).asInt();
        this.soRcvBuffer = env.get("DIMSE_SORCV_BUFFER").default(0).asInt();
        this.tcpDelay = env.get("DIMSE_TCP_DELAY").default("false").asBool();

        // TLS Cipher
        this.tls = env.get("DIMSE_TLS").default("false").asBool();
        this.tlsNull = env.get("DIMSE_TLS_NULL").default("false").asBool();
        this.tls3Des = env.get("DIMSE_TLS_3DES").default("false").asBool();
        this.tlsAes = env.get("DIMSE_TLS_AES").default("false").asBool();
        this.tlsCipher = env.get("DIMSE_TLS_CIPHER").default("").asString();

        // TLS
        this.tls13 = env.get("DIMSE_TLS13").default("false").asBool();
        this.tls12 = env.get("DIMSE_TLS12").default("false").asBool();
        this.tls11 = env.get("DIMSE_TLS11").default("false").asBool();
        this.tls1 = env.get("DIMSE_TLS1").default("false").asBool();
        this.ssl3 = env.get("DIMSE_SSL3").default("false").asBool();
        this.ssl2Hello = env.get("DIMSE_SSL2HELLO").default("false").asBool();
        this.tlsProtocol = env.get("DIMSE_TLS_PROTOCOL").default("").asString();
        this.tlsEiaHttps = env.get("DIMSE_TLS_EIA_HTTPS").default("false").asBool();
        this.tlsEiaLdaps = env.get("DIMSE_TLS_EIA_LDAPS").default("false").asBool();
        this.tlsNoAuth = env.get("DIMSE_TLS_NOAUTH").default("false").asBool();
        this.keyStore = env.get("DIMSE_KEY_STORE").default(
            path.normalize(
                path.join(
                    __dirname,
                    "./config/certs/key.p12"
                )
            )
        ).asString();
        this.keyStoreType = env.get("DIMSE_KEY_STORE_TYPE").default("PKCS12").asString();
        this.keyStorePass = env.get("DIMSE_KEY_STORE_PASS").default("secret").asString();
        this.keyPass = env.get("DIMSE_KEY_PASS").default(this.keyStorePass).asString();
        this.trustStore = env.get("DIMSE_TRUST_STORE").default(path.normalize(
            path.join(
                __dirname,
                "./config/certs/cacerts.p12"
            )
        )).asString();
        this.trustStoreType = env.get("DIMSE_TRUST_STORE_TYPE").default("PKCS12").asString();
        this.trustStorePass = env.get("DIMSE_TRUST_STORE_PASS").default("secret").asString();
    }
}

module.exports.DimseConfig = DimseConfig;
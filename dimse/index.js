const _ = require("lodash");
const { java } = require("@models/DICOM/dcm4che/java-instance");
const { importClass } = require("java-bridge");
const path = require("path");
const fs = require("fs");

const { ApplicationEntity } = require("@dcm4che/net/ApplicationEntity");
const { BasicCEchoSCP } = require("@dcm4che/net/service/BasicCEchoSCP");
const { Connection } = require("@dcm4che/net/Connection");
const { Device } = require("@dcm4che/net/Device");
const { DicomServiceRegistry } = require("@dcm4che/net/service/DicomServiceRegistry");
const { EnumSet } = require("@java-wrapper/java/util/EnumSet");
const { QueryOption } = require("@dcm4che/net/QueryOption");
const { TransferCapability } = require("@dcm4che/net/TransferCapability");
const { TransferCapability$Role: TransferCapabilityRole } = require("@dcm4che/net/TransferCapability$Role");
const { JsCStoreScp } = require("./c-store");
const { JsCFindScp } = require("./c-find");
const { default: CLIUtils } = require("@dcm4che/tool/common/CLIUtils");
const { JsCMoveScp } = require("./c-move");
const fileExist = require("@root/utils/file/fileExist");
const { JsCGetScp } = require("./c-get");
const { JsStgCmtScp } = require("./stgcmt");
const { raccoonConfig } = require("@root/config-class");
const { Connection$EndpointIdentificationAlgorithm } = require("@dcm4che/net/Connection$EndpointIdentificationAlgorithm");
const { SSLManagerFactory } = require("@dcm4che/net/SSLManagerFactory");
const { Common } = require("@chinlinlee/dcm777/common/Common");

class DcmQrScp {
    device = new Device("dcmqrscp");
    applicationEntity = new ApplicationEntity("*");
    connection = new Connection();
    remoteConnections = {};

    constructor() {
        this.device.addConnectionSync(this.connection);
        this.device.addApplicationEntitySync(this.applicationEntity);
        this.applicationEntity.setAssociationAcceptorSync(true);
        this.applicationEntity.addConnectionSync(this.connection);
        this.createDicomServiceRegistry().then(dicomServiceRegistry => {
            this.device.setDimseRQHandlerSync(dicomServiceRegistry);
        });
    }

    async createDicomServiceRegistry() {
        let dicomServiceRegistry = new DicomServiceRegistry();

        await dicomServiceRegistry.addDicomService(new BasicCEchoSCP());

        await dicomServiceRegistry.addDicomService(new JsStgCmtScp(this).get());

        // #region C-STORE
        let jsCStoreScp = new JsCStoreScp();
        await dicomServiceRegistry.addDicomService(jsCStoreScp.get());
        // #endregion

        // #region C-FIND
        await dicomServiceRegistry.addDicomService(new JsCFindScp().getPatientRootLevel());
        await dicomServiceRegistry.addDicomService(new JsCFindScp().getStudyRootLevel());
        await dicomServiceRegistry.addDicomService(new JsCFindScp().getPatientStudyOnlyLevel());
        // #endregion

        // #region C-MOVE
        await dicomServiceRegistry.addDicomService(new JsCMoveScp(this).getPatientRootLevel());
        await dicomServiceRegistry.addDicomService(new JsCMoveScp(this).getStudyRootLevel());
        await dicomServiceRegistry.addDicomService(new JsCMoveScp(this).getPatientStudyOnlyLevel());
        // #endregion

        // #region C-GET
        await dicomServiceRegistry.addDicomService(new JsCGetScp().getPatientRootLevel());
        await dicomServiceRegistry.addDicomService(new JsCGetScp().getStudyRootLevel());
        await dicomServiceRegistry.addDicomService(new JsCGetScp().getPatientStudyOnlyLevel());
        await dicomServiceRegistry.addDicomService(new JsCGetScp().getCompositeLevel());
        // #endregion

        return dicomServiceRegistry;
    }


    async start() {
        this.configureLog();
        this.configureConnection();
        this.configureBindServer();
        this.configureTransferCapability();
        this.configureRemoteConnections();


        const Executors = importClass("java.util.concurrent.Executors");

        let executorService = await Executors.newCachedThreadPool();
        let scheduledExecutorService = await Executors.newSingleThreadScheduledExecutor();
        await this.device.setScheduledExecutor(scheduledExecutorService);
        await this.device.setExecutor(executorService);
        await this.device.bindConnections();
    }

    configureTransferCapability() {
        let tc = new TransferCapability(
            null,
            "*",
            TransferCapabilityRole.SCP,
            ["*"]
        );

        tc.setQueryOptionsSync(EnumSet.noneOfSync(QueryOption.class));
        this.applicationEntity.addTransferCapabilitySync(tc);
    }

    configureBindServer() {
        this.connection.setPortSync(raccoonConfig.dicomDimseConfig.port);
        this.connection.setHostnameSync(raccoonConfig.dicomDimseConfig.hostname);
        this.applicationEntity.setAETitleSync(raccoonConfig.dicomDimseConfig.aeTitle);
    }

    configureRemoteConnections() {
        let aeFile = path.normalize(
            path.join(
                __dirname,
                "../config/ae-prod.properties"
            )
        );
        if (!fileExist.sync(aeFile)) {
            aeFile = path.normalize(
                path.join(
                    __dirname,
                    "../config/ae.properties"
                )
            );
        }
        let aeConfig = CLIUtils.loadPropertiesSync(aeFile, null);
        let itemsSet = aeConfig.entrySetSync();
        let itemsIter = itemsSet.iteratorSync();

        let item;
        while (itemsIter.hasNextSync()) {
            item = itemsIter.nextSync();
            /** @type {string} */
            let aet = item.getKeySync();
            /** @type {string} */
            let value = item.getValueSync();
            try {
                let hostPortCiphers = value.split(":");
                let ciphers = hostPortCiphers.slice(2);

                let remote = new Connection();
                remote.setHostnameSync(hostPortCiphers[0]);
                remote.setPortSync(parseInt(hostPortCiphers[1]));
                remote.setTlsCipherSuitesSync(ciphers);
                this.remoteConnections[aet] = remote;
            } catch (e) {
                console.error(e);
                throw new (`Invalid entry in ${aeFile}: ${aet}=${value}`);
            }
        }
    }

    /**
     * @param {string} dest
     */
    getRemoteConnection(dest) {
        return _.get(this.remoteConnections, dest);
    }

    configureConnection() {
        this.connection.setReceivePDULengthSync(raccoonConfig.dicomDimseConfig.maxPduLenRcv);
        this.connection.setSendPDULengthSync(raccoonConfig.dicomDimseConfig.maxPduLenSnd);

        if (raccoonConfig.dicomDimseConfig.notAsync) {
            this.connection.setMaxOpsInvokedSync(1);
            this.connection.setMaxOpsPerformedSync(1);
        } else {
            this.connection.setMaxOpsInvokedSync(raccoonConfig.dicomDimseConfig.maxOpsInvoked);
            this.connection.setMaxOpsPerformedSync(raccoonConfig.dicomDimseConfig.maxOpsPerformed);
        }

        this.connection.setPackPDVSync(raccoonConfig.dicomDimseConfig.notPackPdv);
        this.connection.setConnectTimeoutSync(raccoonConfig.dicomDimseConfig.connectTimeout);
        this.connection.setRequestTimeoutSync(raccoonConfig.dicomDimseConfig.requestTimeout);
        this.connection.setAcceptTimeoutSync(raccoonConfig.dicomDimseConfig.acceptTimeout);
        this.connection.setReleaseTimeoutSync(raccoonConfig.dicomDimseConfig.releaseTimeout);
        this.connection.setSendTimeoutSync(raccoonConfig.dicomDimseConfig.sendTimeout);
        this.connection.setStoreTimeoutSync(raccoonConfig.dicomDimseConfig.storeTimeout);
        this.connection.setResponseTimeoutSync(raccoonConfig.dicomDimseConfig.responseTimeout);

        if (raccoonConfig.dicomDimseConfig.retrieveTimeout) {
            this.connection.setRetrieveTimeoutSync(raccoonConfig.dicomDimseConfig.retrieveTimeout);
            this.connection.setRetrieveTimeoutTotalSync(false);
        } else if (raccoonConfig.dicomDimseConfig.retrieveTimeoutTotal) {
            this.connection.setRetrieveTimeoutTotalSync(raccoonConfig.dicomDimseConfig.retrieveTimeoutTotal);
            this.connection.setRetrieveTimeoutSync(false);
        }

        this.connection.setIdleTimeoutSync(raccoonConfig.dicomDimseConfig.idleTimeout);
        this.connection.setSocketCloseDelaySync(raccoonConfig.dicomDimseConfig.soCloseDelay);
        this.connection.setSendBufferSizeSync(raccoonConfig.dicomDimseConfig.soSndBuffer);
        this.connection.setReceiveBufferSizeSync(raccoonConfig.dicomDimseConfig.soRcvBuffer);
        this.connection.setTcpNoDelaySync(raccoonConfig.dicomDimseConfig.tcpDelay);
        this.configureTls();
    }

    configureTls() {
        if (!this.configureTlsCipher())
            return;

        if (raccoonConfig.dicomDimseConfig.tls13) {
            this.connection.setTlsProtocolsSync(["TLSv1.3"]);
        } else if (raccoonConfig.dicomDimseConfig.tls12) {
            this.connection.setTlsProtocolsSync(["TLSv1.2"]);
        } else if (raccoonConfig.dicomDimseConfig.tls11) {
            this.connection.setTlsProtocolsSync(["TLSv1.1"]);
        } else if (raccoonConfig.dicomDimseConfig.tls1) {
            this.connection.setTlsProtocolsSync(["TLSv1"]);
        } else if (raccoonConfig.dicomDimseConfig.ssl3) {
            this.connection.setTlsProtocolsSync(["SSLv3"]);
        } else if (raccoonConfig.dicomDimseConfig.ssl2Hello) {
            this.connection.setTlsProtocolsSync(["SSLv2Hello", "SSLv3", "TLSv1", "TLSv1.1", "TLSv1.2"]);
        } else if (raccoonConfig.dicomDimseConfig.tlsProtocol) {
            this.connection.setTlsProtocolsSync([raccoonConfig.dicomDimseConfig.tlsProtocol]);
        }

        if (raccoonConfig.dicomDimseConfig.tlsEiaHttps) {
            this.connection.setTlsEndpointIdentificationAlgorithmSync(Connection$EndpointIdentificationAlgorithm.HTTPS);
        } else if (raccoonConfig.dicomDimseConfig.tlsEiaLdaps) {
            this.connection.setTlsEndpointIdentificationAlgorithmSync(Connection$EndpointIdentificationAlgorithm.LDAPS);
        }

        this.connection.setTlsNeedClientAuthSync(!raccoonConfig.dicomDimseConfig.tlsNoAuth);

        let device = this.connection.getDeviceSync();
        try {
            if (raccoonConfig.dicomDimseConfig.keyStore) {
                device.setKeyManagerSync(
                    SSLManagerFactory.createKeyManagerSync(
                        raccoonConfig.dicomDimseConfig.keyStoreType,
                        raccoonConfig.dicomDimseConfig.keyStore,
                        raccoonConfig.dicomDimseConfig.keyStorePass,
                        raccoonConfig.dicomDimseConfig.keyPass
                    )
                );
            }
            device.setTrustManagerSync(
                SSLManagerFactory.createTrustManagerSync(
                    raccoonConfig.dicomDimseConfig.trustStoreType,
                    raccoonConfig.dicomDimseConfig.trustStore,
                    raccoonConfig.dicomDimseConfig.trustStorePass
                )
            );
        } catch (e) {
            throw new Error(e);
        }
    }

    configureTlsCipher() {
        if (raccoonConfig.dicomDimseConfig.tls) {
            this.connection.setTlsCipherSuitesSync(
                [
                    "SSL_RSA_WITH_NULL_SHA",
                    "TLS_RSA_WITH_AES_128_CBC_SHA",
                    "SSL_RSA_WITH_3DES_EDE_CBC_SHA"
                ]
            );
        } else if (raccoonConfig.dicomDimseConfig.tlsNull) {
            this.connection.setTlsCipherSuitesSync(["SSL_RSA_WITH_NULL_SHA"]);

        } else if (raccoonConfig.dicomDimseConfig.tls3Des) {
            this.connection.setTlsCipherSuitesSync(["SSL_RSA_WITH_3DES_EDE_CBC_SHA"]);

        } else if (raccoonConfig.dicomDimseConfig.tlsAes) {
            this.connection.setTlsCipherSuitesSync(
                [
                    "TLS_RSA_WITH_AES_128_CBC_SHA",
                    "SSL_RSA_WITH_3DES_EDE_CBC_SHA"
                ]
            );
        } else if (raccoonConfig.dicomDimseConfig.tlsCipher) {
            this.connection.setTlsCipherSuitesSync([raccoonConfig.dicomDimseConfig.tlsCipher]);
        }

        return this.connection.isTlsSync();
    }

    configureLog() {
        this.generateLogFile();
        Common.LoadLogConfigSync(
            path.join(
                __dirname,
                "../config/logback.xml"
            )
        );
    }

    generateLogFile() {
        let logBackXml = `<?xml version="1.0" encoding="UTF-8"?>
        <configuration>
        
            <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
                <encoder>
                    <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
                </encoder>
            </appender>
        
            <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
                <encoder>
                    <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
                    <charset>utf-8</charset>
                </encoder>
                <file>${path.normalize(path.join(__dirname, "../pm2log/raccoon.log"))}</file>
                <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
                    <fileNamePattern>${path.normalize(path.join(__dirname, "../pm2log/raccoon.log"))}%i</fileNamePattern>
                </rollingPolicy>
                <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
                    <MaxFileSize>1MB</MaxFileSize>
                </triggeringPolicy>
            </appender>
        
            <root level="INFO">
                <appender-ref ref="CONSOLE" />
                <appender-ref ref="FILE" />
            </root>
        </configuration>`;

        fs.writeFileSync(path.join(
            __dirname,
            "../config/logback.xml"
        ), logBackXml, "utf-8");
    }
}

module.exports.DcmQrScp = DcmQrScp;
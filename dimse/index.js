require("module-alias/register");
const _ = require("lodash");
const { java } = require("@models/DICOM/dcm4che/java-instance");
const { importClass, appendClasspath, stdout, newProxy } = require("java-bridge");
const glob = require("glob");
const path = require("path");

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

const aeTitle = "FKQRSCP";
const host = "0.0.0.0";
const port = 11112;

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
        this.connection.setPortSync(port);
        this.connection.setHostnameSync(host);
        this.applicationEntity.setAETitleSync(aeTitle);
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
        while(itemsIter.hasNextSync()) {
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
            } catch(e) {
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

}


process.stdin.resume();

let dcmQrScp = new DcmQrScp();
dcmQrScp.start();


module.exports.DcmQrScp = DcmQrScp;
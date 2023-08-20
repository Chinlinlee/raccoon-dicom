require("module-alias/register");
const { java } = require("@models/DICOM/dcm4che/java-instance");
const { importClass, appendClasspath, stdout, newProxy } = require("java-bridge");
const glob = require("glob");
const path = require("path");

const { ApplicationEntity } = require("@dcm4che/net/ApplicationEntity");
const { BasicCEchoSCP } = require("@dcm4che/net/service/BasicCEchoSCP");
const { Commands } = require("@dcm4che/net/Commands");
const { Connection } = require("@dcm4che/net/Connection");
const { Device } = require("@dcm4che/net/Device");
const { DicomServiceRegistry } = require("@dcm4che/net/service/DicomServiceRegistry");
const { EnumSet } = require("@java-wrapper/java/util/EnumSet");
const { QueryOption } = require("@dcm4che/net/QueryOption");
const { TransferCapability } = require("@dcm4che/net/TransferCapability");
const { TransferCapability$Role: TransferCapabilityRole } = require("@dcm4che/net/TransferCapability$Role");
const { createCStoreSCPInjectProxy, default: CStoreSCPInject } = require("@chinlinlee/dcm777/net/CStoreSCPInject");
const { default: Dimse } = require("@dcm4che/net/Dimse");
const { Status } = require("@dcm4che/net/Status");
const { default: Association } = require("@dcm4che/net/Association");
const { default: PresentationContext } = require("@dcm4che/net/pdu/PresentationContext");
const { default: Attributes } = require("@dcm4che/data/Attributes");
const { default: DicomOutputStream } = require("@dcm4che/io/DicomOutputStream");
const { default: File } = require("@java-wrapper/java/io/File");
const { default: Tag } = require("@dcm4che/data/Tag");
const { default: SimpleCStoreSCP } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SimpleCStoreSCP");
const { JsCStoreScp } = require("./c-store");
const { JsCFindScp } = require("./c-find");

const aeTitle = "FKQRSCP";
const host = "0.0.0.0";
const port = 11112;

class DcmQrScp {
    device = new Device("dcmqrscp");
    applicationEntity = new ApplicationEntity("*");
    connection = new Connection();

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
        let jsCStoreScp = new JsCStoreScp();
        await dicomServiceRegistry.addDicomService(jsCStoreScp.get());
        await dicomServiceRegistry.addDicomService(new JsCFindScp().getPatientRootLevel());
        return dicomServiceRegistry;
    }


    async start() {
        this.configureBindServer();
        this.configureTransferCapability();


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

}


process.stdin.resume();

let dcmQrScp = new DcmQrScp();
dcmQrScp.start();
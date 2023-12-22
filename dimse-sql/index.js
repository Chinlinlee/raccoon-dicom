const { java } = require("@models/DICOM/dcm4che/java-instance");

const { BasicCEchoSCP } = require("@dcm4che/net/service/BasicCEchoSCP");
const { DicomServiceRegistry } = require("@dcm4che/net/service/DicomServiceRegistry");
const { JsCStoreScp } = require("../dimse/c-store");
const { JsCFindScp } = require("../dimse/c-find");
const { JsCMoveScp } = require("../dimse/c-move");
const { JsCGetScp } = require("../dimse/c-get");
const { DcmQrScp } = require("@root/dimse");

class SqlDcmQrScp extends DcmQrScp {

    constructor() {
        super();
    }

    async createDicomServiceRegistry() {
        let dicomServiceRegistry = new DicomServiceRegistry();

        await dicomServiceRegistry.addDicomService(new BasicCEchoSCP());

        // await dicomServiceRegistry.addDicomService(new JsStgCmtScp(this).get());

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

}

module.exports.DcmQrScp = SqlDcmQrScp;
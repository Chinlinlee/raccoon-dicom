const myMongoDB = require("@models/mongodb");

const path = require("path");
const { default: Dimse } = require("@dcm4che/net/Dimse");
const { default: Status } = require("@dcm4che/net/Status");
const { createCStoreSCPInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/CStoreSCPInject");
const { default: SimpleCStoreSCP } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SimpleCStoreSCP");
const { default: File } = require("@java-wrapper/java/io/File");
const { StowRsService } = require("@root/api/dicom-web/controller/STOW-RS/service/stow-rs.service");

const cStoreScpInjectProxy = createCStoreSCPInjectProxy({
    postDimseRQ: async (association, presentationContext, dimse, requestAttr, data, responseAttr) => {
        await association.tryWriteDimseRSP(presentationContext, responseAttr);
    },
    postStore: async (association, presentationContext, requestAttr, data, responseAttr, file) => {
        let absPath = await file.getAbsolutePath();

        let stowRsService = new StowRsService({
            headers: {
                host: "fake-host"
            },
            params: {}
        }, []);
    
        /** @type {formidable.File} */
        let fileObj = {
            filepath: path.resolve(absPath),
            originalFilename: path.basename(absPath)
        };
    
        try {
            await stowRsService.storeInstance(fileObj);
        } catch (e) {
            throw e;
        }
    }
}, {
    keepAsDaemon: true
});

class JsCStoreScp {
    constructor() {}

    get() {
        let storageDir = new File(
            path.join(__dirname, "../tempUploadFiles")
        );
        let basicCStoreScp = new SimpleCStoreSCP(cStoreScpInjectProxy, storageDir, ["*"]);
        return basicCStoreScp;
    }
}

module.exports.JsCStoreScp = JsCStoreScp;
const path = require("path");
const { createCStoreSCPInjectProxy } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/CStoreSCPInject");
const { default: SimpleCStoreSCP } = require("@java-wrapper/org/github/chinlinlee/dcm777/net/SimpleCStoreSCP");
const { default: File } = require("@java-wrapper/java/io/File");
const { StowRsService } = require("@stow-rs-service");
const { default: Association } = require("@dcm4che/net/Association");
const { PresentationContext } = require("@dcm4che/net/pdu/PresentationContext");
const { Attributes } = require("@dcm4che/data/Attributes");

const cStoreScpInjectProxy = createCStoreSCPInjectProxy({
    postDimseRQ: async (association, presentationContext, dimse, requestAttr, data, responseAttr) => {
        await association.tryWriteDimseRSP(presentationContext, responseAttr);
    },
    /**
     * 
     * @param {Association} association 
     * @param {PresentationContext} presentationContext 
     * @param {Attributes} requestAttr 
     * @param {*} data 
     * @param {*} responseAttr 
     * @param {*} file 
     */
    postStore: async (association, presentationContext, requestAttr, data, responseAttr, file) => {
        let absPath = await file.getAbsolutePath();

        let stowRsService = new StowRsService({
            headers: {
                host: await association.getRemoteHostName()
            },
            params: {},
            socket: {
                remoteAddress: await association.getCallingAET()
            }
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
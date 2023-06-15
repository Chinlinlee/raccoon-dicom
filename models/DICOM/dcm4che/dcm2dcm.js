const { java } = require("./java-instance");
const { File } = require("./wrapper/java/io/File");
const { FileOutputStream } = require("./wrapper/java/io/FileOutputStream");
const { TransferSyntaxType } = require("./wrapper/org/dcm4che3/imageio/codec/TransferSyntaxType");
const { Transcoder } = require("./wrapper/org/dcm4che3/imageio/codec/Transcoder");
const { createTranscoder$HandlerProxy } = require("./wrapper/org/dcm4che3/imageio/codec/Transcoder$Handler");
const { UID } = require("./wrapper/org/dcm4che3/data/UID");
const { DicomEncodingOptions } = require("./wrapper/org/dcm4che3/io/DicomEncodingOptions");

/**
 * @description Implement dcm2dcm in node.js
 * @see {@link https://github.com/dcm4che/dcm4che/blob/master/dcm4che-tool/dcm4che-tool-dcm2dcm/src/main/java/org/dcm4che3/tool/dcm2dcm/Dcm2Dcm.java|Dcm2Dcm.java}
 * @example
 *let src = new File("src.dcm");
 *let dest = new File("dest.dcm");
 *let localDcm2Dcm = new LocalDcm2Dcm();
 *localDcm2Dcm.setTransferSyntax(UID.JPEGBaseline8Bit);
 *await localDcm2Dcm.transcode(src, dest);
 */
class LocalDcm2Dcm {
    constructor() {
        this.retainFileMetaInfo = true;
        this.maxThreads = 1;
        this.encOpts = DicomEncodingOptions.DEFAULT;
    }

    /**
     * 
     * @param {string} uid 
     */
    setTransferSyntax(uid) {
        this.transferSyntaxUid = uid;
        this.transferSyntaxType = TransferSyntaxType.forUIDSync(uid);

        if (this.transferSyntaxType == null) 
            throw new Error(`Unsupported Transfer Syntax: ${this.transferSyntaxUid}`);
    }

    /**
     * 
     * @param {number} maxThreads 
     */
    setMaxThreads(maxThreads) {
        if (maxThreads <= 0)
            throw new Error(`max-threads must be greater than 0, max-threads: ${maxThreads}`);

        this.maxThreads = maxThreads;
    }

    /**
     * 
     * @param {File} src 
     * @param {File} dest 
     */
    async transcode(src, dest) {
        await this.transcodeWithTranscoder(src, dest);
    }

    async transcodeWithTranscoder(src, dest) {
        let transcoder;
        try  {
            transcoder = new Transcoder(src);
            await transcoder.setIncludeFileMetaInformation(true);
            await transcoder.setRetainFileMetaInformation(true);
            await transcoder.setEncodingOptions(this.encOpts);
            await transcoder.setDestinationTransferSyntax(this.transferSyntaxUid);
            await transcoder.setCompressParams([]);
            const proxy = createTranscoder$HandlerProxy({
                newOutputStream: async (transcoder1, dataset) => await FileOutputStream.newInstanceAsync(dest)
            });
            await transcoder.transcode(proxy);
        } catch ( e) {
            throw e;
        } finally {
            await transcoder.close();
        }
    }
}

module.exports.LocalDcm2Dcm = LocalDcm2Dcm;
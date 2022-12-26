/**
 * @typedef DicomToJpegCommandOptions
 * @property {string} windowCenter
 * @property {string} windowWidth
 * @property {string} frameNumber
 * @property {string} dicomFilename
 * @property {string} jpegFilename
 */

class DicomToJpegCommand {
    /**
     * 
     * @param {DicomToJpegCommandOptions} options 
     */
    constructor(options) {
        /** @type {DicomToJpegCommandOptions} */
        this.options = options;
    }

    getFrameCommandStringByOs() {

        let execCmd = "";
        if (process.env.OS === "windows") {
            execCmd = this.getFrameCommandStringByWindowOs_();
        } else if (process.env.OS === "linux") {
            execCmd = this.getFrameCommandStringByLinuxOs_();
        }
        return execCmd;

    }

    /**
     * @private
     */
    getFrameCommandStringByWindowOs_() {
        let execCmd = "";
        if (this.options.windowCenter && this.options.windowWidth) {
            execCmd = `models/DICOM/dcmtk/dcmtk-3.6.5-win64-dynamic/bin/dcmj2pnm.exe --write-jpeg "${
                this.options.dicomFilename
            }" "${this.options.jpegFilename}.${
                this.options.frameNumber - 1
            }.jpg" --frame ${this.options.frameNumber} +Ww ${this.options.windowCenter} ${
                this.options.windowWidth
            }`;
        } else {
            execCmd = `models/DICOM/dcmtk/dcmtk-3.6.5-win64-dynamic/bin/dcmj2pnm.exe --write-jpeg "${
                this.options.dicomFilename
            }" "${this.options.jpegFilename}.${
                this.options.frameNumber - 1
            }.jpg" --frame ${this.options.frameNumber}`;
        }
        return execCmd;
    }

    /**
     * @private
     */
    getFrameCommandStringByLinuxOs_() {
        let execCmd = "";
        if (this.options.windowCenter && this.options.windowWidth) {
            execCmd = `dcmj2pnm --write-jpeg "${this.options.dicomFilename}" "${
                this.options.jpegFilename - 1
            }.${this.options.frameNumber}.jpg" --frame ${this.options.frameNumber} +Ww ${
                this.options.windowCenter
            } ${this.options.windowWidth}`;
        } else {
            execCmd = `dcmj2pnm --write-jpeg "${this.options.dicomFilename}" "${
                this.options.jpegFilename - 1
            }.${this.options.frameNumber}.jpg" --frame ${this.options.frameNumber}`;
        }
        return execCmd;
    }
}

module.exports.DicomToJpegCommand = DicomToJpegCommand;
const _ = require("lodash");
const fs = require("fs");
const { java } = require("./java-instance");
const { File } = require("./wrapper/java/io/File");
const { Dcm2Jpg } = require("./wrapper/org/dcm4che3/tool/dcm2jpg/Dcm2Jpg");
const { createDcm2Jpg$ReadImageProxy } = require("./wrapper/org/dcm4che3/tool/dcm2jpg/Dcm2Jpg$ReadImage");
const { ICCProfile$Option } = require("./wrapper/org/dcm4che3/image/ICCProfile$Option");
const { Float } = require("./wrapper/java/lang/Float");

/**
 * @typedef Dcm2JpgOptions
 * @property {string} dicomFile
 * @property {string} jpgFile
 * @property {string} iccProfileName
 * @property {number} frameNumber
 * @property {number} jpgQuality
 * @property {number} windowCenter
 * @property {number} windowWidth
 * @property {string} format
 */


class JsDcm2Jpeg {

    /** @type {Dcm2JpgOptions} */
    static defaultOptions={ format: "JPEG", jpgQuality: 0.9, frameNumber: 1 };
    
    /**
     * 
     * @param {Dcm2JpgOptions} options
     */
    constructor(options = { format: "JPEG", jpgQuality: 0.9, frameNumber: 1 }) {
        /** @type {Dcm2Jpg} */
        this.dcm2jpg;

        this.options = options;
    }

    async init() {
        this.dcm2jpg = await Dcm2Jpg.newInstanceAsync();

        const readImageProxy = createDcm2Jpg$ReadImageProxy({
            apply: (file) => {
                return this.dcm2jpg.readImageFromDicomInputStreamSync(file);
            }
        }, {
            keepAsDaemon: true
        });

        await this.dcm2jpg.setReadImage(readImageProxy);
        await this.dcm2jpg.setICCProfile(await ICCProfile$Option.valueOf("no"));
        await this.dcm2jpg.setFrame(this.options.frameNumber);

        await this.initSetWindowCenter();
        await this.initSetWindowWidth();
        
        await this.dcm2jpg.initImageWriter(this.options.format,
            null,
            "com.sun.imageio.plugins.*",
            null,
            await Float.newInstanceAsync(this.options.jpgQuality)
        );

        readImageProxy.reset();

        return this;
    }

    async convert(src, dest) {

        if (_.isString(src)) {
            src = await File.newInstanceAsync(src);
        }

        if (_.isString(dest)) {
            dest = await File.newInstanceAsync(dest);
        }

        await this.dcm2jpg.convert(src, dest);
    }

    /**
     * @private
     */
    async initSetWindowWidth() {
        if (this.options.windowWidth) {
            await this.dcm2jpg.setWindowWidth(this.options.windowWidth);
        }
    }

    /**
     * @private
     */
    async initSetWindowCenter() {
        if (this.options.windowCenter) {
            await this.dcm2jpg.setWindowCenter(this.options.windowCenter);
        }
    }

    async getFrameImage(imagesPath , frameNumber) {
        let jpegFile = imagesPath.replace(/\.dcm\b/gi , `.${frameNumber-1}.jpg`);

        try {
            await this.dcm2jpg.setFrame(frameNumber);

            await this.convert(imagesPath, jpegFile);

            let rs = fs.createReadStream(jpegFile);
            return {
                status : true , 
                imageStream : rs,
                imagePath: jpegFile
            };
        } catch(e) {
            console.error(e);
            return {
                status : false ,
                imageStream : e,
                imagePath: jpegFile
            };
        }
    }
}

module.exports.JsDcm2Jpeg = JsDcm2Jpeg;
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
    constructor() {
        /** @type {Dcm2Jpg} */
        this.dcm2jpg;
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
        await this.dcm2jpg.initImageWriter(JsDcm2Jpeg.defaultOptions.format,
            null,
            "com.sun.imageio.plugins.*",
            null,
            await Float.newInstanceAsync(JsDcm2Jpeg.defaultOptions.jpgQuality)
        );

        return this;
    }

    async convert(src, dest, options) {

        if (options.frameNumber) {
            await this.dcm2jpg.setFrame(options.frameNumber);
        }
        
        await this.dcm2jpg.initImageWriter(options.format || JsDcm2Jpeg.defaultOptions.format,
            null,
            "com.sun.imageio.plugins.*",
            null,
            await Float.newInstanceAsync(options.jpgQuality ||JsDcm2Jpeg.defaultOptions.jpgQuality)
        );
        await this.initSetWindowCenter(options);
        await this.initSetWindowWidth(options);

        if (_.isString(src)) {
            src = await File.newInstanceAsync(src);
        }

        if (_.isString(dest)) {
            dest = await File.newInstanceAsync(dest);
        }

        await this.dcm2jpg.convert(src, dest);
        java.importClass("java.lang.System").gc();
    }

    /**
     * @private
     */
    async initSetWindowWidth(options) {
        if (options.windowWidth) {
            await this.dcm2jpg.setWindowWidth(options.windowWidth);
        }
    }

    /**
     * @private
     */
    async initSetWindowCenter(options) {
        if (options.windowCenter) {
            await this.dcm2jpg.setWindowCenter(options.windowCenter);
        }
    }

    async getFrameImage(imagesPath , options={}) {
        let { frameNumber } = options;
        let jpegFile = imagesPath.replace(/\.dcm\b/gi , `.${frameNumber-1}.jpg`);

        try {

            await this.convert(imagesPath, jpegFile, {
                ...JsDcm2Jpeg.defaultOptions,
                ...options
            });

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
module.exports.jsDcm2Jpeg = new JsDcm2Jpeg();
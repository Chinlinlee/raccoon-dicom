const uuid = require('uuid');
const fs = require('fs');
const _ = require('lodash');
const { execSync, execFileSync } = require('child_process');
const imagemagickCli = require('imagemagick-cli');
class Magick {
    constructor(imageFilename) {
        this.tempFilename = `tempUploadFiles/${uuid.v4()}.jpg`;
        this.magickPrefix = process.env.OS == 'linux' ? 'convert' : 'magick';
        this.magickCommand = [];
        fs.copyFileSync(imageFilename, this.tempFilename);
    }

    /**
     * @param {number} q
     */
    quality(q) {
        try {
            this.magickCommand.push("-quality");
            this.magickCommand.push(q);
            return this;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }

    iccProfile(profile) {
        try {
            this.magickCommand.push("-profile");
            this.magickCommand.push(profile);
            /*await imagemagickCli.exec(`${this.magickPrefix} ${this.tempFilename} -profile ${profile} ${this.tempFilename}`)*/
            /*execFileSync(exiftool, [`-icc_profile<=${profile}`, this.tempFilename, `-overwrite_original`]);*/
        } catch(e) {
            console.error(e);
            throw e;
        }
    }

    crop(left, top, width, height) {
        left = (left < 0) ? `-${left}` : `+${left}`;
        top = (top < 0) ? `-${top}` : `+${top}`;
        this.magickCommand.push("-crop");
        
        this.magickCommand.push(`${width}x${height}${left}${top}`);
    }

    resize(width, height) {
        this.magickCommand.push("-resize");
        this.magickCommand.push(`${width}x${height}!`);
    }

    /**
     *  reflect the scanlines in the vertical direction. The image will be mirrored upside-down.
     */
    flip() {
        this.magickCommand.push("-flip");
    }
    
    /**
     * Reflect the scanlines in the horizontal direction, just like the image in a vertical mirror.
     */
    flop() {
        this.magickCommand.push("-flop");
    }
    
    async execCommand() {
        try {
            if (this.magickCommand.length > 0) {
                await imagemagickCli.exec(`${this.magickPrefix} ${this.tempFilename} ${this.magickCommand.join(" ")} ${this.tempFilename}`);
            }
        } catch(e) {
            console.error(e);
            throw e;
        }
    }
    /**
     * Finally use to get temp image buffer and remove temp file
     * @return {Buffer}
     */
    toBuffer() {
        try {
            let fileBuffer = fs.readFileSync(this.tempFilename);
            let fileBufferClone = _.cloneDeep(fileBuffer);
            fs.unlink(this.tempFilename, (err)=> {
                if (err)
                console.error(`delete temp image file error : ${err}`);
            });
            return fileBufferClone;
        } catch(e) {
            console.error(e);
            throw e;
        }
    }
}

module.exports = Magick;
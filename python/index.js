const axios = require("axios");
const { exec } = require("child_process");
const fs = require("fs");
const { raccoonConfig } = require("../config-class");

const {
    enable: isEnableDcm2Jpeg,
    apiHost: dcm2JpegApiHost,
    apiPort: dcm2JpegApiPort,
    useConda,
    condaPath,
    condaGdcmEnvName: condaEnvName
} = raccoonConfig.dcm2JpegConfig;

const getJpeg = {
    linux: {
        getJpegByPyDicom: async function (store_Path, frameNumber = 1) {
            if (isEnableDcm2Jpeg) {
                let { data } = await axios.post(
                    `http://${dcm2JpegApiHost}:${dcm2JpegApiPort}/dcm2jpeg?filename=${store_Path}&frameNumber=${frameNumber}`
                );
                if (data.status) {
                    return Promise.resolve(true);
                }
            } else {
                exec(
                    `python3 DICOM2JPEG.py ${store_Path}`,
                    {
                        cwd: process.cwd()
                    },
                    function (err, stdout, stderr) {
                        if (err) {
                            console.error(err);
                            return Promise.reject(err);
                        } else if (stderr) {
                            console.error(stderr);
                            return Promise.reject(stderr);
                        }
                        return Promise.resolve(true);
                    }
                );
            }
        }
    },
    windows: {
        getJpegByPyDicom: async function (store_Path, frameNumber = 1) {
            if (isEnableDcm2Jpeg) {
                let { data } = await axios.post(
                    `http://${dcm2JpegApiHost}:${dcm2JpegApiPort}/dcm2jpeg?filename=${store_Path}&frameNumber=${frameNumber}`
                );
                if (data.status) {
                    return Promise.resolve(true);
                }
            } else {
                let cmd = `python DICOM2JPEG.py ${store_Path}`;
                if (useConda)
                    cmd = `${condaPath} run -n ${condaEnvName} python DICOM2JPEG.py ${store_Path}`;
                exec(
                    `${cmd}`,
                    {
                        cwd: process.cwd()
                    },
                    function (err, stdout, stderr) {
                        if (err) {
                            console.error(err);
                            return Promise.reject(err);
                        } else if (stderr) {
                            console.error(stderr);
                            return Promise.reject(stderr);
                        }
                        return Promise.resolve(true);
                    }
                );
            }
        }
    }
};

/**
 * 
 * @param {string} imagesPath 
 * @param {number} frameNumber 
 */
async function getFrameImage(imagesPath, frameNumber) {
    let jpegFile = imagesPath.replace(/\.dcm\b/gi , `.${frameNumber-1}.jpg`);
    try {
        let status = await getJpeg[process.env.OS].getJpegByPyDicom(
            imagesPath,
            frameNumber
        );
        let rs = fs.createReadStream(jpegFile);
        return {
            status: status,
            imageStream: rs,
            imagePath: jpegFile
        };
    } catch(e) {
        console.error(e);
        return {
            status: false,
            imageStream: e,
            imagePath: jpegFile
        };
    }
}

module.exports = {
    getJpeg: getJpeg,
    getFrameImage: getFrameImage
};

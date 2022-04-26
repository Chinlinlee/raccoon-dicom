const axios = require('axios');
const { exec } = require('child_process');
const condaPath = process.env.CONDA_PATH;
const condaEnvName = process.env.CONDA_GDCM_ENV_NAME;

const getJpeg = {
    'linux': {
        'getJpegByPyDicom': async function (store_Path, frameNumber=1) {
            return new Promise(async (resolve, reject) => {
                if (process.env.USE_DCM2JPEG_PYTHONAPI) {
                    let { data } = await axios.post(`http://localhost:${process.env.DCM2JPEG_PYTHONAPI_PORT}/dcm2jpeg?filename=${store_Path}&frameNumber=${frameNumber}`);
                    if (data.status) {
                        return resolve(true);
                    }
                } else {
                    exec(`python3 DICOM2JPEG.py ${store_Path}`, {
                        cwd: process.cwd()
                    }, function (err, stdout, stderr) {
                        if (err || stderr) {
                            console.error(err);
                            return resolve(new Error(err));
                        } else if (stderr) {
                            console.error(stderr);
                            return reject(new Error(stderr));
                        }
                        return resolve(true);
                    });
                }
            });
        }
    },
    'windows': {
        'getJpegByPyDicom': async function (store_Path, frameNumber=1) {
            return new Promise(async (resolve, reject) => {
                if (process.env.USE_DCM2JPEG_PYTHONAPI) {
                    let { data } = await axios.post(`http://localhost:${process.env.DCM2JPEG_PYTHONAPI_PORT}/dcm2jpeg?filename=${store_Path}&frameNumber=${frameNumber}`);
                    if (data.status) {
                        return resolve(true);
                    }
                } else {
                    let cmd = `python DICOM2JPEG.py ${store_Path}`;
                    if(process.env.USE_CONDA === "true") cmd = `${condaPath} run -n ${condaEnvName} python DICOM2JPEG.py ${store_Path}`;
                    exec(`${cmd}`, {
                        cwd: process.cwd()
                    }, function (err, stdout, stderr) {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        } else if (stderr) {
                            console.log(stderr);
                            return reject(stderr);
                        }
                        return resolve(true);
                    });
                }
            })
        }
    }
}

module.exports = {
    getJpeg : getJpeg
}
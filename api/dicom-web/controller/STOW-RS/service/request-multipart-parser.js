const formidable = require("formidable");
const path = require("path");
const _ = require("lodash");

class StowRsRequestMultipartParser {
    /**
     * @param {import('http').IncomingMessage} req
     */
    constructor(req) {
        this.request = req;
    }

    /**
    *
    * @return {Promise<import('../../../../../utils/typeDef/STOW-RS/STOW-RS.def').MultipartParseResult>}
    */
    async parse() {
        return new Promise((resolve, reject) => {
            new formidable.IncomingForm({
                uploadDir: path.join(process.cwd(), "/tempUploadFiles"),
                maxFileSize: 100 * 1024 * 1024 * 1024,
                multiples: true,
                isGetBoundaryInData: true
            }).parse(this.request, async (err, fields, files) => {

                if (err) {
                    return reject(err);
                }

                let fileField = Object.keys(files).pop();
                let uploadFiles = files[fileField];
                if (!_.isArray(uploadFiles)) uploadFiles = [uploadFiles];

                return resolve({
                    status: true,
                    multipart: {
                        fields: fields,
                        files: uploadFiles
                    }
                });

            });
        });
    }
}

module.exports.StowRsRequestMultipartParser = StowRsRequestMultipartParser;
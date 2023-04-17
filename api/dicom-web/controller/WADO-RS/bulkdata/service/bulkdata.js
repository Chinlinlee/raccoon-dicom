const fs = require("fs");
const path = require("path");
const dicomBulkDataModel = require("../../../../../../models/mongodb/models/dicomBulkData");
const dicomModel = require("../../../../../../models/mongodb/models/dicom");
const { MultipartWriter } = require("../../../../../../utils/multipartWriter");
const { streamToBuffer } = require("@jorgeferrero/stream-to-buffer");
const { raccoonConfig } = require("../../../../../../config-class");

class BulkDataService {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        this.request = req;
        this.response = res;
        this.multipartWriter = new MultipartWriter([], req, res);
        this.multipartWriter.setHeaderMultipartRelatedContentType("application/octet-stream");
    }

    /**
     * 
     * @param {import("../../../../../../utils/typeDef/bulkdata").BulkData |
     * import("../../../../../../utils/typeDef/WADO-RS/WADO-RS.def").ImagePathObj } bulkData 
     */
    async writeBulkData(bulkData) {
        let absFilename;
        // is imagePathObj
        if(bulkData.instancePath) {
            absFilename = bulkData.instancePath;
        } else {
            absFilename = path.join(raccoonConfig.dicomWebConfig.storeRootPath, bulkData.filename);
        }
        let fileStream = fs.createReadStream(absFilename);
        let fileBuffer = await streamToBuffer(fileStream);

        this.multipartWriter.writeBoundary();
        this.multipartWriter.writeContentType("application/octet-stream");
        this.multipartWriter.writeContentLength(fileBuffer.length);
        
        let urlPath = `/dicom-web/studies/${bulkData.studyUID}/series/${bulkData.seriesUID}/instances/${bulkData.instanceUID}/bulkdata/${bulkData.binaryValuePath}`;
        if (bulkData.instancePath) {
            urlPath = `/dicom-web/studies/${bulkData.studyUID}/series/${bulkData.seriesUID}/instances/${bulkData.instanceUID}`;
        }
        this.multipartWriter.writeContentLocation(urlPath);
        this.multipartWriter.writeBufferData(fileBuffer);
    }

    async getSpecificBulkData() {

        let {
            studyUID,
            seriesUID,
            instanceUID,
            binaryValuePath
        } = this.request.params;

        let bulkData = await dicomBulkDataModel.findOne({
            $and: [
                {
                    studyUID
                },
                {
                    seriesUID
                },
                {
                    instanceUID
                },
                {
                    binaryValuePath: {
                        $regex: `^${binaryValuePath}`,
                        $options: "gm"
                    }
                }
            ]
        }).exec();

        return bulkData;
    }

    async getStudyBulkData() {
        let {
            studyUID
        } = this.request.params;

        let studyBulkDataArray = await dicomBulkDataModel.find({
            $and: [
                {
                    studyUID
                }
            ]
        }).exec();

        return studyBulkDataArray;
    }

    async getSeriesBulkData() {
        let {
            studyUID,
            seriesUID
        } = this.request.params;

        let seriesBulkDataArray = await dicomBulkDataModel.find({
            $and: [
                {
                    studyUID
                },
                {
                    seriesUID
                }
            ]
        }).exec();

        return seriesBulkDataArray;
    }

    async getInstanceBulkData() {
        let {
            studyUID,
            seriesUID,
            instanceUID
        } = this.request.params;

        let instanceBulkDataArray = await dicomBulkDataModel.find({
            $and: [
                {
                    studyUID
                },
                {
                    seriesUID
                },
                {
                    instanceUID
                }
            ]
        }).exec();

        return instanceBulkDataArray;
    }
}


module.exports.BulkDataService = BulkDataService;
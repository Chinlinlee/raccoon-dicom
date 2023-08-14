const { BulkDataService } = require("@root/api/dicom-web/controller/WADO-RS/bulkdata/service/bulkdata");
const { DicomBulkDataModel } = require("@models/sql/models/dicomBulkData.model");
const { Op } = require("sequelize");

class SqlBulkDataService extends BulkDataService {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     */
    constructor(req, res) {
        super(req, res);
    }


    async getSpecificBulkData() {

        let {
            studyUID,
            seriesUID,
            instanceUID,
            binaryValuePath
        } = this.request.params;

        /** @type { import("sequelize").FindOptions } */
        let findOption = {
            where: {
                studyUID,
                seriesUID,
                instanceUID,
                binaryValuePath: {
                    [Op.like]: `%${binaryValuePath}%`
                }
            }
        };

        let bulkData = await DicomBulkDataModel.findOne(findOption);

        return bulkData;
    }

    async getStudyBulkData() {
        let {
            studyUID
        } = this.request.params;

        let studyBulkDataArray = await DicomBulkDataModel.findAll({
            where: {
                studyUID
            }
        });

        return studyBulkDataArray;
    }

    async getSeriesBulkData() {
        let {
            studyUID,
            seriesUID
        } = this.request.params;

        let seriesBulkDataArray = await DicomBulkDataModel.findAll({
            where: {
                studyUID,
                seriesUID
            }
        });

        return seriesBulkDataArray;
    }

    async getInstanceBulkData() {
        let {
            studyUID,
            seriesUID,
            instanceUID
        } = this.request.params;

        let instanceBulkDataArray = await DicomBulkDataModel.findAll({
            where: {
                studyUID,
                seriesUID,
                instanceUID
            }
        });

        return instanceBulkDataArray;
    }
}


module.exports.BulkDataService = SqlBulkDataService;
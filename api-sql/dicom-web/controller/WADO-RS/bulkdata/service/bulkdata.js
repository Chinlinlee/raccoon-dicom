const {
    BulkDataService,
    StudyBulkDataFactory,
    SeriesBulkDataFactory,
    InstanceBulkDataFactory,
    SpecificBulkDataFactory
} = require("@root/api/dicom-web/controller/WADO-RS/bulkdata/service/bulkdata");
const { DicomBulkDataModel } = require("@models/sql/models/dicomBulkData.model");
const { Op } = require("sequelize");

StudyBulkDataFactory.prototype.getBulkData = async function () {
    let {
        studyUID
    } = this.uids;

    let studyBulkDataArray = await DicomBulkDataModel.findAll({
        where: {
            studyUID
        }
    });

    return studyBulkDataArray;
};

SeriesBulkDataFactory.prototype.getBulkData = async function () {
    let {
        studyUID,
        seriesUID
    } = this.uids;

    let seriesBulkDataArray = await DicomBulkDataModel.findAll({
        where: {
            studyUID,
            seriesUID
        }
    });

    return seriesBulkDataArray;
};

InstanceBulkDataFactory.prototype.getBulkData = async function () {
    let {
        studyUID,
        seriesUID,
        instanceUID
    } = this.uids;

    let instanceBulkDataArray = await DicomBulkDataModel.findAll({
        where: {
            studyUID,
            seriesUID,
            instanceUID
        }
    });

    return instanceBulkDataArray;
};

SpecificBulkDataFactory.prototype.getBulkData = async function () {
    let {
        studyUID,
        seriesUID,
        instanceUID,
        binaryValuePath
    } = this.uids;

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
};

module.exports.BulkDataService = BulkDataService;
module.exports.StudyBulkDataFactory = StudyBulkDataFactory;
module.exports.SeriesBulkDataFactory = SeriesBulkDataFactory;
module.exports.InstanceBulkDataFactory = InstanceBulkDataFactory;
module.exports.SpecificBulkDataFactory = SpecificBulkDataFactory;
const fs = require("fs");
const path = require("path");
const { DicomBulkDataModel } = require("@dbModels/dicomBulkData.model");
const { MultipartWriter } = require("../../../../../../utils/multipartWriter");
const { streamToBuffer } = require("@jorgeferrero/stream-to-buffer");
const { raccoonConfig } = require("../../../../../../config-class");

class BulkDataService {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {typeof StudyBulkDataFactory | typeof SeriesBulkDataFactory | typeof InstanceBulkDataFactory | typeof SpecificBulkDataFactory } bulkDataFactory
     */
    constructor(req, res, bulkDataFactory) {
        this.request = req;
        this.response = res;
        this.bulkDataFactory = new bulkDataFactory({ ...this.request.params });
        this.multipartWriter = new MultipartWriter([], req, res);
        this.multipartWriter.setHeaderMultipartRelatedContentType("application/octet-stream");
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/bulkdata").BulkData |
     * import("@root/utils/typeDef/dicomImage").ImagePathObj } bulkData 
     */
    async writeBulkData(bulkData) {
        let absFilename;
        // is imagePathObj
        if (bulkData.instancePath) {
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

    async getBulkData() {
        return await this.bulkDataFactory.getBulkData();
    }

}

class BulkDataFactory {
    /**
     * 
     * @param {Pick<import("@root/utils/typeDef/dicom").DicomUid, "studyUID" | "seriesUID" | "instanceUID">} uids 
     */
    constructor(uids) {
        /** @type {Pick<import("@root/utils/typeDef/dicom").DicomUid, "studyUID" | "seriesUID" | "instanceUID">} */
        this.uids = uids;
    }

    getBulkData() {
        throw new Error("Abstract method, not implement");
    }
}

class StudyBulkDataFactory extends BulkDataFactory {
    constructor(uids) {
        super(uids);
    }

    async getBulkData() {
        let {
            studyUID
        } = this.uids;

        return await DicomBulkDataModel.findStudyBulkData({ studyUID });
    }
}

class SeriesBulkDataFactory extends BulkDataFactory {
    constructor(uids) {
        super(uids);
    }

    async getBulkData() {
        let {
            studyUID,
            seriesUID
        } = this.uids;

        return await DicomBulkDataModel.findSeriesBulkData({
            studyUID,
            seriesUID
        });

    }
}


class InstanceBulkDataFactory extends BulkDataFactory {
    constructor(uids) {
        super(uids);
    }

    async getBulkData() {
        let {
            studyUID,
            seriesUID,
            instanceUID
        } = this.uids;

        return await DicomBulkDataModel.findInstanceBulkData({
            studyUID,
            seriesUID,
            instanceUID
        });
    }
}

class SpecificBulkDataFactory extends BulkDataFactory {
    constructor(uids) {
        super(uids);
    }

    async getBulkData() {

        let {
            studyUID,
            seriesUID,
            instanceUID,
            binaryValuePath
        } = this.uids;

        return await DicomBulkDataModel.findSpecificBulkData({
            studyUID,
            seriesUID,
            instanceUID,
            binaryValuePath
        });

    }
}

module.exports.BulkDataService = BulkDataService;
module.exports.StudyBulkDataFactory = StudyBulkDataFactory;
module.exports.SeriesBulkDataFactory = SeriesBulkDataFactory;
module.exports.InstanceBulkDataFactory = InstanceBulkDataFactory;
module.exports.SpecificBulkDataFactory = SpecificBulkDataFactory;
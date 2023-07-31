const _ = require("lodash");

const { DicomJsonModel } = require("@models/DICOM/dicom-json-model");


class SqlDicomJsonModel extends DicomJsonModel {
    constructor(dicomJson) {
        super(dicomJson);
    }

    async storeToDb(dicomFileSaveInfo) {
        let dicomJsonClone = _.cloneDeep(this.dicomJson);
        try {
            let mediaStorage = this.getMediaStorageInfo();
            _.merge(dicomJsonClone, this.uidObj);
            _.merge(dicomJsonClone, {
                studyPath: dicomFileSaveInfo.studyPath,
                seriesPath: dicomFileSaveInfo.seriesPath,
                instancePath: dicomFileSaveInfo.relativePath
            });
            _.merge(dicomJsonClone, mediaStorage);

            delete dicomJsonClone.sopClass;
            delete dicomJsonClone.sopInstanceUID;

            await Promise.all([
                this.storePatientCollection(dicomJsonClone)
            ]);
        } catch(e) {
            throw e;
        }
    }

    async storePatientCollection(dicomJson) {
        console.log(dicomJson);
        console.log("TODO: Store Patient");
    }
}


module.exports.SqlDicomJsonModel = SqlDicomJsonModel;
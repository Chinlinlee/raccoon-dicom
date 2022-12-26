const mongoose = require("mongoose");
const {
    DICOMFHIRConverter
} = require("../../../../../models/FHIR/DICOM/DICOMToFHIR");
const { fhirLogger } = require("../../../../../utils/log");

const { raccoonConfig } = require("../../../../../config-class");

const {
    apiPath: DICOM_WEB_API_PATH
} = raccoonConfig.dicomWebConfig;

const {
    baseUrl: FHIR_BASE_URL
} = raccoonConfig.fhirConfig;

class DicomFhirService {
    constructor(req, dicomJsonModel) {
        this.request = req;
        this.dicomJsonModel = dicomJsonModel;

        /**
         * @private
         */
        this.dicomFhirConverter = new DICOMFHIRConverter();
    }

    async initDicomFhirConverter() {
        this.dicomFhirConverter.dicomWeb.name =`raccoon-dicom-web-server`;
        let protocol = this.request.secure ? "https" : "http";
        this.dicomFhirConverter.dicomWeb.retrieveStudiesUrl = `${protocol}://${this.request.headers.host}/${DICOM_WEB_API_PATH}/studies`;
        this.dicomFhirConverter.fhir.baseUrl = FHIR_BASE_URL;
    }

    async postDicomToFhirServerAndStoreLog() {
        await this.dicomFhirConverter.dicomJsonToFHIR(this.dicomJsonModel.dicomJson);

        try {
            await this.dicomFhirConverter.postDicomFhir();

            let logObj = {
                studyUID: this.dicomJsonModel.uidObj.studyUID,
                seriesUID: this.dicomJsonModel.uidObj.seriesUID,
                instanceUID: this.dicomJsonModel.uidObj.sopInstanceUID,
                status: true,
                message: "success"
            };
            await this.storeSyncedFHIRLog_(logObj);

        } catch(e) {
            
            let errorStr = JSON.stringify(e, Object.getOwnPropertyNames(e));
            fhirLogger.error(
                `[FHIR] [DICOM sync to FHIR server error] [${errorStr}]`
            );
            let errorLogObj = {
                studyUID: this.dicomJsonModel.uidObj.studyUID,
                seriesUID: this.dicomJsonModel.uidObj.seriesUID,
                instanceUID: this.dicomJsonModel.uidObj.sopInstanceUID,
                status: false,
                message: errorStr
            };
            await this.storeSyncedFHIRLog_(errorLogObj);

        }
        
    }

    /**
     * @private
     */
    async storeSyncedFHIRLog_(logObj) {
        try {
            await mongoose.model("syncFHIRLog").findOneAndUpdate(
                {
                    $and: [
                        {
                            studyUID: this.dicomJsonModel.uidObj.studyUID
                        },
                        {
                            seriesUID: this.dicomJsonModel.uidObj.seriesUID
                        },
                        {
                            instanceUID: this.dicomJsonModel.uidObj.sopInstanceUID
                        }
                    ]
                },
                logObj,
                {
                    upsert: true
                }
            );
        } catch(e) {
            throw e;
        }
    }

}


module.exports.DicomFhirService = DicomFhirService;
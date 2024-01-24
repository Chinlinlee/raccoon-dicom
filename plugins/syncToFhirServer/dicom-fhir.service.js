const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
const {
    DicomFhirConverter
} = require("./DICOMToFHIR");
const { fhirLogger } = require("../../utils/logs/log");

const { raccoonConfig } = require("../../config-class");

const {
    apiPath: DICOM_WEB_API_PATH
} = raccoonConfig.dicomWebConfig;


let pluginConfigFile = path.join(__dirname, "../config.template.js");
if (fs.existsSync(path.join(__dirname, "../config.js"))) {
    pluginConfigFile = path.join(__dirname, "../config.js");
}

const fhirBaseUrl = require(pluginConfigFile).pluginsConfig?.syncToFhirServer?.fhir?.server?.baseUrl;

class DicomFhirService {
    constructor(req, dicomJsonModel) {
        if (!fhirBaseUrl) {
            throw new Error("missing fhir config in your plugin config");
        }

        this.request = req;
        this.dicomJsonModel = dicomJsonModel;

        /**
         * @private
         */
        this.dicomFhirConverter = new DicomFhirConverter();
    }

    async initDicomFhirConverter() {
        this.dicomFhirConverter.dicomWeb.name =`raccoon-dicom-web-server`;
        let protocol = this.request.secure ? "https" : "http";
        this.dicomFhirConverter.dicomWeb.retrieveStudiesUrl = `${protocol}://${this.request.headers.host}/${DICOM_WEB_API_PATH}/studies`;
        this.dicomFhirConverter.fhir.baseUrl = fhirBaseUrl;
    }

    async postDicomToFhirServerAndStoreLog() {
        await this.dicomFhirConverter.dicomJsonToFHIR(this.dicomJsonModel.dicomJson);

        try {
            await this.dicomFhirConverter.postDicomFhir();

            let logObj = {
                studyUID: this.dicomJsonModel.uidObj.studyUID,
                seriesUID: this.dicomJsonModel.uidObj.seriesUID,
                instanceUID: this.dicomJsonModel.uidObj.instanceUID,
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
                instanceUID: this.dicomJsonModel.uidObj.instanceUID,
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
                            instanceUID: this.dicomJsonModel.uidObj.instanceUID
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
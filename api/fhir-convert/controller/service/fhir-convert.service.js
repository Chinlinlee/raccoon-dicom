const { DicomJsonToFhir } = require("dicomjson-to-fhir");
const { raccoonConfig } = require("@root/config-class");
const Joi = require("joi");
const { DicomWebServiceError, DicomWebStatusCodes } = require("@error/dicom-web-service");
const { JDcm2Json } = require("@models/DICOM/dcm4che/dcm2json");

const fileSchema = Joi.object({
    files: Joi.object({
        file: Joi.object({
            filepath: Joi.string().required()
        }).required()
    }).required()
});

class FhirConvertService {
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async convert() {
        let { value, error } = fileSchema.validate(this.request, { allowUnknown : true});
        if (error) {
            throw new DicomWebServiceError(DicomWebStatusCodes.InvalidArgumentValue, error.details[0].message, 400);
        }
        let dicomJson = await JDcm2Json.get(this.request.files.file.filepath);
        let protocol = this.request.secure ? "https" : "http";
        let dicomJsonToFhir = new DicomJsonToFhir(
            dicomJson,
            "raccoon-dicom-web-server",
            `${protocol}://${this.request.headers.host}/${raccoonConfig.dicomWebConfig.apiPath}/studies`
        );
        return dicomJsonToFhir.getFhirJson();
    }
}

module.exports.FhirConvertService = FhirConvertService;
const { StudyModel } = require("@models/sql/models/study.model");
const { DicomFhirConverter } = require("../syncToFhirServer/DICOMToFHIR");
const { DicomJsonToFhir } = require("dicomjson-to-fhir");

class SqlDicomFhirConverter extends DicomFhirConverter {
    constructor() {
        super();
    }

        /**
     *
     * @param {JSON} dicomJson The DICOM Json model
     */
        async dicomJsonToFHIR(dicomJson) {
            this.dicomFHIR = new DicomJsonToFhir(
                dicomJson,
                this.dicomWeb.retrieveStudiesUrl,
                this.dicomWeb.name
            ).getFhirJson();
            if (!this.dicomFHIR.imagingStudy.subject.reference.includes(this.dicomFHIR.patient.id)) {
                this.dicomFHIR.imagingStudy.subject.reference = `Patient/${this.dicomFHIR.patient.id}`;
            }
            await this.setModalitiesInStudy(dicomJson);
            this.dicomFHIR.imagingStudy.endpoint = [
                {
                    reference: `Endpoint/${this.dicomFHIR.endpoint.id}`,
                    type: "Endpoint"
                }
            ];
            return this.dicomFHIR;
        }

    async setModalitiesInStudy(dicomJson) {
        let studyModalities = [];
        let modalitiesInStudy = await this.getModalitiesInStudy({
            studyUID: dicomJson["0020000D"].Value[0]
        });
        if (modalitiesInStudy.length > 0) {
            
            for (let i = 0; i < modalitiesInStudy.length; i++) {
                let modality = {
                    system: "http://dicom.nema.org/resources/ontology/DCM",
                    code: modalitiesInStudy[i]
                };
                studyModalities.push(modality);
            }
            this.dicomFHIR.imagingStudy.modality = studyModalities;
        }
    }

    async getModalitiesInStudy({ studyUID }) {
        let item = await StudyModel.findOneByDicomUID({ studyUID });
        return  item.json?.["00080061"]?.["Value"];
    }
}


module.exports.DicomFhirConverter = SqlDicomFhirConverter;
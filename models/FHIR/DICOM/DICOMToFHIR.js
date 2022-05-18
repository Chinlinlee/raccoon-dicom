const { URL } = require("url");
const axios = require("axios").default;
const _ = require("lodash");
const { urlJoin } = require("../../../utils/url");
const { fhirLogger } = require("../../../utils/log");
const { dicomJsonToFHIRImagingStudy } = require("./DICOMToFHIRImagingStudy");
const { dicomJsonToFHIRPatient } = require("./DICOMToFHIRPatient");
const { dicomJsonToFHIREndpoint } = require("./DICOMToFHIREndpoint");
const { getModalitiesInStudy } = require("../../../models/mongodb/models/dicom");

class DICOMFHIRConverter {
    constructor() {
        this.dicomFHIR = {
            patient: {},
            endpoint: {},
            imagingStudy: {}
        };
        this.fhirPatient = {};
        this.fhirEndpoint = {};
        this.fhirImagingStudy = {};
        this.dicomWeb = {
            retrieveStudiesUrl: "",
            name: ""
        };
        this.fhir = {
            baseUrl: ""
        };
    }

    /**
     *
     * @param {JSON} dicomJson The DICOM Json model
     */
    async dicomJsonToFHIR(dicomJson) {
        let patient = dicomJsonToFHIRPatient(dicomJson);
        let imagingStudy = dicomJsonToFHIRImagingStudy(dicomJson);
        if (!imagingStudy.subject.reference.includes(patient.id)) {
            imagingStudy.subject.reference = `Patient/${patient.id}`;
        }
        let endpoint = dicomJsonToFHIREndpoint(
            this.dicomWeb.retrieveStudiesUrl,
            this.dicomWeb.name
        );
        this.dicomFHIR.patient = patient;
        this.dicomFHIR.imagingStudy = imagingStudy;
        await this.setModalitiesInStudy(dicomJson);
        this.dicomFHIR.endpoint = endpoint;
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
        let modalitiesInStudy = await getModalitiesInStudy({
            studyUID: dicomJson["0020000D"].Value[0]
        });
        if (modalitiesInStudy.length > 0) {
            let modalitiesInStudyValue = modalitiesInStudy[0]["00080061"].Value;
            for(let i = 0 ; i < modalitiesInStudyValue.length; i++) {
                let modality = {
                    system: "http://dicom.nema.org/resources/ontology/DCM",
                    code: modalitiesInStudyValue[i]
                };
                studyModalities.push(modality);
            }
            this.dicomFHIR.imagingStudy.modality = studyModalities;
        }
    }

    //#region ImagingStudy

    async getImagingStudyFromFHIRServer() {
        try {
            let getUrl = urlJoin(`/ImagingStudy`, this.fhir.baseUrl);
            let getURLObj = new URL(getUrl);
            let identifier = this.dicomFHIR.imagingStudy.identifier.find(
                (v) => v.system === "urn:dicom:uid"
            );
            fhirLogger.info(
                `[FHIR] [Get ImagingStudy from FHIR server, identifier: ${identifier.value}]`
            );
            getURLObj.searchParams.append("identifier", identifier.value);
            let { data } = await axios.get(getURLObj.href, {
                headers: {
                    "Content-Type": "application/fhir+json"
                }
            });
            let fhirBundleEntry = data.entry;
            if (_.isUndefined(fhirBundleEntry)) return undefined;
            else if (_.isArray(data.entry) && data.entry.length === 0)
                return undefined;
            return data.entry.pop();
        } catch (e) {
            if (e.isAxiosError) {
                let statusCode = _.get(e, "response.status");
                if (statusCode === 404) return undefined;
                console.log(e.response);
            } else {
                console.error(e);
            }
            throw e;
        }
    }

    /**
     * POST the imagingStudy resource to FHIR server
     */
    async createImagingStudy() {
        try {
            let postUrl = urlJoin(`/ImagingStudy`, this.fhir.baseUrl);
            let { data } = await axios.post(
                postUrl,
                this.dicomFHIR.imagingStudy,
                {
                    headers: {
                        "Content-Type": "application/fhir+json",
                        "Accept": "application/fhir+json"
                    }
                }
            );
            return data;
        } catch (e) {
            throw e;
        }
    }

    async updateImagingStudy(existImagingStudy) {
        try {
            let identifier = existImagingStudy.identifier.find(
                (v) => v.system === "urn:dicom:uid"
            );
            fhirLogger.info(
                `[FHIR] [ImagingStudy exists, identifier: ${identifier.value}, update it]`
            );
            this.updateExistSeries(existImagingStudy);
            let putUrl = urlJoin(
                `/ImagingStudy/${existImagingStudy.id}`,
                this.fhir.baseUrl
            );
            let { data } = await axios.put(putUrl, existImagingStudy, {
                headers: {
                    "Content-Type": "application/fhir+json",
                    "Accept": "application/fhir+json"
                }
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    updateExistSeries(existImagingStudy) {
        let seriesUID = this.dicomFHIR.imagingStudy.series[0].uid;
        let existSeriesIndex = existImagingStudy.series.findIndex(
            (v) => v.uid === seriesUID
        );
        if (existSeriesIndex !== -1) {
            let existSeries = existImagingStudy.series[existSeriesIndex];
            let seriesClone = _.cloneDeep(
                this.dicomFHIR.imagingStudy.series[0]
            );
            delete seriesClone.instance;
            existSeries = {
                ...existSeries,
                ...seriesClone
            };
            this.updateExistInstance(existImagingStudy, existSeriesIndex);
        } else {
            if (existImagingStudy.series) {
                existImagingStudy.series.push(
                    this.dicomFHIR.imagingStudy.series[0]
                );
                this.updateExistInstance(
                    existImagingStudy,
                    existImagingStudy.series.length - 1
                );
            } else {
                existImagingStudy.series = this.dicomFHIR.imagingStudy.series;
            }
        }
    }

    async updateExistInstance(existImagingStudy, seriesIndex) {
        let series = this.dicomFHIR.imagingStudy.series[0];
        let existSeries = existImagingStudy.series[seriesIndex];
        let instanceUID = series.instance[0].uid;
        let existInstanceIndex = existSeries.instance.findIndex(
            (v) => v.uid === instanceUID
        );
        if (existInstanceIndex !== -1) {
            let existInstance = existSeries.instance[existInstanceIndex];
            existInstance = {
                ...existInstance,
                ...series.instance[0]
            };
        } else {
            existSeries.instance.push(series.instance[0]);
        }
    }

    //#endregion

    //#region Patient
    async getPatientFromFHIRServer() {
        try {
            let patientID = this.dicomFHIR.patient.id;
            let getUrl = urlJoin(`/Patient/${patientID}`, this.fhir.baseUrl);
            fhirLogger.info(
                `[FHIR] [Get Patient from FHIR server, id: ${patientID}]`
            );
            let { data } = await axios.get(getUrl, {
                headers: {
                    "Content-Type": "application/fhir+json"
                }
            });
            return data;
        } catch (e) {
            if (e.isAxiosError) {
                let statusCode = _.get(e, "response.status");
                if (statusCode === 404) return undefined;
                console.log(e.response);
            } else {
                console.error(e);
            }
            throw e;
        }
    }

    async createPatientClientId() {
        try {
            let patientID = this.dicomFHIR.patient.id;
            let putUrl = urlJoin(`/Patient/${patientID}`, this.fhir.baseUrl);
            fhirLogger.info(
                `[FHIR] [The Patient id: ${patientID} not exists, creating it]`
            );
            let { data } = await axios.put(putUrl, this.dicomFHIR.patient, {
                headers: {
                    "Content-Type": "application/fhir+json",
                    "Accept": "application/fhir+json"
                }
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    //#endregion

    //#region Endpoint

    async getEndpointFromFHIRServer() {
        try {
            let endpointID = this.dicomWeb.name;
            let getUrl = urlJoin(`/Endpoint/${endpointID}`, this.fhir.baseUrl);
            fhirLogger.info(
                `[FHIR] [Get Endpoint from FHIR server, id: ${endpointID}]`
            );
            let { data } = await axios.get(getUrl, {
                headers: {
                    "Content-Type": "application/fhir+json",
                    "Accept": "application/fhir+json"
                }
            });
            return data;
        } catch (e) {
            if (e.isAxiosError) {
                let statusCode = _.get(e, "response.status");
                if (statusCode === 404) return undefined;
                console.log(e.response);
            } else {
                console.error(e);
            }
            throw e;
        }
    }

    async createEndpointClientId() {
        try {
            let endpointID = this.dicomWeb.name;
            let putUrl = urlJoin(`/Endpoint/${endpointID}`, this.fhir.baseUrl);
            fhirLogger.info(
                `[FHIR] [The Endpoint id: ${endpointID} not exists, creating it]`
            );
            let { data } = await axios.put(putUrl, this.dicomFHIR.endpoint, {
                headers: {
                    "Content-Type": "application/fhir+json",
                    "Accept": "application/fhir+json"
                }
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    //#endregion

    async postDicomFhir() {
        //Check patient is exists in FHIR server, if not, create it.
        let patientInFHIRServer = await this.getPatientFromFHIRServer();
        if (!patientInFHIRServer) await this.createPatientClientId();

        //Check endpoint is exists in FHIR server, if not, create it.
        let endpointInFHIRServer = await this.getEndpointFromFHIRServer();
        if (!endpointInFHIRServer) await this.createEndpointClientId();

        //Check endpoint is exists in FHIR server, if not, create it, otherwise update it.
        let imagingStudyInFHIRServer =
            await this.getImagingStudyFromFHIRServer();
        if (imagingStudyInFHIRServer) {
            //update the exist imagingStudy
            await this.updateImagingStudy(imagingStudyInFHIRServer.resource);
        } else {
            //create a new imagingStudy
            await this.createImagingStudy();
        }
    }
}

module.exports.DICOMFHIRConverter = DICOMFHIRConverter;

const _ = require("lodash");

const { QidoRsService } = require("@root/api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { DicomWebService } = require("@root/api/dicom-web/service/dicom-web.service");
const { StudyQueryBuilder } = require("./querybuilder");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { StudyModel } = require("@models/sql/models/study.model");
const { SeriesModel } = require("@models/sql/models/series.model");
const { InstanceModel } = require("@models/sql/models/instance.mode");
const { PatientModel } = require("@models/sql/models/patient.model");


class SqlQidoRsService extends QidoRsService {
    /**
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res 
     * @param {"study" | "series" | "instance"} level
     */
    constructor(req, res, level = "instance") {
        super(req, res, level);
    }

    async getAndResponseDicomJson() {
        try {

            let dicomWebService = new DicomWebService(this.request, this.response);

            let queryOptions = {
                query: this.query,
                skip: this.skip_,
                limit: this.limit_,
                includeFields: this.includeFields_,
                retrieveBaseUrl: `${dicomWebService.getBasicURL()}/studies`,
                requestParams: this.request.params
            };

            let qidoDicomJsonFactory = new QidoDicomJsonFactory(queryOptions, this.level);

            let dicomJson = await qidoDicomJsonFactory.getDicomJson();

            let dicomJsonLength = _.get(dicomJson, "length", 0);
            if (dicomJsonLength > 0) {
                this.response.writeHead(200, {
                    "Content-Type": "application/dicom+json"
                });
                this.response.end(JSON.stringify(dicomJson));
            } else {
                this.response.writeHead(204);
                this.response.end();
            }

        } catch (e) {
            throw e;
        }
    }

    /**
     * @private
     */
    initQuery_() {
        let query = _.cloneDeep(this.request.query);
        let queryKeys = Object.keys(query).sort();
        for (let i = 0; i < queryKeys.length; i++) {
            let queryKey = queryKeys[i];
            if (!query[queryKey]) delete query[queryKey];
        }

        this.query = convertAllQueryToDicomTag(query);
    }
}

class QidoDicomJsonFactory {

    /**
     * 
     * @param {import("../../../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions 
     * @param {string} level 
     */
    constructor(queryOptions, level = "instance") {
        this.level = level;

        this.getDicomJsonByLevel = {
            "patient": async () => {
                return await PatientModel.getDicomJson(queryOptions);
            },
            "study": async () => {
                return await StudyModel.getDicomJson(queryOptions);
            },
            "series": async () => {
                return await SeriesModel.getDicomJson(queryOptions);
            },
            "instance": async () => {
                return await InstanceModel.getDicomJson(queryOptions);
            }
        };
    }

    async getDicomJson() {
        return await this.getDicomJsonByLevel[this.level]();
    }
}


/**
 * Convert All of name(tags, keyword) of queries to tags number
 * @param {Object} iParam The request query.
 * @returns
 */
function convertAllQueryToDicomTag(iParam) {
    let keys = Object.keys(iParam);
    let newQS = {};
    for (let i = 0; i < keys.length; i++) {
        let keyName = keys[i];
        let keyNameSplit = keyName.split(".");
        let newKeyNames = [];
        for (let x = 0; x < keyNameSplit.length; x++) {
            if (dictionary.keyword[keyNameSplit[x]]) {
                newKeyNames.push(dictionary.keyword[keyNameSplit[x]]);
            } else if (dictionary.tag[keyNameSplit[x]]) {
                newKeyNames.push(keyNameSplit[x]);
            }
        }
        if (newKeyNames.length === 0) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.InvalidArgumentValue,
                `Invalid request query: ${keyNameSplit}`,
                400
            );
        } 
        
        let retKeyName = newKeyNames.join(".");
        newQS[retKeyName] = iParam[keyName];
    }
    return newQS;
}

module.exports.SqlQidoRsService = SqlQidoRsService;
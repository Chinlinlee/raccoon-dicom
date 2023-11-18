const _ = require("lodash");
const { dictionary } = require("../../../../../models/DICOM/dicom-tags-dic");
const { DicomWebService } = require("../../../service/dicom-web.service");
const {
    DicomWebServiceError,
    DicomWebStatusCodes
} = require("@error/dicom-web-service");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { QueryPatientDicomJsonFactory, QueryStudyDicomJsonFactory, QuerySeriesDicomJsonFactory, QueryInstanceDicomJsonFactory } = require("@query-dicom-json-factory");

const HierarchyQueryDicomJsonFactory = Object.freeze({
    patient: QueryPatientDicomJsonFactory,
    study: QueryStudyDicomJsonFactory,
    series: QuerySeriesDicomJsonFactory,
    instance: QueryInstanceDicomJsonFactory
});

class QidoRsService {

    /**
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res 
     * @param { "patient" | "study" | "series" | "instance" } level
     */
    constructor(req, res, level="instance") {
        this.request = req;
        this.response = res;
        this.level = level;

        this.query = {};

        /**
         * @private
         */
        this.limit_ = parseInt(this.request.query.limit) || 100;
        delete this.request.query["limit"];

        /**
         * @private
         */
        this.skip_ = parseInt(this.request.query.offset) || 0;
        delete this.request.query["offset"];

        /**
         * @private
         */
        this.includeFields_ = this.request.query["includefield"] || [];

        if (this.includeFields_.includes("all")) {
            this.includeFields_ = ["all"];
        }

        delete this.request.query["includefield"];

        this.initQuery_();
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

        this.query = convertAllQueryToDICOMTag(query);
    }

    async getAndResponseDicomJson() {
        try {
            let queryAudit = new AuditManager(
                EventType.QUERY,
                EventOutcomeIndicator.Success,
                DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
                DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
            );
            let dicomWebService = new DicomWebService(this.request, this.response);

            let queryOptions = {
                query: this.query,
                skip: this.skip_,
                limit: this.limit_,
                includeFields: this.includeFields_,
                retrieveBaseUrl: `${dicomWebService.getBasicURL()}/studies`,
                requestParams: this.request.params
            };
    
            queryAudit.onQuery(
                `SearchFor${this.level}`,
                JSON.stringify({...queryOptions.requestParams,...queryOptions.query}),
                "UTF-8"
            );
            let dicomJsonFactory = new HierarchyQueryDicomJsonFactory[this.level](queryOptions);
    
            let dicomJson = await dicomJsonFactory.getDicomJson();
    
            let dicomJsonLength = _.get(dicomJson, "length", 0);
            if (dicomJsonLength > 0) {
                this.auditInstancesAccessed(dicomJson);
                this.response.writeHead(200, {
                    "Content-Type": "application/dicom+json"
                });
                this.response.end(JSON.stringify(dicomJson));
            } else {
                this.response.writeHead(204);
                this.response.end();
            }

        } catch(e) {
            throw e;
        }
    }

    async auditInstancesAccessed(dicomJson) {
        let queryAccessedAudit = new AuditManager(
            EventType.QUERY_ACCESSED_INSTANCE,
            EventOutcomeIndicator.Success,
            DicomWebService.getRemoteAddress(this.request), DicomWebService.getRemoteHostname(this.request),
            DicomWebService.getServerAddress(), DicomWebService.getServerHostname()
        );

        for(let i = 0 ; i < dicomJson.length ; i++) {
            let studyUID = _.get(dicomJson[i], "0020000D.Value.0");
            queryAccessedAudit.onDicomInstancesAccessed([studyUID]);
        }
        
    }

}

/**
 * Convert All of name(tags, keyword) of queries to tags number
 * @param {Object} iParam The request query.
 * @returns
 */
function convertAllQueryToDICOMTag(iParam, pushSuffixValue=true) {
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
        let retKeyName;
        if (newKeyNames.length === 0) {
            throw new DicomWebServiceError(
                DicomWebStatusCodes.InvalidArgumentValue,
                `Invalid request query: ${keyNameSplit}`,
                400
            );
        } 
        
        if (pushSuffixValue) {
            if (newKeyNames.length >= 2) {
                retKeyName = newKeyNames.map(v => v + ".Value").join(".");
            } else {
                newKeyNames.push("Value");
                retKeyName = newKeyNames.join(".");
            }
        } else {
            retKeyName = newKeyNames.join(".");
        }
        
        newQS[retKeyName] = iParam[keyName];
    }
    return newQS;
}
//#endregion

module.exports.QidoRsService = QidoRsService;
module.exports.convertAllQueryToDICOMTag = convertAllQueryToDICOMTag;

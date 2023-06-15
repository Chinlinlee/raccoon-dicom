const _ = require("lodash");

class DicomCode {
    /**
     * 
     * @param {JSON} dicomJson 
     */
    constructor(dicomJson) {
        this.dicomJson = dicomJson;
        this.codeValue = "";
        this.codingSchemaDesignator = "";
        this.codeMeaning = "";
    }

    init() {
        let codeValue = _.get(this.dicomJson, "00080100.0.Value.0");
        let codingSchemeDesignator = _.get(this.dicomJson, "00080102.0.Value.0");
        let codeMeaning = _.get(this.dicomJson, "00080104.Value.0", "<none>");

        if (!codeValue)
            throw new Error("Missing Code Value");
        
        this.codeValue = codeValue;

        if (!codingSchemeDesignator)
            throw new Error("Missing Coding Scheme Designator");
        
        this.codingSchemaDesignator = codingSchemeDesignator;

        if (!codeMeaning)
            throw new Error("Missing Code Meaning");
        
        this.codeMeaning = codeMeaning;
    }
}

module.exports.DicomCode = DicomCode;
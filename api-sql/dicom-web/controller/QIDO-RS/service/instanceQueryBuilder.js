const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { BaseQueryBuilder } = require("./querybuilder");

class InstanceQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);
    }

    /**
     * 
     * @param {string} value 
     */
    getSOPClassUID(value) {
        let q = this.getStringQuery(dictionary.keyword.SOPClassUID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getSOPInstanceUID(value) {
        let q = this.getStringQuery(dictionary.keyword.SOPInstanceUID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getContentDate(value) {
        let q = this.getDateQuery(dictionary.keyword.ContentDate, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getContentTime(value) {
        let q = this.getTimeQuery(dictionary.keyword.ContentTime, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    /**
     * 
     * @param {string} value 
     */
    getInstanceNumber(value) {
        let q = this.getStringQuery(dictionary.keyword.InstanceNumber, value);
        this.query = {
            ...this.query,
            ...q
        };
    }
}
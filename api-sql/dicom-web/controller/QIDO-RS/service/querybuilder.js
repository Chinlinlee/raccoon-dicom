const _ = require("lodash");
const moment = require("moment");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { Op, Sequelize, cast, col } = require("sequelize");
const { raccoonConfig } = require("@root/config-class");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const sequelize = require("@models/sql/instance");
const { logger } = require("@root/utils/logs/log");

class BaseQueryBuilder {
    constructor(queryOptions) {
        this.queryOptions = queryOptions;
        /** @type {import("sequelize").IncludeOptions[]} */
        this.includeQueries = [];
        this.bind = [];
        this.query = {
            [Op.and]: []
        };
    }

    build() {
        for (let key in this.queryOptions.query) {
            this.getQueryByParam_(key);
        }

        let sequelizeQuery = {
            where: this.query
        };

        let includesPersonNameQuery = this.getSequelizeIncludePersonNameQuery();
        if (includesPersonNameQuery.length > 0) {
            _.set(sequelizeQuery, "include", includesPersonNameQuery);
        }

        if (this.bind.length > 0) {
            _.set(sequelizeQuery, "bind", this.bind);
        }
        return sequelizeQuery;
    }

    /**
     * @private
     * @param {string} key 
     */
    getQueryByParam_(key) {
        let value = this.queryOptions.query[key];
        let values = Array.isArray(value) ? value : [value];

        for (let i = 0; i < values.length; i++) {
            let paramValue = values[i];
            let commaValue = this.comma(key, paramValue);
            let wildCardValues = commaValue.map(v => this.getWildCardQuery(v[key]));
            try {
                let query;
                if (key.includes(".")) {
                    query = this[key](wildCardValues);
                } else {
                    query = this[`get${dictionary.tag[key]}`](wildCardValues);
                }

                this.query[Op.and] = [
                    ...this.query[Op.and],
                    query
                ];
            } catch (e) {
                if (e.message.includes("not a function")) break;
                logger.error(e);
                throw e;
            }

        }
    }

    getSequelizeIncludePersonNameQuery() {
        let includes = [];

        for (let includeQuery of this.includeQueries) {
            includes.push(includeQuery);
        }
        return includes;
    }

    comma(key, value) {
        let $or = [];
        let valueCommaSplit = value.split(",");
        for (let i = 0; i < valueCommaSplit.length; i++) {
            let obj = {};
            obj[key] = valueCommaSplit[i];
            $or.push(obj);
        }
        return $or;
    }

    /**
     * 
     * @param {string} tag 
     * @param {string} value 
     * @returns 
     */
    getStringQuery(tag, value) {
        if (value.includes("%") || value.includes("_")) {
            return {
                [`x${tag}`]: {
                    [Op.like]: value
                }
            };
        }
        return {
            [`x${tag}`]: value
        };
    }

    /**
     * 
     * @param {string} tag 
     * @param {string[]} values 
     * @param {(tag: string, values: string[]) => void} queryFn 
     */
    getOrQuery(tag, values, queryFn) {
        if (values.length === 1) {
            return queryFn(tag, values[0]);
        }

        let or = {
            [Op.or]: []
        };
        for (let i = 0; i < values.length; i++) {
            let q = queryFn(tag, values[i]);
            or[Op.or].push(q);
        }
        return or;
    }

    getStringArrayJsonQuery(tag, value) {
        if (raccoonConfig.sqlDbConfig.dialect === "postgres") {
            return {
                [`x${tag}`]: {
                    [Op.contains]: cast(JSON.stringify([value]), "jsonb")
                }
            };
        } else {
            return {
                [Op.or]: [Sequelize.where(Sequelize.fn("JSON_CONTAINS", Sequelize.col(`x${tag}`), `[${value}]`))]
            };
        }
    }

    getNumberQuery(tag, value) {
        return {
            [`x${tag}`]: Number(value)
        };
    }

    /**
     * 
     * @param {string} tag
     * @param {string} value 
     * @returns 
     */
    getPersonNameQuery(tag, value) {
        if (value.includes("%") || value.includes("_")) {
            return {
                [Op.or]: [
                    {
                        alphabetic: {
                            [Op.like]: value
                        }
                    },
                    {
                        ideographic: {
                            [Op.like]: value
                        }
                    },
                    {
                        phonetic: {
                            [Op.like]: value
                        }
                    }
                ]
            };
        }

        return {
            [Op.or]: [
                { alphabetic: value },
                { ideographic: value },
                { phonetic: value }
            ]
        };
    }

    /**
     * 
     * @param {string} tag 
     * @param {string} value 
     */
    getDateQuery(tag, value) {
        let dashIndex = value.indexOf("-");
        if (dashIndex === 0) { // -YYYYMMDD
            return {
                [`x${tag}`]: {
                    [Op.lte]: this.dateStringToSqlDateOnly(value.substring(1))
                }
            };
        } else if (dashIndex === value.length - 1) { // YYYYMMDD-
            return {
                [`x${tag}`]: {
                    [Op.gte]: this.dateStringToSqlDateOnly(value.substring(0, dashIndex))
                }
            };
        } else if (dashIndex > 0) { // YYYYMMDD-YYYYMMDD
            return {
                [`x${tag}`]: {
                    [Op.and]: [
                        { [Op.gte]: this.dateStringToSqlDateOnly(value.substring(0, dashIndex)) },
                        { [Op.lte]: this.dateStringToSqlDateOnly(value.substring(dashIndex + 1)) }
                    ]
                }
            };
        } else { // YYYYMMDD
            return {
                [`x${tag}`]: this.dateStringToSqlDateOnly(value)
            };
        }
    }

    /**
     * 
     * @param {string} tag 
     * @param {string} value 
     */
    getTimeQuery(tag, value) {
        let dashIndex = value.indexOf("-");
        if (dashIndex === 0) { // -HHmmss
            return {
                [`x${tag}`]: {
                    [Op.lte]: this.timeStringToSqlTimeDecimal(value.substring(1))
                }
            };
        } else if (dashIndex === value.length - 1) { // HHmmss-
            return {
                [`x${tag}`]: {
                    [Op.gte]: this.timeStringToSqlTimeDecimal(value.substring(0, dashIndex))
                }
            };
        } else if (dashIndex > 0) { // HHmmss-HHmmss
            return {
                [`x${tag}`]: {
                    [Op.and]: [
                        { [Op.gte]: this.timeStringToSqlTimeDecimal(value.substring(0, dashIndex)) },
                        { [Op.lte]: this.timeStringToSqlTimeDecimal(value.substring(dashIndex + 1)) }
                    ]
                }
            };
        } else {
            return {
                [`x${tag}`]: this.timeStringToSqlTimeDecimal(value)
            };
        }
    }

    /**
     * 
     * @param {string} tag 
     * @param {string} value 
     */
    getDateTimeQuery(tag, value) {
        let dashIndex = value.indexOf("-");
        if (dashIndex === 0) { // -YYYYMMDD
            return {
                [`x${tag}`]: {
                    [Op.lte]: this.dateTimeStringToSqlDateTime(value.substring(1))
                }
            };
        } else if (dashIndex === value.length - 1) { // YYYYMMDD-
            return {
                [`x${tag}`]: {
                    [Op.gte]: this.dateTimeStringToSqlDateTime(value.substring(0, dashIndex))
                }
            };
        } else if (dashIndex > 0) { // YYYYMMDD-YYYYMMDD
            return {
                [`x${tag}`]: {
                    [Op.and]: [
                        { [Op.gte]: this.dateTimeStringToSqlDateTime(value.substring(0, dashIndex)) },
                        { [Op.lte]: this.dateTimeStringToSqlDateTime(value.substring(dashIndex + 1)) }
                    ]
                }
            };
        } else { // YYYYMMDD
            return {
                [`x${tag}`]: this.dateTimeStringToSqlDateTime(value)
            };
        }
    }
    
    dateStringToSqlDateOnly(value) {
        return moment(value, "YYYYMMDD").format("YYYY-MM-DD");
    }

    dateTimeStringToSqlDateTime(value) {
        return moment(value, "YYYYMMDDhhmmss.SSSSSSZZ").toISOString();
    }

    /**
     * 
     * @param {string} timeStr 
     */
    getTimePadding(timeStr) {
        let hhmmssStr = timeStr.padEnd(6, "0");
        if (timeStr.length === 5) {
            hhmmssStr.padStart(6, "0");
        }
        return hhmmssStr;
    }


    timeStringToSqlTimeDecimal(value) {
        let hhmmssStr = this.getTimePadding(value);
        if (hhmmssStr.includes(".")) {
            let [timeStr, millionthSecondStr] = hhmmssStr.split(".");
            hhmmssStr = this.getTimePadding(timeStr) + "." + millionthSecondStr;
        }
        return parseFloat(hhmmssStr);
    }

    /**
     * 
     * @param {string} value 
     * @returns 
     */
    getWildCardQuery(value) {
        let wildCardIndex = value.indexOf("*");
        let questionIndex = value.indexOf("?");

        if (wildCardIndex >= 0 || questionIndex >= 0) {
            value = value.replace(/\*/gm, "%");
            value = value.replace(/\?/gm, "_");
        }

        return value;
    }

    getWildCardRegexString(value) {
        let wildCardIndex = value.indexOf("%");
        let questionIndex = value.indexOf("_");

        if (wildCardIndex >= 0 || questionIndex >= 0) {
            value = value.replace(/%/gm, ".*");
            value = value.replace(/_/gm, ".");
            value = value.replace(/\^/gm, "\\^");
            value = "^" + value;
        }

        return value;
    }

    /**
     * 
     * @param {*} q 
     * @see {@link https://stackoverflow.com/questions/60598225/how-to-merge-javascript-object-containing-symbols "How to merge javascript object containing symbols?"}
     */
    mergeQuery(q) {
        _.mergeWith(this.query, q, (a, b) => {
            if (!_.isObject(b)) return b;

            return Array.isArray(a) ? [...a, ...b] : { ...a, ...b };
        });
    }
}

class StudyQueryBuilder extends BaseQueryBuilder {
    constructor(queryOptions) {
        super(queryOptions);

        let studyInstanceUidInParams = _.get(this.queryOptions.requestParams, "studyUID");
        if (studyInstanceUidInParams) {
            this.query = {
                x0020000D: studyInstanceUidInParams
            };
        }
    }

    getIncludedPatientModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => v.model.getTableName() === "Patient");
        }
        return undefined;
    }

    getIncludedPersonNameModelInPatient() {
        let includedPatientModel = this.getIncludedPatientModel();
        if (includedPatientModel) {
            return includedPatientModel.include.find(v => v.model.getTableName() === "PersonName");
        }
        return undefined;
    }

    getIncludedPersonNameModel() {
        if (this.includeQueries.length > 0) {
            return this.includeQueries.find(v => v.model.getTableName() === "PersonName");
        }
        return undefined;
    }


    getStudyInstanceUID(values) {
        return this.getOrQuery(dictionary.keyword.StudyInstanceUID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    getPatientName(values) {
        let query = this.getOrQuery(dictionary.keyword.PatientName, values, BaseQueryBuilder.prototype.getPersonNameQuery.bind(this));

        let includedPatientModel = this.getIncludedPatientModel();
        if (!includedPatientModel) {
            this.includeQueries.push({
                model: sequelize.model("Patient"),
                include: [{
                    model: sequelize.model("PersonName"),
                    where: {
                        [Op.or]: query[Op.or]
                    },
                    required: true
                }],
                required: true
            });
        } 
    }

    getPatientID(values) {
        return this.getOrQuery(dictionary.keyword.PatientID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    getStudyDate(values) {
        return this.getOrQuery(dictionary.keyword.StudyDate, values, BaseQueryBuilder.prototype.getDateQuery.bind(this));
    }

    getStudyTime(values) {
        return this.getOrQuery(dictionary.keyword.StudyTime, values, BaseQueryBuilder.prototype.getTimeQuery.bind(this));
    }

    getAccessionNumber(values) {
        return this.getOrQuery(dictionary.keyword.AccessionNumber, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }

    getModalitiesInStudy(values) {
        let stringQuery = this.getOrQuery(dictionary.keyword.Modality, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
        this.includeQueries.push({
            model: sequelize.model("Series"),
            where: {
                ...stringQuery
            },
            attributes: []
        });
    }

    getReferringPhysicianName(values) {
        let query = this.getOrQuery(dictionary.keyword.ReferringPhysicianName, values, BaseQueryBuilder.prototype.getPersonNameQuery.bind(this));
        let includedPersonNameModel = this.getIncludedPersonNameModel();
        if (!includedPersonNameModel) {
            this.includeQueries.push({
                model: PersonNameModel,
                where: {
                    [Op.or]: [
                        ...query[Op.or]
                    ]
                },
                required: true
            });
        } 
    }

    getStudyID(values) {
        return this.getOrQuery(dictionary.keyword.StudyID, values, BaseQueryBuilder.prototype.getStringQuery.bind(this));
    }
}


module.exports.BaseQueryBuilder = BaseQueryBuilder;
module.exports.StudyQueryBuilder = StudyQueryBuilder;
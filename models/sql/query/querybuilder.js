const _ = require("lodash");
const moment = require("moment");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { Op, Sequelize, cast, col } = require("sequelize");
const { raccoonConfig } = require("@root/config-class");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const sequelize = require("@models/sql/instance");
const { logger } = require("@root/utils/logs/log");
const { PatientQueryBuilder } = require("./patientQueryBuilder");

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
                let sanitizedKey = key.split(".").filter(v => v !== "Value").join(".");
                if (sanitizedKey.includes(".")) {
                    query = this[sanitizedKey](wildCardValues);
                } else {
                    query = this[`get${dictionary.tag[sanitizedKey]}`](wildCardValues);
                }

                if (query) {
                    this.query[Op.and] = [
                        ...this.query[Op.and],
                        query
                    ];
                }
                
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
        let queryField = this.getQueryField(tag);
        if (value.includes("%") || value.includes("_")) {
            return {
                [queryField]: {
                    [Op.like]: value
                }
            };
        }
        return {
            [queryField]: value
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
        let queryField = this.getQueryField(tag);
        if (raccoonConfig.dbConfig.dialect === "postgres") {
            return {
                [queryField]: {
                    [Op.contains]: cast(JSON.stringify([value]), "jsonb")
                }
            };
        } else {
            return {
                [Op.or]: [Sequelize.where(Sequelize.fn("JSON_CONTAINS", Sequelize.col(queryField), `[${value}]`))]
            };
        }
    }

    getNumberQuery(tag, value) {
        let queryField = this.getQueryField(tag);
        return {
            [queryField]: Number(value)
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
        let queryField = this.getQueryField(tag);
        let dashIndex = value.indexOf("-");
        if (dashIndex === 0) { // -YYYYMMDD
            return {
                [queryField]: {
                    [Op.lte]: this.dateStringToSqlDateOnly(value.substring(1))
                }
            };
        } else if (dashIndex === value.length - 1) { // YYYYMMDD-
            return {
                [queryField]: {
                    [Op.gte]: this.dateStringToSqlDateOnly(value.substring(0, dashIndex))
                }
            };
        } else if (dashIndex > 0) { // YYYYMMDD-YYYYMMDD
            return {
                [queryField]: {
                    [Op.and]: [
                        { [Op.gte]: this.dateStringToSqlDateOnly(value.substring(0, dashIndex)) },
                        { [Op.lte]: this.dateStringToSqlDateOnly(value.substring(dashIndex + 1)) }
                    ]
                }
            };
        } else { // YYYYMMDD
            return {
                [queryField]: this.dateStringToSqlDateOnly(value)
            };
        }
    }

    /**
     * 
     * @param {string} tag 
     * @param {string} value 
     */
    getTimeQuery(tag, value) {
        let queryField = this.getQueryField(tag);
        let dashIndex = value.indexOf("-");
        if (dashIndex === 0) { // -HHmmss
            return {
                [queryField]: {
                    [Op.lte]: this.timeStringToSqlTimeDecimal(value.substring(1))
                }
            };
        } else if (dashIndex === value.length - 1) { // HHmmss-
            return {
                [queryField]: {
                    [Op.gte]: this.timeStringToSqlTimeDecimal(value.substring(0, dashIndex))
                }
            };
        } else if (dashIndex > 0) { // HHmmss-HHmmss
            return {
                [queryField]: {
                    [Op.and]: [
                        { [Op.gte]: this.timeStringToSqlTimeDecimal(value.substring(0, dashIndex)) },
                        { [Op.lte]: this.timeStringToSqlTimeDecimal(value.substring(dashIndex + 1)) }
                    ]
                }
            };
        } else {
            return {
                [queryField]: this.timeStringToSqlTimeDecimal(value)
            };
        }
    }

    /**
     * 
     * @param {string} tag 
     * @param {string} value 
     */
    getDateTimeQuery(tag, value) {
        let queryField = this.getQueryField(tag);
        let dashIndex = value.indexOf("-");
        if (dashIndex === 0) { // -YYYYMMDD
            return {
                [queryField]: {
                    [Op.lte]: this.dateTimeStringToSqlDateTime(value.substring(1))
                }
            };
        } else if (dashIndex === value.length - 1) { // YYYYMMDD-
            return {
                [queryField]: {
                    [Op.gte]: this.dateTimeStringToSqlDateTime(value.substring(0, dashIndex))
                }
            };
        } else if (dashIndex > 0) { // YYYYMMDD-YYYYMMDD
            return {
                [queryField]: {
                    [Op.and]: [
                        { [Op.gte]: this.dateTimeStringToSqlDateTime(value.substring(0, dashIndex)) },
                        { [Op.lte]: this.dateTimeStringToSqlDateTime(value.substring(dashIndex + 1)) }
                    ]
                }
            };
        } else { // YYYYMMDD
            return {
                [queryField]: this.dateTimeStringToSqlDateTime(value)
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
    
    /**
     * 
     * @param {string} tag 
     * @returns 
     */
    getQueryField(tag) {
        return /^[0-9a-zA-Z]{8}$/.test(tag.substring(0, 8)) ? `x${tag}` : tag;
    }
}

module.exports.BaseQueryBuilder = BaseQueryBuilder;
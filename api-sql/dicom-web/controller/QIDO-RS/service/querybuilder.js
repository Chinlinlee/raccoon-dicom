const _ = require("lodash");
const moment = require("moment");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { Op, Sequelize, cast, col } = require("sequelize");
const { raccoonConfig } = require("@root/config-class");
const { PersonNameModel } = require("@models/sql/models/personName.model");
const { PatientModel } = require("@models/sql/models/patient.model");
const sequelize = require("@models/sql/instance");

class BaseQueryBuilder {
    constructor(queryOptions) {
        this.queryOptions = queryOptions;
        /** @type {import("sequelize").IncludeOptions} */
        this.includeQueries = [];
        this.bind = [];
    }

    build() {
        for (let key in this.queryOptions.query) {
            let commaValue = this.comma(key, this.queryOptions.query[key]);

            for (let i = 0; i < commaValue.length; i++) {
                let value = this.getWildCardQuery(commaValue[i][key]);
                try {
                    if (key.includes(".")) {
                        this[key](value);
                    } else {
                        this[`get${dictionary.tag[key]}`](value);
                    }
                } catch (e) {
                    if (e.message.includes("not a function")) break;
                }
            }
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
     * @param {string} value 
     * @returns 
     */
    getPersonNameQuery(tag, value) {
        if (value.includes("%") || value.includes("_")) {
            return {
                query: {
                    [Op.or]: {
                        alphabetic: {
                            [Op.like]: value
                        },
                        ideographic: {
                            [Op.like]: value
                        },
                        phonetic: {
                            [Op.like]: value
                        }
                    }
                },
                field: tag
            };
        }
        return {
            query: {
                [Op.or]: {
                    alphabetic: value,
                    ideographic: value,
                    phonetic: value
                }
            },
            field: tag
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

    dateStringToSqlDateOnly(value) {
        return moment(value, "YYYYMMDD").format("YYYY-MM-DD");
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
        this.query = {};
    }


    getStudyInstanceUID(value) {
        let q = this.getStringQuery(dictionary.keyword.StudyInstanceUID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getPatientName(value) {
        let q = this.getPersonNameQuery(dictionary.keyword.PatientName, value);
        this.includeQueries.push({
            model: PatientModel,
            include: [{
                model: PersonNameModel,
                where: q.query,
                required: true
            }],
            required: true
        });
    }

    getPatientID(value) {
        let q = this.getStringQuery(dictionary.keyword.PatientID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getStudyDate(value) {
        let q = this.getDateQuery(dictionary.keyword.StudyDate, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getStudyTime(value) {
        let q = this.getTimeQuery(dictionary.keyword.StudyTime, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getAccessionNumber(value) {
        let q = this.getStringQuery(dictionary.keyword.AccessionNumber, value);
        this.query = {
            ...this.query,
            ...q
        };
    }

    getModalitiesInStudy(value) {
        let q = this.getStringQuery(dictionary.keyword.Modality, value);
        this.includeQueries.push({
            model: sequelize.model("Series"),
            where: {
                ...q
            },
            attributes: []
        });
    }

    getReferringPhysicianName(value) {
        let q = this.getPersonNameQuery(dictionary.keyword.ReferringPhysicianName, value);
        this.includeQueries.push({
            model: PersonNameModel,
            where: q.where,
            required: true
        });
    }

    getStudyID(value) {
        let q = this.getStringQuery(dictionary.keyword.StudyID, value);
        this.query = {
            ...this.query,
            ...q
        };
    }
}


module.exports.BaseQueryBuilder = BaseQueryBuilder;
module.exports.StudyQueryBuilder = StudyQueryBuilder;
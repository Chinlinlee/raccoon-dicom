const _ = require("lodash");
const moment = require("moment");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");
const { Op, Sequelize, cast, col } = require("sequelize");
const { raccoonConfig } = require("@root/config-class");

class BaseQueryBuilder {
    constructor(queryOptions) {
        this.queryOptions = queryOptions;
        this.personQuery = [];
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

    getStringQuery(tag, value) {
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

    getNumberArrayQuery(tag, value) {
        //TODO
    }

    getPersonNameQuery(value) {
        return {
            [Op.or]: {
                alphabetic: value,
                ideographic: value,
                phonetic: value
            }
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

    build() {
        for (let key in this.queryOptions.query) {
            let commaValue = this.comma(key, this.queryOptions.query[key]);

            for (let i = 0; i < commaValue.length; i++) {
                let value = this.getWildCardQuery(commaValue[i][key]);
                try {
                    this[`get${dictionary.tag[key]}`](value);
                } catch (e) {
                    if (e.message.includes("not a function")) break;
                }
            }
        }
        console.log(this.query);
    }

    getStudyInstanceUID(value) {
        let q = this.getStringQuery(dictionary.keyword.StudyInstanceUID, value);
        _.merge(this.query, q);
    }

    getPatientName(value) {
        let q = this.getPersonNameQuery(value);
        this.personQuery.push(q);
    }

    getPatientID(value) {
        let q = this.getStringQuery(dictionary.keyword.PatientID, value);
        _.merge(this.query, q);
    }

    getStudyDate(value) {
        let q = this.getDateQuery(dictionary.keyword.StudyDate, value);
        this.mergeQuery(q);
    }

    getStudyTime(value) {
        let q = this.getTimeQuery(dictionary.keyword.StudyTime, value);
        this.mergeQuery(q);
    }

    getModalitiesInStudy(value) {
        let q = this.getStringArrayJsonQuery(dictionary.keyword.ModalitiesInStudy, value);
        this.query = {
            ...this.query,
            ...q
        };
    }
}


module.exports.BaseQueryBuilder = BaseQueryBuilder;
module.exports.StudyQueryBuilder = StudyQueryBuilder;
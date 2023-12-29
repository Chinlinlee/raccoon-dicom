const _ = require("lodash");
const path = require("path");
const { Attributes } = require("@dcm4che/data/Attributes");
const mongoose = require("mongoose");
const { importClass } = require("java-bridge");
const { raccoonConfig } = require("@root/config-class");
const { InstanceLocator } = require("@dcm4che/net/service/InstanceLocator");
const { File } = require("@java-wrapper/java/io/File");
const { AuditManager } = require("@models/DICOM/audit/auditManager");
const { EventType } = require("@models/DICOM/audit/eventType");
const { EventOutcomeIndicator } = require("@models/DICOM/audit/auditUtils");
const { Tag } = require("@dcm4che/data/Tag");
/**
 * 
 * @param {number} tag 
 */
function intTagToString(tag) {
    return tag.toString(16).padStart(8, "0").toUpperCase();
}

const INSTANCE_RETURN_KEYS = {
    "instancePath": 1,
    "00020010": 1,
    "00080016": 1,
    "00080018": 1,
    "0020000D": 1,
    "0020000E": 1
};

/**
 * 
 * @param {Attributes} keys 
 * @returns 
 */
async function getInstancesFromKeysAttr(keys) {
    let dbQuery = await QueryTaskUtils.getDbQuery(keys, "instance");

    let instances = await mongoose.model("dicom").find({
        ...dbQuery
    }, INSTANCE_RETURN_KEYS).setOptions({
        strictQuery: false
    }).exec();
    const JArrayList = await importClass("java.util.ArrayList");
    let list = await JArrayList.newInstanceAsync();

    for (let instance of instances) {
        let instanceFile = await File.newInstanceAsync(
            path.join(
                raccoonConfig.dicomWebConfig.storeRootPath,
                instance.instancePath
            )
        );

        let fileUri = await instanceFile.toURI();
        let fileUriString = await fileUri.toString();

        let instanceLocator = await InstanceLocator.newInstanceAsync(
            _.get(instance, "00080016.Value.0"),
            _.get(instance, "00080018.Value.0"),
            _.get(instance, "00020010.Value.0"),
            fileUriString
        );

        await list.add(instanceLocator);
    }

    return list;
}

/**
 * 
 * @param {Attributes} keys 
 * @returns 
 */
async function findOneInstanceFromKeysAttr(keys) {
    let dbQuery = await QueryTaskUtils.getDbQuery(keys, "instance");

    let instance = await mongoose.model("dicom").findOne({
        ...dbQuery
    }, INSTANCE_RETURN_KEYS).setOptions({
        strictQuery: false
    }).exec();

    return instance;
}

const QUERY_ATTR_SELECTED_TAGS = {
    "patient": [Tag.PatientID],
    "study": [Tag.PatientID],
    "series": [Tag.PatientID, Tag.StudyInstanceUID],
    "instance": [Tag.PatientID, Tag.StudyInstanceUID, Tag.SeriesInstanceUID]
};
class QueryTaskUtils {
    /**
     * 
     * @param {import("@dcm4che/net/Association").Association} association 
     * @returns 
     */
    static async getAuditManager(association) {
        return new AuditManager(
            EventType.QUERY, EventOutcomeIndicator.Success,
            await association.getRemoteAET(), await association.getRemoteHostName(),
            await association.getLocalAET(), await association.getLocalHostName()
        );
    }

    static async getQueryAttribute(keys, parentAttr, level = "patient") {
        let queryAttr = await Attributes.newInstanceAsync();
        await Attributes.unifyCharacterSets([keys, parentAttr]);
        await queryAttr.addAll(keys);
        await queryAttr.addSelected(parentAttr, QUERY_ATTR_SELECTED_TAGS[level]);
        return queryAttr;
    }

    static async getQueryBuilder(queryAttr, level = "patient") {
        const { DimseQueryBuilder } = require("@dimse/queryBuilder");
        return new DimseQueryBuilder(queryAttr, level);
    }

    static async getReturnKeys(queryAttr, level = "patient") {
        let queryBuilder = await QueryTaskUtils.getQueryBuilder(queryAttr, level);
        let query = await queryBuilder.toNormalQuery();
        let returnKeys = {};
        let queryKeys = Object.keys(query);
        for (let i = 0; i < queryKeys.length; i++) {
            returnKeys[queryKeys[i].split(".").shift()] = 1;
        }
        return returnKeys;
    }

    static async getDbQuery(queryAttr, level="patient") {
        let queryBuilder = await QueryTaskUtils.getQueryBuilder(queryAttr, level);
        let normalQuery = await queryBuilder.toNormalQuery();
        let dbQuery = await queryBuilder.build(normalQuery);

        return dbQuery.$match;
    }
}

module.exports.intTagToString = intTagToString;
module.exports.getInstancesFromKeysAttr = getInstancesFromKeysAttr;
module.exports.findOneInstanceFromKeysAttr = findOneInstanceFromKeysAttr;
module.exports.QueryTaskUtils = QueryTaskUtils;
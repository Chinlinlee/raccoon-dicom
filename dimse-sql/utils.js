const _ = require("lodash");
const path = require("path");
const { Attributes } = require("@dcm4che/data/Attributes");
const { importClass } = require("java-bridge");
const { raccoonConfig } = require("@root/config-class");
const { InstanceLocator } = require("@dcm4che/net/service/InstanceLocator");
const { default: File } = require("@java-wrapper/java/io/File");
const sequenceInstance = require("@models/sql/instance");
const { InstanceQueryBuilder } = require("@models/sql/query/instanceQueryBuilder");
const { QueryTaskUtils } = require("@root/dimse/utils");
/**
 * 
 * @param {number} tag 
 */
function intTagToString(tag) {
    return tag.toString(16).padStart(8, "0").toUpperCase();
}

/**
 * 
 * @param {Attributes} keys 
 * @returns 
 */
async function getInstancesFromKeysAttr(keys) {
    const { SqlDimseQueryBuilder: DimseQueryBuilder } = require("./queryBuilder");
    let queryBuilder = new DimseQueryBuilder(keys, "instance");
    let normalQuery = await queryBuilder.toNormalQuery();
    let sqlQuery = await queryBuilder.build(normalQuery);
    let instanceQueryBuilder = new InstanceQueryBuilder({
        query: {
            ...sqlQuery
        }
    });
    let q = instanceQueryBuilder.build();
    let instanceQuery = {
        ...q
    };

    let instances = await sequenceInstance.model("Instance").findAll({
        ...instanceQuery,
        attributes: ["json", "instancePath"]
    });

    const JArrayList = await importClass("java.util.ArrayList");
    let list = await JArrayList.newInstanceAsync();

    for (let instance of instances) {
        let instanceFile = await File.newInstanceAsync(
            path.resolve(
                path.join(
                    raccoonConfig.dicomWebConfig.storeRootPath,
                    instance.instancePath
                )
            )
        );

        let fileUri = await instanceFile.toURI();
        let fileUriString = await fileUri.toString();

        let instanceLocator = await InstanceLocator.newInstanceAsync(
            _.get(instance.json, "00080016.Value.0"),
            _.get(instance.json, "00080018.Value.0"),
            _.get(instance.json, "00020010.Value.0"),
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
    const { SqlDimseQueryBuilder: DimseQueryBuilder } = require("./queryBuilder");
    let queryBuilder = new DimseQueryBuilder(keys, "instance");
    let normalQuery = await queryBuilder.toNormalQuery();
    let sqlQuery = await queryBuilder.getMongoQuery(normalQuery);
    let instanceQueryBuilder = new InstanceQueryBuilder({
        query: {
            ...sqlQuery
        }
    });
    let q = instanceQueryBuilder.build();
    let instanceQuery = {
        ...q
    };

    let instance = await sequenceInstance.model("Instance").findOne({
        ...instanceQuery,
        attributes: ["json"]
    });

    return instance.json;
}

QueryTaskUtils.getDbQuery = async function (queryAttr, level = "patient") {
    let queryBuilder = await QueryTaskUtils.getQueryBuilder(queryAttr, level);
    let normalQuery = await queryBuilder.toNormalQuery();
    let dbQuery = await queryBuilder.build(normalQuery);

    return dbQuery;
};

module.exports.intTagToString = intTagToString;
module.exports.getInstancesFromKeysAttr = getInstancesFromKeysAttr;
module.exports.findOneInstanceFromKeysAttr = findOneInstanceFromKeysAttr;
module.exports.QueryTaskUtils = QueryTaskUtils;
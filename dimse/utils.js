const _ = require("lodash");
const path = require("path");
const { Attributes } = require("@dcm4che/data/Attributes");
const { mongoose } = require("mongoose");
const { importClass } = require("java-bridge");
const { raccoonConfig } = require("@root/config-class");
const { InstanceLocator } = require("@dcm4che/net/service/InstanceLocator");
const { default: File } = require("@java-wrapper/java/io/File");
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
    const { DimseQueryBuilder } = require("./queryBuilder");
    let queryBuilder = new DimseQueryBuilder(keys, "instance");
    let normalQuery = await queryBuilder.toNormalQuery();
    let mongoQuery = await queryBuilder.getMongoQuery(normalQuery);

    let returnKeys = {
        "instancePath": 1,
        "00020010": 1,
        "00080016": 1,
        "00080018": 1,
        "0020000D": 1,
        "0020000E": 1
    };

    let instances = await mongoose.model("dicom").find({
        ...mongoQuery.$match
    }, returnKeys).setOptions({
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

module.exports.intTagToString = intTagToString;
module.exports.getInstancesFromKeysAttr = getInstancesFromKeysAttr;
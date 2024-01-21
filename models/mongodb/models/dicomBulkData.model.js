const mongoose = require("mongoose");

let dicomBulkDataSchema = new mongoose.Schema(
    {
        studyUID: {
            type: String,
            default: void 0,
            index: true
        },
        seriesUID: {
            type: String,
            default: void 0,
            index: true
        },
        instanceUID: {
            type: String,
            default: void 0,
            index: true
        },
        filename: {
            type: String,
            default: void 0
        },
        binaryValuePath: {
            type: String,
            default: void 0
        }
    },
    {
        strict: false,
        versionKey: false,
        statics: {
            /**
             * 
             * @param {Object} query 
             * @param {string} query.studyUID
             * @param {string} query.seriesUID
             * @param {string} query.instanceUID
             * @param {string} query.binaryValuePath
             * @param {any} options 
             * @returns 
             */
            findOneBulkData: async function(query, options) {
                return await mongoose.model("dicomBulkData").findOne(query, options).exec();
            },
            /**
             * 
             * @param {Object} query 
             * @param {string} query.studyUID
             * @param {any} options 
             * @returns 
             */
            findStudyBulkData: async function(query, options) {
                return await mongoose.model("dicomBulkData").find({
                    $and: [
                        {
                            studyUID: query.studyUID
                        }
                    ]
                }, options?.projection, options?.options).exec();
            },
            /**
             * 
             * @param {Object} query 
             * @param {string} query.studyUID
             * @param {string} query.seriesUID
             * @param {*} options 
             * @returns 
             */
            findSeriesBulkData: async function(query, options) {
                return await mongoose.model("dicomBulkData").find({
                    $and: [
                        {
                            studyUID: query.studyUID
                        },
                        {
                            seriesUID: query.seriesUID
                        }
                    ]
                }, options?.projection, options?.options).exec();
            },
            /**
             * 
             * @param {Object} query 
             * @param {string} query.studyUID
             * @param {string} query.seriesUID
             * @param {string} query.instanceUID
             * @param {*} options 
             * @returns 
             */
            findInstanceBulkData: async function(query, options) {
                return await mongoose.model("dicomBulkData").find({
                    $and: [
                        {
                            studyUID: query.studyUID
                        },
                        {
                            seriesUID: query.seriesUID
                        },
                        {
                            instanceUID: query.instanceUID
                        }
                    ]
                }, options?.projection, options?.options).exec();
            },
            /**
             * 
             * @param {Object} query 
             * @param {string} query.studyUID
             * @param {string} query.seriesUID
             * @param {string} query.instanceUID
             * @param {string} query.binaryValuePath
             * @param {*} options 
             * @returns 
             */
            findSpecificBulkData: async function(query, options) {
                return await mongoose.model("dicomBulkData").findOne({
                    $and: [
                        {
                            studyUID: query.studyUID
                        },
                        {
                            seriesUID: query.seriesUID
                        },
                        {
                            instanceUID: query.instanceUID
                        },
                        {
                            binaryValuePath: {
                                $regex: `^${query.binaryValuePath}`,
                                $options: "m"
                            }
                        }
                    ]
                }, options?.projection, options?.options).exec();
            },
            createOrUpdateBulkData: async function(query, newBulkData, options) {
                await mongoose.model("dicomBulkData").updateOne(
                    {
                        $and: [
                            {
                                instanceUID: query.instanceUID
                            },
                            {
                                binaryValuePath: query.binaryValuePath
                            }
                        ]
                    },
                    newBulkData,
                    {
                        upsert: true
                    }
                );
            }
        }
    }
);

let dicomBulkData = mongoose.model(
    "dicomBulkData",
    dicomBulkDataSchema,
    "dicomBulkData"
);

module.exports = dicomBulkData;
module.exports.DicomBulkDataModel = dicomBulkData;

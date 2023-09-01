const fsP = require("fs/promises");
const path = require("path");
const _ = require("lodash");
const mongoose = require("mongoose");
const {
    dicomJsonAttributeSchema,
    dicomJsonAttributePNSchema,
    dicomJsonAttributeDASchema,
    getVRSchema
} = require("../schema/dicomJsonAttribute");
const { getStoreDicomFullPath, IncludeFieldsFactory } = require("../service");
const { logger } = require("../../../utils/logs/log");
const { raccoonConfig } = require("@root/config-class");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}

let verifyingObserverSchema = new mongoose.Schema(
    {
        "0040A027": getVRSchema("LO"),
        "0040A030": getVRSchema("DT"),
        "0040A075": getVRSchema("PN")
    },
    {
        strict: false,
        _id: false,
        versionKey: false
    }
);

/**
 * @constructs dicomModelSchema
 */
let dicomModelSchema = new mongoose.Schema(
    {
        "studyUID": {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        "seriesUID": {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        "instanceUID": {
            type: String,
            default: void 0,
            index: true,
            required: true
        },
        "deleteStatus": {
            type: Number,
            default: 0
        },
        "00080020": new mongoose.Schema(dicomJsonAttributeDASchema, {
            _id: false,
            id: false,
            toObject: {
                getters: true
            }
        }),
        "00080030": getVRSchema("TM"),
        "00080050": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00080061": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00080090": getVRSchema("PN"),
        "00100010": getVRSchema("PN"),
        "00100020": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "0020000D": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00200010": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00080060": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "0020000E": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00200011": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00400244": new mongoose.Schema(dicomJsonAttributeDASchema, {
            _id: false,
            id: false,
            toObject: {
                getters: true
            }
        }),
        "00400275": dicomJsonAttributeSchema,
        "0040A073": {
            ...dicomJsonAttributeSchema,
            Value: [verifyingObserverSchema]
        },
        "00080016": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00080018": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        },
        "00200013": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.String]
        }
    },
    {
        strict: false,
        versionKey: false,
        toObject: {
            getters: true
        },
        methods: {
            async incrementDeleteStatus() {
                this.deleteStatus = this.deleteStatus + 1;
                await this.save();
            },
            async deleteInstance() {
                let instancePath = this.instancePath;
                try {
                    logger.warn("Permanently delete instance: " + instancePath);

                    await fsP.unlink(
                        path.join(
                            raccoonConfig.dicomWebConfig.storeRootPath,
                            instancePath
                        )
                    );
                } catch (e) {
                    console.error(e);
                }
            },
            getAttributes: async function () {
                let study = this.toObject();
                delete study._id;
                delete study.id;

                let jsonStr = JSON.stringify(study);
                return await Common.getAttributesFromJsonString(jsonStr);
            }
        },
        statics: {
            getDimseResultCursor: async (query, keys) => {
                return mongoose.model("dicom").find(query, keys).setOptions({
                    strictQuery: false
                })
                    .cursor();
            },
            getAuditInstancesInfoFromStudyUID: async (studyUID) => {
                let instances = await mongoose.model("dicom").find({ studyUID }).exec();

                let instanceInfos = {
                    sopClassUIDs: [],
                    accessionNumbers: [],
                    patientID: "",
                    patientName: ""
                };

                for (let instance of instances) {
                    let sopClassUID = _.get(instance, "00080016.Value.0");
                    let accessionNumber = _.get(instance, "00080050.Value.0");
                    let patientID = _.get(instance, "00100020.Value.0");
                    let patientName = _.get(instance, "00100010.Value.0.Alphabetic");
                    sopClassUID ? instanceInfos.sopClassUIDs.push(sopClassUID) : null;
                    accessionNumber ? instanceInfos.accessionNumbers.push(accessionNumber) : null;
                    patientID ? instanceInfos.patientID = patientID : null;
                    patientName ? instanceInfos.patientName = patientName : null;
                }

                instanceInfos.sopClassUIDs = _.uniq(instanceInfos.sopClassUIDs);
                instanceInfos.accessionNumbers = _.uniq(instanceInfos.accessionNumbers);

                return instanceInfos;
            },
            /**
             * 
             * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
             * @returns 
             */
            getDicomJson: async function (queryOptions) {

                let includeFieldsFactory = new IncludeFieldsFactory(queryOptions.includeFields);
                let instanceFields = includeFieldsFactory.getInstanceLevelFields();

                try {

                    let docs = await mongoose
                        .model("dicom")
                        .find({
                            ...queryOptions.query,
                            deleteStatus: {
                                $eq: 0
                            }
                        }, {
                            ...instanceFields
                        })
                        .setOptions({
                            strictQuery: false
                        })
                        .limit(queryOptions.limit)
                        .skip(queryOptions.skip)
                        .exec();

                    let instanceDicomJson = docs.map(v => {
                        let obj = v.toObject();
                        delete obj._id;
                        delete obj.id;
                        obj["00081190"] = {
                            vr: "UR",
                            Value: [
                                `${queryOptions.retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}/series/${obj["0020000E"]["Value"][0]}/instances/${obj["00080018"]["Value"][0]}`
                            ]
                        };

                        _.set(obj, dictionary.keyword.RetrieveAETitle, {
                            ...dictionary.tagVR[dictionary.keyword.RetrieveAETitle],
                            Value: [raccoonConfig.aeTitle]
                        });

                        return obj;
                    });

                    return instanceDicomJson;

                } catch (e) {
                    throw e;
                }

            },
            /**
             * 
             * @param {object} iParam 
             * @param {string} iParam.studyUID
             * @param {string} iParam.seriesUID
             * @param {string} iParam.instanceUID
             */
            getPathOfInstance: async function (iParam) {
                let { studyUID, seriesUID, instanceUID } = iParam;

                try {
                    let query = {
                        $and: [
                            {
                                studyUID: studyUID
                            },
                            {
                                seriesUID: seriesUID
                            },
                            {
                                instanceUID: instanceUID
                            },
                            {
                                deleteStatus: {
                                    $eq: 0
                                }
                            }
                        ]
                    };

                    let doc = await mongoose.model("dicom").findOne(query, {
                        studyUID: 1,
                        seriesUID: 1,
                        instanceUID: 1,
                        instancePath: 1
                    }).exec();

                    if (doc) {
                        let docObj = doc.toObject();
                        docObj.instancePath = getStoreDicomFullPath(docObj);

                        return docObj;
                    }

                    return undefined;

                } catch (e) {
                    throw e;
                }
            },
            /**
             * 
             * @param {string} studyUID 
             * @param {string} seriesUID 
             */
            getInstanceOfMedianIndex: async function (query) {
                let instanceCountOfStudy = await mongoose.model("dicom").countDocuments({
                    $and: [
                        {
                            studyUID: query.studyUID
                        },
                        {
                            deleteStatus: {
                                $eq: 0
                            }
                        }
                    ]
                });
            
                return await mongoose.model("dicom").findOne(query, {
                    studyUID: 1,
                    seriesUID: 1,
                    instanceUID: 1,
                    instancePath: 1
                })
                    .sort({
                        studyUID: 1,
                        seriesUID: 1
                    })
                    .skip(instanceCountOfStudy >> 1)
                    .limit(1)
                    .exec();
            }
        },
        timestamps: true
    }
);

dicomModelSchema.index({
    "0020000D": 1
});
dicomModelSchema.index({
    "0020000E": 1
});
dicomModelSchema.index({
    "00080018": 1
});

dicomModelSchema.post("findOneAndUpdate", async function (doc) {
    updateStudyModalitiesInStudy(doc).catch((e) => {
        logger.error(`[STOW-RS] [update study modalities] [${e}]`);
    });
    updateStudySOPClassesInStudy(doc).catch((e) => {
        logger.error(`[STOW-RS] [update study sop classes in study] [${e}]`);
    });
    updateStudyNumberOfStudyRelatedSeries(doc).catch((e) => {
        logger.error(
            `[STOW-RS] [update study number of study related series] [${e}]`
        );
    });
    updateStudyNumberOfStudyRelatedInstance(doc).catch((e) => {
        logger.error(
            `[STOW-RS] [update study number of study related instances] [${e}]`
        );
    });
});

async function getModalitiesInStudy(doc) {
    let modalitiesInStudy = await mongoose.model("dicom").aggregate([
        {
            $match: {
                studyUID: doc.studyUID
            }
        },
        {
            $group: {
                _id: "$studyUID",
                modalitiesInStudy: {
                    $addToSet: "$00080060.Value"
                }
            }
        },
        {
            $project: {
                "00080061": {
                    vr: "CS",
                    Value: {
                        $reduce: {
                            input: "$modalitiesInStudy",
                            initialValue: [],
                            in: {
                                $concatArrays: ["$$value", "$$this"]
                            }
                        }
                    }
                }
            }
        }
    ]);
    return modalitiesInStudy;
}

async function updateStudyModalitiesInStudy(doc) {
    try {
        let modalitiesInStudy = await getModalitiesInStudy(doc);
        await mongoose.model("dicomStudy").findOneAndUpdate(
            {
                studyUID: doc.studyUID
            },
            {
                $set: {
                    "00080061": modalitiesInStudy[0]["00080061"]
                }
            }
        );
    } catch (e) {
        throw e;
    }
}

async function updateStudySOPClassesInStudy(doc) {
    try {
        let sopClassesInStudy = await mongoose.model("dicom").aggregate([
            {
                $match: {
                    studyUID: doc.studyUID
                }
            },
            {
                $group: {
                    _id: "$studyUID",
                    sopClassesInStudy: {
                        $addToSet: "$00080016.Value"
                    }
                }
            },
            {
                $project: {
                    "00080062": {
                        vr: "CS",
                        Value: {
                            $reduce: {
                                input: "$sopClassesInStudy",
                                initialValue: [],
                                in: {
                                    $concatArrays: ["$$value", "$$this"]
                                }
                            }
                        }
                    }
                }
            }
        ]);
        await mongoose.model("dicomStudy").findOneAndUpdate(
            {
                studyUID: doc.studyUID
            },
            {
                $set: {
                    "00080062": sopClassesInStudy[0]["00080062"]
                }
            }
        );
    } catch (e) {
        throw e;
    }
}

async function updateStudyNumberOfStudyRelatedSeries(doc) {
    try {
        let numberOfStudyRelatedSeries = await mongoose
            .model("dicomSeries")
            .aggregate([
                {
                    $match: {
                        studyUID: doc.studyUID
                    }
                },
                {
                    $group: {
                        _id: "$studyUID",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]);
        let numberOfStudyRelatedSeriesObj = {
            vr: "IS",
            Value: [numberOfStudyRelatedSeries[0]["count"]]
        };
        await mongoose.model("dicomStudy").findOneAndUpdate(
            {
                studyUID: doc.studyUID
            },
            {
                $set: {
                    "00201206": numberOfStudyRelatedSeriesObj
                }
            }
        );
    } catch (e) {
        throw e;
    }
}

async function updateStudyNumberOfStudyRelatedInstance(doc) {
    try {
        let numberOfStudyRelatedInstance = await mongoose
            .model("dicom")
            .aggregate([
                {
                    $match: {
                        studyUID: doc.studyUID
                    }
                },
                {
                    $group: {
                        _id: "$studyUID",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]);
        let numberOfStudyRelatedInstanceObj = {
            vr: "IS",
            Value: [numberOfStudyRelatedInstance[0]["count"]]
        };
        await mongoose.model("dicomStudy").findOneAndUpdate(
            {
                studyUID: doc.studyUID
            },
            {
                $set: {
                    "00201208": numberOfStudyRelatedInstanceObj
                }
            }
        );
    } catch (e) {
        throw e;
    }
}

let dicomModel = mongoose.model("dicom", dicomModelSchema, "dicom");

module.exports = dicomModel;

module.exports.getModalitiesInStudy = getModalitiesInStudy;

const mongoose = require("mongoose");
const {
    dicomJsonAttributeSchema,
    dicomJsonAttributePNSchema,
    dicomJsonAttributeDASchema,
    getVRSchema
} = require("../schema/dicomJsonAttribute");
const { getStoreDicomFullPath } = require("../service");
const { logger } = require("../../../utils/log");
const { getStudyLevelFields } = require("./dicomStudy");
const { getSeriesLevelFields } = require("./dicomSeries");
const { tagsOfRequiredMatching } = require("../../DICOM/dicom-tags-mapping");

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
        "00080020": new mongoose.Schema(dicomJsonAttributeDASchema, {
            _id: false,
            id: false,
            toObject: {
                getters: true
            }
        }),
        "00080030": {
            ...dicomJsonAttributeSchema,
            Value: [mongoose.SchemaTypes.Number]
        },
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
        }
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

/**
 * 
 * @param {DicomJsonMongoQueryOptions} queryOptions
 * @returns 
 */
dicomModelSchema.statics.getDicomJson = async function (queryOptions) {
    let studyFields = getStudyLevelFields();
    let seriesFields = getSeriesLevelFields();
    let instanceFields = getInstanceLevelFields();

    try {

        let docs = await mongoose
        .model("dicom")
        .find(queryOptions.query, {
            ...studyFields,
            ...seriesFields,
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
                    `${queryOptions.retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}/series/${obj["0020000E"]["Value"][0]}`
                ]
            };
            return obj;
        });

        return instanceDicomJson;

    } catch(e) {
        throw e;
    }
    
};

function getInstanceLevelFields() {
    let fields = {};
    for (let tag in tagsOfRequiredMatching.Instance) {
        fields[tag] = 1;
    }
    return fields;
}

/**
 * 
 * @param {object} iParam 
 * @param {string} iParam.studyUID
 * @param {string} iParam.seriesUID
 * @param {string} iParam.instanceUID
 */
dicomModelSchema.statics.getPathGroupOfInstances = async function(iParam) {
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
};

let dicomModel = mongoose.model("dicom", dicomModelSchema, "dicom");
module.exports = dicomModel;
module.exports.getModalitiesInStudy = getModalitiesInStudy;

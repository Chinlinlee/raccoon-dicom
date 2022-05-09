const mongoose = require("mongoose");
const {
    dicomJsonAttributeSchema,
    dicomJsonAttributePNSchema,
    dicomJsonAttributeDASchema,
    getVRSchema
} = require("../schema/dicomJsonAttribute");
const { logger } = require("../../../utils/log");

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
        "00080020": dicomJsonAttributeDASchema,
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
        "00400244": dicomJsonAttributeDASchema,
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

dicomModelSchema.methods.getDICOMJson = function () {
    let obj = this.toObject();
    delete obj._id;
    delete obj.studyUID;
    delete obj.seriesUID;
    delete obj.instanceUID;
};

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

async function updateStudyModalitiesInStudy(doc) {
    try {
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

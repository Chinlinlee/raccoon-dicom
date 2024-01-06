const fsP = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { raccoonConfig } = require("@root/config-class");
const { logger } = require("@root/utils/logs/log");
const { IncludeFieldsFactory, getStoreDicomFullPath, getStoreDicomFullPathGroup } = require("../service");
const { dictionary } = require("@models/DICOM/dicom-tags-dic");

let Common;
if (raccoonConfig.dicomDimseConfig.enableDimse) {
    require("@models/DICOM/dcm4che/java-instance");
    Common = require("@java-wrapper/org/github/chinlinlee/dcm777/net/common/Common").Common;
}

const BaseDicomSchemaDef = {
    studyUID: {
        type: String,
        default: void 0,
        index: true,
        required: true
    },
    deleteStatus: {
        type: Number,
        default: 0
    }
};

class DicomSchemaOptionsFactory {
    constructor() {}

    /**
     * 
     * @param {"patient" |"study" | "series" | "instance"} level 
     * @param {typeof DocDicomJsonHandler} docDicomJsonHandlerType
     * @returns 
     */
    static get(level, docDicomJsonHandlerType) {
        return {
            strict: true,
            versionKey: false,
            toObject: {
                getters: true
            },
            methods: {
                incrementDeleteStatus: async function () {
                    this.deleteStatus = this.deleteStatus + 1;
                    await this.save();
                },
                deleteDicomInstances: async function() {
                    throw new Error("Not Implemented");
                },
                getAttributes: async function () {
                    let doc = this.toObject();
                    delete doc._id;
                    delete doc.id;
        
                    let jsonStr = JSON.stringify(doc);
                    return await Common.getAttributesFromJsonString(jsonStr);
                }
            },
            statics: {
                getDimseResultCursor: async function (query, keys) {
                    return mongoose.model(DicomModelNames[level]).find(query, keys).setOptions({
                        strictQuery: false
                    })
                        .cursor();
                },
                /**
                 * 
                 * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
                 * @returns 
                 */
                getDicomJson: async function (queryOptions) {
                    let projection = mongoose.model(DicomModelNames[level]).getDicomJsonProjection(queryOptions);
        
                    try {
                        let docs = await mongoose.model(DicomModelNames[level]).find({
                            ...queryOptions.query,
                            deleteStatus: {
                                $eq: queryOptions.isRecycle ? 1 : 0
                            }
                        }, projection)
                            .limit(queryOptions.limit)
                            .skip(queryOptions.skip)
                            .setOptions({
                                strictQuery: false
                            })
                            .exec();
        
                        let docDicomJsonHandler = new docDicomJsonHandlerType(docs, queryOptions);
                        let dicomJson = docDicomJsonHandler.get();
        
                        return dicomJson;
        
                    } catch (e) {
                        throw e;
                    }
                },
                /**
                 * 
                 * @param {import("../../../utils/typeDef/dicom").DicomJsonMongoQueryOptions} queryOptions
                 * @returns 
                 */
                getDicomJsonProjection: function (queryOptions) {
                    throw new Error("Not Implemented");
                },
                /**
                 * 
                 * @param {Object} iParam 
                 * @param {string} iParam.studyUID
                 */
                getPathGroupOfInstances: async function (iParam) {
                    try {
                        let query = [
                            {
                                ...mongoose.model(DicomModelNames[level]).getPathGroupQuery(iParam)
                            },
                            {
                                ...mongoose.model(DicomModelNames[level]).getPathGroupQueryOptions()
                            }
                        ];
                        let docs = await mongoose.model("dicom").aggregate(query).exec();
                        let pathGroup = _.get(docs, "0.pathList", []);
                        
                        let fullPathGroup = getStoreDicomFullPathGroup(pathGroup);
        
                        return fullPathGroup;
        
                    } catch (e) {
                        throw e;
                    }
                },
                getPathGroupQueryOptions: function (level) {
                    return {
                        $group: {
                            _id: PathGroupIdField[level],
                            pathList: {
                                $addToSet: {
                                    studyUID: "$studyUID",
                                    seriesUID: "$seriesUID",
                                    instanceUID: "$instanceUID",
                                    instancePath: "$instancePath"
                                }
                            }
                        }
                    };
                },
                getPathGroupQuery: function (iParam) {
                    throw new Error("Not Implemented");
                }
            },
            timestamps: true
        };
    }
}

const PathGroupIdField = Object.freeze({
    "patient": "$patientID",
    "study": "$studyUID",
    "series": "$seriesUID",
    "instance": "$instanceUID"
});

const DicomModelNames = Object.freeze({
    "patient": "patient",
    "study": "dicomStudy",
    "series": "dicomSeries",
    "instance": "dicom"
});

class DocDicomJsonHandler {
    constructor(docs, queryOptions) {
        this.docs = docs;
        this.queryOptions = queryOptions;
    }

    /**
     * @private
     * @param {any} obj 
     * @returns 
     */
    getPreprocessedDoc_(obj) {
        let preProcessedDoc = obj.toObject();
        delete preProcessedDoc._id;
        delete preProcessedDoc.id;
        return preProcessedDoc;
    }

    get() {
        if (this.docs) {
            return this.docs?.map((v) => {
                let obj = this.getPreprocessedDoc_(v);
                
                this.setRetrieveUrl(obj);
                this.setRetrieveAETitle(obj);
    
                return obj;
            });
        }
        return [];
    }

    setRetrieveUrl(obj) {
        _.set(obj, dictionary.keyword.RetrieveURL, {
            ...dictionary.tagVR[dictionary.keyword.RetrieveURL],
            Value: this.getRetrieveUrlValue(obj)
        });
    }

    getRetrieveUrlValue(obj) {
        throw new Error("Not Implemented");
    }

    setRetrieveAETitle(obj) {
        _.set(obj, dictionary.keyword.RetrieveAETitle, {
            ...dictionary.tagVR[dictionary.keyword.RetrieveAETitle],
            Value: [raccoonConfig.aeTitle]
        });
    }
}

class PatientDocDicomJsonHandler extends DocDicomJsonHandler {
    constructor (docs, queryOptions) {
        super(docs, queryOptions);
    }

    setRetrieveUrl(obj) {
        return;
    }
    
    setRetrieveAETitle(obj) {
        return;
    }
}

class StudyDocDicomJsonHandler extends DocDicomJsonHandler {
    constructor (docs, queryOptions) {
        super(docs, queryOptions);
    }

    getRetrieveUrlValue(obj) {
        return [`${this.queryOptions.retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}`];
    }
}

class SeriesDocDicomJsonHandler extends DocDicomJsonHandler {
    constructor (docs, queryOptions) {
        super(docs, queryOptions);
    }

    getRetrieveUrlValue(obj) {
        return [
            `${this.queryOptions.retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}/series/${obj["0020000E"]["Value"][0]}`
        ];
    }
}

class InstanceDocDicomJsonHandler extends DocDicomJsonHandler {
    constructor (docs, queryOptions) {
        super(docs, queryOptions);
    }

    getRetrieveUrlValue(obj) {
        return [
            `${this.queryOptions.retrieveBaseUrl}/${obj["0020000D"]["Value"][0]}/series/${obj["0020000E"]["Value"][0]}/instances/${obj["00080018"]["Value"][0]}`
        ];
    }
}


module.exports.BaseDicomSchemaDef = BaseDicomSchemaDef;
module.exports.DicomSchemaOptionsFactory = DicomSchemaOptionsFactory;
module.exports.PatientDocDicomJsonHandler = PatientDocDicomJsonHandler;
module.exports.StudyDocDicomJsonHandler = StudyDocDicomJsonHandler;
module.exports.SeriesDocDicomJsonHandler = SeriesDocDicomJsonHandler;
module.exports.InstanceDocDicomJsonHandler = InstanceDocDicomJsonHandler;
const fsP = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { IncludeFieldsFactory } = require("../service");
const { raccoonConfig } = require("@root/config-class");
const { logger } = require("@root/utils/logs/log");
const { BaseDicomSchemaDef, DicomSchemaOptionsFactory, SeriesDocDicomJsonHandler } = require("../schema/dicom.schema");

let dicomSeriesSchemaOptions = _.merge(
    DicomSchemaOptionsFactory.get("series", SeriesDocDicomJsonHandler),
    {
        methods: {
            incrementDeleteStatus: async function () {
                await mongoose.model("dicom").updateMany({
                    seriesUID: this.seriesUID
                }, {
                    $inc: {
                        deleteStatus: 1
                    }
                });
                this.deleteStatus += 1;
                await this.save();
            },
            deleteDicomInstances: async function () {
                let seriesPath = this.seriesPath;
                logger.warn("Permanently delete series folder: " + seriesPath);
                await fsP.rm(path.join(raccoonConfig.dicomWebConfig.storeRootPath, seriesPath), {
                    force: true,
                    recursive: true
                });
            }
        },
        statics: {
            findOneByDicomUID: async function({ studyUID, seriesUID }) {
                return await mongoose.model("dicomSeries").findOne({ studyUID, seriesUID }).exec();
            },
            /**
             * 
             * @param {import("@root/utils/typeDef/dicom").DicomJsonQueryOptions} queryOptions
             * @returns 
             */
            getDicomJsonProjection: function (queryOptions) {
                let includeFieldsFactory = new IncludeFieldsFactory(queryOptions.includeFields);
                return includeFieldsFactory.getSeriesLevelFields();
            },
            getPathGroupQuery: function (iParam) {
                let { studyUID, seriesUID } = iParam;
                return {
                    $match: {
                        $and: [
                            {
                                seriesUID: seriesUID
                            },
                            {
                                studyUID: studyUID
                            }
                        ]
                    }
                };
            }
        }
    }
);

let dicomSeriesSchema = new mongoose.Schema(
    {
        ...BaseDicomSchemaDef
    },
    dicomSeriesSchemaOptions
);

dicomSeriesSchema.add({
    seriesUID: {
        type: String,
        default: void 0,
        index: true,
        required: true
    },
    seriesPath: {
        type: String,
        default: void 0
    }
});

for (let tag in tagsNeedStore.Study) {
    let vr = tagsNeedStore.Study[tag].vr;
    let tagSchema = getVRSchema(vr);
    dicomSeriesSchema.add({
        [tag]: tagSchema
    });
}

for (let tag in tagsNeedStore.Series) {
    let vr = tagsNeedStore.Series[tag].vr;
    let tagSchema = getVRSchema(vr);
    dicomSeriesSchema.add({
        [tag]: tagSchema
    });
}

dicomSeriesSchema.index({
    studyUID: 1
});
dicomSeriesSchema.index({
    seriesUID: 1
});
dicomSeriesSchema.index({
    "0020000D": 1
});
dicomSeriesSchema.index({
    "0020000E": 1
});

let dicomSeriesModel = mongoose.model(
    "dicomSeries",
    dicomSeriesSchema,
    "dicomSeries"
);

module.exports = dicomSeriesModel;
module.exports.SeriesModel = dicomSeriesModel;

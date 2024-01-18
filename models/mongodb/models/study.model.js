const _ = require("lodash");
const fsP = require("fs/promises");
const path = require("path");
const { raccoonConfig } = require("@root/config-class");
const mongoose = require("mongoose");
const { tagsNeedStore } = require("../../DICOM/dicom-tags-mapping");
const { getVRSchema } = require("../schema/dicomJsonAttribute");
const { BaseDicomSchemaDef, DicomSchemaOptionsFactory, StudyDocDicomJsonHandler } = require("../schema/dicom.schema");
const { logger } = require("@root/utils/logs/log");
const { IncludeFieldsFactory } = require("../service");

let dicomStudySchemaOptions = _.merge(
    DicomSchemaOptionsFactory.get("study", StudyDocDicomJsonHandler),
    {
        methods: {
            incrementDeleteStatus: async function() {
                await Promise.all([
                    mongoose.model("dicomSeries").updateMany({
                        studyUID: this.studyUID
                    }, {
                        $inc : {
                            deleteStatus: 1
                        }
                    }),
                    mongoose.model("dicom").updateMany({
                        studyUID: this.studyUID
                    }, {
                        $inc: {
                            deleteStatus: 1
                        }
                    })
                ]);
                this.deleteStatus += 1;
                await this.save();
            },
            deleteDicomInstances: async function () {

                let studyPath = this.studyPath;
                logger.warn("Permanently delete study folder: " + studyPath);
                await fsP.rm(path.join(raccoonConfig.dicomWebConfig.storeRootPath, studyPath), {
                    force: true,
                    recursive: true
                });
            }
        },
        statics: {
            /**
             * 
             * @param {import("@root/utils/typeDef/dicom").DicomJsonQueryOptions} queryOptions
             * @returns 
             */
            getDicomJsonProjection: function (queryOptions) {
                let includeFieldsFactory = new IncludeFieldsFactory(queryOptions.includeFields);
                return includeFieldsFactory.getStudyLevelFields();
            },
            getPathGroupQuery: function (iParam) {
                let { studyUID } = iParam;
                return {
                    $match: {
                        studyUID: studyUID
                    }
                };
            }
        }
    }
);

let dicomStudySchema = new mongoose.Schema(
    {
        ...BaseDicomSchemaDef
    },
    dicomStudySchemaOptions
);

dicomStudySchema.add({
    studyPath: {
        type: String,
        default: void 0
    }
});

for (let tag in tagsNeedStore.Study) {
    let vr = tagsNeedStore.Study[tag].vr;
    let tagSchema = getVRSchema(vr);
    dicomStudySchema.add({
        [tag]: tagSchema
    });
}

dicomStudySchema.index({
    studyUID: 1
});
dicomStudySchema.index({
    "0020000D": 1
});

let dicomStudyModel = mongoose.model(
    "dicomStudy",
    dicomStudySchema,
    "dicomStudy"
);

module.exports = dicomStudyModel;
module.exports.StudyModel = dicomStudyModel;

const _ = require("lodash");
const dicomStudyModel = require("../../../../../../models/mongodb/models/dicomStudy");
const dicomSeriesModel = require("../../../../../../models/mongodb/models/dicomSeries");
const dicomModel = require("../../../../../../models/mongodb/models/dicom");
const fsP = require("fs/promises");
const { NotFoundInstanceError } = require("../../../../../../error/dicom-instance");

class DeleteService {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param { "study" | "series" | "instance" } level
     */
    constructor(req, res, level="study") {
        this.request = req;
        this.response = res;
        this.level = level;
    }

    async delete() {
        let deleteFns = {};
        deleteFns["study"] = async() => this.deleteStudy();
        deleteFns["series"] = async() => this.deleteSeries();
        deleteFns["instance"] = async() => this.deleteInstance();

        await deleteFns[this.level]();
    }
    
    async deleteStudy() {
        let studyImagesPathObjs = await dicomStudyModel.getPathGroupOfInstances({
            ...this.request.params
        });

        if(studyImagesPathObjs.length == 0) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID} instances' files`);
        }

        for(let imagePathObj of studyImagesPathObjs) {
            try {
                await Promise.all([
                    dicomStudyModel.deleteOne({
                        studyUID: imagePathObj.studyUID
                    }),
                    dicomSeriesModel.deleteMany({
                        studyUID: imagePathObj.studyUID
                    }),
                    dicomModel.deleteMany({
                        studyUID: imagePathObj.studyUID
                    })
                ]);
                await fsP.unlink(imagePathObj.instancePath);
            } catch(e) {
                console.error(e);
                throw e;
            }
        }
    }

    async deleteSeries() {
        let seriesImagesPathObjs = await dicomSeriesModel.getPathGroupOfInstances({
            ...this.request.params
        });

        if(seriesImagesPathObjs.length == 0) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID}, seriesUID: ${this.request.params.seriesUID}' files`);
        }

        for(let imagePathObj of seriesImagesPathObjs) {
            try {
                await Promise.all([
                    dicomSeriesModel.deleteMany({
                        $and: [
                            {
                                studyUID: imagePathObj.studyUID
                            },
                            {
                                seriesUID: imagePathObj.seriesUID
                            }
                        ]
                        
                    }),
                    dicomModel.deleteMany({
                        $and: [
                            {
                                studyUID: imagePathObj.studyUID
                            },
                            {
                                seriesUID: imagePathObj.seriesUID
                            }
                        ]
                        
                    })
                ]);
                await fsP.unlink(imagePathObj.instancePath);
            } catch(e) {
                console.error(e);
                throw e;
            }
        }
    }

    async deleteInstance() {
        let imagePathObj = await dicomModel.getPathOfInstance({
            ...this.request.params
        });

        if(!imagePathObj) {
            throw new NotFoundInstanceError(`Can not found studyUID: ${this.request.params.studyUID}, seriesUID: ${this.request.params.seriesUID}, instanceUID: ${this.request.params.instanceUID} instances' files`);
        }

        try {
            await Promise.all([
                dicomModel.deleteOne({
                    instanceUID: imagePathObj.instanceUID
                })
            ]);
            await fsP.unlink(imagePathObj.instancePath);
        } catch(e) {
            console.error(e);
            throw e;
        }
    }
}

module.exports.DeleteService = DeleteService;
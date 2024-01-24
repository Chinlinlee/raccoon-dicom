const mongoose = require("mongoose");
const { expect } = require("chai");
const { DeleteService } = require("../api/dicom-web/controller/WADO-RS/deletion/service/delete");
const { QueryInstanceDicomJsonFactory, QuerySeriesDicomJsonFactory, QueryStudyDicomJsonFactory } = require("../api/dicom-web/controller/QIDO-RS/service/query-dicom-json-factory");


const studyInstanceUid = "1.3.6.1.4.1.14519.5.2.1.7085.2626.192997540292073877946622133586";
const seriesInstanceUid = "1.3.6.1.4.1.14519.5.2.1.7085.2626.328191285537072639441393834220";
const sopInstanceUid = "1.3.6.1.4.1.14519.5.2.1.7085.2626.207018747936703760303203690719";

async function deleteBySopInstanceUid() {
    let deleteService = new DeleteService({
        params: {
            studyUID: studyInstanceUid,
            seriesUID: seriesInstanceUid,
            instanceUID: sopInstanceUid
        }
    }, {}, "instance");

    await deleteService.delete();
}

async function deleteBySeriesInstanceUid() {
    let deleteService = new DeleteService({
        params: {
            studyUID: studyInstanceUid,
            seriesUID: seriesInstanceUid
        }
    }, {}, "series");

    await deleteService.delete();
}

async function deleteByStudyInstanceUid() {
    let deleteService = new DeleteService({
        params: {
            studyUID: studyInstanceUid
        }
    }, {}, "study");

    await deleteService.delete();
}

describe("Delete DICOM Instances by SOPInstanceUID", async () => {

    it("Should delete instance and expect 4 instances in series", async function () {
        await deleteBySopInstanceUid();

        let dicomJsonFactory = new QueryInstanceDicomJsonFactory({
            query: {},
            requestParams: {
                studyUID: studyInstanceUid,
                seriesUID: seriesInstanceUid
            },
            limit: 100,
            skip: 0
        });

        let dicomJson = await dicomJsonFactory.getDicomJson();
        expect(dicomJson).have.lengthOf(4);
    });

});

describe("Delete DICOM Instances by SeriesInstanceUID", async () => {

    it("Should delete series and expect 2 series in study", async function (){
        await deleteBySeriesInstanceUid(); 

        let dicomJsonFactory = new QuerySeriesDicomJsonFactory({
            query: {},
            requestParams: {
                studyUID: studyInstanceUid
            },
            limit: 100,
            skip: 0
        });

        let dicomJson = await dicomJsonFactory.getDicomJson();
        expect(dicomJson).have.lengthOf(2);
    });

});

describe("Delete DICOM Instances by StudyInstanceUID", async () => {

    it("Should delete study and expect 3 studies", async () => {
        await deleteByStudyInstanceUid();

        let dicomJsonFactory = new QueryStudyDicomJsonFactory({
            query: {},
            requestParams: {},
            limit: 100,
            skip: 0
        });

        let dicomJson = await dicomJsonFactory.getDicomJson();
        expect(dicomJson).have.lengthOf(3);
    });

});
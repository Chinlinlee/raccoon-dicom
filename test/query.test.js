const mongoose = require("mongoose");
const formidable = require("formidable");
const glob = require("glob");
const path = require("path");
const fsP = require("fs/promises");
const { StowRsService } = require("../api/dicom-web/controller/STOW-RS/service/stow-rs.service");
const patientModel = require("../models/mongodb/models/patient.model");
const dicomStudyModel = require("../models/mongodb/models/study.model");
const dicomSeriesModel = require("../models/mongodb/models/series.model");
const dicomModel = require("../models/mongodb/models/instance.model");
const { expect } = require("chai");
const { convertAllQueryToDicomTag } = require("../api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { QueryStudyDicomJsonFactory, QuerySeriesDicomJsonFactory, QueryInstanceDicomJsonFactory } = require("../api/dicom-web/controller/QIDO-RS/service/query-dicom-json-factory");


describe("Query DICOM of study, series, and instance level", async () => {

    
    let studyForFirstSeriesTest = {};
    let studyForSecondSeriesTest = {};
    let seriesForFirstInstanceTest = [];
    describe("Search For Studies", async () => {
        describe("Query By `StudyDate (0008, 0020)`", async () => {
            it("Should search StudyDate=19990101-19991231 and expect 2 matches", async () => {
                let q = {
                    "StudyDate": "19990101-19991231"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                });

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                expect(studyDicomJson).is.an("array").have.lengthOf(2);
            });

            it("Should search StudyDate=20220101-20221231 and expect 0 match", async () => {
                let q = {
                    "StudyDate": "20220101-20221231"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                });

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                expect(studyDicomJson).is.an("array").have.lengthOf(0);
            });
        });

        describe("(step 170): Query By PatientID (0010, 0020) ", async () => {
            it("Should search PatientID=TCGA-G4-6304 and expect 1 match", async () => {
                let q = {
                    "PatientID": "TCGA-G4-6304"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                }, "study");

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                studyForSecondSeriesTest = studyDicomJson[0];
                expect(studyDicomJson).is.an("array").have.lengthOf(1);
            });
        });

        describe("Query By PatientName (0010, 0010) & StudyDate (0008, 0020)", async () => {
            it("Should search PatientName=TCGA*&StudyDate=20100101-20101231 and expect 0 match", async () => {
                let q = {
                    "PatientName": "TCGA*",
                    "StudyDate": "20100101-20101231"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                }, "study");

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                expect(studyDicomJson).is.an("array").have.lengthOf(0);
            });

            it("Should search PatientName=TCGA*&StudyDate=19990101-19991231 and expect 0 match", async () => {
                let q = {
                    "PatientName": "TCGA*",
                    "StudyDate": "19990101-19991231"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                }, "study");

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                expect(studyDicomJson).is.an("array").have.lengthOf(1);
            });
        });

        describe("Query By PatientName (0010, 0010) & PatientBirthDate (0010, 0030)", async () => {
            it("Should search PatientName=ChestXR*&PatientBirthDate=19590101 and expect 0 match", async () => {
                let q = {
                    "PatientName": "ChestXR*",
                    "PatientBirthDate": "19590101"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                });

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                expect(studyDicomJson).is.an("array").have.lengthOf(0);
            });

            it("Should search PatientName=ChestXR*&PatientBirthDate=19590101 and expect 0 match", async () => {
                let q = {
                    "PatientName": "ChestXR*",
                    "PatientBirthDate": "19601218"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                });

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                expect(studyDicomJson).is.an("array").have.lengthOf(1);
            });
        });

        describe("Query By PatientID (0010, 0020) & AccessionNumber (0008, 0050)", async () => {
            it("Should search PatientID=C3N-00953&AccessionNumber=4444 and expect 0 match", async () => {
                let q = {
                    "PatientID": "C3N-00953",
                    "AccessionNumber": "4444"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                }, "study");

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                expect(studyDicomJson).is.an("array").have.lengthOf(0);
            });

            it("(step 140): Should search PatientID=C3N-00953&AccessionNumber=2794663908550664 and expect 1 match", async () => {
                let q = {
                    "PatientID": "C3N-00953",
                    "AccessionNumber": "2794663908550664"
                };

                q = convertAllQueryToDicomTag(q);

                let dicomJsonFactory = new QueryStudyDicomJsonFactory({
                    query: {
                        ...q
                    },
                    limit: 100,
                    skip: 0
                });

                let studyDicomJson = await dicomJsonFactory.getDicomJson();
                studyForFirstSeriesTest = studyDicomJson[0];
                expect(studyDicomJson).is.an("array").have.lengthOf(1);
            });
        });
    });

    describe("Search For Series", () => {
        it("(step 150): Should use StudyInstanceUID search series and expect 3 series", async () => {

            let dicomJsonFactory = new QuerySeriesDicomJsonFactory({
                query: {},
                requestParams: {
                    studyUID: studyForFirstSeriesTest["0020000D"]["Value"][0]
                },
                limit: 100,
                skip: 0
            }, "series");

            let seriesDicomJson = await dicomJsonFactory.getDicomJson();
            seriesForFirstInstanceTest = seriesDicomJson;
            expect(seriesDicomJson).is.an("array").have.lengthOf(3);
        });

        it("Should use StudyInstanceUID from step 170 search series and expect 3 series", async () => {

            let dicomJsonFactory = new QuerySeriesDicomJsonFactory({
                query: {},
                requestParams: {
                    studyUID: studyForSecondSeriesTest["0020000D"]["Value"][0]
                },
                limit: 100,
                skip: 0
            });

            let seriesDicomJson = await dicomJsonFactory.getDicomJson();
            expect(seriesDicomJson).is.an("array").have.lengthOf(3);
        });
    });

    describe("Search For Instances", async () => {
        it("Should expect 1 image, 5 images, and 5 images in 3 series respectively from step 150's series", async () => {
            let seriesImageCount = [];
            for (let dicomJson of seriesForFirstInstanceTest) {
                let dicomJsonFactory = new QueryInstanceDicomJsonFactory({
                    query: {},
                    requestParams: {
                        studyUID: dicomJson["0020000D"]["Value"][0],
                        seriesUID: dicomJson["0020000E"]["Value"][0]
                    },
                    limit: 100,
                    skip: 0
                });

                let instanceDicomJson = await dicomJsonFactory.getDicomJson();
                seriesImageCount.push(instanceDicomJson.length);
            }
            seriesImageCount.sort((a, b) => a - b);
            expect(seriesImageCount).members([1, 5, 5]);
        });
    });
});
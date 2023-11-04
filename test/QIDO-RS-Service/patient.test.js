const mongoose = require("mongoose");
const patientModel = require("../../models/mongodb/models/patient");
const { DicomJsonModel } = require("../../models/DICOM/dicom-json-model");
const { expect } = require("chai");
const _ = require("lodash");
const { convertAllQueryToDICOMTag } = require("../../api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");
const { QueryPatientDicomJsonFactory } = require("../../api/dicom-web/controller/QIDO-RS/service/query-dicom-json-factory");

describe("Patient QIDO-RS Service", async () => {
    let fakePatientData = {
        "patientID": "foobar123456",
        "00100010": {
            "vr": "PN",
            "Value": [
                {
                    "Alphabetic": "John^Doe"
                }
            ]
        },
        "00100020": {
            "vr": "LO",
            "Value": [
                "foobar123456"
            ]
        },
        "00100021": {
            "vr": "LO",
            "Value": [
                "Hospital A"
            ]
        },
        "00100030": {
            "vr": "DA",
            "Value": [
                "19700101"
            ]
        },
        "00100032": {
            "vr": "TM",
            "Value": [
                "000000"
            ]
        },
        "00100040": {
            "vr": "CS",
            "Value": [
                "M"
            ]
        },
        "00101001": {
            "vr": "PN",
            "Value": [
                {
                    "Alphabetic": "Doe, John"
                }
            ]
        },
        "00101002": {
            "vr": "SQ",
            "Value": [
                {
                    "00100020": {
                        "vr": "LO",
                        "Value": [
                            "98765"
                        ]
                    }
                }
            ]
        },
        "00102160": {
            "vr": "SH",
            "Value": [
                "Caucasian"
            ]
        },
        "00104000": {
            "vr": "LT",
            "Value": [
                "No known allergies."
            ]
        }
    };

    before(async () => {
        let cloneFakePatientData = _.cloneDeep(fakePatientData);
        _.set(cloneFakePatientData, "studyPath", "/foo/bar");
        let dicomJsonModel = new DicomJsonModel(cloneFakePatientData);
        await dicomJsonModel.storePatientCollection(cloneFakePatientData);
        _.set(cloneFakePatientData, "patientID", "foobar1");
        _.set(cloneFakePatientData, "00100020.Value.0", "foobar1");
        await dicomJsonModel.storePatientCollection(cloneFakePatientData);
    });

    describe("Query `PatientID (0010, 0020)` using `QueryPatientDicomJsonFactory`", () => {
        it("Should search PatientID=`foobar123456` patient and return 1", async () => {
            let q = {
                "00100020": "foobar123456"
            };
            q = convertAllQueryToDICOMTag(q);

            let dicomJsonFactory = new QueryPatientDicomJsonFactory({
                query: {
                    ...q
                },
                limit: 10,
                skip: 0
            });
            let patientJson = await dicomJsonFactory.getDicomJson();
            expect(patientJson).is.an("array").length(1);
        });

        it("Should search PatientID=`foobar123` patient and return 0", async () => {
            let q = {
                "00100020": "foobar123"
            };
            q = convertAllQueryToDICOMTag(q);

            let dicomJsonFactory = new QueryPatientDicomJsonFactory({
                query: {
                    ...q
                },
                limit: 10,
                skip: 0
            });
            let patientJson = await dicomJsonFactory.getDicomJson();
            expect(patientJson).is.an("array").length(0);
        });

    });

    describe("Query `PatientName (0010,0010)` using `QueryPatientDicomJsonFactory`", () => {
        it("Should search PatientName=`John*` patient and return 1", async () => {
            let q = {
                "00100010": "John*"
            };
            q = convertAllQueryToDICOMTag(q);

            let dicomJsonFactory = new QueryPatientDicomJsonFactory({
                query: {
                    ...q
                },
                limit: 10,
                skip: 0
            });
            let patientJson = await dicomJsonFactory.getDicomJson();
            expect(patientJson).is.an("array").length(2);
        });

        it("Should search PatientName=`John Doe` patient and return 0", async () => {
            let q = {
                "00100010": "John Doe"
            };
            q = convertAllQueryToDICOMTag(q);

            let dicomJsonFactory = new QueryPatientDicomJsonFactory({
                query: {
                    ...q
                },
                limit: 10,
                skip: 0
            });
            let patientJson = await dicomJsonFactory.getDicomJson();
            expect(patientJson).is.an("array").length(0);
        });

    });


    after(async () => {
        await patientModel.deleteOne({
            patientID: "foobar123456"
        });
        await patientModel.deleteOne({
            patientID: "foobar1"
        });
    });

});
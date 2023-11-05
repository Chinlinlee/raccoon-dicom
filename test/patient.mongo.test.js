const mongoose = require("mongoose");
const patientModel = require("../models/mongodb/models/patient");
const { DicomJsonModel } = require("../models/DICOM/dicom-json-model");
const { expect } = require("chai");
const _ = require("lodash");

describe("Patient MongoDB and DicomJsonModel", async() => {
    let fakePatientData = {
        "patientID": "foobar123456",
        "00100010": {
            "vr": "PN",
            "Value": [
                {
                    "Alphabetic" : "John Doe"
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

    it("Should store patient", async() => {
        /** @type {mongoose.Document} */
        await patientModel.create(fakePatientData);

        let findDoc = await patientModel.findOne();
        let docObj = findDoc.toObject();
        delete docObj._id;
        delete docObj.id;
        delete docObj.deleteStatus;
        delete docObj.createdAt;
        delete docObj.updatedAt;

        expect(docObj).to.deep.equal(fakePatientData);
    });

    it("Should store patient using `DicomJsonModel`", async () => {
        let cloneFakePatientData = _.cloneDeep(fakePatientData);
        _.set(cloneFakePatientData, "studyPath", "/foo/bar");

        let dicomJsonModel = new DicomJsonModel(cloneFakePatientData);
        dicomJsonModel.setUidObj();

        await dicomJsonModel.storePatientCollection({
            ...dicomJsonModel.getMediaStorageInfo(),
            ...cloneFakePatientData
        });

        let findDoc = await patientModel.findOne();
        expect(findDoc).property("studyPaths").that.is.an("array").include("/foo/bar");
    });

    it("Should get patient's DICOM JSON model using `DicomJsonModel`", async () => {
        let cloneFakePatientData = _.cloneDeep(fakePatientData);
        _.unset(cloneFakePatientData, "patientID");

        let foundDocs = await patientModel.getDicomJson({});
        let foundDoc = foundDocs[0];

        describe("Test patient have storage media info", () => {
            it("Should have 00880130 Storage Media File-set ID", async ()=> {
                expect(foundDoc).have.property("00880130");
                _.unset(foundDoc, "00880130");
            });
    
            it("Should have 00880140 Storage Media File-set UID", async () => {
                expect(foundDoc).have.property("00880140");
                _.unset(foundDoc, "00880140");
            });
        });
        
        describe("Test patient equal to fake patient", ()=> {
            it("Should equal to fake patient after unset storage media info", () => {
                expect(foundDoc).to.deep.equal(cloneFakePatientData);
            });
        });
        
    });

    describe("Delete fake Patient", () => {
        it("Should delete fake patient and find zero in DB", async () => {
            await patientModel.deleteOne({
                patientID: "foobar123456"
            });
            let doc = await patientModel.findOne({
                patientID: "foobar123456"
            });
            expect(doc).equal(null);
        });
    });


});
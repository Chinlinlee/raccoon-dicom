const mongoose = require("mongoose");
const formidable = require("formidable");
const glob = require("glob");
const path = require("path");
const fsP = require("fs/promises");
const { StowRsService } = require("../api/dicom-web/controller/STOW-RS/service/stow-rs.service");
const patientModel = require("../models/mongodb/models/patient");
const dicomStudyModel = require("../models/mongodb/models/dicomStudy");
const dicomSeriesModel = require("../models/mongodb/models/dicomSeries");
const dicomModel = require("../models/mongodb/models/dicom");
const { expect } = require("chai");
const { QidoDicomJsonFactory, convertAllQueryToDICOMTag } = require("../api/dicom-web/controller/QIDO-RS/service/QIDO-RS.service");

async function storeDicomInstancesAndGet4Patients() {
    let stowRsService = new StowRsService({
        headers: {
            host: "fake-host"
        },
        params: {}
    }, []);

    /** @type {string[]} */
    let files = glob.sync("**/*.dcm", {
        cwd: __dirname,
        absolute: true
    });

    for (let file of files) {
        let dest = path.join(
            __dirname,
            "dicomFiles/temp",
            path.basename(file)
        );

        await fsP.copyFile(file, dest);

        /** @type {formidable.File} */
        let fileObj = {
            filepath: path.resolve(dest),
            originalFilename: path.basename(file)
        };

        await stowRsService.storeInstance(fileObj);
    }

    let patients = await patientModel.find({});
    expect(patients).have.lengthOf(4);
}

describe("Store DICOM Instances", async () => {
    it("Should store DICOM instances and get 4 patients", async () => {
        await storeDicomInstancesAndGet4Patients();
    });
});
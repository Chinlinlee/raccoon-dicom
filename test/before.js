require("module-alias/register");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {getLogger} = require("log4js");
require("../models/mongodb/models/auditMessage");
require("../models/DICOM/dcm4che/java-instance");

before(async() => {
    getLogger().level = "off";
    getLogger("raccoon-polka").level = "off";
    getLogger("raccoon-polka-fhir").level = "off";
    getLogger("api").level = "off";

    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: "raccoon-dicom" });
    console.log("connected mongoose");
    after(async()=> {
        await mongoServer.stop();
        await mongoose.disconnect();
    });
});
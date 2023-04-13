const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

before(async() => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: "raccoon-dicom" });
    console.log("connected mongoose");
    after(async()=> {
        await mongoServer.stop();
        await mongoose.disconnect();
    });
});
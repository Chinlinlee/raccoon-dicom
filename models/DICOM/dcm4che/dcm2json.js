
const path = require("path");
const { importClassAsync } = require("java-bridge");
const { JsonGenerator } = require("@java-wrapper/javax/json/stream/JsonGenerator");
const { JSONWriter } = require("@dcm4che/json/JSONWriter");
const { DicomInputStream } = require("@dcm4che/io/DicomInputStream");
const {  File } = require("@java-wrapper/java/io/File");
const { Json } = require("@java-wrapper/javax/json/Json");
const { Common } = require("@java-wrapper/org/github/chinlinlee/dcm777/common/Common");
const { DicomInputStream$IncludeBulkData } = require("@dcm4che/io/DicomInputStream$IncludeBulkData");
const { BasicBulkDataDescriptor } = require("@dcm4che/io/BasicBulkDataDescriptor");


class JDcm2Json {

    /**
     * 
     * @param {string} filename 
     */
    static async get(filename) {
        let jFile = new File(filename);
        let dicomInputStream = new DicomInputStream(jFile);
        await dicomInputStream.setIncludeBulkData(DicomInputStream$IncludeBulkData.NO);
        await dicomInputStream.setBulkDataDescriptor(new BasicBulkDataDescriptor());

        let JByteArrayOutputStream = await importClassAsync("java.io.ByteArrayOutputStream");
        let byteArrayOutputStream = new JByteArrayOutputStream();
    
        let jsonGeneratorFactory = await Json.createGeneratorFactory(
            await Common.jsonGeneratorFactoryConfig(false)
        );
        let jsonGenerator = await jsonGeneratorFactory.createGenerator(byteArrayOutputStream);
        let jsonWriter = new JSONWriter(jsonGenerator);
    
        await dicomInputStream.setDicomInputHandler(jsonWriter);
        await dicomInputStream.readDataset();
        await jsonGenerator.flush();

        let jsonStr = await byteArrayOutputStream.toString("UTF-8");
        await dicomInputStream.close();
        return JSON.parse(jsonStr);
    }
}

module.exports.JDcm2Json = JDcm2Json;
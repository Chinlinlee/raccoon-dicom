const { java } = require("./java-instance");
const { File } = require("./wrapper/java/io/File");
const { ElementDictionary } = require("./wrapper/org/dcm4che3/data/ElementDictionary");
const { Tag } = require("./wrapper/org/dcm4che3/data/Tag");
const { Attributes } = require("./wrapper/org/dcm4che3/data/Attributes");
const { DicomInputStream } = require("./wrapper/org/dcm4che3/io/DicomInputStream");
const { DicomOutputStream } = require("./wrapper/org/dcm4che3/io/DicomOutputStream");
const { SafeClose } = require("./wrapper/org/dcm4che3/util/SafeClose");


class DicomUtf8Converter {
    constructor(filename, outputFilename = "") {
        this.filename = filename;
        this.outputFilename = outputFilename;
        if (!outputFilename) this.outputFilename = this.filename;

        /** @type {Attributes} */
        this.attributes;
        /** @type {Attributes} */
        this.fileMetaInfo;
    }

    /**
     * @private
     */
    async readDicomFile() {
        let file = await File.newInstanceAsync(this.filename);

        /** @type {DicomInputStream} */
        let dicomInputStream;
        try {
            
            dicomInputStream = await DicomInputStream.newInstanceAsync(file);

            this.attributes = await dicomInputStream.readDataset();

            this.fileMetaInfo = await dicomInputStream.readFileMetaInformation();
            this.fileMetaInfo = await this.attributes.createFileMetaInformation(await dicomInputStream.getTransferSyntax());
        } finally {
            dicomInputStream.closeSync();
        }
    }

    async convert() {
        await this.readDicomFile();

        await this.attributes.setString(Tag.SpecificCharacterSet, ElementDictionary.vrOfSync(Tag.SpecificCharacterSet, ""), "ISO_IR 192");

        let outputFile = new File(this.outputFilename);

        /** @type {DicomOutputStream} */
        let dicomOutputStream;
        try {
            dicomOutputStream = await DicomOutputStream.newInstanceAsync(outputFile);
            await dicomOutputStream.writeDataset(this.fileMetaInfo, this.attributes);
        } finally {
            SafeClose.closeSync(dicomOutputStream);
        }
    }

}

module.exports.DicomUtf8Converter = DicomUtf8Converter;
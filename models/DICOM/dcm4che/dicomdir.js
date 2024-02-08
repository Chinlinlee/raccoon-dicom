const { default: Tag } = require("@dcm4che/data/Tag");
const { default: UID } = require("@dcm4che/data/UID");
const { default: VR } = require("@dcm4che/data/VR");
const { default: DicomEncodingOptions } = require("@dcm4che/io/DicomEncodingOptions");
const { default: DicomInputStream } = require("@dcm4che/io/DicomInputStream");
const { default: DicomInputStream$IncludeBulkData } = require("@dcm4che/io/DicomInputStream$IncludeBulkData");
const { default: DicomDirWriter } = require("@dcm4che/media/DicomDirWriter");
const { default: RecordFactory } = require("@dcm4che/media/RecordFactory");
const { default: RecordType } = require("@dcm4che/media/RecordType");
const { default: FilesetInfo } = require("@dcm4che/tool/common/FilesetInfo");
const { default: UIDUtils } = require("@dcm4che/util/UIDUtils");
const { default: File } = require("@java-wrapper/java/io/File");

class DicomDir {
    /** @type {RecordFactory} */
    #recFact;

    static checkDuplicate = false;

    /**
     * 
     * @param {string} dicomDirDest 
     * @param  {...string} dicomFiles 
     */
    constructor(dicomDirDest, ...dicomFiles) {
        this.dicomDirDest = dicomDirDest;
        this.dicomFiles = dicomFiles;

        this.dicomDirReader = null;
        this.dicomDirOutputWriter = null;
        this.jFile = null;
    }

    set recFact(value) {
        this.#recFact = value;
    }

    get recFact() {
        return this.#recFact;
    }

    async exec() {
        await this.create();
        await this.initializeRecords();
        let num = 0;
        for (let dicomFile of this.dicomFiles) {
            num += await this.addReferenceTo(
                await File.newInstanceAsync(dicomFile)
            );
        }
        
    }

    async initializeRecords() {
        this.recFact = await RecordFactory.newInstanceAsync();
    }

    async create() {
        this.jFile = await File.newInstanceAsync(this.dicomDirDest);
        let fsInfo = await FilesetInfo.newInstanceAsync();
        await DicomDirWriter.createEmptyDirectory(
            this.jFile,
            await UIDUtils.createUIDIfNull(await fsInfo.getFilesetUID()),
            await fsInfo.getFilesetID(),
            await fsInfo.getDescriptorFile(),
            await fsInfo.getDescriptorFileCharset()
        );

        this.dicomDirReader = this.dicomDirOutputWriter = await DicomDirWriter.open(this.jFile);
        this.dicomDirOutputWriter.setEncodingOptions(DicomEncodingOptions.DEFAULT);
    }

    /**
     * 
     * @param {import("@dcm4che/data/Attributes").Attributes} dataset 
     * @param {number} num 
     * @param {string[]} fileIDs 
     * @param {string} prompt 
     * @param {string} iuid 
     * @param {import("@dcm4che/data/Attributes").Attributes} fmi 
     */
    async addRecords(dataset, num, fileIDs, prompt, iuid, fmi) {

        let pid = await dataset.getString(Tag.PatientID, null);
        let styuid = await dataset.getString(Tag.StudyInstanceUID, null);
        let seruid = await dataset.getString(Tag.SeriesInstanceUID, null);

        if (styuid === null) {
            if (pid === null) {
                await dataset.setString(Tag.PatientID, VR.LO, pid = styuid);
                prompt = prompt === "F" ? "P" : "p";
            }

            let patRec = await this.dicomDirReader.findPatientRecord(pid);
            if (patRec === null) {
                patRec = await this.recFact.createRecord(RecordType.PATIENT, null,
                                                         dataset, null, null);
                
                await this.dicomDirOutputWriter.addRootDirectoryRecord(patRec);
                num++;
            }

            let studyRec = await this.dicomDirReader.findStudyRecord(patRec, styuid);
            if (studyRec == null) {
                studyRec = await this.recFact.createRecord(RecordType.STUDY, null,
                                                           dataset, null, null);

                await this.dicomDirOutputWriter.addLowerDirectoryRecord(patRec, studyRec);
                num++;
            }

            if (seruid != null) {
                let seriesRec = await this.dicomDirReader.findSeriesRecord(studyRec, seruid);
                if (seriesRec == null) {
                    seriesRec = await this.recFact.createRecord(RecordType.SERIES, null,
                                                                dataset, null, null);

                    await this.dicomDirOutputWriter.addLowerDirectoryRecord(studyRec, seriesRec);
                    num++;
                }

                if (iuid != null) {
                    let instRec;
                    if (DicomDir.checkDuplicate) {
                        instRec = await this.dicomDirReader.findLowerInstanceRecord(seriesRec, false, iuid);
                        if (instRec != null) {
                            return 0;
                        }
                    }
                    instRec = await this.recFact.createRecord(dataset, fmi, fileIDs);
                    await this.dicomDirOutputWriter.addLowerDirectoryRecord(seriesRec, instRec);
                    num++;
                }
            }
        } else {
            if (iuid != null) {
                if (DicomDir.checkDuplicate) {
                    if (await this.dicomDirReader.findRootInstanceRecord(false, iuid) != null) {
                        return 0;
                    }
                }
                let instRec = await this.recFact.createRecord(dataset, fmi, fileIDs);
                await this.dicomDirOutputWriter.addRootDirectoryRecord(instRec);
                prompt = prompt == 'F' ? 'R' : 'r';
                num++;
            }
        }
        return num;
    }

    /**
     * 
     * @param {File} jFile 
     */
    async addReferenceTo(jFile) {
        await this.checkOut();
        await this.checkRecordFactory();

        let n = 0;
        if (await jFile.isDirectory()) {
            for (let s of await jFile.list()) {
                n += this.addReferenceTo(
                    await File.newInstanceAsync(jFile, s)
                );
            }
            return n;
        }

        if (await jFile.equals(this.jFile)) {
            return 0;
        }


        let fmi;
        let dataset;
        let din;
        try {
            din = await DicomInputStream.newInstanceAsync(jFile);

            await din.setIncludeBulkData(DicomInputStream$IncludeBulkData.NO);
            fmi = await din.readFileMetaInformation();
            dataset = await din.readDatasetUntilPixelData();
        } catch (e) {
            console.error(`Failed to parse ${e}`);
            return 0;
        } finally {
            if (din !== null)
                // eslint-disable-next-line no-empty
                try { await din.close(); } catch (e) { }
        }

        let prompt = ".";
        if (fmi === null) {
            fmi = await dataset.createFileMetaInformation(UID.ImplicitVRLittleEndian);
            prompt = "F";
        }

        let iuid = await fmi.getString(Tag.MediaStorageSOPInstanceUID, null);
        if (iuid === null) {
            console.log(`skip file ${jFile}`);
            return 0;
        }

        return await this.addRecords(dataset, n, await this.dicomDirOutputWriter.toFileIDs(jFile), prompt, iuid, fmi);
    }

    async checkOut() {
        this.checkIn();
        if (this.dicomDirOutputWriter === null)
            throw new Error("read only");
    }

    async checkIn() {
        if (this.dicomDirReader === null) {
            throw new Error("no open file");
        }
    }

    async checkRecordFactory() {
        if (this.recFact === null) {
            throw new Error("no record factory set");
        }
    }
}

module.exports.DicomDir = DicomDir;
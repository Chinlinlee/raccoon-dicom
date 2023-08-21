import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Attributes as org_dcm4che3_data_Attributes } from "./../data/Attributes";
import { File as java_io_File } from "./../../../java/io/File";
import { Boolean as java_lang_Boolean } from "./../../../java/lang/Boolean";
import { RecordFactory as org_dcm4che3_media_RecordFactory } from "./RecordFactory";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link DicomDirReader} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DicomDirReaderClass extends JavaClass {
    /**
     * @return original return type: 'boolean'
     */
    isEmpty(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isEmptySync(): boolean;
    /**
     * @return original return type: 'void'
     */
    close(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeSync(): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'boolean'
     */
    static isPrivate(var0: org_dcm4che3_data_Attributes | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'boolean'
     */
    static isPrivateSync(var0: org_dcm4che3_data_Attributes | null): boolean;
    /**
     * @return original return type: 'java.io.File'
     */
    getFile(): Promise<java_io_File | null>;
    /**
     * @return original return type: 'java.io.File'
     */
    getFileSync(): java_io_File | null;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'java.io.File'
     */
    toFile(var0: (string | null)[] | null): Promise<java_io_File | null>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'java.io.File'
     */
    toFileSync(var0: (string | null)[] | null): java_io_File | null;
    /**
     * @return original return type: 'void'
     */
    clearCache(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    clearCacheSync(): void;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    getFileMetaInformation(): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    getFileMetaInformationSync(): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'int'
     */
    getOffsetOfFirstRootDirectoryRecord(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getOffsetOfFirstRootDirectoryRecordSync(): number;
    /**
     * @return original return type: 'int'
     */
    getOffsetOfLastRootDirectoryRecord(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getOffsetOfLastRootDirectoryRecordSync(): number;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readFirstRootDirectoryRecord(): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readFirstRootDirectoryRecordSync(): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readLastRootDirectoryRecord(): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readLastRootDirectoryRecordSync(): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'boolean'
     */
    knownInconsistencies(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    knownInconsistenciesSync(): boolean;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readNextDirectoryRecord(var0: org_dcm4che3_data_Attributes | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readNextDirectoryRecordSync(var0: org_dcm4che3_data_Attributes | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readLowerDirectoryRecord(var0: org_dcm4che3_data_Attributes | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    readLowerDirectoryRecordSync(var0: org_dcm4che3_data_Attributes | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findFirstRootDirectoryRecordInUse(var0: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findFirstRootDirectoryRecordInUseSync(var0: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextDirectoryRecordInUse(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextDirectoryRecordInUseSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextPatientRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextPatientRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextPatientRecord(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextPatientRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextInstanceRecord(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextInstanceRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextInstanceRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextInstanceRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerDirectoryRecord(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_Attributes | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerDirectoryRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_Attributes | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextStudyRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextStudyRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextStudyRecord(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextStudyRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextSeriesRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextSeriesRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextSeriesRecord(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextSeriesRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextDirectoryRecord(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_Attributes | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findNextDirectoryRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_Attributes | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerInstanceRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerInstanceRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerInstanceRecord(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerInstanceRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findRootDirectoryRecord(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: java_lang_Boolean | boolean, var3: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findRootDirectoryRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean, var2: java_lang_Boolean | boolean, var3: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'boolean'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findRootDirectoryRecord(var0: java_lang_Boolean | boolean, var1: org_dcm4che3_data_Attributes | null, var2: java_lang_Boolean | boolean, var3: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'boolean'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findRootDirectoryRecordSync(var0: java_lang_Boolean | boolean, var1: org_dcm4che3_data_Attributes | null, var2: java_lang_Boolean | boolean, var3: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerDirectoryRecordInUse(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findLowerDirectoryRecordInUseSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'boolean'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findRootInstanceRecord(var0: java_lang_Boolean | boolean, var1: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'boolean'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findRootInstanceRecordSync(var0: java_lang_Boolean | boolean, var1: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    getFileSetInformation(): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    getFileSetInformationSync(): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getTransferSyntaxUID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getTransferSyntaxUIDSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getDescriptorFileCharacterSet(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getDescriptorFileCharacterSetSync(): string | null;
    /**
     * @return original return type: 'int'
     */
    getFileSetConsistencyFlag(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getFileSetConsistencyFlagSync(): number;
    /**
     * @return original return type: 'java.io.File'
     */
    getDescriptorFile(): Promise<java_io_File | null>;
    /**
     * @return original return type: 'java.io.File'
     */
    getDescriptorFileSync(): java_io_File | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getFileSetUID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getFileSetUIDSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getFileSetID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getFileSetIDSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findPatientRecord(var0: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findPatientRecordSync(var0: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findPatientRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_media_RecordFactory | null, var2: java_lang_Boolean | boolean, var3: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findPatientRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_media_RecordFactory | null, var2: java_lang_Boolean | boolean, var3: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'boolean'
     */
    static inUse(var0: org_dcm4che3_data_Attributes | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'boolean'
     */
    static inUseSync(var0: org_dcm4che3_data_Attributes | null): boolean;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findSeriesRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findSeriesRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findSeriesRecord(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findSeriesRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findStudyRecord(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findStudyRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: (string | null)[] | null): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findStudyRecord(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.media.RecordFactory'
     * @param var3 original type: 'boolean'
     * @param var4 original type: 'boolean'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    findStudyRecordSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_media_RecordFactory | null, var3: java_lang_Boolean | boolean, var4: java_lang_Boolean | boolean): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    wait(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    waitSync(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    wait(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    waitSync(): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    wait(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    waitSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    equals(var0: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    equalsSync(var0: BasicOrJavaType | null): boolean;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'int'
     */
    hashCode(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    hashCodeSync(): number;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getClass(): Promise<java_lang_Class>;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getClassSync(): java_lang_Class;
    /**
     * @return original return type: 'void'
     */
    notify(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    notifySync(): void;
    /**
     * @return original return type: 'void'
     */
    notifyAll(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    notifyAllSync(): void;
    /**
     * @param var0 original type: 'java.io.File'
     * @return original return type: 'org.dcm4che3.media.DicomDirReader'
     */
    static newInstanceAsync(var0: java_io_File | null): Promise<DicomDirReader>;
    /**
     * @param var0 original type: 'java.io.File'
     */
    constructor(var0: java_io_File | null);
}
declare const DicomDirReader_base: typeof DicomDirReaderClass;
/**
 * Class org.dcm4che3.media.DicomDirReader.
 *
 * This actually imports the java class for further use.
 * The class {@link DicomDirReaderClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DicomDirReader extends DicomDirReader_base {
}
export default DicomDirReader;
//# sourceMappingURL=DicomDirReader.d.ts.map
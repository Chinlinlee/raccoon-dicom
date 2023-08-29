/// <reference types="node" />
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { DicomEncodingOptions as org_dcm4che3_io_DicomEncodingOptions } from "./DicomEncodingOptions";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { VR as org_dcm4che3_data_VR } from "./../data/VR";
import { SpecificCharacterSet as org_dcm4che3_data_SpecificCharacterSet } from "./../data/SpecificCharacterSet";
import { Value as org_dcm4che3_data_Value, ValueInterface as org_dcm4che3_data_ValueInterface } from "./../data/Value";
import { Attributes as org_dcm4che3_data_Attributes } from "./../data/Attributes";
import { OutputStream as java_io_OutputStream } from "./../../../java/io/OutputStream";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
import { File as java_io_File } from "./../../../java/io/File";
/**
 * This class just defines types, you should import {@link DicomOutputStream} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DicomOutputStreamClass extends JavaClass {
    /**
     * @return original return type: 'org.dcm4che3.io.DicomEncodingOptions'
     */
    getEncodingOptions(): Promise<org_dcm4che3_io_DicomEncodingOptions | null>;
    /**
     * @return original return type: 'org.dcm4che3.io.DicomEncodingOptions'
     */
    getEncodingOptionsSync(): org_dcm4che3_io_DicomEncodingOptions | null;
    /**
     * @return original return type: 'boolean'
     */
    isExplicitVR(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isExplicitVRSync(): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'java.lang.Object'
     * @param var3 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @return original return type: 'void'
     */
    writeAttribute(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: BasicOrJavaType | null, var3: org_dcm4che3_data_SpecificCharacterSet | null): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'java.lang.Object'
     * @param var3 original type: 'org.dcm4che3.data.SpecificCharacterSet'
     * @return original return type: 'void'
     */
    writeAttributeSync(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: BasicOrJavaType | null, var3: org_dcm4che3_data_SpecificCharacterSet | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'byte[]'
     * @return original return type: 'void'
     */
    writeAttribute(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'byte[]'
     * @return original return type: 'void'
     */
    writeAttributeSync(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: Buffer | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'org.dcm4che3.data.Value'
     * @return original return type: 'void'
     */
    writeAttribute(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: org_dcm4che3_data_Value | JavaInterfaceProxy<org_dcm4che3_data_ValueInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'org.dcm4che3.data.Value'
     * @return original return type: 'void'
     */
    writeAttributeSync(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: org_dcm4che3_data_Value | JavaInterfaceProxy<org_dcm4che3_data_ValueInterface> | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    writeGroupLength(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    writeGroupLengthSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    writeHeader(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    writeHeaderSync(var0: java_lang_Integer | number, var1: org_dcm4che3_data_VR | null, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    writeDataset(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    writeDatasetSync(var0: org_dcm4che3_data_Attributes | null, var1: org_dcm4che3_data_Attributes | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    switchTransferSyntax(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    switchTransferSyntaxSync(var0: string | null): void;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    write(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    writeSync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    write(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    writeSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    write(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    writeSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    close(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isBigEndian(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isBigEndianSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    finish(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    finishSync(): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    setPreamble(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    setPreambleSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomEncodingOptions'
     * @return original return type: 'void'
     */
    setEncodingOptions(var0: org_dcm4che3_io_DicomEncodingOptions | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomEncodingOptions'
     * @return original return type: 'void'
     */
    setEncodingOptionsSync(var0: org_dcm4che3_io_DicomEncodingOptions | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    writeCommand(var0: org_dcm4che3_data_Attributes | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    writeCommandSync(var0: org_dcm4che3_data_Attributes | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    writeFileMetaInformation(var0: org_dcm4che3_data_Attributes | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    writeFileMetaInformationSync(var0: org_dcm4che3_data_Attributes | null): void;
    /**
     * @return original return type: 'void'
     */
    flush(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    flushSync(): void;
    /**
     * @return original return type: 'java.io.OutputStream'
     */
    static nullOutputStream(): Promise<java_io_OutputStream | null>;
    /**
     * @return original return type: 'java.io.OutputStream'
     */
    static nullOutputStreamSync(): java_io_OutputStream | null;
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
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.io.DicomOutputStream'
     */
    static newInstanceAsync(var0: java_io_OutputStream | null, var1: string | null): Promise<DicomOutputStream>;
    /**
     * @param var0 original type: 'java.io.File'
     * @return original return type: 'org.dcm4che3.io.DicomOutputStream'
     */
    static newInstanceAsync(var0: java_io_File | null): Promise<DicomOutputStream>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'java.lang.String'
     */
    constructor(var0: java_io_OutputStream | null, var1: string | null);
    /**
     * @param var0 original type: 'java.io.File'
     */
    constructor(var0: java_io_File | null);
}
declare const DicomOutputStream_base: typeof DicomOutputStreamClass;
/**
 * Class org.dcm4che3.io.DicomOutputStream.
 *
 * This actually imports the java class for further use.
 * The class {@link DicomOutputStreamClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DicomOutputStream extends DicomOutputStream_base {
}
export default DicomOutputStream;
//# sourceMappingURL=DicomOutputStream.d.ts.map
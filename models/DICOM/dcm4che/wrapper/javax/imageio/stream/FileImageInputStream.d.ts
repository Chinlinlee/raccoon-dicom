/// <reference types="node" />
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { IIOByteBuffer as javax_imageio_stream_IIOByteBuffer } from "./IIOByteBuffer";
import { Float as java_lang_Float } from "./../../../java/lang/Float";
import { Double as java_lang_Double } from "./../../../java/lang/Double";
import { Short as java_lang_Short } from "./../../../java/lang/Short";
import { ByteOrder as java_nio_ByteOrder } from "./../../../java/nio/ByteOrder";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
import { File as java_io_File } from "./../../../java/io/File";
import { RandomAccessFile as java_io_RandomAccessFile } from "./../../../java/io/RandomAccessFile";
/**
 * This class just defines types, you should import {@link FileImageInputStream} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class FileImageInputStreamClass extends JavaClass {
    /**
     * @return original return type: 'long'
     */
    length(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    lengthSync(): number;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'int'
     */
    read(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'int'
     */
    readSync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): number;
    /**
     * @return original return type: 'int'
     */
    read(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    readSync(): number;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'int'
     */
    read(var0: Buffer | null): Promise<number>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'int'
     */
    readSync(var0: Buffer | null): number;
    /**
     * @return original return type: 'void'
     */
    close(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeSync(): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    seek(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    seekSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @return original return type: 'void'
     */
    flush(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    flushSync(): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    readLine(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    readLineSync(): string | null;
    /**
     * @return original return type: 'int'
     */
    readInt(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    readIntSync(): number;
    /**
     * @return original return type: 'void'
     */
    mark(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    markSync(): void;
    /**
     * @return original return type: 'void'
     */
    reset(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    resetSync(): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    readUTF(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    readUTFSync(): string | null;
    /**
     * @param var0 original type: 'javax.imageio.stream.IIOByteBuffer'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    readBytes(var0: javax_imageio_stream_IIOByteBuffer | null, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'javax.imageio.stream.IIOByteBuffer'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    readBytesSync(var0: javax_imageio_stream_IIOByteBuffer | null, var1: java_lang_Integer | number): void;
    /**
     * @return original return type: 'char'
     */
    readChar(): Promise<string | null>;
    /**
     * @return original return type: 'char'
     */
    readCharSync(): string | null;
    /**
     * @return original return type: 'float'
     */
    readFloat(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    readFloatSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isCached(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isCachedSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    readUnsignedShort(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    readUnsignedShortSync(): number;
    /**
     * @return original return type: 'long'
     */
    readLong(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    readLongSync(): number;
    /**
     * @return original return type: 'byte'
     */
    readByte(): Promise<number>;
    /**
     * @return original return type: 'byte'
     */
    readByteSync(): number;
    /**
     * @return original return type: 'short'
     */
    readShort(): Promise<number>;
    /**
     * @return original return type: 'short'
     */
    readShortSync(): number;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFully(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFullySync(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFully(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFullySync(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFully(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFullySync(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFully(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFullySync(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFully(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFullySync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    readFully(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    readFullySync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'char[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFully(var0: (string | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'char[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFullySync(var0: (string | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'short[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFully(var0: (java_lang_Short | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'short[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    readFullySync(var0: (java_lang_Short | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'long'
     */
    skipBytes(var0: java_lang_Long | bigint | number): Promise<number>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'long'
     */
    skipBytesSync(var0: java_lang_Long | bigint | number): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    skipBytes(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    skipBytesSync(var0: java_lang_Integer | number): number;
    /**
     * @return original return type: 'boolean'
     */
    readBoolean(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    readBooleanSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    readUnsignedByte(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    readUnsignedByteSync(): number;
    /**
     * @return original return type: 'double'
     */
    readDouble(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    readDoubleSync(): number;
    /**
     * @return original return type: 'java.nio.ByteOrder'
     */
    getByteOrder(): Promise<java_nio_ByteOrder | null>;
    /**
     * @return original return type: 'java.nio.ByteOrder'
     */
    getByteOrderSync(): java_nio_ByteOrder | null;
    /**
     * @param var0 original type: 'java.nio.ByteOrder'
     * @return original return type: 'void'
     */
    setByteOrder(var0: java_nio_ByteOrder | null): Promise<void>;
    /**
     * @param var0 original type: 'java.nio.ByteOrder'
     * @return original return type: 'void'
     */
    setByteOrderSync(var0: java_nio_ByteOrder | null): void;
    /**
     * @return original return type: 'long'
     */
    getStreamPosition(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getStreamPositionSync(): number;
    /**
     * @return original return type: 'long'
     */
    readUnsignedInt(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    readUnsignedIntSync(): number;
    /**
     * @return original return type: 'int'
     */
    getBitOffset(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getBitOffsetSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setBitOffset(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setBitOffsetSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    readBit(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    readBitSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'long'
     */
    readBits(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'long'
     */
    readBitsSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    flushBefore(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    flushBeforeSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @return original return type: 'long'
     */
    getFlushedPosition(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getFlushedPositionSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isCachedMemory(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isCachedMemorySync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isCachedFile(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isCachedFileSync(): boolean;
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
     * @return original return type: 'javax.imageio.stream.FileImageInputStream'
     */
    static newInstanceAsync(var0: java_io_File | null): Promise<FileImageInputStream>;
    /**
     * @param var0 original type: 'java.io.RandomAccessFile'
     * @return original return type: 'javax.imageio.stream.FileImageInputStream'
     */
    static newInstanceAsync(var0: java_io_RandomAccessFile | null): Promise<FileImageInputStream>;
    /**
     * @param var0 original type: 'java.io.File'
     */
    constructor(var0: java_io_File | null);
    /**
     * @param var0 original type: 'java.io.RandomAccessFile'
     */
    constructor(var0: java_io_RandomAccessFile | null);
}
declare const FileImageInputStream_base: typeof FileImageInputStreamClass;
/**
 * Class javax.imageio.stream.FileImageInputStream.
 *
 * This actually imports the java class for further use.
 * The class {@link FileImageInputStreamClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class FileImageInputStream extends FileImageInputStream_base {
}
export default FileImageInputStream;
//# sourceMappingURL=FileImageInputStream.d.ts.map
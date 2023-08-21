/// <reference types="node" />
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { OutputStream as java_io_OutputStream } from "./../../../java/io/OutputStream";
import { InputStream as java_io_InputStream } from "./../../../java/io/InputStream";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link CountingInputStream} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CountingInputStreamClass extends JavaClass {
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
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    mark(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    markSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'long'
     */
    skip(var0: java_lang_Long | bigint | number): Promise<number>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'long'
     */
    skipSync(var0: java_lang_Long | bigint | number): number;
    /**
     * @return original return type: 'void'
     */
    reset(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    resetSync(): void;
    /**
     * @return original return type: 'long'
     */
    getCount(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getCountSync(): number;
    /**
     * @return original return type: 'void'
     */
    close(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeSync(): void;
    /**
     * @return original return type: 'int'
     */
    available(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    availableSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    markSupported(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    markSupportedSync(): boolean;
    /**
     * @return original return type: 'byte[]'
     */
    readAllBytes(): Promise<Buffer | null>;
    /**
     * @return original return type: 'byte[]'
     */
    readAllBytesSync(): Buffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte[]'
     */
    readNBytes(var0: java_lang_Integer | number): Promise<Buffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte[]'
     */
    readNBytesSync(var0: java_lang_Integer | number): Buffer | null;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'int'
     */
    readNBytes(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'int'
     */
    readNBytesSync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @return original return type: 'long'
     */
    transferTo(var0: java_io_OutputStream | null): Promise<number>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @return original return type: 'long'
     */
    transferToSync(var0: java_io_OutputStream | null): number;
    /**
     * @return original return type: 'java.io.InputStream'
     */
    static nullInputStream(): Promise<java_io_InputStream | null>;
    /**
     * @return original return type: 'java.io.InputStream'
     */
    static nullInputStreamSync(): java_io_InputStream | null;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    skipNBytes(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    skipNBytesSync(var0: java_lang_Long | bigint | number): void;
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
     * @param var0 original type: 'java.io.InputStream'
     * @return original return type: 'org.dcm4che3.util.CountingInputStream'
     */
    static newInstanceAsync(var0: java_io_InputStream | null): Promise<CountingInputStream>;
    /**
     * @param var0 original type: 'java.io.InputStream'
     */
    constructor(var0: java_io_InputStream | null);
}
declare const CountingInputStream_base: typeof CountingInputStreamClass;
/**
 * Class org.dcm4che3.util.CountingInputStream.
 *
 * This actually imports the java class for further use.
 * The class {@link CountingInputStreamClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CountingInputStream extends CountingInputStream_base {
}
export default CountingInputStream;
//# sourceMappingURL=CountingInputStream.d.ts.map
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Boolean as java_lang_Boolean } from "./../lang/Boolean";
import { Double as java_lang_Double } from "./../lang/Double";
import { Float as java_lang_Float } from "./../lang/Float";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { CharSequence as java_lang_CharSequence, CharSequenceInterface as java_lang_CharSequenceInterface } from "./../lang/CharSequence";
import { Appendable as java_lang_Appendable } from "./../lang/Appendable";
import { Writer as java_io_Writer } from "./Writer";
import { Locale as java_util_Locale } from "./../util/Locale";
import { Class as java_lang_Class } from "./../lang/Class";
import { Charset as java_nio_charset_Charset } from "./../nio/charset/Charset";
import { File as java_io_File } from "./File";
import { OutputStream as java_io_OutputStream } from "./OutputStream";
/**
 * This class just defines types, you should import {@link PrintWriter} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class PrintWriterClass extends JavaClass {
    /**
     * @param var0 original type: 'char[]'
     * @return original return type: 'void'
     */
    println(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'char[]'
     * @return original return type: 'void'
     */
    printlnSync(var0: (string | null)[] | null): void;
    /**
     * @return original return type: 'void'
     */
    println(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    printlnSync(): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    println(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    printlnSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    println(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    printlnSync(var0: string | null): void;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    println(var0: BasicOrJavaType | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    printlnSync(var0: BasicOrJavaType | null): void;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    println(var0: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    printlnSync(var0: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    println(var0: java_lang_Float | number): Promise<void>;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    printlnSync(var0: java_lang_Float | number): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    println(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    printlnSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    println(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    printlnSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'void'
     */
    println(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'void'
     */
    printlnSync(var0: string | null): void;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.io.PrintWriter'
     */
    append(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<PrintWriter | null>;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.io.PrintWriter'
     */
    appendSync(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): PrintWriter | null;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.lang.Appendable'
     */
    append(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<java_lang_Appendable | null>;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.lang.Appendable'
     */
    appendSync(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): java_lang_Appendable | null;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.io.Writer'
     */
    append(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<java_io_Writer | null>;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.io.Writer'
     */
    appendSync(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): java_io_Writer | null;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.io.PrintWriter'
     */
    append(var0: string | null): Promise<PrintWriter | null>;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.io.PrintWriter'
     */
    appendSync(var0: string | null): PrintWriter | null;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.lang.Appendable'
     */
    append(var0: string | null): Promise<java_lang_Appendable | null>;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.lang.Appendable'
     */
    appendSync(var0: string | null): java_lang_Appendable | null;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.io.Writer'
     */
    append(var0: string | null): Promise<java_io_Writer | null>;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.io.Writer'
     */
    appendSync(var0: string | null): java_io_Writer | null;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @return original return type: 'java.io.PrintWriter'
     */
    append(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null): Promise<PrintWriter | null>;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @return original return type: 'java.io.PrintWriter'
     */
    appendSync(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null): PrintWriter | null;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @return original return type: 'java.lang.Appendable'
     */
    append(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null): Promise<java_lang_Appendable | null>;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @return original return type: 'java.lang.Appendable'
     */
    appendSync(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null): java_lang_Appendable | null;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @return original return type: 'java.io.Writer'
     */
    append(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null): Promise<java_io_Writer | null>;
    /**
     * @param var0 original type: 'java.lang.CharSequence'
     * @return original return type: 'java.io.Writer'
     */
    appendSync(var0: java_lang_CharSequence | JavaInterfaceProxy<java_lang_CharSequenceInterface> | null): java_io_Writer | null;
    /**
     * @return original return type: 'void'
     */
    flush(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    flushSync(): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    format(var0: string | null, var1: (BasicOrJavaType | null)[] | null): Promise<PrintWriter | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    formatSync(var0: string | null, var1: (BasicOrJavaType | null)[] | null): PrintWriter | null;
    /**
     * @param var0 original type: 'java.util.Locale'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    format(var0: java_util_Locale | null, var1: string | null, var2: (BasicOrJavaType | null)[] | null): Promise<PrintWriter | null>;
    /**
     * @param var0 original type: 'java.util.Locale'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    formatSync(var0: java_util_Locale | null, var1: string | null, var2: (BasicOrJavaType | null)[] | null): PrintWriter | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    printf(var0: string | null, var1: (BasicOrJavaType | null)[] | null): Promise<PrintWriter | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    printfSync(var0: string | null, var1: (BasicOrJavaType | null)[] | null): PrintWriter | null;
    /**
     * @param var0 original type: 'java.util.Locale'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    printf(var0: java_util_Locale | null, var1: string | null, var2: (BasicOrJavaType | null)[] | null): Promise<PrintWriter | null>;
    /**
     * @param var0 original type: 'java.util.Locale'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.Object[]'
     * @return original return type: 'java.io.PrintWriter'
     */
    printfSync(var0: java_util_Locale | null, var1: string | null, var2: (BasicOrJavaType | null)[] | null): PrintWriter | null;
    /**
     * @param var0 original type: 'char[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    write(var0: (string | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'char[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    writeSync(var0: (string | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    write(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    writeSync(var0: string | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    write(var0: string | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    writeSync(var0: string | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'char[]'
     * @return original return type: 'void'
     */
    write(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'char[]'
     * @return original return type: 'void'
     */
    writeSync(var0: (string | null)[] | null): void;
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
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    print(var0: java_lang_Float | number): Promise<void>;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    printSync(var0: java_lang_Float | number): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    print(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    printSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    print(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    printSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'void'
     */
    print(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'void'
     */
    printSync(var0: string | null): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    print(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    printSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    print(var0: BasicOrJavaType | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    printSync(var0: BasicOrJavaType | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    print(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    printSync(var0: string | null): void;
    /**
     * @param var0 original type: 'char[]'
     * @return original return type: 'void'
     */
    print(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'char[]'
     * @return original return type: 'void'
     */
    printSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    print(var0: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    printSync(var0: java_lang_Double | number): void;
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
    checkError(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    checkErrorSync(): boolean;
    /**
     * @return original return type: 'java.io.Writer'
     */
    static nullWriter(): Promise<java_io_Writer | null>;
    /**
     * @return original return type: 'java.io.Writer'
     */
    static nullWriterSync(): java_io_Writer | null;
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
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: string | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: string | null, var1: string | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.nio.charset.Charset'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: string | null, var1: java_nio_charset_Charset | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.File'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_File | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_File | null, var1: string | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.nio.charset.Charset'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_File | null, var1: java_nio_charset_Charset | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.Writer'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_Writer | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.Writer'
     * @param var1 original type: 'boolean'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_Writer | null, var1: java_lang_Boolean | boolean): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'java.nio.charset.Charset'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_OutputStream | null, var1: java_lang_Boolean | boolean, var2: java_nio_charset_Charset | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'boolean'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_OutputStream | null, var1: java_lang_Boolean | boolean): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @return original return type: 'java.io.PrintWriter'
     */
    static newInstanceAsync(var0: java_io_OutputStream | null): Promise<PrintWriter>;
    /**
     * @param var0 original type: 'java.lang.String'
     */
    constructor(var0: string | null);
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     */
    constructor(var0: string | null, var1: string | null);
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.nio.charset.Charset'
     */
    constructor(var0: string | null, var1: java_nio_charset_Charset | null);
    /**
     * @param var0 original type: 'java.io.File'
     */
    constructor(var0: java_io_File | null);
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.lang.String'
     */
    constructor(var0: java_io_File | null, var1: string | null);
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.nio.charset.Charset'
     */
    constructor(var0: java_io_File | null, var1: java_nio_charset_Charset | null);
    /**
     * @param var0 original type: 'java.io.Writer'
     */
    constructor(var0: java_io_Writer | null);
    /**
     * @param var0 original type: 'java.io.Writer'
     * @param var1 original type: 'boolean'
     */
    constructor(var0: java_io_Writer | null, var1: java_lang_Boolean | boolean);
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'java.nio.charset.Charset'
     */
    constructor(var0: java_io_OutputStream | null, var1: java_lang_Boolean | boolean, var2: java_nio_charset_Charset | null);
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'boolean'
     */
    constructor(var0: java_io_OutputStream | null, var1: java_lang_Boolean | boolean);
    /**
     * @param var0 original type: 'java.io.OutputStream'
     */
    constructor(var0: java_io_OutputStream | null);
}
declare const PrintWriter_base: typeof PrintWriterClass;
/**
 * Class java.io.PrintWriter.
 *
 * This actually imports the java class for further use.
 * The class {@link PrintWriterClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class PrintWriter extends PrintWriter_base {
}
export default PrintWriter;
//# sourceMappingURL=PrintWriter.d.ts.map
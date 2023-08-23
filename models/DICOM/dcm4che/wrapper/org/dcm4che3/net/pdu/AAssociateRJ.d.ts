import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../../../java/lang/Integer";
import { PrintStream as java_io_PrintStream } from "./../../../../java/io/PrintStream";
import { PrintWriter as java_io_PrintWriter } from "./../../../../java/io/PrintWriter";
import { Throwable as java_lang_Throwable } from "./../../../../java/lang/Throwable";
import { StackTraceElement as java_lang_StackTraceElement } from "./../../../../java/lang/StackTraceElement";
import { Long as java_lang_Long } from "./../../../../java/lang/Long";
import { Class as java_lang_Class } from "./../../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link AAssociateRJ} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AAssociateRJClass extends JavaClass {
    /**
     * Original type: 'int'
     */
    static readonly RESULT_REJECTED_PERMANENT: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly RESULT_REJECTED_TRANSIENT: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SOURCE_SERVICE_USER: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SOURCE_SERVICE_PROVIDER_ACSE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SOURCE_SERVICE_PROVIDER_PRES: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly REASON_NO_REASON_GIVEN: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly REASON_APP_CTX_NAME_NOT_SUPPORTED: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly REASON_CALLING_AET_NOT_RECOGNIZED: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly REASON_CALLED_AET_NOT_RECOGNIZED: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly REASON_PROTOCOL_VERSION_NOT_SUPPORTED: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly REASON_TEMPORARY_CONGESTION: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly REASON_LOCAL_LIMIT_EXCEEDED: java_lang_Integer | number;
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
    getResult(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getResultSync(): number;
    /**
     * @return original return type: 'int'
     */
    getSource(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSourceSync(): number;
    /**
     * @return original return type: 'int'
     */
    getReason(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getReasonSync(): number;
    /**
     * @return original return type: 'void'
     */
    printStackTrace(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    printStackTraceSync(): void;
    /**
     * @param var0 original type: 'java.io.PrintStream'
     * @return original return type: 'void'
     */
    printStackTrace(var0: java_io_PrintStream | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.PrintStream'
     * @return original return type: 'void'
     */
    printStackTraceSync(var0: java_io_PrintStream | null): void;
    /**
     * @param var0 original type: 'java.io.PrintWriter'
     * @return original return type: 'void'
     */
    printStackTrace(var0: java_io_PrintWriter | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.PrintWriter'
     * @return original return type: 'void'
     */
    printStackTraceSync(var0: java_io_PrintWriter | null): void;
    /**
     * @return original return type: 'java.lang.Throwable'
     */
    fillInStackTrace(): Promise<java_lang_Throwable | null>;
    /**
     * @return original return type: 'java.lang.Throwable'
     */
    fillInStackTraceSync(): java_lang_Throwable | null;
    /**
     * @return original return type: 'java.lang.Throwable'
     */
    getCause(): Promise<java_lang_Throwable | null>;
    /**
     * @return original return type: 'java.lang.Throwable'
     */
    getCauseSync(): java_lang_Throwable | null;
    /**
     * @param var0 original type: 'java.lang.Throwable'
     * @return original return type: 'java.lang.Throwable'
     */
    initCause(var0: java_lang_Throwable | null): Promise<java_lang_Throwable | null>;
    /**
     * @param var0 original type: 'java.lang.Throwable'
     * @return original return type: 'java.lang.Throwable'
     */
    initCauseSync(var0: java_lang_Throwable | null): java_lang_Throwable | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getMessage(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getMessageSync(): string | null;
    /**
     * @return original return type: 'java.lang.Throwable[]'
     */
    getSuppressed(): Promise<(java_lang_Throwable | null)[] | null>;
    /**
     * @return original return type: 'java.lang.Throwable[]'
     */
    getSuppressedSync(): (java_lang_Throwable | null)[] | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getLocalizedMessage(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getLocalizedMessageSync(): string | null;
    /**
     * @return original return type: 'java.lang.StackTraceElement[]'
     */
    getStackTrace(): Promise<(java_lang_StackTraceElement | null)[] | null>;
    /**
     * @return original return type: 'java.lang.StackTraceElement[]'
     */
    getStackTraceSync(): (java_lang_StackTraceElement | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.StackTraceElement[]'
     * @return original return type: 'void'
     */
    setStackTrace(var0: (java_lang_StackTraceElement | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.StackTraceElement[]'
     * @return original return type: 'void'
     */
    setStackTraceSync(var0: (java_lang_StackTraceElement | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.Throwable'
     * @return original return type: 'void'
     */
    addSuppressed(var0: java_lang_Throwable | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.Throwable'
     * @return original return type: 'void'
     */
    addSuppressedSync(var0: java_lang_Throwable | null): void;
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
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'org.dcm4che3.net.pdu.AAssociateRJ'
     */
    static newInstanceAsync(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<AAssociateRJ>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number);
}
declare const AAssociateRJ_base: typeof AAssociateRJClass;
/**
 * Class org.dcm4che3.net.pdu.AAssociateRJ.
 *
 * This actually imports the java class for further use.
 * The class {@link AAssociateRJClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AAssociateRJ extends AAssociateRJ_base {
}
export default AAssociateRJ;
//# sourceMappingURL=AAssociateRJ.d.ts.map
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Graphics as java_awt_Graphics } from "./Graphics";
import { Dimension as java_awt_Dimension } from "./Dimension";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link PrintJob} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class PrintJobClass extends JavaClass {
    /**
     * @return original return type: 'void'
     */
    finalize(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    finalizeSync(): void;
    /**
     * @return original return type: 'void'
     */
    end(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    endSync(): void;
    /**
     * @return original return type: 'java.awt.Graphics'
     */
    getGraphics(): Promise<java_awt_Graphics | null>;
    /**
     * @return original return type: 'java.awt.Graphics'
     */
    getGraphicsSync(): java_awt_Graphics | null;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getPageDimension(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getPageDimensionSync(): java_awt_Dimension | null;
    /**
     * @return original return type: 'int'
     */
    getPageResolution(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getPageResolutionSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    lastPageFirst(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    lastPageFirstSync(): boolean;
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
}
declare const PrintJob_base: typeof PrintJobClass;
/**
 * Class java.awt.PrintJob.
 *
 * This actually imports the java class for further use.
 * The class {@link PrintJobClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class PrintJob extends PrintJob_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default PrintJob;
//# sourceMappingURL=PrintJob.d.ts.map
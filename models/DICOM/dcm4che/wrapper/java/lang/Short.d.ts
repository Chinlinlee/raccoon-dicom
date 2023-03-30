import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Class as java_lang_Class } from "./Class";
import { Integer as java_lang_Integer } from "./Integer";
import { Optional as java_util_Optional } from "./../util/Optional";
import { Long as java_lang_Long } from "./Long";
/**
 * This class just defines types, you should import {@link Short} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ShortClass extends JavaClass {
    /**
     * Original type: 'short'
     */
    static readonly MIN_VALUE: ShortClass | number;
    /**
     * Original type: 'short'
     */
    static readonly MAX_VALUE: ShortClass | number;
    /**
     * Original type: 'java.lang.Class'
     */
    static readonly TYPE: java_lang_Class | null;
    /**
     * Original type: 'int'
     */
    static readonly SIZE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly BYTES: java_lang_Integer | number;
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
     * @param var0 original type: 'short'
     * @return original return type: 'java.lang.String'
     */
    static toString(var0: ShortClass | number): Promise<string>;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'java.lang.String'
     */
    static toStringSync(var0: ShortClass | number): string;
    /**
     * @return original return type: 'int'
     */
    hashCode(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    hashCodeSync(): number;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'int'
     */
    static hashCode(var0: ShortClass | number): Promise<number>;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'int'
     */
    static hashCodeSync(var0: ShortClass | number): number;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'short'
     */
    static reverseBytes(var0: ShortClass | number): Promise<number>;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'short'
     */
    static reverseBytesSync(var0: ShortClass | number): number;
    /**
     * @param var0 original type: 'java.lang.Short'
     * @return original return type: 'int'
     */
    compareTo(var0: ShortClass | number | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Short'
     * @return original return type: 'int'
     */
    compareToSync(var0: ShortClass | number | null): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    compareTo(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    compareToSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'short'
     * @param var1 original type: 'short'
     * @return original return type: 'int'
     */
    static compare(var0: ShortClass | number, var1: ShortClass | number): Promise<number>;
    /**
     * @param var0 original type: 'short'
     * @param var1 original type: 'short'
     * @return original return type: 'int'
     */
    static compareSync(var0: ShortClass | number, var1: ShortClass | number): number;
    /**
     * @return original return type: 'byte'
     */
    byteValue(): Promise<number>;
    /**
     * @return original return type: 'byte'
     */
    byteValueSync(): number;
    /**
     * @return original return type: 'short'
     */
    shortValue(): Promise<number>;
    /**
     * @return original return type: 'short'
     */
    shortValueSync(): number;
    /**
     * @return original return type: 'int'
     */
    intValue(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    intValueSync(): number;
    /**
     * @return original return type: 'long'
     */
    longValue(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    longValueSync(): number;
    /**
     * @return original return type: 'float'
     */
    floatValue(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    floatValueSync(): number;
    /**
     * @return original return type: 'double'
     */
    doubleValue(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    doubleValueSync(): number;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Short'
     */
    static valueOf(var0: string | null): Promise<number | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Short'
     */
    static valueOfSync(var0: string | null): number | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.Short'
     */
    static valueOf(var0: string | null, var1: java_lang_Integer | number): Promise<number | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.Short'
     */
    static valueOfSync(var0: string | null, var1: java_lang_Integer | number): number | null;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'java.lang.Short'
     */
    static valueOf(var0: ShortClass | number): Promise<number | null>;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'java.lang.Short'
     */
    static valueOfSync(var0: ShortClass | number): number | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Short'
     */
    static decode(var0: string | null): Promise<number | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Short'
     */
    static decodeSync(var0: string | null): number | null;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstable(): Promise<java_util_Optional | null>;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstableSync(): java_util_Optional | null;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'long'
     */
    static toUnsignedLong(var0: ShortClass | number): Promise<number>;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'long'
     */
    static toUnsignedLongSync(var0: ShortClass | number): number;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'int'
     */
    static toUnsignedInt(var0: ShortClass | number): Promise<number>;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'int'
     */
    static toUnsignedIntSync(var0: ShortClass | number): number;
    /**
     * @param var0 original type: 'short'
     * @param var1 original type: 'short'
     * @return original return type: 'int'
     */
    static compareUnsigned(var0: ShortClass | number, var1: ShortClass | number): Promise<number>;
    /**
     * @param var0 original type: 'short'
     * @param var1 original type: 'short'
     * @return original return type: 'int'
     */
    static compareUnsignedSync(var0: ShortClass | number, var1: ShortClass | number): number;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @return original return type: 'short'
     */
    static parseShort(var0: string | null, var1: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @return original return type: 'short'
     */
    static parseShortSync(var0: string | null, var1: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'short'
     */
    static parseShort(var0: string | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'short'
     */
    static parseShortSync(var0: string | null): number;
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
     * @param var0 original type: 'short'
     * @return original return type: 'java.lang.Short'
     */
    static newInstance(var0: ShortClass | number): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Short'
     */
    static newInstance(var0: string | null): Promise<number>;
    /**
     * @param var0 original type: 'short'
     */
    constructor(var0: ShortClass | number);
    /**
     * @param var0 original type: 'java.lang.String'
     */
    constructor(var0: string | null);
}
declare const Short_base: typeof ShortClass;
/**
 * Class java.lang.Short.
 *
 * This actually imports the java class for further use.
 * The class {@link ShortClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Short extends Short_base {
}
export default Short;
//# sourceMappingURL=Short.d.ts.map
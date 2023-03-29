import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Long as java_lang_Long } from "./../../lang/Long";
import { TemporalField as java_time_temporal_TemporalField, TemporalFieldInterface as java_time_temporal_TemporalFieldInterface } from "./TemporalField";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { Class as java_lang_Class } from "./../../lang/Class";
/**
 * This class just defines types, you should import {@link ValueRange} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ValueRangeClass extends JavaClass {
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
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @return original return type: 'java.time.temporal.ValueRange'
     */
    static of(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number): Promise<ValueRange | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @return original return type: 'java.time.temporal.ValueRange'
     */
    static ofSync(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number): ValueRange | null;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'long'
     * @return original return type: 'java.time.temporal.ValueRange'
     */
    static of(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_lang_Long | bigint | number): Promise<ValueRange | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'long'
     * @return original return type: 'java.time.temporal.ValueRange'
     */
    static ofSync(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_lang_Long | bigint | number): ValueRange | null;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @return original return type: 'java.time.temporal.ValueRange'
     */
    static of(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number): Promise<ValueRange | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @return original return type: 'java.time.temporal.ValueRange'
     */
    static ofSync(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number): ValueRange | null;
    /**
     * @return original return type: 'boolean'
     */
    isIntValue(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isIntValueSync(): boolean;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'boolean'
     */
    isValidValue(var0: java_lang_Long | bigint | number): Promise<boolean>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'boolean'
     */
    isValidValueSync(var0: java_lang_Long | bigint | number): boolean;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.time.temporal.TemporalField'
     * @return original return type: 'long'
     */
    checkValidValue(var0: java_lang_Long | bigint | number, var1: java_time_temporal_TemporalField | JavaInterfaceProxy<java_time_temporal_TemporalFieldInterface> | null): Promise<number>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.time.temporal.TemporalField'
     * @return original return type: 'long'
     */
    checkValidValueSync(var0: java_lang_Long | bigint | number, var1: java_time_temporal_TemporalField | JavaInterfaceProxy<java_time_temporal_TemporalFieldInterface> | null): number;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.time.temporal.TemporalField'
     * @return original return type: 'int'
     */
    checkValidIntValue(var0: java_lang_Long | bigint | number, var1: java_time_temporal_TemporalField | JavaInterfaceProxy<java_time_temporal_TemporalFieldInterface> | null): Promise<number>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.time.temporal.TemporalField'
     * @return original return type: 'int'
     */
    checkValidIntValueSync(var0: java_lang_Long | bigint | number, var1: java_time_temporal_TemporalField | JavaInterfaceProxy<java_time_temporal_TemporalFieldInterface> | null): number;
    /**
     * @return original return type: 'long'
     */
    getMinimum(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getMinimumSync(): number;
    /**
     * @return original return type: 'long'
     */
    getMaximum(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getMaximumSync(): number;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'boolean'
     */
    isValidIntValue(var0: java_lang_Long | bigint | number): Promise<boolean>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'boolean'
     */
    isValidIntValueSync(var0: java_lang_Long | bigint | number): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isFixed(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFixedSync(): boolean;
    /**
     * @return original return type: 'long'
     */
    getLargestMinimum(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getLargestMinimumSync(): number;
    /**
     * @return original return type: 'long'
     */
    getSmallestMaximum(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getSmallestMaximumSync(): number;
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
}
declare const ValueRange_base: typeof ValueRangeClass;
/**
 * Class java.time.temporal.ValueRange.
 *
 * This actually imports the java class for further use.
 * The class {@link ValueRangeClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ValueRange extends ValueRange_base {
}
export default ValueRange;
//# sourceMappingURL=ValueRange.d.ts.map
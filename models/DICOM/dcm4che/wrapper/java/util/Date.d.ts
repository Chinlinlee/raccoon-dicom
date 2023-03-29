import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Instant as java_time_Instant } from "./../time/Instant";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Long as java_lang_Long } from "./../lang/Long";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link Date} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DateClass extends JavaClass {
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
     * @return original return type: 'java.lang.Object'
     */
    clone(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    cloneSync(): BasicOrJavaType | null;
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
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'int'
     */
    compareTo(var0: DateClass | null): Promise<number>;
    /**
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'int'
     */
    compareToSync(var0: DateClass | null): number;
    /**
     * @param var0 original type: 'java.time.Instant'
     * @return original return type: 'java.util.Date'
     */
    static from(var0: java_time_Instant | null): Promise<Date | null>;
    /**
     * @param var0 original type: 'java.time.Instant'
     * @return original return type: 'java.util.Date'
     */
    static fromSync(var0: java_time_Instant | null): Date | null;
    /**
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'boolean'
     */
    before(var0: DateClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'boolean'
     */
    beforeSync(var0: DateClass | null): boolean;
    /**
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'boolean'
     */
    after(var0: DateClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'boolean'
     */
    afterSync(var0: DateClass | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'long'
     */
    static parse(var0: string | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'long'
     */
    static parseSync(var0: string | null): number;
    /**
     * @return original return type: 'long'
     */
    getTime(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getTimeSync(): number;
    /**
     * @return original return type: 'int'
     */
    getYear(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getYearSync(): number;
    /**
     * @return original return type: 'int'
     */
    getSeconds(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSecondsSync(): number;
    /**
     * @return original return type: 'java.time.Instant'
     */
    toInstant(): Promise<java_time_Instant | null>;
    /**
     * @return original return type: 'java.time.Instant'
     */
    toInstantSync(): java_time_Instant | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'int'
     * @return original return type: 'long'
     */
    static UTC(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'int'
     * @return original return type: 'long'
     */
    static UTCSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    setTime(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    setTimeSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @return original return type: 'int'
     */
    getMonth(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getMonthSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setDate(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setDateSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setHours(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setHoursSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getHours(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getHoursSync(): number;
    /**
     * @return original return type: 'int'
     */
    getMinutes(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getMinutesSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setMinutes(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setMinutesSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSeconds(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSecondsSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setMonth(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setMonthSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setYear(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setYearSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getDate(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getDateSync(): number;
    /**
     * @return original return type: 'int'
     */
    getDay(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getDaySync(): number;
    /**
     * @return original return type: 'java.lang.String'
     */
    toLocaleString(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toLocaleStringSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    toGMTString(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toGMTStringSync(): string | null;
    /**
     * @return original return type: 'int'
     */
    getTimezoneOffset(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getTimezoneOffsetSync(): number;
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
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.util.Date'
     */
    static newInstance(var0: string | null): Promise<Date>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'int'
     * @return original return type: 'java.util.Date'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_lang_Integer | number): Promise<Date>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'java.util.Date'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<Date>;
    /**
     * @return original return type: 'java.util.Date'
     */
    static newInstance(): Promise<Date>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.util.Date'
     */
    static newInstance(var0: java_lang_Long | bigint | number): Promise<Date>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.util.Date'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<Date>;
    /**
     * @param var0 original type: 'java.lang.String'
     */
    constructor(var0: string | null);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_lang_Integer | number);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number);
    constructor();
    /**
     * @param var0 original type: 'long'
     */
    constructor(var0: java_lang_Long | bigint | number);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number);
}
declare const Date_base: typeof DateClass;
/**
 * Class java.util.Date.
 *
 * This actually imports the java class for further use.
 * The class {@link DateClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Date extends Date_base {
}
export default Date;
//# sourceMappingURL=Date.d.ts.map
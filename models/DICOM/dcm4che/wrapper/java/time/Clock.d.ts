import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Duration as java_time_Duration } from "./Duration";
import { ZoneId as java_time_ZoneId } from "./ZoneId";
import { Instant as java_time_Instant } from "./Instant";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link Clock} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ClockClass extends JavaClass {
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
     * @param var0 original type: 'java.time.Clock'
     * @param var1 original type: 'java.time.Duration'
     * @return original return type: 'java.time.Clock'
     */
    static offset(var0: ClockClass | null, var1: java_time_Duration | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.Clock'
     * @param var1 original type: 'java.time.Duration'
     * @return original return type: 'java.time.Clock'
     */
    static offsetSync(var0: ClockClass | null, var1: java_time_Duration | null): Clock | null;
    /**
     * @return original return type: 'long'
     */
    millis(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    millisSync(): number;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static system(var0: java_time_ZoneId | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static systemSync(var0: java_time_ZoneId | null): Clock | null;
    /**
     * @param var0 original type: 'java.time.Instant'
     * @param var1 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static fixed(var0: java_time_Instant | null, var1: java_time_ZoneId | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.Instant'
     * @param var1 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static fixedSync(var0: java_time_Instant | null, var1: java_time_ZoneId | null): Clock | null;
    /**
     * @return original return type: 'java.time.Instant'
     */
    instant(): Promise<java_time_Instant | null>;
    /**
     * @return original return type: 'java.time.Instant'
     */
    instantSync(): java_time_Instant | null;
    /**
     * @return original return type: 'java.time.ZoneId'
     */
    getZone(): Promise<java_time_ZoneId | null>;
    /**
     * @return original return type: 'java.time.ZoneId'
     */
    getZoneSync(): java_time_ZoneId | null;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    withZone(var0: java_time_ZoneId | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    withZoneSync(var0: java_time_ZoneId | null): Clock | null;
    /**
     * @return original return type: 'java.time.Clock'
     */
    static systemDefaultZone(): Promise<Clock | null>;
    /**
     * @return original return type: 'java.time.Clock'
     */
    static systemDefaultZoneSync(): Clock | null;
    /**
     * @param var0 original type: 'java.time.Clock'
     * @param var1 original type: 'java.time.Duration'
     * @return original return type: 'java.time.Clock'
     */
    static tick(var0: ClockClass | null, var1: java_time_Duration | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.Clock'
     * @param var1 original type: 'java.time.Duration'
     * @return original return type: 'java.time.Clock'
     */
    static tickSync(var0: ClockClass | null, var1: java_time_Duration | null): Clock | null;
    /**
     * @return original return type: 'java.time.Clock'
     */
    static systemUTC(): Promise<Clock | null>;
    /**
     * @return original return type: 'java.time.Clock'
     */
    static systemUTCSync(): Clock | null;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static tickMillis(var0: java_time_ZoneId | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static tickMillisSync(var0: java_time_ZoneId | null): Clock | null;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static tickSeconds(var0: java_time_ZoneId | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static tickSecondsSync(var0: java_time_ZoneId | null): Clock | null;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static tickMinutes(var0: java_time_ZoneId | null): Promise<Clock | null>;
    /**
     * @param var0 original type: 'java.time.ZoneId'
     * @return original return type: 'java.time.Clock'
     */
    static tickMinutesSync(var0: java_time_ZoneId | null): Clock | null;
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
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
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
declare const Clock_base: typeof ClockClass;
/**
 * Class java.time.Clock.
 *
 * This actually imports the java class for further use.
 * The class {@link ClockClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Clock extends Clock_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default Clock;
//# sourceMappingURL=Clock.d.ts.map
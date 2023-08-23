/// <reference types="node" />
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { SecureRandomParameters as java_security_SecureRandomParameters, SecureRandomParametersInterface as java_security_SecureRandomParametersInterface } from "./SecureRandomParameters";
import { Provider as java_security_Provider } from "./Provider";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Double as java_lang_Double } from "./../lang/Double";
import { DoubleStream as java_util_stream_DoubleStream } from "./../util/stream/DoubleStream";
import { IntStream as java_util_stream_IntStream } from "./../util/stream/IntStream";
import { LongStream as java_util_stream_LongStream } from "./../util/stream/LongStream";
import { Float as java_lang_Float } from "./../lang/Float";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link SecureRandom} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SecureRandomClass extends JavaClass {
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @param var2 original type: 'java.security.Provider'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstance(var0: string | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null, var2: java_security_Provider | null): Promise<SecureRandom | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @param var2 original type: 'java.security.Provider'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceSync(var0: string | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null, var2: java_security_Provider | null): SecureRandom | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @param var2 original type: 'java.lang.String'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstance(var0: string | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null, var2: string | null): Promise<SecureRandom | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @param var2 original type: 'java.lang.String'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceSync(var0: string | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null, var2: string | null): SecureRandom | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstance(var0: string | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null): Promise<SecureRandom | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceSync(var0: string | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null): SecureRandom | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstance(var0: string | null): Promise<SecureRandom | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceSync(var0: string | null): SecureRandom | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstance(var0: string | null, var1: string | null): Promise<SecureRandom | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceSync(var0: string | null, var1: string | null): SecureRandom | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.Provider'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstance(var0: string | null, var1: java_security_Provider | null): Promise<SecureRandom | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.Provider'
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceSync(var0: string | null, var1: java_security_Provider | null): SecureRandom | null;
    /**
     * @return original return type: 'java.security.SecureRandomParameters'
     */
    getParameters(): Promise<java_security_SecureRandomParameters | null>;
    /**
     * @return original return type: 'java.security.SecureRandomParameters'
     */
    getParametersSync(): java_security_SecureRandomParameters | null;
    /**
     * @return original return type: 'java.security.Provider'
     */
    getProvider(): Promise<java_security_Provider | null>;
    /**
     * @return original return type: 'java.security.Provider'
     */
    getProviderSync(): java_security_Provider | null;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @return original return type: 'void'
     */
    nextBytes(var0: Buffer | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'java.security.SecureRandomParameters'
     * @return original return type: 'void'
     */
    nextBytesSync(var0: Buffer | null, var1: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    nextBytes(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    nextBytesSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    setSeed(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    setSeedSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    setSeed(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    setSeedSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte[]'
     */
    static getSeed(var0: java_lang_Integer | number): Promise<Buffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte[]'
     */
    static getSeedSync(var0: java_lang_Integer | number): Buffer | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getAlgorithm(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getAlgorithmSync(): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte[]'
     */
    generateSeed(var0: java_lang_Integer | number): Promise<Buffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte[]'
     */
    generateSeedSync(var0: java_lang_Integer | number): Buffer | null;
    /**
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceStrong(): Promise<SecureRandom | null>;
    /**
     * @return original return type: 'java.security.SecureRandom'
     */
    static getInstanceStrongSync(): SecureRandom | null;
    /**
     * @return original return type: 'void'
     */
    reseed(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    reseedSync(): void;
    /**
     * @param var0 original type: 'java.security.SecureRandomParameters'
     * @return original return type: 'void'
     */
    reseed(var0: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.SecureRandomParameters'
     * @return original return type: 'void'
     */
    reseedSync(var0: java_security_SecureRandomParameters | JavaInterfaceProxy<java_security_SecureRandomParametersInterface> | null): void;
    /**
     * @return original return type: 'double'
     */
    nextDouble(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    nextDoubleSync(): number;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'double'
     */
    nextDouble(var0: java_lang_Double | number): Promise<number>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'double'
     */
    nextDoubleSync(var0: java_lang_Double | number): number;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'double'
     */
    nextDouble(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<number>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'double'
     */
    nextDoubleSync(var0: java_lang_Double | number, var1: java_lang_Double | number): number;
    /**
     * @return original return type: 'int'
     */
    nextInt(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    nextIntSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    nextInt(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    nextIntSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    nextInt(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    nextIntSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doubles(var0: java_lang_Long | bigint | number): Promise<java_util_stream_DoubleStream | null>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doublesSync(var0: java_lang_Long | bigint | number): java_util_stream_DoubleStream | null;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doubles(var0: java_lang_Long | bigint | number, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<java_util_stream_DoubleStream | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doublesSync(var0: java_lang_Long | bigint | number, var1: java_lang_Double | number, var2: java_lang_Double | number): java_util_stream_DoubleStream | null;
    /**
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doubles(): Promise<java_util_stream_DoubleStream | null>;
    /**
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doublesSync(): java_util_stream_DoubleStream | null;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doubles(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<java_util_stream_DoubleStream | null>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.util.stream.DoubleStream'
     */
    doublesSync(var0: java_lang_Double | number, var1: java_lang_Double | number): java_util_stream_DoubleStream | null;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.util.stream.IntStream'
     */
    ints(var0: java_lang_Long | bigint | number): Promise<java_util_stream_IntStream | null>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.util.stream.IntStream'
     */
    intsSync(var0: java_lang_Long | bigint | number): java_util_stream_IntStream | null;
    /**
     * @return original return type: 'java.util.stream.IntStream'
     */
    ints(): Promise<java_util_stream_IntStream | null>;
    /**
     * @return original return type: 'java.util.stream.IntStream'
     */
    intsSync(): java_util_stream_IntStream | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.util.stream.IntStream'
     */
    ints(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_util_stream_IntStream | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.util.stream.IntStream'
     */
    intsSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_util_stream_IntStream | null;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.util.stream.IntStream'
     */
    ints(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<java_util_stream_IntStream | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.util.stream.IntStream'
     */
    intsSync(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number): java_util_stream_IntStream | null;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @return original return type: 'java.util.stream.LongStream'
     */
    longs(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number): Promise<java_util_stream_LongStream | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @return original return type: 'java.util.stream.LongStream'
     */
    longsSync(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number): java_util_stream_LongStream | null;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.util.stream.LongStream'
     */
    longs(var0: java_lang_Long | bigint | number): Promise<java_util_stream_LongStream | null>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.util.stream.LongStream'
     */
    longsSync(var0: java_lang_Long | bigint | number): java_util_stream_LongStream | null;
    /**
     * @return original return type: 'java.util.stream.LongStream'
     */
    longs(): Promise<java_util_stream_LongStream | null>;
    /**
     * @return original return type: 'java.util.stream.LongStream'
     */
    longsSync(): java_util_stream_LongStream | null;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @return original return type: 'java.util.stream.LongStream'
     */
    longs(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number): Promise<java_util_stream_LongStream | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @return original return type: 'java.util.stream.LongStream'
     */
    longsSync(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number): java_util_stream_LongStream | null;
    /**
     * @return original return type: 'long'
     */
    nextLong(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    nextLongSync(): number;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @return original return type: 'long'
     */
    nextLong(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number): Promise<number>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'long'
     * @return original return type: 'long'
     */
    nextLongSync(var0: java_lang_Long | bigint | number, var1: java_lang_Long | bigint | number): number;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'long'
     */
    nextLong(var0: java_lang_Long | bigint | number): Promise<number>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'long'
     */
    nextLongSync(var0: java_lang_Long | bigint | number): number;
    /**
     * @return original return type: 'boolean'
     */
    nextBoolean(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    nextBooleanSync(): boolean;
    /**
     * @return original return type: 'float'
     */
    nextFloat(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    nextFloatSync(): number;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'float'
     */
    nextFloat(var0: java_lang_Float | number): Promise<number>;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'float'
     */
    nextFloatSync(var0: java_lang_Float | number): number;
    /**
     * @param var0 original type: 'float'
     * @param var1 original type: 'float'
     * @return original return type: 'float'
     */
    nextFloat(var0: java_lang_Float | number, var1: java_lang_Float | number): Promise<number>;
    /**
     * @param var0 original type: 'float'
     * @param var1 original type: 'float'
     * @return original return type: 'float'
     */
    nextFloatSync(var0: java_lang_Float | number, var1: java_lang_Float | number): number;
    /**
     * @return original return type: 'double'
     */
    nextGaussian(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    nextGaussianSync(): number;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'double'
     */
    nextGaussian(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<number>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'double'
     */
    nextGaussianSync(var0: java_lang_Double | number, var1: java_lang_Double | number): number;
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
     * @return original return type: 'boolean'
     */
    isDeprecated(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isDeprecatedSync(): boolean;
    /**
     * @return original return type: 'double'
     */
    nextExponential(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    nextExponentialSync(): number;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'java.security.SecureRandom'
     */
    static newInstanceAsync(var0: Buffer | null): Promise<SecureRandom>;
    /**
     * @return original return type: 'java.security.SecureRandom'
     */
    static newInstanceAsync(): Promise<SecureRandom>;
    /**
     * @param var0 original type: 'byte[]'
     */
    constructor(var0: Buffer | null);
    constructor();
}
declare const SecureRandom_base: typeof SecureRandomClass;
/**
 * Class java.security.SecureRandom.
 *
 * This actually imports the java class for further use.
 * The class {@link SecureRandomClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SecureRandom extends SecureRandom_base {
}
export default SecureRandom;
//# sourceMappingURL=SecureRandom.d.ts.map
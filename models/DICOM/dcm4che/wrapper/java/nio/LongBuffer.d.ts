import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Long as java_lang_Long } from "./../lang/Long";
import { Buffer as java_nio_Buffer } from "./Buffer";
import { ByteOrder as java_nio_ByteOrder } from "./ByteOrder";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link LongBuffer} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class LongBufferClass extends JavaClass {
    /**
     * @return original return type: 'long'
     */
    get(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getSync(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    get(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    getSync(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'long'
     */
    get(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'long'
     */
    getSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    get(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    getSync(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    get(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    getSync(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    get(var0: (java_lang_Long | bigint | number)[] | null): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    getSync(var0: (java_lang_Long | bigint | number)[] | null): LongBuffer | null;
    /**
     * @param var0 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: (java_lang_Long | bigint | number)[] | null): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: (java_lang_Long | bigint | number)[] | null): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: (java_lang_Long | bigint | number)[] | null): LongBuffer | null;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.nio.LongBuffer'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: java_lang_Integer | number, var1: LongBufferClass | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.nio.LongBuffer'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: LongBufferClass | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'java.nio.LongBuffer'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: LongBufferClass | null): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'java.nio.LongBuffer'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: LongBufferClass | null): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): LongBuffer | null;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.nio.LongBuffer'
     */
    put(var0: java_lang_Long | bigint | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.nio.LongBuffer'
     */
    putSync(var0: java_lang_Long | bigint | number): LongBuffer | null;
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
     * @param var0 original type: 'java.nio.LongBuffer'
     * @return original return type: 'int'
     */
    compareTo(var0: LongBufferClass | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.LongBuffer'
     * @return original return type: 'int'
     */
    compareToSync(var0: LongBufferClass | null): number;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    clear(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    clearSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    clear(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    clearSync(): LongBuffer | null;
    /**
     * @param var0 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    static wrap(var0: (java_lang_Long | bigint | number)[] | null): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'long[]'
     * @return original return type: 'java.nio.LongBuffer'
     */
    static wrapSync(var0: (java_lang_Long | bigint | number)[] | null): LongBuffer | null;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    static wrap(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'long[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    static wrapSync(var0: (java_lang_Long | bigint | number)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    position(var0: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    positionSync(var0: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.Buffer'
     */
    position(var0: java_lang_Integer | number): Promise<java_nio_Buffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.Buffer'
     */
    positionSync(var0: java_lang_Integer | number): java_nio_Buffer | null;
    /**
     * @return original return type: 'int'
     */
    position(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    positionSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    limit(var0: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    limitSync(var0: java_lang_Integer | number): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.Buffer'
     */
    limit(var0: java_lang_Integer | number): Promise<java_nio_Buffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.Buffer'
     */
    limitSync(var0: java_lang_Integer | number): java_nio_Buffer | null;
    /**
     * @return original return type: 'int'
     */
    limit(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    limitSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isDirect(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isDirectSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    hasArray(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    hasArraySync(): boolean;
    /**
     * @return original return type: 'long[]'
     */
    array(): Promise<(number)[] | null>;
    /**
     * @return original return type: 'long[]'
     */
    arraySync(): (number)[] | null;
    /**
     * @return original return type: 'java.lang.Object'
     */
    array(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    arraySync(): BasicOrJavaType | null;
    /**
     * @return original return type: 'int'
     */
    arrayOffset(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    arrayOffsetSync(): number;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    mark(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    markSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    mark(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    markSync(): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    reset(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    resetSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    reset(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    resetSync(): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    flip(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    flipSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    flip(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    flipSync(): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    rewind(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    rewindSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    rewind(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    rewindSync(): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    slice(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    sliceSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    slice(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    sliceSync(): LongBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.Buffer'
     */
    slice(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_nio_Buffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.Buffer'
     */
    sliceSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_nio_Buffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    slice(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    sliceSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    duplicate(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    duplicateSync(): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    duplicate(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    duplicateSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.ByteOrder'
     */
    order(): Promise<java_nio_ByteOrder | null>;
    /**
     * @return original return type: 'java.nio.ByteOrder'
     */
    orderSync(): java_nio_ByteOrder | null;
    /**
     * @param var0 original type: 'java.nio.LongBuffer'
     * @return original return type: 'int'
     */
    mismatch(var0: LongBufferClass | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.LongBuffer'
     * @return original return type: 'int'
     */
    mismatchSync(var0: LongBufferClass | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    static allocate(var0: java_lang_Integer | number): Promise<LongBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.LongBuffer'
     */
    static allocateSync(var0: java_lang_Integer | number): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    asReadOnlyBuffer(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    asReadOnlyBufferSync(): LongBuffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    compact(): Promise<LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    compactSync(): LongBuffer | null;
    /**
     * @return original return type: 'int'
     */
    remaining(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    remainingSync(): number;
    /**
     * @return original return type: 'int'
     */
    capacity(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    capacitySync(): number;
    /**
     * @return original return type: 'boolean'
     */
    hasRemaining(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    hasRemainingSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isReadOnly(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isReadOnlySync(): boolean;
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
declare const LongBuffer_base: typeof LongBufferClass;
/**
 * Class java.nio.LongBuffer.
 *
 * This actually imports the java class for further use.
 * The class {@link LongBufferClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class LongBuffer extends LongBuffer_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default LongBuffer;
//# sourceMappingURL=LongBuffer.d.ts.map
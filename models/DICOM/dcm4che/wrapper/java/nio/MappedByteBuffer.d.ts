/// <reference types="node" />
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Buffer as java_nio_Buffer } from "./Buffer";
import { ByteBuffer as java_nio_ByteBuffer } from "./ByteBuffer";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Byte as java_lang_Byte } from "./../lang/Byte";
import { Short as java_lang_Short } from "./../lang/Short";
import { Long as java_lang_Long } from "./../lang/Long";
import { Float as java_lang_Float } from "./../lang/Float";
import { Double as java_lang_Double } from "./../lang/Double";
import { ByteOrder as java_nio_ByteOrder } from "./ByteOrder";
import { CharBuffer as java_nio_CharBuffer } from "./CharBuffer";
import { ShortBuffer as java_nio_ShortBuffer } from "./ShortBuffer";
import { IntBuffer as java_nio_IntBuffer } from "./IntBuffer";
import { LongBuffer as java_nio_LongBuffer } from "./LongBuffer";
import { FloatBuffer as java_nio_FloatBuffer } from "./FloatBuffer";
import { DoubleBuffer as java_nio_DoubleBuffer } from "./DoubleBuffer";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link MappedByteBuffer} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class MappedByteBufferClass extends JavaClass {
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    load(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    loadSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    clear(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    clearSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    clear(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    clearSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    clear(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    clearSync(): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    position(var0: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    positionSync(var0: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    position(var0: java_lang_Integer | number): Promise<MappedByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    positionSync(var0: java_lang_Integer | number): MappedByteBuffer | null;
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
     * @return original return type: 'java.nio.Buffer'
     */
    limit(var0: java_lang_Integer | number): Promise<java_nio_Buffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.Buffer'
     */
    limitSync(var0: java_lang_Integer | number): java_nio_Buffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    limit(var0: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    limitSync(var0: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    limit(var0: java_lang_Integer | number): Promise<MappedByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    limitSync(var0: java_lang_Integer | number): MappedByteBuffer | null;
    /**
     * @return original return type: 'int'
     */
    limit(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    limitSync(): number;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    mark(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    markSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    mark(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    markSync(): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    mark(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    markSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    reset(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    resetSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    reset(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    resetSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    reset(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    resetSync(): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    flip(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    flipSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    flip(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    flipSync(): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    flip(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    flipSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    rewind(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    rewindSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    rewind(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    rewindSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    rewind(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    rewindSync(): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    slice(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    sliceSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_nio_ByteBuffer | null;
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
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    slice(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<MappedByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    sliceSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    slice(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    sliceSync(): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    slice(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    sliceSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    slice(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    sliceSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    duplicate(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    duplicateSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    duplicate(): Promise<java_nio_Buffer | null>;
    /**
     * @return original return type: 'java.nio.Buffer'
     */
    duplicateSync(): java_nio_Buffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    duplicate(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    duplicateSync(): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    compact(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    compactSync(): MappedByteBuffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    compact(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    compactSync(): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'boolean'
     */
    isLoaded(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isLoadedSync(): boolean;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    force(): Promise<MappedByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    forceSync(): MappedByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    force(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<MappedByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.MappedByteBuffer'
     */
    forceSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): MappedByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    get(var0: java_lang_Integer | number, var1: Buffer | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    getSync(var0: java_lang_Integer | number, var1: Buffer | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte'
     */
    get(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'byte'
     */
    getSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    get(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    getSync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'byte'
     */
    get(): Promise<number>;
    /**
     * @return original return type: 'byte'
     */
    getSync(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    get(var0: java_lang_Integer | number, var1: Buffer | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    getSync(var0: java_lang_Integer | number, var1: Buffer | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    get(var0: Buffer | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    getSync(var0: Buffer | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: java_nio_ByteBuffer | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: java_nio_ByteBuffer | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: java_lang_Integer | number, var1: java_lang_Byte | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: java_lang_Byte | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: java_lang_Integer | number, var1: java_nio_ByteBuffer | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: java_nio_ByteBuffer | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: Buffer | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: Buffer | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: java_lang_Integer | number, var1: Buffer | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: Buffer | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: java_lang_Integer | number, var1: Buffer | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'byte[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: java_lang_Integer | number, var1: Buffer | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'byte'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: java_lang_Byte | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'byte'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: java_lang_Byte | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    put(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putSync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): java_nio_ByteBuffer | null;
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
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    compareTo(var0: java_nio_ByteBuffer | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    compareToSync(var0: java_nio_ByteBuffer | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'short'
     */
    getShort(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'short'
     */
    getShortSync(var0: java_lang_Integer | number): number;
    /**
     * @return original return type: 'short'
     */
    getShort(): Promise<number>;
    /**
     * @return original return type: 'short'
     */
    getShortSync(): number;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putShort(var0: java_lang_Short | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'short'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putShortSync(var0: java_lang_Short | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'short'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putShort(var0: java_lang_Integer | number, var1: java_lang_Short | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'short'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putShortSync(var0: java_lang_Integer | number, var1: java_lang_Short | number): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'char'
     */
    getChar(): Promise<string | null>;
    /**
     * @return original return type: 'char'
     */
    getCharSync(): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'char'
     */
    getChar(var0: java_lang_Integer | number): Promise<string | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'char'
     */
    getCharSync(var0: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'char'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putChar(var0: java_lang_Integer | number, var1: string | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'char'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putCharSync(var0: java_lang_Integer | number, var1: string | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putChar(var0: string | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putCharSync(var0: string | null): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'int'
     */
    getInt(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getIntSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getInt(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getIntSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putInt(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putIntSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putInt(var0: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putIntSync(var0: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'long'
     */
    getLong(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'long'
     */
    getLongSync(var0: java_lang_Integer | number): number;
    /**
     * @return original return type: 'long'
     */
    getLong(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    getLongSync(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putLong(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putLongSync(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putLong(var0: java_lang_Long | bigint | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putLongSync(var0: java_lang_Long | bigint | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'float'
     */
    getFloat(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'float'
     */
    getFloatSync(var0: java_lang_Integer | number): number;
    /**
     * @return original return type: 'float'
     */
    getFloat(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getFloatSync(): number;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putFloat(var0: java_lang_Float | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putFloatSync(var0: java_lang_Float | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'float'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putFloat(var0: java_lang_Integer | number, var1: java_lang_Float | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'float'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putFloatSync(var0: java_lang_Integer | number, var1: java_lang_Float | number): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'double'
     */
    getDouble(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getDoubleSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'double'
     */
    getDouble(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'double'
     */
    getDoubleSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putDouble(var0: java_lang_Integer | number, var1: java_lang_Double | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putDoubleSync(var0: java_lang_Integer | number, var1: java_lang_Double | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putDouble(var0: java_lang_Double | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    putDoubleSync(var0: java_lang_Double | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static wrap(var0: Buffer | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static wrapSync(var0: Buffer | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static wrap(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static wrapSync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): java_nio_ByteBuffer | null;
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
     * @return original return type: 'byte[]'
     */
    array(): Promise<Buffer | null>;
    /**
     * @return original return type: 'byte[]'
     */
    arraySync(): Buffer | null;
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
     * @return original return type: 'java.nio.ByteOrder'
     */
    order(): Promise<java_nio_ByteOrder | null>;
    /**
     * @return original return type: 'java.nio.ByteOrder'
     */
    orderSync(): java_nio_ByteOrder | null;
    /**
     * @param var0 original type: 'java.nio.ByteOrder'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    order(var0: java_nio_ByteOrder | null): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'java.nio.ByteOrder'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    orderSync(var0: java_nio_ByteOrder | null): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    mismatch(var0: java_nio_ByteBuffer | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    mismatchSync(var0: java_nio_ByteBuffer | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static allocate(var0: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static allocateSync(var0: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    alignmentOffset(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    alignmentOffsetSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static allocateDirect(var0: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    static allocateDirectSync(var0: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    asReadOnlyBuffer(): Promise<java_nio_ByteBuffer | null>;
    /**
     * @return original return type: 'java.nio.ByteBuffer'
     */
    asReadOnlyBufferSync(): java_nio_ByteBuffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    alignedSlice(var0: java_lang_Integer | number): Promise<java_nio_ByteBuffer | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.ByteBuffer'
     */
    alignedSliceSync(var0: java_lang_Integer | number): java_nio_ByteBuffer | null;
    /**
     * @return original return type: 'java.nio.CharBuffer'
     */
    asCharBuffer(): Promise<java_nio_CharBuffer | null>;
    /**
     * @return original return type: 'java.nio.CharBuffer'
     */
    asCharBufferSync(): java_nio_CharBuffer | null;
    /**
     * @return original return type: 'java.nio.ShortBuffer'
     */
    asShortBuffer(): Promise<java_nio_ShortBuffer | null>;
    /**
     * @return original return type: 'java.nio.ShortBuffer'
     */
    asShortBufferSync(): java_nio_ShortBuffer | null;
    /**
     * @return original return type: 'java.nio.IntBuffer'
     */
    asIntBuffer(): Promise<java_nio_IntBuffer | null>;
    /**
     * @return original return type: 'java.nio.IntBuffer'
     */
    asIntBufferSync(): java_nio_IntBuffer | null;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    asLongBuffer(): Promise<java_nio_LongBuffer | null>;
    /**
     * @return original return type: 'java.nio.LongBuffer'
     */
    asLongBufferSync(): java_nio_LongBuffer | null;
    /**
     * @return original return type: 'java.nio.FloatBuffer'
     */
    asFloatBuffer(): Promise<java_nio_FloatBuffer | null>;
    /**
     * @return original return type: 'java.nio.FloatBuffer'
     */
    asFloatBufferSync(): java_nio_FloatBuffer | null;
    /**
     * @return original return type: 'java.nio.DoubleBuffer'
     */
    asDoubleBuffer(): Promise<java_nio_DoubleBuffer | null>;
    /**
     * @return original return type: 'java.nio.DoubleBuffer'
     */
    asDoubleBufferSync(): java_nio_DoubleBuffer | null;
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
declare const MappedByteBuffer_base: typeof MappedByteBufferClass;
/**
 * Class java.nio.MappedByteBuffer.
 *
 * This actually imports the java class for further use.
 * The class {@link MappedByteBufferClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class MappedByteBuffer extends MappedByteBuffer_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default MappedByteBuffer;
//# sourceMappingURL=MappedByteBuffer.d.ts.map
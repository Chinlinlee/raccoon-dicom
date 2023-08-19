import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Collection as java_util_Collection, CollectionInterface as java_util_CollectionInterface } from "./Collection";
import { Enum as java_lang_Enum } from "./../lang/Enum";
import { Class as java_lang_Class } from "./../lang/Class";
import { IntFunction as java_util_function_IntFunction, IntFunctionInterface as java_util_function_IntFunctionInterface } from "./function/IntFunction";
import { Iterator as java_util_Iterator } from "./Iterator";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Stream as java_util_stream_Stream } from "./stream/Stream";
import { Spliterator as java_util_Spliterator } from "./Spliterator";
import { Predicate as java_util_function_Predicate, PredicateInterface as java_util_function_PredicateInterface } from "./function/Predicate";
import { Consumer as java_util_function_Consumer, ConsumerInterface as java_util_function_ConsumerInterface } from "./function/Consumer";
/**
 * This class just defines types, you should import {@link EnumSet} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class EnumSetClass extends JavaClass {
    /**
     * @return original return type: 'java.util.EnumSet'
     */
    clone(): Promise<EnumSet | null>;
    /**
     * @return original return type: 'java.util.EnumSet'
     */
    cloneSync(): EnumSet | null;
    /**
     * @return original return type: 'java.lang.Object'
     */
    clone(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    cloneSync(): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.util.EnumSet'
     */
    static copyOf(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.util.EnumSet'
     */
    static copyOfSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.util.EnumSet'
     * @return original return type: 'java.util.EnumSet'
     */
    static copyOf(var0: EnumSetClass | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.util.EnumSet'
     * @return original return type: 'java.util.EnumSet'
     */
    static copyOfSync(var0: EnumSetClass | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @param var2 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static of(var0: java_lang_Enum | null, var1: java_lang_Enum | null, var2: java_lang_Enum | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @param var2 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static ofSync(var0: java_lang_Enum | null, var1: java_lang_Enum | null, var2: java_lang_Enum | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static of(var0: java_lang_Enum | null, var1: java_lang_Enum | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static ofSync(var0: java_lang_Enum | null, var1: java_lang_Enum | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @param var2 original type: 'java.lang.Enum'
     * @param var3 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static of(var0: java_lang_Enum | null, var1: java_lang_Enum | null, var2: java_lang_Enum | null, var3: java_lang_Enum | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @param var2 original type: 'java.lang.Enum'
     * @param var3 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static ofSync(var0: java_lang_Enum | null, var1: java_lang_Enum | null, var2: java_lang_Enum | null, var3: java_lang_Enum | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum[]'
     * @return original return type: 'java.util.EnumSet'
     */
    static of(var0: java_lang_Enum | null, var1: (java_lang_Enum | null)[] | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum[]'
     * @return original return type: 'java.util.EnumSet'
     */
    static ofSync(var0: java_lang_Enum | null, var1: (java_lang_Enum | null)[] | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static of(var0: java_lang_Enum | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static ofSync(var0: java_lang_Enum | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @param var2 original type: 'java.lang.Enum'
     * @param var3 original type: 'java.lang.Enum'
     * @param var4 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static of(var0: java_lang_Enum | null, var1: java_lang_Enum | null, var2: java_lang_Enum | null, var3: java_lang_Enum | null, var4: java_lang_Enum | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @param var2 original type: 'java.lang.Enum'
     * @param var3 original type: 'java.lang.Enum'
     * @param var4 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static ofSync(var0: java_lang_Enum | null, var1: java_lang_Enum | null, var2: java_lang_Enum | null, var3: java_lang_Enum | null, var4: java_lang_Enum | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.EnumSet'
     */
    static noneOf(var0: java_lang_Class | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.EnumSet'
     */
    static noneOfSync(var0: java_lang_Class | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static range(var0: java_lang_Enum | null, var1: java_lang_Enum | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @param var1 original type: 'java.lang.Enum'
     * @return original return type: 'java.util.EnumSet'
     */
    static rangeSync(var0: java_lang_Enum | null, var1: java_lang_Enum | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.EnumSet'
     */
    static allOf(var0: java_lang_Class | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.EnumSet'
     */
    static allOfSync(var0: java_lang_Class | null): EnumSet | null;
    /**
     * @param var0 original type: 'java.util.EnumSet'
     * @return original return type: 'java.util.EnumSet'
     */
    static complementOf(var0: EnumSetClass | null): Promise<EnumSet | null>;
    /**
     * @param var0 original type: 'java.util.EnumSet'
     * @return original return type: 'java.util.EnumSet'
     */
    static complementOfSync(var0: EnumSetClass | null): EnumSet | null;
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
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    removeAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    removeAllSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    add(var0: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    addSync(var0: BasicOrJavaType | null): boolean;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    remove(var0: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    removeSync(var0: BasicOrJavaType | null): boolean;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'void'
     */
    clear(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    clearSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isEmpty(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isEmptySync(): boolean;
    /**
     * @return original return type: 'int'
     */
    size(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    sizeSync(): number;
    /**
     * @return original return type: 'java.lang.Object[]'
     */
    toArray(): Promise<(BasicOrJavaType | null)[] | null>;
    /**
     * @return original return type: 'java.lang.Object[]'
     */
    toArraySync(): (BasicOrJavaType | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object[]'
     */
    toArray(var0: (BasicOrJavaType | null)[] | null): Promise<(BasicOrJavaType | null)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object[]'
     */
    toArraySync(var0: (BasicOrJavaType | null)[] | null): (BasicOrJavaType | null)[] | null;
    /**
     * @param var0 original type: 'java.util.function.IntFunction'
     * @return original return type: 'java.lang.Object[]'
     */
    toArray(var0: java_util_function_IntFunction | JavaInterfaceProxy<java_util_function_IntFunctionInterface> | null): Promise<(BasicOrJavaType | null)[] | null>;
    /**
     * @param var0 original type: 'java.util.function.IntFunction'
     * @return original return type: 'java.lang.Object[]'
     */
    toArraySync(var0: java_util_function_IntFunction | JavaInterfaceProxy<java_util_function_IntFunctionInterface> | null): (BasicOrJavaType | null)[] | null;
    /**
     * @return original return type: 'java.util.Iterator'
     */
    iterator(): Promise<java_util_Iterator | null>;
    /**
     * @return original return type: 'java.util.Iterator'
     */
    iteratorSync(): java_util_Iterator | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    contains(var0: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    containsSync(var0: BasicOrJavaType | null): boolean;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    addAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    addAllSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    retainAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    retainAllSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    containsAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    containsAllSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
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
     * @return original return type: 'java.util.stream.Stream'
     */
    stream(): Promise<java_util_stream_Stream | null>;
    /**
     * @return original return type: 'java.util.stream.Stream'
     */
    streamSync(): java_util_stream_Stream | null;
    /**
     * @return original return type: 'java.util.Spliterator'
     */
    spliterator(): Promise<java_util_Spliterator | null>;
    /**
     * @return original return type: 'java.util.Spliterator'
     */
    spliteratorSync(): java_util_Spliterator | null;
    /**
     * @param var0 original type: 'java.util.function.Predicate'
     * @return original return type: 'boolean'
     */
    removeIf(var0: java_util_function_Predicate | JavaInterfaceProxy<java_util_function_PredicateInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.util.function.Predicate'
     * @return original return type: 'boolean'
     */
    removeIfSync(var0: java_util_function_Predicate | JavaInterfaceProxy<java_util_function_PredicateInterface> | null): boolean;
    /**
     * @return original return type: 'java.util.stream.Stream'
     */
    parallelStream(): Promise<java_util_stream_Stream | null>;
    /**
     * @return original return type: 'java.util.stream.Stream'
     */
    parallelStreamSync(): java_util_stream_Stream | null;
    /**
     * @param var0 original type: 'java.util.function.Consumer'
     * @return original return type: 'void'
     */
    forEach(var0: java_util_function_Consumer | JavaInterfaceProxy<java_util_function_ConsumerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.function.Consumer'
     * @return original return type: 'void'
     */
    forEachSync(var0: java_util_function_Consumer | JavaInterfaceProxy<java_util_function_ConsumerInterface> | null): void;
}
declare const EnumSet_base: typeof EnumSetClass;
/**
 * Class java.util.EnumSet.
 *
 * This actually imports the java class for further use.
 * The class {@link EnumSetClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class EnumSet extends EnumSet_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default EnumSet;
//# sourceMappingURL=EnumSet.d.ts.map
/// <reference types="node" />
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Value as org_dcm4che3_data_Value, ValueInterface as org_dcm4che3_data_ValueInterface } from "./Value";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { VR as org_dcm4che3_data_VR } from "./VR";
import { Boolean as java_lang_Boolean } from "./../../../java/lang/Boolean";
import { Collection as java_util_Collection, CollectionInterface as java_util_CollectionInterface } from "./../../../java/util/Collection";
import { DicomOutputStream as org_dcm4che3_io_DicomOutputStream } from "./../io/DicomOutputStream";
import { DicomEncodingOptions as org_dcm4che3_io_DicomEncodingOptions } from "./../io/DicomEncodingOptions";
import { UnaryOperator as java_util_function_UnaryOperator, UnaryOperatorInterface as java_util_function_UnaryOperatorInterface } from "./../../../java/util/function/UnaryOperator";
import { List as java_util_List } from "./../../../java/util/List";
import { IntFunction as java_util_function_IntFunction, IntFunctionInterface as java_util_function_IntFunctionInterface } from "./../../../java/util/function/IntFunction";
import { Iterator as java_util_Iterator } from "./../../../java/util/Iterator";
import { Spliterator as java_util_Spliterator } from "./../../../java/util/Spliterator";
import { Consumer as java_util_function_Consumer, ConsumerInterface as java_util_function_ConsumerInterface } from "./../../../java/util/function/Consumer";
import { Predicate as java_util_function_Predicate, PredicateInterface as java_util_function_PredicateInterface } from "./../../../java/util/function/Predicate";
import { Comparator as java_util_Comparator, ComparatorInterface as java_util_ComparatorInterface } from "./../../../java/util/Comparator";
import { ListIterator as java_util_ListIterator } from "./../../../java/util/ListIterator";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
import { Stream as java_util_stream_Stream } from "./../../../java/util/stream/Stream";
/**
 * This class just defines types, you should import {@link Fragments} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class FragmentsClass extends JavaClass {
    /**
     * Original type: 'org.dcm4che3.data.Value'
     */
    static readonly NULL: org_dcm4che3_data_Value | JavaInterfaceProxy<org_dcm4che3_data_ValueInterface> | null;
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
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    add(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    addSync(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): void;
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
     * @param var0 original type: 'org.dcm4che3.data.VR'
     * @param var1 original type: 'boolean'
     * @return original return type: 'byte[]'
     */
    toBytes(var0: org_dcm4che3_data_VR | null, var1: java_lang_Boolean | boolean): Promise<Buffer | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.VR'
     * @param var1 original type: 'boolean'
     * @return original return type: 'byte[]'
     */
    toBytesSync(var0: org_dcm4che3_data_VR | null, var1: java_lang_Boolean | boolean): Buffer | null;
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
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    addAll(var0: java_lang_Integer | number, var1: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    addAllSync(var0: java_lang_Integer | number, var1: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @return original return type: 'void'
     */
    setReadOnly(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    setReadOnlySync(): void;
    /**
     * @return original return type: 'boolean'
     */
    bigEndian(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    bigEndianSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isReadOnly(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isReadOnlySync(): boolean;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomOutputStream'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @return original return type: 'void'
     */
    writeTo(var0: org_dcm4che3_io_DicomOutputStream | null, var1: org_dcm4che3_data_VR | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomOutputStream'
     * @param var1 original type: 'org.dcm4che3.data.VR'
     * @return original return type: 'void'
     */
    writeToSync(var0: org_dcm4che3_io_DicomOutputStream | null, var1: org_dcm4che3_data_VR | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomEncodingOptions'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.VR'
     * @return original return type: 'int'
     */
    calcLength(var0: org_dcm4che3_io_DicomEncodingOptions | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_VR | null): Promise<number>;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomEncodingOptions'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.VR'
     * @return original return type: 'int'
     */
    calcLengthSync(var0: org_dcm4che3_io_DicomEncodingOptions | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_VR | null): number;
    /**
     * @return original return type: 'org.dcm4che3.data.VR'
     */
    vr(): Promise<org_dcm4che3_data_VR | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.VR'
     */
    vrSync(): org_dcm4che3_data_VR | null;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomEncodingOptions'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.VR'
     * @return original return type: 'int'
     */
    getEncodedLength(var0: org_dcm4che3_io_DicomEncodingOptions | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_VR | null): Promise<number>;
    /**
     * @param var0 original type: 'org.dcm4che3.io.DicomEncodingOptions'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'org.dcm4che3.data.VR'
     * @return original return type: 'int'
     */
    getEncodedLengthSync(var0: org_dcm4che3_io_DicomEncodingOptions | null, var1: java_lang_Boolean | boolean, var2: org_dcm4che3_data_VR | null): number;
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
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    remove(var0: java_lang_Integer | number): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    removeSync(var0: java_lang_Integer | number): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    get(var0: java_lang_Integer | number): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    getSync(var0: java_lang_Integer | number): BasicOrJavaType | null;
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
    indexOf(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    indexOfSync(var0: BasicOrJavaType | null): number;
    /**
     * @return original return type: 'void'
     */
    clear(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    clearSync(): void;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    lastIndexOf(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    lastIndexOfSync(var0: BasicOrJavaType | null): number;
    /**
     * @return original return type: 'boolean'
     */
    isEmpty(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isEmptySync(): boolean;
    /**
     * @param var0 original type: 'java.util.function.UnaryOperator'
     * @return original return type: 'void'
     */
    replaceAll(var0: java_util_function_UnaryOperator | JavaInterfaceProxy<java_util_function_UnaryOperatorInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.function.UnaryOperator'
     * @return original return type: 'void'
     */
    replaceAllSync(var0: java_util_function_UnaryOperator | JavaInterfaceProxy<java_util_function_UnaryOperatorInterface> | null): void;
    /**
     * @return original return type: 'int'
     */
    size(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    sizeSync(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.util.List'
     */
    subList(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_util_List | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.util.List'
     */
    subListSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_util_List | null;
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
     * @return original return type: 'java.lang.Object[]'
     */
    toArray(): Promise<(BasicOrJavaType | null)[] | null>;
    /**
     * @return original return type: 'java.lang.Object[]'
     */
    toArraySync(): (BasicOrJavaType | null)[] | null;
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
     * @return original return type: 'java.util.Spliterator'
     */
    spliterator(): Promise<java_util_Spliterator | null>;
    /**
     * @return original return type: 'java.util.Spliterator'
     */
    spliteratorSync(): java_util_Spliterator | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    set(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    setSync(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): BasicOrJavaType | null;
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
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    ensureCapacity(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    ensureCapacitySync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    trimToSize(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    trimToSizeSync(): void;
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
     * @param var0 original type: 'java.util.Comparator'
     * @return original return type: 'void'
     */
    sort(var0: java_util_Comparator | JavaInterfaceProxy<java_util_ComparatorInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.Comparator'
     * @return original return type: 'void'
     */
    sortSync(var0: java_util_Comparator | JavaInterfaceProxy<java_util_ComparatorInterface> | null): void;
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
     * @return original return type: 'java.util.ListIterator'
     */
    listIterator(): Promise<java_util_ListIterator | null>;
    /**
     * @return original return type: 'java.util.ListIterator'
     */
    listIteratorSync(): java_util_ListIterator | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.util.ListIterator'
     */
    listIterator(var0: java_lang_Integer | number): Promise<java_util_ListIterator | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.util.ListIterator'
     */
    listIteratorSync(var0: java_lang_Integer | number): java_util_ListIterator | null;
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
     * @return original return type: 'java.util.stream.Stream'
     */
    parallelStream(): Promise<java_util_stream_Stream | null>;
    /**
     * @return original return type: 'java.util.stream.Stream'
     */
    parallelStreamSync(): java_util_stream_Stream | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.VR'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @return original return type: 'org.dcm4che3.data.Fragments'
     */
    static newInstanceAsync(var0: org_dcm4che3_data_VR | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number): Promise<Fragments>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.VR'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     */
    constructor(var0: org_dcm4che3_data_VR | null, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number);
}
declare const Fragments_base: typeof FragmentsClass;
/**
 * Class org.dcm4che3.data.Fragments.
 *
 * This actually imports the java class for further use.
 * The class {@link FragmentsClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Fragments extends Fragments_base {
}
export default Fragments;
//# sourceMappingURL=Fragments.d.ts.map
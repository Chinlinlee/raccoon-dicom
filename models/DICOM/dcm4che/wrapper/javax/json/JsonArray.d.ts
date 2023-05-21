import { JavaClass, BasicOrJavaType, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { JsonObject as javax_json_JsonObject, JsonObjectInterface as javax_json_JsonObjectInterface } from "./JsonObject";
import { JsonValue as javax_json_JsonValue, JsonValueInterface as javax_json_JsonValueInterface } from "./JsonValue";
import { Integer as java_lang_Integer } from "./../../java/lang/Integer";
import { Boolean as java_lang_Boolean } from "./../../java/lang/Boolean";
import { JsonNumber as javax_json_JsonNumber } from "./JsonNumber";
import { List as java_util_List } from "./../../java/util/List";
import { Function as java_util_function_Function, FunctionInterface as java_util_function_FunctionInterface } from "./../../java/util/function/Function";
import { Class as java_lang_Class } from "./../../java/lang/Class";
import { JsonString as javax_json_JsonString } from "./JsonString";
import { JsonValue$ValueType as javax_json_JsonValue$ValueType } from "./JsonValue$ValueType";
import { UnaryOperator as java_util_function_UnaryOperator, UnaryOperatorInterface as java_util_function_UnaryOperatorInterface } from "./../../java/util/function/UnaryOperator";
import { IntFunction as java_util_function_IntFunction, IntFunctionInterface as java_util_function_IntFunctionInterface } from "./../../java/util/function/IntFunction";
import { Iterator as java_util_Iterator } from "./../../java/util/Iterator";
import { Spliterator as java_util_Spliterator } from "./../../java/util/Spliterator";
import { Collection as java_util_Collection, CollectionInterface as java_util_CollectionInterface } from "./../../java/util/Collection";
import { Comparator as java_util_Comparator, ComparatorInterface as java_util_ComparatorInterface } from "./../../java/util/Comparator";
import { ListIterator as java_util_ListIterator } from "./../../java/util/ListIterator";
import { Stream as java_util_stream_Stream } from "./../../java/util/stream/Stream";
import { Predicate as java_util_function_Predicate, PredicateInterface as java_util_function_PredicateInterface } from "./../../java/util/function/Predicate";
import { Consumer as java_util_function_Consumer, ConsumerInterface as java_util_function_ConsumerInterface } from "./../../java/util/function/Consumer";
/**
 * This class just defines types, you should import {@link JsonArray} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonArrayClass extends JavaClass {
    /**
     * Original type: 'javax.json.JsonObject'
     */
    static readonly EMPTY_JSON_OBJECT: javax_json_JsonObject | JavaInterfaceProxy<javax_json_JsonObjectInterface> | null;
    /**
     * Original type: 'javax.json.JsonArray'
     */
    static readonly EMPTY_JSON_ARRAY: JsonArrayClass | JavaInterfaceProxy<JsonArrayInterface> | null;
    /**
     * Original type: 'javax.json.JsonValue'
     */
    static readonly NULL: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null;
    /**
     * Original type: 'javax.json.JsonValue'
     */
    static readonly TRUE: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null;
    /**
     * Original type: 'javax.json.JsonValue'
     */
    static readonly FALSE: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    getBoolean(var0: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    getBooleanSync(var0: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'boolean'
     */
    getBoolean(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'boolean'
     */
    getBooleanSync(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): boolean;
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
     * @return original return type: 'int'
     */
    getInt(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getIntSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    isNull(var0: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    isNullSync(var0: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    getString(var0: java_lang_Integer | number, var1: string | null): Promise<string | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    getStringSync(var0: java_lang_Integer | number, var1: string | null): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getString(var0: java_lang_Integer | number): Promise<string | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getStringSync(var0: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonObject'
     */
    getJsonObject(var0: java_lang_Integer | number): Promise<javax_json_JsonObject | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonObject'
     */
    getJsonObjectSync(var0: java_lang_Integer | number): javax_json_JsonObject | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonNumber'
     */
    getJsonNumber(var0: java_lang_Integer | number): Promise<javax_json_JsonNumber | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonNumber'
     */
    getJsonNumberSync(var0: java_lang_Integer | number): javax_json_JsonNumber | null;
    /**
     * @param var0 original type: 'java.util.function.Function'
     * @return original return type: 'java.util.List'
     */
    getValuesAs(var0: java_util_function_Function | JavaInterfaceProxy<java_util_function_FunctionInterface> | null): Promise<java_util_List | null>;
    /**
     * @param var0 original type: 'java.util.function.Function'
     * @return original return type: 'java.util.List'
     */
    getValuesAsSync(var0: java_util_function_Function | JavaInterfaceProxy<java_util_function_FunctionInterface> | null): java_util_List | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.List'
     */
    getValuesAs(var0: java_lang_Class | null): Promise<java_util_List | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.List'
     */
    getValuesAsSync(var0: java_lang_Class | null): java_util_List | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonString'
     */
    getJsonString(var0: java_lang_Integer | number): Promise<javax_json_JsonString | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonString'
     */
    getJsonStringSync(var0: java_lang_Integer | number): javax_json_JsonString | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArray'
     */
    getJsonArray(var0: java_lang_Integer | number): Promise<JsonArray | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArray'
     */
    getJsonArraySync(var0: java_lang_Integer | number): JsonArray | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonValue'
     */
    getValue(var0: string | null): Promise<javax_json_JsonValue | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonValue'
     */
    getValueSync(var0: string | null): javax_json_JsonValue | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'javax.json.JsonObject'
     */
    asJsonObject(): Promise<javax_json_JsonObject | null>;
    /**
     * @return original return type: 'javax.json.JsonObject'
     */
    asJsonObjectSync(): javax_json_JsonObject | null;
    /**
     * @return original return type: 'javax.json.JsonArray'
     */
    asJsonArray(): Promise<JsonArray | null>;
    /**
     * @return original return type: 'javax.json.JsonArray'
     */
    asJsonArraySync(): JsonArray | null;
    /**
     * @return original return type: 'javax.json.JsonValue$ValueType'
     */
    getValueType(): Promise<javax_json_JsonValue$ValueType | null>;
    /**
     * @return original return type: 'javax.json.JsonValue$ValueType'
     */
    getValueTypeSync(): javax_json_JsonValue$ValueType | null;
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
     * @return original return type: 'java.util.Spliterator'
     */
    spliterator(): Promise<java_util_Spliterator | null>;
    /**
     * @return original return type: 'java.util.Spliterator'
     */
    spliteratorSync(): java_util_Spliterator | null;
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
     * @return original return type: 'java.util.ListIterator'
     */
    listIterator(): Promise<java_util_ListIterator | null>;
    /**
     * @return original return type: 'java.util.ListIterator'
     */
    listIteratorSync(): java_util_ListIterator | null;
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
     * @return original return type: 'java.util.stream.Stream'
     */
    stream(): Promise<java_util_stream_Stream | null>;
    /**
     * @return original return type: 'java.util.stream.Stream'
     */
    streamSync(): java_util_stream_Stream | null;
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
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createJsonArrayProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface JsonArrayInterface {
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    getBoolean(var0: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'boolean'
     */
    getBoolean(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): boolean;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getInt(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getInt(var0: java_lang_Integer | number, var1: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    isNull(var0: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    getString(var0: java_lang_Integer | number, var1: string | null): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getString(var0: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonObject'
     */
    getJsonObject(var0: java_lang_Integer | number): javax_json_JsonObject | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonNumber'
     */
    getJsonNumber(var0: java_lang_Integer | number): javax_json_JsonNumber | null;
    /**
     * @param var0 original type: 'java.util.function.Function'
     * @return original return type: 'java.util.List'
     */
    getValuesAs?(var0: java_util_function_Function | JavaInterfaceProxy<java_util_function_FunctionInterface> | null): java_util_List | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.List'
     */
    getValuesAs?(var0: java_lang_Class | null): java_util_List | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonString'
     */
    getJsonString(var0: java_lang_Integer | number): javax_json_JsonString | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArray'
     */
    getJsonArray(var0: java_lang_Integer | number): JsonArray | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonValue'
     */
    getValue?(var0: string | null): javax_json_JsonValue | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): string;
    /**
     * @return original return type: 'javax.json.JsonObject'
     */
    asJsonObject?(): javax_json_JsonObject | null;
    /**
     * @return original return type: 'javax.json.JsonArray'
     */
    asJsonArray?(): JsonArray | null;
    /**
     * @return original return type: 'javax.json.JsonValue$ValueType'
     */
    getValueType(): javax_json_JsonValue$ValueType | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    add(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): void;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    add(var0: BasicOrJavaType | null): boolean;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    remove(var0: BasicOrJavaType | null): boolean;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    remove(var0: java_lang_Integer | number): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    get(var0: java_lang_Integer | number): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    equals(var0: BasicOrJavaType | null): boolean;
    /**
     * @return original return type: 'int'
     */
    hashCode(): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    indexOf(var0: BasicOrJavaType | null): number;
    /**
     * @return original return type: 'void'
     */
    clear(): void;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    lastIndexOf(var0: BasicOrJavaType | null): number;
    /**
     * @return original return type: 'boolean'
     */
    isEmpty(): boolean;
    /**
     * @param var0 original type: 'java.util.function.UnaryOperator'
     * @return original return type: 'void'
     */
    replaceAll?(var0: java_util_function_UnaryOperator | JavaInterfaceProxy<java_util_function_UnaryOperatorInterface> | null): void;
    /**
     * @return original return type: 'int'
     */
    size(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.util.List'
     */
    subList(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_util_List | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @return original return type: 'java.lang.Object[]'
     */
    toArray?(): (BasicOrJavaType | null)[] | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object[]'
     */
    toArray?(var0: (BasicOrJavaType | null)[] | null): (BasicOrJavaType | null)[] | null;
    /**
     * @param var0 original type: 'java.util.function.IntFunction'
     * @return original return type: 'java.lang.Object[]'
     */
    toArray?(var0: java_util_function_IntFunction | JavaInterfaceProxy<java_util_function_IntFunctionInterface> | null): (BasicOrJavaType | null)[] | null;
    /**
     * @return original return type: 'java.util.Iterator'
     */
    iterator(): java_util_Iterator | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    contains(var0: BasicOrJavaType | null): boolean;
    /**
     * @return original return type: 'java.util.Spliterator'
     */
    spliterator?(): java_util_Spliterator | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    addAll(var0: java_lang_Integer | number, var1: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    addAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    set(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.util.Comparator'
     * @return original return type: 'void'
     */
    sort?(var0: java_util_Comparator | JavaInterfaceProxy<java_util_ComparatorInterface> | null): void;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    removeAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    retainAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.util.ListIterator'
     */
    listIterator(var0: java_lang_Integer | number): java_util_ListIterator | null;
    /**
     * @return original return type: 'java.util.ListIterator'
     */
    listIterator(): java_util_ListIterator | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'boolean'
     */
    containsAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): boolean;
    /**
     * @return original return type: 'java.util.stream.Stream'
     */
    stream?(): java_util_stream_Stream | null;
    /**
     * @param var0 original type: 'java.util.function.Predicate'
     * @return original return type: 'boolean'
     */
    removeIf?(var0: java_util_function_Predicate | JavaInterfaceProxy<java_util_function_PredicateInterface> | null): boolean;
    /**
     * @return original return type: 'java.util.stream.Stream'
     */
    parallelStream?(): java_util_stream_Stream | null;
    /**
     * @param var0 original type: 'java.util.function.Consumer'
     * @return original return type: 'void'
     */
    forEach?(var0: java_util_function_Consumer | JavaInterfaceProxy<java_util_function_ConsumerInterface> | null): void;
}
/**
 * Create a proxy for the {@link JsonArray} interface.
 * All required methods in {@link JsonArrayInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createJsonArrayProxy(methods: JsonArrayInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<JsonArrayInterface>;
declare const JsonArray_base: typeof JsonArrayClass;
/**
 * Class javax.json.JsonArray.
 *
 * This actually imports the java class for further use.
 * The class {@link JsonArrayClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonArray extends JsonArray_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default JsonArray;
//# sourceMappingURL=JsonArray.d.ts.map
import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../java/lang/Integer";
import { BigInteger as java_math_BigInteger } from "./../../java/math/BigInteger";
import { BigDecimal as java_math_BigDecimal } from "./../../java/math/BigDecimal";
import { JsonValue as javax_json_JsonValue, JsonValueInterface as javax_json_JsonValueInterface } from "./JsonValue";
import { JsonObjectBuilder as javax_json_JsonObjectBuilder, JsonObjectBuilderInterface as javax_json_JsonObjectBuilderInterface } from "./JsonObjectBuilder";
import { Boolean as java_lang_Boolean } from "./../../java/lang/Boolean";
import { Double as java_lang_Double } from "./../../java/lang/Double";
import { Long as java_lang_Long } from "./../../java/lang/Long";
import { JsonArray as javax_json_JsonArray } from "./JsonArray";
/**
 * This class just defines types, you should import {@link JsonArrayBuilder} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonArrayBuilderClass extends JavaClass {
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: java_math_BigInteger | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: java_math_BigInteger | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: java_math_BigDecimal | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: java_math_BigDecimal | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: string | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: string | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: java_lang_Double | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: java_lang_Double | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Long | bigint | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Long | bigint | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Integer | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_math_BigInteger | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_math_BigInteger | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: string | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: string | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_math_BigDecimal | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_math_BigDecimal | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Boolean | boolean): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Boolean | boolean): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add(var0: java_lang_Double | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addSync(var0: java_lang_Double | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    remove(var0: java_lang_Integer | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    removeSync(var0: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addAll(var0: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addAllSync(var0: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: java_lang_Double | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: java_lang_Double | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: string | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: string | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: java_math_BigDecimal | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: java_math_BigDecimal | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set(var0: java_lang_Integer | number, var1: java_math_BigInteger | null): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setSync(var0: java_lang_Integer | number, var1: java_math_BigInteger | null): JsonArrayBuilder | null;
    /**
     * @return original return type: 'javax.json.JsonArray'
     */
    build(): Promise<javax_json_JsonArray | null>;
    /**
     * @return original return type: 'javax.json.JsonArray'
     */
    buildSync(): javax_json_JsonArray | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setNull(var0: java_lang_Integer | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setNullSync(var0: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addNull(): Promise<JsonArrayBuilder | null>;
    /**
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addNullSync(): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addNull(var0: java_lang_Integer | number): Promise<JsonArrayBuilder | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addNullSync(var0: java_lang_Integer | number): JsonArrayBuilder | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createJsonArrayBuilderProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface JsonArrayBuilderInterface {
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: java_math_BigInteger | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: java_math_BigDecimal | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: string | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: java_lang_Double | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Long | bigint | number): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_math_BigInteger | null): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: string | null): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_math_BigDecimal | null): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Boolean | boolean): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @param var0 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    add?(var0: java_lang_Double | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    remove?(var0: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addAll?(var0: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: java_lang_Double | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: java_lang_Long | bigint | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: javax_json_JsonObjectBuilder | JavaInterfaceProxy<javax_json_JsonObjectBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: JsonArrayBuilderClass | JavaInterfaceProxy<JsonArrayBuilderInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: string | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: java_math_BigDecimal | null): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    set?(var0: java_lang_Integer | number, var1: java_math_BigInteger | null): JsonArrayBuilder | null;
    /**
     * @return original return type: 'javax.json.JsonArray'
     */
    build(): javax_json_JsonArray | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    setNull?(var0: java_lang_Integer | number): JsonArrayBuilder | null;
    /**
     * **Note: Although this method is marked as optional, it actually must be implemented.**
     *
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addNull?(): JsonArrayBuilder | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.json.JsonArrayBuilder'
     */
    addNull?(var0: java_lang_Integer | number): JsonArrayBuilder | null;
}
/**
 * Create a proxy for the {@link JsonArrayBuilder} interface.
 * All required methods in {@link JsonArrayBuilderInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createJsonArrayBuilderProxy(methods: JsonArrayBuilderInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<JsonArrayBuilderInterface>;
declare const JsonArrayBuilder_base: typeof JsonArrayBuilderClass;
/**
 * Class javax.json.JsonArrayBuilder.
 *
 * This actually imports the java class for further use.
 * The class {@link JsonArrayBuilderClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonArrayBuilder extends JsonArrayBuilder_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default JsonArrayBuilder;
//# sourceMappingURL=JsonArrayBuilder.d.ts.map
import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Long as java_lang_Long } from "./../../java/lang/Long";
import { Double as java_lang_Double } from "./../../java/lang/Double";
import { Boolean as java_lang_Boolean } from "./../../java/lang/Boolean";
import { JsonArrayBuilder as javax_json_JsonArrayBuilder, JsonArrayBuilderInterface as javax_json_JsonArrayBuilderInterface } from "./JsonArrayBuilder";
import { JsonValue as javax_json_JsonValue, JsonValueInterface as javax_json_JsonValueInterface } from "./JsonValue";
import { BigInteger as java_math_BigInteger } from "./../../java/math/BigInteger";
import { Integer as java_lang_Integer } from "./../../java/lang/Integer";
import { BigDecimal as java_math_BigDecimal } from "./../../java/math/BigDecimal";
import { JsonObject as javax_json_JsonObject } from "./JsonObject";
/**
 * This class just defines types, you should import {@link JsonObjectBuilder} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonObjectBuilderClass extends JavaClass {
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Long | bigint | number): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: java_lang_Long | bigint | number): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Double | number): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: java_lang_Double | number): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Boolean | boolean): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: java_lang_Boolean | boolean): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: JsonObjectBuilderClass | JavaInterfaceProxy<JsonObjectBuilderInterface> | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: JsonObjectBuilderClass | JavaInterfaceProxy<JsonObjectBuilderInterface> | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: javax_json_JsonArrayBuilder | JavaInterfaceProxy<javax_json_JsonArrayBuilderInterface> | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: javax_json_JsonArrayBuilder | JavaInterfaceProxy<javax_json_JsonArrayBuilderInterface> | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: string | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: string | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_math_BigInteger | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: java_math_BigInteger | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Integer | number): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: java_lang_Integer | number): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_math_BigDecimal | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addSync(var0: string | null, var1: java_math_BigDecimal | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    remove(var0: string | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    removeSync(var0: string | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addAll(var0: JsonObjectBuilderClass | JavaInterfaceProxy<JsonObjectBuilderInterface> | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addAllSync(var0: JsonObjectBuilderClass | JavaInterfaceProxy<JsonObjectBuilderInterface> | null): JsonObjectBuilder | null;
    /**
     * @return original return type: 'javax.json.JsonObject'
     */
    build(): Promise<javax_json_JsonObject | null>;
    /**
     * @return original return type: 'javax.json.JsonObject'
     */
    buildSync(): javax_json_JsonObject | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addNull(var0: string | null): Promise<JsonObjectBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addNullSync(var0: string | null): JsonObjectBuilder | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createJsonObjectBuilderProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface JsonObjectBuilderInterface {
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'long'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Long | bigint | number): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'double'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Double | number): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'boolean'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Boolean | boolean): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: JsonObjectBuilderClass | JavaInterfaceProxy<JsonObjectBuilderInterface> | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonArrayBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: javax_json_JsonArrayBuilder | JavaInterfaceProxy<javax_json_JsonArrayBuilderInterface> | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'javax.json.JsonValue'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: javax_json_JsonValue | JavaInterfaceProxy<javax_json_JsonValueInterface> | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: string | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.math.BigInteger'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_math_BigInteger | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'int'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_lang_Integer | number): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.math.BigDecimal'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    add(var0: string | null, var1: java_math_BigDecimal | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    remove?(var0: string | null): JsonObjectBuilder | null;
    /**
     * @param var0 original type: 'javax.json.JsonObjectBuilder'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addAll?(var0: JsonObjectBuilderClass | JavaInterfaceProxy<JsonObjectBuilderInterface> | null): JsonObjectBuilder | null;
    /**
     * @return original return type: 'javax.json.JsonObject'
     */
    build(): javax_json_JsonObject | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'javax.json.JsonObjectBuilder'
     */
    addNull(var0: string | null): JsonObjectBuilder | null;
}
/**
 * Create a proxy for the {@link JsonObjectBuilder} interface.
 * All required methods in {@link JsonObjectBuilderInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createJsonObjectBuilderProxy(methods: JsonObjectBuilderInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<JsonObjectBuilderInterface>;
declare const JsonObjectBuilder_base: typeof JsonObjectBuilderClass;
/**
 * Class javax.json.JsonObjectBuilder.
 *
 * This actually imports the java class for further use.
 * The class {@link JsonObjectBuilderClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonObjectBuilder extends JsonObjectBuilder_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default JsonObjectBuilder;
//# sourceMappingURL=JsonObjectBuilder.d.ts.map
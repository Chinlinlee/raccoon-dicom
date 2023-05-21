import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Map as java_util_Map } from "./../../java/util/Map";
import { JsonWriter as javax_json_JsonWriter } from "./JsonWriter";
import { Writer as java_io_Writer } from "./../../java/io/Writer";
import { OutputStream as java_io_OutputStream } from "./../../java/io/OutputStream";
import { Charset as java_nio_charset_Charset } from "./../../java/nio/charset/Charset";
/**
 * This class just defines types, you should import {@link JsonWriterFactory} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonWriterFactoryClass extends JavaClass {
    /**
     * @return original return type: 'java.util.Map'
     */
    getConfigInUse(): Promise<java_util_Map | null>;
    /**
     * @return original return type: 'java.util.Map'
     */
    getConfigInUseSync(): java_util_Map | null;
    /**
     * @param var0 original type: 'java.io.Writer'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriter(var0: java_io_Writer | null): Promise<javax_json_JsonWriter | null>;
    /**
     * @param var0 original type: 'java.io.Writer'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriterSync(var0: java_io_Writer | null): javax_json_JsonWriter | null;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'java.nio.charset.Charset'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriter(var0: java_io_OutputStream | null, var1: java_nio_charset_Charset | null): Promise<javax_json_JsonWriter | null>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'java.nio.charset.Charset'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriterSync(var0: java_io_OutputStream | null, var1: java_nio_charset_Charset | null): javax_json_JsonWriter | null;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriter(var0: java_io_OutputStream | null): Promise<javax_json_JsonWriter | null>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriterSync(var0: java_io_OutputStream | null): javax_json_JsonWriter | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createJsonWriterFactoryProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface JsonWriterFactoryInterface {
    /**
     * @return original return type: 'java.util.Map'
     */
    getConfigInUse(): java_util_Map | null;
    /**
     * @param var0 original type: 'java.io.Writer'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriter(var0: java_io_Writer | null): javax_json_JsonWriter | null;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'java.nio.charset.Charset'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriter(var0: java_io_OutputStream | null, var1: java_nio_charset_Charset | null): javax_json_JsonWriter | null;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @return original return type: 'javax.json.JsonWriter'
     */
    createWriter(var0: java_io_OutputStream | null): javax_json_JsonWriter | null;
}
/**
 * Create a proxy for the {@link JsonWriterFactory} interface.
 * All required methods in {@link JsonWriterFactoryInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createJsonWriterFactoryProxy(methods: JsonWriterFactoryInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<JsonWriterFactoryInterface>;
declare const JsonWriterFactory_base: typeof JsonWriterFactoryClass;
/**
 * Class javax.json.JsonWriterFactory.
 *
 * This actually imports the java class for further use.
 * The class {@link JsonWriterFactoryClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class JsonWriterFactory extends JsonWriterFactory_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default JsonWriterFactory;
//# sourceMappingURL=JsonWriterFactory.d.ts.map
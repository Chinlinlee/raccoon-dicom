/// <reference types="node" />
import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { SSLSession as javax_net_ssl_SSLSession } from "./SSLSession";
import { Enumeration as java_util_Enumeration } from "./../../../java/util/Enumeration";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
/**
 * This class just defines types, you should import {@link SSLSessionContext} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLSessionContextClass extends JavaClass {
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'javax.net.ssl.SSLSession'
     */
    getSession(var0: Buffer | null): Promise<javax_net_ssl_SSLSession | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'javax.net.ssl.SSLSession'
     */
    getSessionSync(var0: Buffer | null): javax_net_ssl_SSLSession | null;
    /**
     * @return original return type: 'java.util.Enumeration'
     */
    getIds(): Promise<java_util_Enumeration | null>;
    /**
     * @return original return type: 'java.util.Enumeration'
     */
    getIdsSync(): java_util_Enumeration | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSessionTimeout(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSessionTimeoutSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getSessionTimeout(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSessionTimeoutSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSessionCacheSize(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSessionCacheSizeSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getSessionCacheSize(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSessionCacheSizeSync(): number;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createSSLSessionContextProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface SSLSessionContextInterface {
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'javax.net.ssl.SSLSession'
     */
    getSession(var0: Buffer | null): javax_net_ssl_SSLSession | null;
    /**
     * @return original return type: 'java.util.Enumeration'
     */
    getIds(): java_util_Enumeration | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSessionTimeout(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getSessionTimeout(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSessionCacheSize(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getSessionCacheSize(): number;
}
/**
 * Create a proxy for the {@link SSLSessionContext} interface.
 * All required methods in {@link SSLSessionContextInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createSSLSessionContextProxy(methods: SSLSessionContextInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<SSLSessionContextInterface>;
declare const SSLSessionContext_base: typeof SSLSessionContextClass;
/**
 * Class javax.net.ssl.SSLSessionContext.
 *
 * This actually imports the java class for further use.
 * The class {@link SSLSessionContextClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLSessionContext extends SSLSessionContext_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default SSLSessionContext;
//# sourceMappingURL=SSLSessionContext.d.ts.map
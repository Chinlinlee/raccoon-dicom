import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { SSLEngineResult as javax_net_ssl_SSLEngineResult } from "./SSLEngineResult";
import { ByteBuffer as java_nio_ByteBuffer } from "./../../../java/nio/ByteBuffer";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Boolean as java_lang_Boolean } from "./../../../java/lang/Boolean";
import { SSLSession as javax_net_ssl_SSLSession } from "./SSLSession";
import { BiFunction as java_util_function_BiFunction, BiFunctionInterface as java_util_function_BiFunctionInterface } from "./../../../java/util/function/BiFunction";
import { Runnable as java_lang_Runnable } from "./../../../java/lang/Runnable";
import { SSLEngineResult$HandshakeStatus as javax_net_ssl_SSLEngineResult$HandshakeStatus } from "./SSLEngineResult$HandshakeStatus";
import { SSLParameters as javax_net_ssl_SSLParameters } from "./SSLParameters";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link SSLEngine} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLEngineClass extends JavaClass {
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    wrap(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_nio_ByteBuffer | null): Promise<javax_net_ssl_SSLEngineResult | null>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    wrapSync(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_nio_ByteBuffer | null): javax_net_ssl_SSLEngineResult | null;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    wrap(var0: java_nio_ByteBuffer | null, var1: java_nio_ByteBuffer | null): Promise<javax_net_ssl_SSLEngineResult | null>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    wrapSync(var0: java_nio_ByteBuffer | null, var1: java_nio_ByteBuffer | null): javax_net_ssl_SSLEngineResult | null;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    wrap(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_nio_ByteBuffer | null): Promise<javax_net_ssl_SSLEngineResult | null>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    wrapSync(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_nio_ByteBuffer | null): javax_net_ssl_SSLEngineResult | null;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer[]'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    unwrap(var0: java_nio_ByteBuffer | null, var1: (java_nio_ByteBuffer | null)[] | null): Promise<javax_net_ssl_SSLEngineResult | null>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer[]'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    unwrapSync(var0: java_nio_ByteBuffer | null, var1: (java_nio_ByteBuffer | null)[] | null): javax_net_ssl_SSLEngineResult | null;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    unwrap(var0: java_nio_ByteBuffer | null, var1: (java_nio_ByteBuffer | null)[] | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<javax_net_ssl_SSLEngineResult | null>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer[]'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    unwrapSync(var0: java_nio_ByteBuffer | null, var1: (java_nio_ByteBuffer | null)[] | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): javax_net_ssl_SSLEngineResult | null;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    unwrap(var0: java_nio_ByteBuffer | null, var1: java_nio_ByteBuffer | null): Promise<javax_net_ssl_SSLEngineResult | null>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @param var1 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    unwrapSync(var0: java_nio_ByteBuffer | null, var1: java_nio_ByteBuffer | null): javax_net_ssl_SSLEngineResult | null;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getEnabledCipherSuites(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getEnabledCipherSuitesSync(): (string | null)[] | null;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getEnabledProtocols(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getEnabledProtocolsSync(): (string | null)[] | null;
    /**
     * @return original return type: 'boolean'
     */
    getNeedClientAuth(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getNeedClientAuthSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setNeedClientAuth(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setNeedClientAuthSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getWantClientAuth(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getWantClientAuthSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setWantClientAuth(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setWantClientAuthSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getSupportedCipherSuites(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getSupportedCipherSuitesSync(): (string | null)[] | null;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getSupportedProtocols(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getSupportedProtocolsSync(): (string | null)[] | null;
    /**
     * @return original return type: 'javax.net.ssl.SSLSession'
     */
    getSession(): Promise<javax_net_ssl_SSLSession | null>;
    /**
     * @return original return type: 'javax.net.ssl.SSLSession'
     */
    getSessionSync(): javax_net_ssl_SSLSession | null;
    /**
     * @return original return type: 'javax.net.ssl.SSLSession'
     */
    getHandshakeSession(): Promise<javax_net_ssl_SSLSession | null>;
    /**
     * @return original return type: 'javax.net.ssl.SSLSession'
     */
    getHandshakeSessionSync(): javax_net_ssl_SSLSession | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setUseClientMode(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setUseClientModeSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getUseClientMode(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getUseClientModeSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setEnableSessionCreation(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setEnableSessionCreationSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getEnableSessionCreation(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getEnableSessionCreationSync(): boolean;
    /**
     * @return original return type: 'java.lang.String'
     */
    getApplicationProtocol(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getApplicationProtocolSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getHandshakeApplicationProtocol(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getHandshakeApplicationProtocolSync(): string | null;
    /**
     * @param var0 original type: 'java.util.function.BiFunction'
     * @return original return type: 'void'
     */
    setHandshakeApplicationProtocolSelector(var0: java_util_function_BiFunction | JavaInterfaceProxy<java_util_function_BiFunctionInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.function.BiFunction'
     * @return original return type: 'void'
     */
    setHandshakeApplicationProtocolSelectorSync(var0: java_util_function_BiFunction | JavaInterfaceProxy<java_util_function_BiFunctionInterface> | null): void;
    /**
     * @return original return type: 'java.util.function.BiFunction'
     */
    getHandshakeApplicationProtocolSelector(): Promise<java_util_function_BiFunction | null>;
    /**
     * @return original return type: 'java.util.function.BiFunction'
     */
    getHandshakeApplicationProtocolSelectorSync(): java_util_function_BiFunction | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getPeerHost(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getPeerHostSync(): string | null;
    /**
     * @return original return type: 'int'
     */
    getPeerPort(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getPeerPortSync(): number;
    /**
     * @return original return type: 'java.lang.Runnable'
     */
    getDelegatedTask(): Promise<java_lang_Runnable | null>;
    /**
     * @return original return type: 'java.lang.Runnable'
     */
    getDelegatedTaskSync(): java_lang_Runnable | null;
    /**
     * @return original return type: 'void'
     */
    closeInbound(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeInboundSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isInboundDone(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isInboundDoneSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    closeOutbound(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeOutboundSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isOutboundDone(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isOutboundDoneSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    beginHandshake(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    beginHandshakeSync(): void;
    /**
     * @return original return type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     */
    getHandshakeStatus(): Promise<javax_net_ssl_SSLEngineResult$HandshakeStatus | null>;
    /**
     * @return original return type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     */
    getHandshakeStatusSync(): javax_net_ssl_SSLEngineResult$HandshakeStatus | null;
    /**
     * @return original return type: 'javax.net.ssl.SSLParameters'
     */
    getSSLParameters(): Promise<javax_net_ssl_SSLParameters | null>;
    /**
     * @return original return type: 'javax.net.ssl.SSLParameters'
     */
    getSSLParametersSync(): javax_net_ssl_SSLParameters | null;
    /**
     * @param var0 original type: 'javax.net.ssl.SSLParameters'
     * @return original return type: 'void'
     */
    setSSLParameters(var0: javax_net_ssl_SSLParameters | null): Promise<void>;
    /**
     * @param var0 original type: 'javax.net.ssl.SSLParameters'
     * @return original return type: 'void'
     */
    setSSLParametersSync(var0: javax_net_ssl_SSLParameters | null): void;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setEnabledProtocols(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setEnabledProtocolsSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setEnabledCipherSuites(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setEnabledCipherSuitesSync(var0: (string | null)[] | null): void;
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
declare const SSLEngine_base: typeof SSLEngineClass;
/**
 * Class javax.net.ssl.SSLEngine.
 *
 * This actually imports the java class for further use.
 * The class {@link SSLEngineClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLEngine extends SSLEngine_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default SSLEngine;
//# sourceMappingURL=SSLEngine.d.ts.map
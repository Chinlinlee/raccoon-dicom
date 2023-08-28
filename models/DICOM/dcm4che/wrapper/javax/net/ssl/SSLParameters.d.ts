import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Boolean as java_lang_Boolean } from "./../../../java/lang/Boolean";
import { AlgorithmConstraints as java_security_AlgorithmConstraints, AlgorithmConstraintsInterface as java_security_AlgorithmConstraintsInterface } from "./../../../java/security/AlgorithmConstraints";
import { List as java_util_List, ListInterface as java_util_ListInterface } from "./../../../java/util/List";
import { Collection as java_util_Collection, CollectionInterface as java_util_CollectionInterface } from "./../../../java/util/Collection";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link SSLParameters} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLParametersClass extends JavaClass {
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setCipherSuites(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setCipherSuitesSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setProtocols(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setProtocolsSync(var0: (string | null)[] | null): void;
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
    getCipherSuites(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getCipherSuitesSync(): (string | null)[] | null;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getProtocols(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getProtocolsSync(): (string | null)[] | null;
    /**
     * @return original return type: 'java.security.AlgorithmConstraints'
     */
    getAlgorithmConstraints(): Promise<java_security_AlgorithmConstraints | null>;
    /**
     * @return original return type: 'java.security.AlgorithmConstraints'
     */
    getAlgorithmConstraintsSync(): java_security_AlgorithmConstraints | null;
    /**
     * @param var0 original type: 'java.security.AlgorithmConstraints'
     * @return original return type: 'void'
     */
    setAlgorithmConstraints(var0: java_security_AlgorithmConstraints | JavaInterfaceProxy<java_security_AlgorithmConstraintsInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.AlgorithmConstraints'
     * @return original return type: 'void'
     */
    setAlgorithmConstraintsSync(var0: java_security_AlgorithmConstraints | JavaInterfaceProxy<java_security_AlgorithmConstraintsInterface> | null): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    getEndpointIdentificationAlgorithm(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getEndpointIdentificationAlgorithmSync(): string | null;
    /**
     * @param var0 original type: 'java.util.List'
     * @return original return type: 'void'
     */
    setServerNames(var0: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.List'
     * @return original return type: 'void'
     */
    setServerNamesSync(var0: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null): void;
    /**
     * @return original return type: 'java.util.List'
     */
    getServerNames(): Promise<java_util_List | null>;
    /**
     * @return original return type: 'java.util.List'
     */
    getServerNamesSync(): java_util_List | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'void'
     */
    setSNIMatchers(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'void'
     */
    setSNIMatchersSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): void;
    /**
     * @return original return type: 'java.util.Collection'
     */
    getSNIMatchers(): Promise<java_util_Collection | null>;
    /**
     * @return original return type: 'java.util.Collection'
     */
    getSNIMatchersSync(): java_util_Collection | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setUseCipherSuitesOrder(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setUseCipherSuitesOrderSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getUseCipherSuitesOrder(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getUseCipherSuitesOrderSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setEnableRetransmissions(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setEnableRetransmissionsSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getEnableRetransmissions(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getEnableRetransmissionsSync(): boolean;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setMaximumPacketSize(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setMaximumPacketSizeSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getMaximumPacketSize(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getMaximumPacketSizeSync(): number;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getApplicationProtocols(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getApplicationProtocolsSync(): (string | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setApplicationProtocols(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setApplicationProtocolsSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setEndpointIdentificationAlgorithm(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setEndpointIdentificationAlgorithmSync(var0: string | null): void;
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
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'javax.net.ssl.SSLParameters'
     */
    static newInstanceAsync(var0: (string | null)[] | null): Promise<SSLParameters>;
    /**
     * @return original return type: 'javax.net.ssl.SSLParameters'
     */
    static newInstanceAsync(): Promise<SSLParameters>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @param var1 original type: 'java.lang.String[]'
     * @return original return type: 'javax.net.ssl.SSLParameters'
     */
    static newInstanceAsync(var0: (string | null)[] | null, var1: (string | null)[] | null): Promise<SSLParameters>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     */
    constructor(var0: (string | null)[] | null);
    constructor();
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @param var1 original type: 'java.lang.String[]'
     */
    constructor(var0: (string | null)[] | null, var1: (string | null)[] | null);
}
declare const SSLParameters_base: typeof SSLParametersClass;
/**
 * Class javax.net.ssl.SSLParameters.
 *
 * This actually imports the java class for further use.
 * The class {@link SSLParametersClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLParameters extends SSLParameters_base {
}
export default SSLParameters;
//# sourceMappingURL=SSLParameters.d.ts.map
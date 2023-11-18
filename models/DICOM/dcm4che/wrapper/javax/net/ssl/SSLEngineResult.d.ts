import { JavaClass, BasicOrJavaType } from "java-bridge";
import { SSLEngineResult$Status as javax_net_ssl_SSLEngineResult$Status } from "./SSLEngineResult$Status";
import { SSLEngineResult$HandshakeStatus as javax_net_ssl_SSLEngineResult$HandshakeStatus } from "./SSLEngineResult$HandshakeStatus";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link SSLEngineResult} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLEngineResultClass extends JavaClass {
    /**
     * @return original return type: 'javax.net.ssl.SSLEngineResult$Status'
     */
    getStatus(): Promise<javax_net_ssl_SSLEngineResult$Status | null>;
    /**
     * @return original return type: 'javax.net.ssl.SSLEngineResult$Status'
     */
    getStatusSync(): javax_net_ssl_SSLEngineResult$Status | null;
    /**
     * @return original return type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     */
    getHandshakeStatus(): Promise<javax_net_ssl_SSLEngineResult$HandshakeStatus | null>;
    /**
     * @return original return type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     */
    getHandshakeStatusSync(): javax_net_ssl_SSLEngineResult$HandshakeStatus | null;
    /**
     * @return original return type: 'int'
     */
    bytesConsumed(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    bytesConsumedSync(): number;
    /**
     * @return original return type: 'int'
     */
    bytesProduced(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    bytesProducedSync(): number;
    /**
     * @return original return type: 'long'
     */
    sequenceNumber(): Promise<number>;
    /**
     * @return original return type: 'long'
     */
    sequenceNumberSync(): number;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
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
     * @param var0 original type: 'javax.net.ssl.SSLEngineResult$Status'
     * @param var1 original type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    static newInstanceAsync(var0: javax_net_ssl_SSLEngineResult$Status | null, var1: javax_net_ssl_SSLEngineResult$HandshakeStatus | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<SSLEngineResult>;
    /**
     * @param var0 original type: 'javax.net.ssl.SSLEngineResult$Status'
     * @param var1 original type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'long'
     * @return original return type: 'javax.net.ssl.SSLEngineResult'
     */
    static newInstanceAsync(var0: javax_net_ssl_SSLEngineResult$Status | null, var1: javax_net_ssl_SSLEngineResult$HandshakeStatus | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Long | bigint | number): Promise<SSLEngineResult>;
    /**
     * @param var0 original type: 'javax.net.ssl.SSLEngineResult$Status'
     * @param var1 original type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     */
    constructor(var0: javax_net_ssl_SSLEngineResult$Status | null, var1: javax_net_ssl_SSLEngineResult$HandshakeStatus | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number);
    /**
     * @param var0 original type: 'javax.net.ssl.SSLEngineResult$Status'
     * @param var1 original type: 'javax.net.ssl.SSLEngineResult$HandshakeStatus'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'long'
     */
    constructor(var0: javax_net_ssl_SSLEngineResult$Status | null, var1: javax_net_ssl_SSLEngineResult$HandshakeStatus | null, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Long | bigint | number);
}
declare const SSLEngineResult_base: typeof SSLEngineResultClass;
/**
 * Class javax.net.ssl.SSLEngineResult.
 *
 * This actually imports the java class for further use.
 * The class {@link SSLEngineResultClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SSLEngineResult extends SSLEngineResult_base {
}
export default SSLEngineResult;
//# sourceMappingURL=SSLEngineResult.d.ts.map
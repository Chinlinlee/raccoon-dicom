/// <reference types="node" />
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { PublicKey as java_security_PublicKey, PublicKeyInterface as java_security_PublicKeyInterface } from "./../PublicKey";
import { Provider as java_security_Provider } from "./../Provider";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { Class as java_lang_Class } from "./../../lang/Class";
/**
 * This class just defines types, you should import {@link Certificate} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CertificateClass extends JavaClass {
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
     * @return original return type: 'java.lang.String'
     */
    getType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getTypeSync(): string | null;
    /**
     * @return original return type: 'byte[]'
     */
    getEncoded(): Promise<Buffer | null>;
    /**
     * @return original return type: 'byte[]'
     */
    getEncodedSync(): Buffer | null;
    /**
     * @param var0 original type: 'java.security.PublicKey'
     * @return original return type: 'void'
     */
    verify(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.PublicKey'
     * @return original return type: 'void'
     */
    verifySync(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null): void;
    /**
     * @param var0 original type: 'java.security.PublicKey'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    verify(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null, var1: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.PublicKey'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    verifySync(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null, var1: string | null): void;
    /**
     * @param var0 original type: 'java.security.PublicKey'
     * @param var1 original type: 'java.security.Provider'
     * @return original return type: 'void'
     */
    verify(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null, var1: java_security_Provider | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.PublicKey'
     * @param var1 original type: 'java.security.Provider'
     * @return original return type: 'void'
     */
    verifySync(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null, var1: java_security_Provider | null): void;
    /**
     * @return original return type: 'java.security.PublicKey'
     */
    getPublicKey(): Promise<java_security_PublicKey | null>;
    /**
     * @return original return type: 'java.security.PublicKey'
     */
    getPublicKeySync(): java_security_PublicKey | null;
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
}
declare const Certificate_base: typeof CertificateClass;
/**
 * Class java.security.cert.Certificate.
 *
 * This actually imports the java class for further use.
 * The class {@link CertificateClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Certificate extends Certificate_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default Certificate;
//# sourceMappingURL=Certificate.d.ts.map
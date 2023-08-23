/// <reference types="node" />
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { InputStream as java_io_InputStream } from "./../../../java/io/InputStream";
import { Date as java_util_Date } from "./../../../java/util/Date";
import { BigInteger as java_math_BigInteger } from "./../../../java/math/BigInteger";
import { Principal as java_security_Principal } from "./../../../java/security/Principal";
import { PublicKey as java_security_PublicKey, PublicKeyInterface as java_security_PublicKeyInterface } from "./../../../java/security/PublicKey";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link X509Certificate} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class X509CertificateClass extends JavaClass {
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'javax.security.cert.X509Certificate'
     */
    static getInstance(var0: Buffer | null): Promise<X509Certificate | null>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'javax.security.cert.X509Certificate'
     */
    static getInstanceSync(var0: Buffer | null): X509Certificate | null;
    /**
     * @param var0 original type: 'java.io.InputStream'
     * @return original return type: 'javax.security.cert.X509Certificate'
     */
    static getInstance(var0: java_io_InputStream | null): Promise<X509Certificate | null>;
    /**
     * @param var0 original type: 'java.io.InputStream'
     * @return original return type: 'javax.security.cert.X509Certificate'
     */
    static getInstanceSync(var0: java_io_InputStream | null): X509Certificate | null;
    /**
     * @return original return type: 'int'
     */
    getVersion(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getVersionSync(): number;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSigAlgName(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSigAlgNameSync(): string | null;
    /**
     * @return original return type: 'byte[]'
     */
    getSigAlgParams(): Promise<Buffer | null>;
    /**
     * @return original return type: 'byte[]'
     */
    getSigAlgParamsSync(): Buffer | null;
    /**
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'void'
     */
    checkValidity(var0: java_util_Date | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.Date'
     * @return original return type: 'void'
     */
    checkValiditySync(var0: java_util_Date | null): void;
    /**
     * @return original return type: 'void'
     */
    checkValidity(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    checkValiditySync(): void;
    /**
     * @return original return type: 'java.math.BigInteger'
     */
    getSerialNumber(): Promise<java_math_BigInteger | null>;
    /**
     * @return original return type: 'java.math.BigInteger'
     */
    getSerialNumberSync(): java_math_BigInteger | null;
    /**
     * @return original return type: 'java.security.Principal'
     */
    getIssuerDN(): Promise<java_security_Principal | null>;
    /**
     * @return original return type: 'java.security.Principal'
     */
    getIssuerDNSync(): java_security_Principal | null;
    /**
     * @return original return type: 'java.security.Principal'
     */
    getSubjectDN(): Promise<java_security_Principal | null>;
    /**
     * @return original return type: 'java.security.Principal'
     */
    getSubjectDNSync(): java_security_Principal | null;
    /**
     * @return original return type: 'java.util.Date'
     */
    getNotBefore(): Promise<java_util_Date | null>;
    /**
     * @return original return type: 'java.util.Date'
     */
    getNotBeforeSync(): java_util_Date | null;
    /**
     * @return original return type: 'java.util.Date'
     */
    getNotAfter(): Promise<java_util_Date | null>;
    /**
     * @return original return type: 'java.util.Date'
     */
    getNotAfterSync(): java_util_Date | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSigAlgOID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSigAlgOIDSync(): string | null;
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
     * @return original return type: 'byte[]'
     */
    getEncoded(): Promise<Buffer | null>;
    /**
     * @return original return type: 'byte[]'
     */
    getEncodedSync(): Buffer | null;
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
     * @return original return type: 'void'
     */
    verify(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.PublicKey'
     * @return original return type: 'void'
     */
    verifySync(var0: java_security_PublicKey | JavaInterfaceProxy<java_security_PublicKeyInterface> | null): void;
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
declare const X509Certificate_base: typeof X509CertificateClass;
/**
 * Class javax.security.cert.X509Certificate.
 *
 * This actually imports the java class for further use.
 * The class {@link X509CertificateClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class X509Certificate extends X509Certificate_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default X509Certificate;
//# sourceMappingURL=X509Certificate.d.ts.map
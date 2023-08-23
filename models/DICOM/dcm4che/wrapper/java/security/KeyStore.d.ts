/// <reference types="node" />
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { KeyStore$LoadStoreParameter as java_security_KeyStore$LoadStoreParameter, KeyStore$LoadStoreParameterInterface as java_security_KeyStore$LoadStoreParameterInterface } from "./KeyStore$LoadStoreParameter";
import { InputStream as java_io_InputStream } from "./../io/InputStream";
import { OutputStream as java_io_OutputStream } from "./../io/OutputStream";
import { Key as java_security_Key, KeyInterface as java_security_KeyInterface } from "./Key";
import { File as java_io_File } from "./../io/File";
import { Provider as java_security_Provider } from "./Provider";
import { Enumeration as java_util_Enumeration } from "./../util/Enumeration";
import { KeyStore$Entry as java_security_KeyStore$Entry, KeyStore$EntryInterface as java_security_KeyStore$EntryInterface } from "./KeyStore$Entry";
import { KeyStore$ProtectionParameter as java_security_KeyStore$ProtectionParameter, KeyStore$ProtectionParameterInterface as java_security_KeyStore$ProtectionParameterInterface } from "./KeyStore$ProtectionParameter";
import { Certificate as java_security_cert_Certificate } from "./cert/Certificate";
import { Date as java_util_Date } from "./../util/Date";
import { Class as java_lang_Class } from "./../lang/Class";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
/**
 * This class just defines types, you should import {@link KeyStore} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class KeyStoreClass extends JavaClass {
    /**
     * @param var0 original type: 'java.security.KeyStore$LoadStoreParameter'
     * @return original return type: 'void'
     */
    load(var0: java_security_KeyStore$LoadStoreParameter | JavaInterfaceProxy<java_security_KeyStore$LoadStoreParameterInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.KeyStore$LoadStoreParameter'
     * @return original return type: 'void'
     */
    loadSync(var0: java_security_KeyStore$LoadStoreParameter | JavaInterfaceProxy<java_security_KeyStore$LoadStoreParameterInterface> | null): void;
    /**
     * @param var0 original type: 'java.io.InputStream'
     * @param var1 original type: 'char[]'
     * @return original return type: 'void'
     */
    load(var0: java_io_InputStream | null, var1: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.InputStream'
     * @param var1 original type: 'char[]'
     * @return original return type: 'void'
     */
    loadSync(var0: java_io_InputStream | null, var1: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'char[]'
     * @return original return type: 'void'
     */
    store(var0: java_io_OutputStream | null, var1: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.OutputStream'
     * @param var1 original type: 'char[]'
     * @return original return type: 'void'
     */
    storeSync(var0: java_io_OutputStream | null, var1: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.security.KeyStore$LoadStoreParameter'
     * @return original return type: 'void'
     */
    store(var0: java_security_KeyStore$LoadStoreParameter | JavaInterfaceProxy<java_security_KeyStore$LoadStoreParameterInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.security.KeyStore$LoadStoreParameter'
     * @return original return type: 'void'
     */
    storeSync(var0: java_security_KeyStore$LoadStoreParameter | JavaInterfaceProxy<java_security_KeyStore$LoadStoreParameterInterface> | null): void;
    /**
     * @return original return type: 'int'
     */
    size(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    sizeSync(): number;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'char[]'
     * @return original return type: 'java.security.Key'
     */
    getKey(var0: string | null, var1: (string | null)[] | null): Promise<java_security_Key | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'char[]'
     * @return original return type: 'java.security.Key'
     */
    getKeySync(var0: string | null, var1: (string | null)[] | null): java_security_Key | null;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'char[]'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstance(var0: java_io_File | null, var1: (string | null)[] | null): Promise<KeyStore | null>;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'char[]'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstanceSync(var0: java_io_File | null, var1: (string | null)[] | null): KeyStore | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstance(var0: string | null, var1: string | null): Promise<KeyStore | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstanceSync(var0: string | null, var1: string | null): KeyStore | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstance(var0: string | null): Promise<KeyStore | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstanceSync(var0: string | null): KeyStore | null;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.security.KeyStore$LoadStoreParameter'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstance(var0: java_io_File | null, var1: java_security_KeyStore$LoadStoreParameter | JavaInterfaceProxy<java_security_KeyStore$LoadStoreParameterInterface> | null): Promise<KeyStore | null>;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.security.KeyStore$LoadStoreParameter'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstanceSync(var0: java_io_File | null, var1: java_security_KeyStore$LoadStoreParameter | JavaInterfaceProxy<java_security_KeyStore$LoadStoreParameterInterface> | null): KeyStore | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.Provider'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstance(var0: string | null, var1: java_security_Provider | null): Promise<KeyStore | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.Provider'
     * @return original return type: 'java.security.KeyStore'
     */
    static getInstanceSync(var0: string | null, var1: java_security_Provider | null): KeyStore | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getTypeSync(): string | null;
    /**
     * @return original return type: 'java.util.Enumeration'
     */
    aliases(): Promise<java_util_Enumeration | null>;
    /**
     * @return original return type: 'java.util.Enumeration'
     */
    aliasesSync(): java_util_Enumeration | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.KeyStore$ProtectionParameter'
     * @return original return type: 'java.security.KeyStore$Entry'
     */
    getEntry(var0: string | null, var1: java_security_KeyStore$ProtectionParameter | JavaInterfaceProxy<java_security_KeyStore$ProtectionParameterInterface> | null): Promise<java_security_KeyStore$Entry | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.KeyStore$ProtectionParameter'
     * @return original return type: 'java.security.KeyStore$Entry'
     */
    getEntrySync(var0: string | null, var1: java_security_KeyStore$ProtectionParameter | JavaInterfaceProxy<java_security_KeyStore$ProtectionParameterInterface> | null): java_security_KeyStore$Entry | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.KeyStore$Entry'
     * @param var2 original type: 'java.security.KeyStore$ProtectionParameter'
     * @return original return type: 'void'
     */
    setEntry(var0: string | null, var1: java_security_KeyStore$Entry | JavaInterfaceProxy<java_security_KeyStore$EntryInterface> | null, var2: java_security_KeyStore$ProtectionParameter | JavaInterfaceProxy<java_security_KeyStore$ProtectionParameterInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.KeyStore$Entry'
     * @param var2 original type: 'java.security.KeyStore$ProtectionParameter'
     * @return original return type: 'void'
     */
    setEntrySync(var0: string | null, var1: java_security_KeyStore$Entry | JavaInterfaceProxy<java_security_KeyStore$EntryInterface> | null, var2: java_security_KeyStore$ProtectionParameter | JavaInterfaceProxy<java_security_KeyStore$ProtectionParameterInterface> | null): void;
    /**
     * @return original return type: 'java.security.Provider'
     */
    getProvider(): Promise<java_security_Provider | null>;
    /**
     * @return original return type: 'java.security.Provider'
     */
    getProviderSync(): java_security_Provider | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    deleteEntry(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    deleteEntrySync(var0: string | null): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    static getDefaultType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    static getDefaultTypeSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.cert.Certificate[]'
     */
    getCertificateChain(var0: string | null): Promise<(java_security_cert_Certificate | null)[] | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.cert.Certificate[]'
     */
    getCertificateChainSync(var0: string | null): (java_security_cert_Certificate | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.cert.Certificate'
     */
    getCertificate(var0: string | null): Promise<java_security_cert_Certificate | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.security.cert.Certificate'
     */
    getCertificateSync(var0: string | null): java_security_cert_Certificate | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.util.Date'
     */
    getCreationDate(var0: string | null): Promise<java_util_Date | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.util.Date'
     */
    getCreationDateSync(var0: string | null): java_util_Date | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.Key'
     * @param var2 original type: 'char[]'
     * @param var3 original type: 'java.security.cert.Certificate[]'
     * @return original return type: 'void'
     */
    setKeyEntry(var0: string | null, var1: java_security_Key | JavaInterfaceProxy<java_security_KeyInterface> | null, var2: (string | null)[] | null, var3: (java_security_cert_Certificate | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.Key'
     * @param var2 original type: 'char[]'
     * @param var3 original type: 'java.security.cert.Certificate[]'
     * @return original return type: 'void'
     */
    setKeyEntrySync(var0: string | null, var1: java_security_Key | JavaInterfaceProxy<java_security_KeyInterface> | null, var2: (string | null)[] | null, var3: (java_security_cert_Certificate | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'byte[]'
     * @param var2 original type: 'java.security.cert.Certificate[]'
     * @return original return type: 'void'
     */
    setKeyEntry(var0: string | null, var1: Buffer | null, var2: (java_security_cert_Certificate | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'byte[]'
     * @param var2 original type: 'java.security.cert.Certificate[]'
     * @return original return type: 'void'
     */
    setKeyEntrySync(var0: string | null, var1: Buffer | null, var2: (java_security_cert_Certificate | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    containsAlias(var0: string | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    containsAliasSync(var0: string | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    isKeyEntry(var0: string | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    isKeyEntrySync(var0: string | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    isCertificateEntry(var0: string | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    isCertificateEntrySync(var0: string | null): boolean;
    /**
     * @param var0 original type: 'java.security.cert.Certificate'
     * @return original return type: 'java.lang.String'
     */
    getCertificateAlias(var0: java_security_cert_Certificate | null): Promise<string | null>;
    /**
     * @param var0 original type: 'java.security.cert.Certificate'
     * @return original return type: 'java.lang.String'
     */
    getCertificateAliasSync(var0: java_security_cert_Certificate | null): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.Class'
     * @return original return type: 'boolean'
     */
    entryInstanceOf(var0: string | null, var1: java_lang_Class | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.Class'
     * @return original return type: 'boolean'
     */
    entryInstanceOfSync(var0: string | null, var1: java_lang_Class | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.cert.Certificate'
     * @return original return type: 'void'
     */
    setCertificateEntry(var0: string | null, var1: java_security_cert_Certificate | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.security.cert.Certificate'
     * @return original return type: 'void'
     */
    setCertificateEntrySync(var0: string | null, var1: java_security_cert_Certificate | null): void;
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
declare const KeyStore_base: typeof KeyStoreClass;
/**
 * Class java.security.KeyStore.
 *
 * This actually imports the java class for further use.
 * The class {@link KeyStoreClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class KeyStore extends KeyStore_base {
}
export default KeyStore;
//# sourceMappingURL=KeyStore.d.ts.map
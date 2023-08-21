import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Device as org_dcm4che3_net_Device } from "./Device";
import { KeycloakClient$GrantType as org_dcm4che3_net_KeycloakClient$GrantType } from "./KeycloakClient$GrantType";
import { Boolean as java_lang_Boolean } from "./../../../java/lang/Boolean";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link KeycloakClient} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class KeycloakClientClass extends JavaClass {
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'org.dcm4che3.net.KeycloakClient'
     */
    clone(): Promise<KeycloakClient | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.KeycloakClient'
     */
    cloneSync(): KeycloakClient | null;
    /**
     * @return original return type: 'java.lang.Object'
     */
    clone(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    cloneSync(): BasicOrJavaType | null;
    /**
     * @return original return type: 'org.dcm4che3.net.Device'
     */
    getDevice(): Promise<org_dcm4che3_net_Device | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.Device'
     */
    getDeviceSync(): org_dcm4che3_net_Device | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakClientID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakClientIDSync(): string | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.KeycloakClient'
     * @return original return type: 'void'
     */
    reconfigure(var0: KeycloakClientClass | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.KeycloakClient'
     * @return original return type: 'void'
     */
    reconfigureSync(var0: KeycloakClientClass | null): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakRealm(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakRealmSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakRealm(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakRealmSync(var0: string | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setUserID(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setUserIDSync(var0: string | null): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    getPassword(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getPasswordSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getUserID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getUserIDSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setPassword(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setPasswordSync(var0: string | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakClientID(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakClientIDSync(var0: string | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.KeycloakClient$GrantType'
     * @return original return type: 'void'
     */
    setKeycloakGrantType(var0: org_dcm4che3_net_KeycloakClient$GrantType | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.KeycloakClient$GrantType'
     * @return original return type: 'void'
     */
    setKeycloakGrantTypeSync(var0: org_dcm4che3_net_KeycloakClient$GrantType | null): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setTLSDisableTrustManager(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setTLSDisableTrustManagerSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakClientSecret(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakClientSecretSync(var0: string | null): void;
    /**
     * @return original return type: 'boolean'
     */
    isTLSAllowAnyHostname(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isTLSAllowAnyHostnameSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setTLSAllowAnyHostname(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setTLSAllowAnyHostnameSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    isTLSDisableTrustManager(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isTLSDisableTrustManagerSync(): boolean;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakServerURL(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakServerURLSync(): string | null;
    /**
     * @return original return type: 'org.dcm4che3.net.KeycloakClient$GrantType'
     */
    getKeycloakGrantType(): Promise<org_dcm4che3_net_KeycloakClient$GrantType | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.KeycloakClient$GrantType'
     */
    getKeycloakGrantTypeSync(): org_dcm4che3_net_KeycloakClient$GrantType | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakClientSecret(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getKeycloakClientSecretSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakServerURL(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setKeycloakServerURLSync(var0: string | null): void;
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
     * @return original return type: 'org.dcm4che3.net.KeycloakClient'
     */
    static newInstanceAsync(): Promise<KeycloakClient>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.net.KeycloakClient'
     */
    static newInstanceAsync(var0: string | null): Promise<KeycloakClient>;
    constructor();
    /**
     * @param var0 original type: 'java.lang.String'
     */
    constructor(var0: string | null);
}
declare const KeycloakClient_base: typeof KeycloakClientClass;
/**
 * Class org.dcm4che3.net.KeycloakClient.
 *
 * This actually imports the java class for further use.
 * The class {@link KeycloakClientClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class KeycloakClient extends KeycloakClient_base {
}
export default KeycloakClient;
//# sourceMappingURL=KeycloakClient.d.ts.map
/// <reference types="node" />
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { ExtendedNegotiation as org_dcm4che3_net_pdu_ExtendedNegotiation } from "./pdu/ExtendedNegotiation";
import { StorageOptions$ElementCoercion as org_dcm4che3_net_StorageOptions$ElementCoercion } from "./StorageOptions$ElementCoercion";
import { StorageOptions$LevelOfSupport as org_dcm4che3_net_StorageOptions$LevelOfSupport } from "./StorageOptions$LevelOfSupport";
import { StorageOptions$DigitalSignatureSupport as org_dcm4che3_net_StorageOptions$DigitalSignatureSupport } from "./StorageOptions$DigitalSignatureSupport";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link StorageOptions} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class StorageOptionsClass extends JavaClass {
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
     * @param var0 original type: 'org.dcm4che3.net.pdu.ExtendedNegotiation'
     * @return original return type: 'org.dcm4che3.net.StorageOptions'
     */
    static valueOf(var0: org_dcm4che3_net_pdu_ExtendedNegotiation | null): Promise<StorageOptions | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.pdu.ExtendedNegotiation'
     * @return original return type: 'org.dcm4che3.net.StorageOptions'
     */
    static valueOfSync(var0: org_dcm4che3_net_pdu_ExtendedNegotiation | null): StorageOptions | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     * @return original return type: 'void'
     */
    setElementCoercion(var0: org_dcm4che3_net_StorageOptions$ElementCoercion | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     * @return original return type: 'void'
     */
    setElementCoercionSync(var0: org_dcm4che3_net_StorageOptions$ElementCoercion | null): void;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     */
    getElementCoercion(): Promise<org_dcm4che3_net_StorageOptions$ElementCoercion | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     */
    getElementCoercionSync(): org_dcm4che3_net_StorageOptions$ElementCoercion | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     * @return original return type: 'void'
     */
    setLevelOfSupport(var0: org_dcm4che3_net_StorageOptions$LevelOfSupport | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     * @return original return type: 'void'
     */
    setLevelOfSupportSync(var0: org_dcm4che3_net_StorageOptions$LevelOfSupport | null): void;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     */
    getLevelOfSupport(): Promise<org_dcm4che3_net_StorageOptions$LevelOfSupport | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     */
    getLevelOfSupportSync(): org_dcm4che3_net_StorageOptions$LevelOfSupport | null;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$DigitalSignatureSupport'
     */
    getDigitalSignatureSupport(): Promise<org_dcm4che3_net_StorageOptions$DigitalSignatureSupport | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$DigitalSignatureSupport'
     */
    getDigitalSignatureSupportSync(): org_dcm4che3_net_StorageOptions$DigitalSignatureSupport | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$DigitalSignatureSupport'
     * @return original return type: 'void'
     */
    setDigitalSignatureSupport(var0: org_dcm4che3_net_StorageOptions$DigitalSignatureSupport | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$DigitalSignatureSupport'
     * @return original return type: 'void'
     */
    setDigitalSignatureSupportSync(var0: org_dcm4che3_net_StorageOptions$DigitalSignatureSupport | null): void;
    /**
     * @return original return type: 'byte[]'
     */
    toExtendedNegotiationInformation(): Promise<Buffer | null>;
    /**
     * @return original return type: 'byte[]'
     */
    toExtendedNegotiationInformationSync(): Buffer | null;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     */
    getElementCoercion(): Promise<org_dcm4che3_net_StorageOptions$ElementCoercion | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     */
    getElementCoercionSync(): org_dcm4che3_net_StorageOptions$ElementCoercion | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     * @return original return type: 'void'
     */
    setElementCoercion(var0: org_dcm4che3_net_StorageOptions$ElementCoercion | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     * @return original return type: 'void'
     */
    setElementCoercionSync(var0: org_dcm4che3_net_StorageOptions$ElementCoercion | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     * @return original return type: 'void'
     */
    setLevelOfSupport(var0: org_dcm4che3_net_StorageOptions$LevelOfSupport | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     * @return original return type: 'void'
     */
    setLevelOfSupportSync(var0: org_dcm4che3_net_StorageOptions$LevelOfSupport | null): void;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     */
    getLevelOfSupport(): Promise<org_dcm4che3_net_StorageOptions$LevelOfSupport | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     */
    getLevelOfSupportSync(): org_dcm4che3_net_StorageOptions$LevelOfSupport | null;
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
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions'
     */
    static newInstanceAsync(): Promise<StorageOptions>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     * @param var1 original type: 'org.dcm4che3.net.StorageOptions$DigitalSignatureSupport'
     * @param var2 original type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     * @return original return type: 'org.dcm4che3.net.StorageOptions'
     */
    static newInstanceAsync(var0: org_dcm4che3_net_StorageOptions$LevelOfSupport | null, var1: org_dcm4che3_net_StorageOptions$DigitalSignatureSupport | null, var2: org_dcm4che3_net_StorageOptions$ElementCoercion | null): Promise<StorageOptions>;
    constructor();
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions$LevelOfSupport'
     * @param var1 original type: 'org.dcm4che3.net.StorageOptions$DigitalSignatureSupport'
     * @param var2 original type: 'org.dcm4che3.net.StorageOptions$ElementCoercion'
     */
    constructor(var0: org_dcm4che3_net_StorageOptions$LevelOfSupport | null, var1: org_dcm4che3_net_StorageOptions$DigitalSignatureSupport | null, var2: org_dcm4che3_net_StorageOptions$ElementCoercion | null);
}
declare const StorageOptions_base: typeof StorageOptionsClass;
/**
 * Class org.dcm4che3.net.StorageOptions.
 *
 * This actually imports the java class for further use.
 * The class {@link StorageOptionsClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class StorageOptions extends StorageOptions_base {
}
export default StorageOptions;
//# sourceMappingURL=StorageOptions.d.ts.map
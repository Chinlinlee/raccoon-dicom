import { JavaClass, BasicOrJavaType } from "java-bridge";
import { StringBuilder as java_lang_StringBuilder } from "./../../../java/lang/StringBuilder";
import { StorageOptions as org_dcm4che3_net_StorageOptions } from "./StorageOptions";
import { EnumSet as java_util_EnumSet } from "./../../../java/util/EnumSet";
import { TransferCapability$Role as org_dcm4che3_net_TransferCapability$Role } from "./TransferCapability$Role";
import { ApplicationEntity as org_dcm4che3_net_ApplicationEntity } from "./ApplicationEntity";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link TransferCapability} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TransferCapabilityClass extends JavaClass {
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    containsTransferSyntax(var0: string | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    containsTransferSyntaxSync(var0: string | null): boolean;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getTransferSyntaxes(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getTransferSyntaxesSync(): (string | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.StringBuilder'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.StringBuilder'
     */
    promptTo(var0: java_lang_StringBuilder | null, var1: string | null): Promise<java_lang_StringBuilder | null>;
    /**
     * @param var0 original type: 'java.lang.StringBuilder'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.StringBuilder'
     */
    promptToSync(var0: java_lang_StringBuilder | null, var1: string | null): java_lang_StringBuilder | null;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions'
     */
    getStorageOptions(): Promise<org_dcm4che3_net_StorageOptions | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.StorageOptions'
     */
    getStorageOptionsSync(): org_dcm4che3_net_StorageOptions | null;
    /**
     * @return original return type: 'java.util.EnumSet'
     */
    getQueryOptions(): Promise<java_util_EnumSet | null>;
    /**
     * @return original return type: 'java.util.EnumSet'
     */
    getQueryOptionsSync(): java_util_EnumSet | null;
    /**
     * @return original return type: 'org.dcm4che3.net.TransferCapability$Role'
     */
    getRole(): Promise<org_dcm4che3_net_TransferCapability$Role | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.TransferCapability$Role'
     */
    getRoleSync(): org_dcm4che3_net_TransferCapability$Role | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSopClass(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSopClassSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getCommonName(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getCommonNameSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setCommonName(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setCommonNameSync(var0: string | null): void;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getPreferredTransferSyntaxes(): Promise<(string | null)[] | null>;
    /**
     * @return original return type: 'java.lang.String[]'
     */
    getPreferredTransferSyntaxesSync(): (string | null)[] | null;
    /**
     * @param var0 original type: 'org.dcm4che3.net.ApplicationEntity'
     * @return original return type: 'void'
     */
    setApplicationEntity(var0: org_dcm4che3_net_ApplicationEntity | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.ApplicationEntity'
     * @return original return type: 'void'
     */
    setApplicationEntitySync(var0: org_dcm4che3_net_ApplicationEntity | null): void;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'java.lang.String'
     */
    selectTransferSyntax(var0: (string | null)[] | null): Promise<string | null>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'java.lang.String'
     */
    selectTransferSyntaxSync(var0: (string | null)[] | null): string | null;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setPreferredTransferSyntaxes(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setPreferredTransferSyntaxesSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setTransferSyntaxes(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    setTransferSyntaxesSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.util.EnumSet'
     * @return original return type: 'void'
     */
    setQueryOptions(var0: java_util_EnumSet | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.EnumSet'
     * @return original return type: 'void'
     */
    setQueryOptionsSync(var0: java_util_EnumSet | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setSopClass(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setSopClassSync(var0: string | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions'
     * @return original return type: 'void'
     */
    setStorageOptions(var0: org_dcm4che3_net_StorageOptions | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.StorageOptions'
     * @return original return type: 'void'
     */
    setStorageOptionsSync(var0: org_dcm4che3_net_StorageOptions | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.TransferCapability$Role'
     * @return original return type: 'void'
     */
    setRole(var0: org_dcm4che3_net_TransferCapability$Role | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.TransferCapability$Role'
     * @return original return type: 'void'
     */
    setRoleSync(var0: org_dcm4che3_net_TransferCapability$Role | null): void;
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
     * @return original return type: 'org.dcm4che3.net.TransferCapability'
     */
    static newInstanceAsync(): Promise<TransferCapability>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'org.dcm4che3.net.TransferCapability$Role'
     * @param var3 original type: 'java.lang.String[]'
     * @return original return type: 'org.dcm4che3.net.TransferCapability'
     */
    static newInstanceAsync(var0: string | null, var1: string | null, var2: org_dcm4che3_net_TransferCapability$Role | null, var3: (string | null)[] | null): Promise<TransferCapability>;
    constructor();
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'org.dcm4che3.net.TransferCapability$Role'
     * @param var3 original type: 'java.lang.String[]'
     */
    constructor(var0: string | null, var1: string | null, var2: org_dcm4che3_net_TransferCapability$Role | null, var3: (string | null)[] | null);
}
declare const TransferCapability_base: typeof TransferCapabilityClass;
/**
 * Class org.dcm4che3.net.TransferCapability.
 *
 * This actually imports the java class for further use.
 * The class {@link TransferCapabilityClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TransferCapability extends TransferCapability_base {
}
export default TransferCapability;
//# sourceMappingURL=TransferCapability.d.ts.map
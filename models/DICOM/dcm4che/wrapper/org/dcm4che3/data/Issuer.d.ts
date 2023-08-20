import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Attributes as org_dcm4che3_data_Attributes } from "./Attributes";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link Issuer} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class IssuerClass extends JavaClass {
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
     * @param var0 original type: 'char'
     * @return original return type: 'java.lang.String'
     */
    toString(var0: string | null): Promise<string>;
    /**
     * @param var0 original type: 'char'
     * @return original return type: 'java.lang.String'
     */
    toStringSync(var0: string | null): string;
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
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static valueOf(var0: org_dcm4che3_data_Attributes | null): Promise<Issuer | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static valueOfSync(var0: org_dcm4che3_data_Attributes | null): Issuer | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     * @return original return type: 'boolean'
     */
    matches(var0: IssuerClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     * @return original return type: 'boolean'
     */
    matchesSync(var0: IssuerClass | null): boolean;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     * @return original return type: 'boolean'
     */
    merge(var0: IssuerClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     * @return original return type: 'boolean'
     */
    mergeSync(var0: IssuerClass | null): boolean;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    toItem(): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    toItemSync(): org_dcm4che3_data_Attributes | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static fromIssuerOfPatientID(var0: org_dcm4che3_data_Attributes | null): Promise<Issuer | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static fromIssuerOfPatientIDSync(var0: org_dcm4che3_data_Attributes | null): Issuer | null;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     * @return original return type: 'boolean'
     */
    isLesserQualifiedThan(var0: IssuerClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     * @return original return type: 'boolean'
     */
    isLesserQualifiedThanSync(var0: IssuerClass | null): boolean;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    toIssuerOfPatientID(var0: org_dcm4che3_data_Attributes | null): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    toIssuerOfPatientIDSync(var0: org_dcm4che3_data_Attributes | null): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getLocalNamespaceEntityID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getLocalNamespaceEntityIDSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getUniversalEntityIDType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getUniversalEntityIDTypeSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getUniversalEntityID(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getUniversalEntityIDSync(): string | null;
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
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static newInstanceAsync(var0: string | null, var1: org_dcm4che3_data_Attributes | null): Promise<Issuer>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static newInstanceAsync(var0: org_dcm4che3_data_Attributes | null): Promise<Issuer>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static newInstanceAsync(var0: IssuerClass | null): Promise<Issuer>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static newInstanceAsync(var0: string | null, var1: string | null, var2: string | null): Promise<Issuer>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static newInstanceAsync(var0: string | null): Promise<Issuer>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'char'
     * @return original return type: 'org.dcm4che3.data.Issuer'
     */
    static newInstanceAsync(var0: string | null, var1: string | null): Promise<Issuer>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     */
    constructor(var0: string | null, var1: org_dcm4che3_data_Attributes | null);
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     */
    constructor(var0: org_dcm4che3_data_Attributes | null);
    /**
     * @param var0 original type: 'org.dcm4che3.data.Issuer'
     */
    constructor(var0: IssuerClass | null);
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.String'
     */
    constructor(var0: string | null, var1: string | null, var2: string | null);
    /**
     * @param var0 original type: 'java.lang.String'
     */
    constructor(var0: string | null);
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'char'
     */
    constructor(var0: string | null, var1: string | null);
}
declare const Issuer_base: typeof IssuerClass;
/**
 * Class org.dcm4che3.data.Issuer.
 *
 * This actually imports the java class for further use.
 * The class {@link IssuerClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Issuer extends Issuer_base {
}
export default Issuer;
//# sourceMappingURL=Issuer.d.ts.map
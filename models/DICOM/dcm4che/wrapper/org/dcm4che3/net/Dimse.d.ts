import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Logger as org_slf4j_Logger, LoggerInterface as org_slf4j_LoggerInterface } from "./../../slf4j/Logger";
import { Attributes as org_dcm4che3_data_Attributes } from "./../data/Attributes";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Enum as java_lang_Enum } from "./../../../java/lang/Enum";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
import { Optional as java_util_Optional } from "./../../../java/util/Optional";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
/**
 * This class just defines types, you should import {@link Dimse} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DimseClass extends JavaClass {
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_STORE_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_STORE_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_GET_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_GET_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_FIND_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_FIND_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_MOVE_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_MOVE_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_ECHO_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_ECHO_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_EVENT_REPORT_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_EVENT_REPORT_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_GET_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_GET_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_SET_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_SET_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_ACTION_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_ACTION_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_CREATE_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_CREATE_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_DELETE_RQ: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly N_DELETE_RSP: DimseClass | null;
    /**
     * Original type: 'org.dcm4che3.net.Dimse'
     */
    static readonly C_CANCEL_RQ: DimseClass | null;
    /**
     * Original type: 'org.slf4j.Logger'
     */
    static readonly LOG: org_slf4j_Logger | JavaInterfaceProxy<org_slf4j_LoggerInterface> | null;
    /**
     * @return original return type: 'boolean'
     */
    isRSP(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRSPSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isRetrieveRQ(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRetrieveRQSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isCService(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isCServiceSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    commandFieldOfRSP(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    commandFieldOfRSPSync(): number;
    /**
     * @return original return type: 'int'
     */
    commandField(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    commandFieldSync(): number;
    /**
     * @return original return type: 'int'
     */
    tagOfSOPClassUID(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    tagOfSOPClassUIDSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isRetrieveRSP(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRetrieveRSPSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    tagOfSOPInstanceUID(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    tagOfSOPInstanceUIDSync(): number;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    toString(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Integer | number, var2: string | null): Promise<string>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    toStringSync(var0: org_dcm4che3_data_Attributes | null, var1: java_lang_Integer | number, var2: string | null): string;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'java.lang.String'
     */
    toString(var0: org_dcm4che3_data_Attributes | null): Promise<string>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'java.lang.String'
     */
    toStringSync(var0: org_dcm4che3_data_Attributes | null): string;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'org.dcm4che3.net.Dimse[]'
     */
    static values(): Promise<(Dimse | null)[] | null>;
    /**
     * @return original return type: 'org.dcm4che3.net.Dimse[]'
     */
    static valuesSync(): (Dimse | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.net.Dimse'
     */
    static valueOf(var0: string | null): Promise<Dimse | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'org.dcm4che3.net.Dimse'
     */
    static valueOfSync(var0: string | null): Dimse | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'org.dcm4che3.net.Dimse'
     */
    static valueOf(var0: java_lang_Integer | number): Promise<Dimse | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'org.dcm4che3.net.Dimse'
     */
    static valueOfSync(var0: java_lang_Integer | number): Dimse | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Enum'
     */
    static valueOf(var0: java_lang_Class | null, var1: string | null): Promise<java_lang_Enum | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.lang.Enum'
     */
    static valueOfSync(var0: java_lang_Class | null, var1: string | null): java_lang_Enum | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    name(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    nameSync(): string | null;
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
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    compareTo(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    compareToSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @return original return type: 'int'
     */
    compareTo(var0: java_lang_Enum | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Enum'
     * @return original return type: 'int'
     */
    compareToSync(var0: java_lang_Enum | null): number;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstable(): Promise<java_util_Optional | null>;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstableSync(): java_util_Optional | null;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getDeclaringClass(): Promise<java_lang_Class | null>;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getDeclaringClassSync(): java_lang_Class | null;
    /**
     * @return original return type: 'int'
     */
    ordinal(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    ordinalSync(): number;
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
declare const Dimse_base: typeof DimseClass;
/**
 * Class org.dcm4che3.net.Dimse.
 *
 * This actually imports the java class for further use.
 * The class {@link DimseClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Dimse extends Dimse_base {
}
export default Dimse;
//# sourceMappingURL=Dimse.d.ts.map
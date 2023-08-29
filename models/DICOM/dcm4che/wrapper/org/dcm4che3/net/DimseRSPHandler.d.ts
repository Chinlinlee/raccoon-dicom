import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Association as org_dcm4che3_net_Association } from "./Association";
import { Attributes as org_dcm4che3_data_Attributes } from "./../data/Attributes";
import { Long as java_lang_Long } from "./../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link DimseRSPHandler} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DimseRSPHandlerClass extends JavaClass {
    /**
     * @return original return type: 'boolean'
     */
    isCanceled(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isCanceledSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    getMessageID(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getMessageIDSync(): number;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    onDimseRSP(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_data_Attributes | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.data.Attributes'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    onDimseRSPSync(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_data_Attributes | null, var2: org_dcm4che3_data_Attributes | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onClose(var0: org_dcm4che3_net_Association | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onCloseSync(var0: org_dcm4che3_net_Association | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    cancel(var0: org_dcm4che3_net_Association | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    cancelSync(var0: org_dcm4che3_net_Association | null): void;
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
     * @param var0 original type: 'int'
     * @return original return type: 'org.dcm4che3.net.DimseRSPHandler'
     */
    static newInstanceAsync(var0: java_lang_Integer | number): Promise<DimseRSPHandler>;
    /**
     * @param var0 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number);
}
declare const DimseRSPHandler_base: typeof DimseRSPHandlerClass;
/**
 * Class org.dcm4che3.net.DimseRSPHandler.
 *
 * This actually imports the java class for further use.
 * The class {@link DimseRSPHandlerClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DimseRSPHandler extends DimseRSPHandler_base {
}
export default DimseRSPHandler;
//# sourceMappingURL=DimseRSPHandler.d.ts.map
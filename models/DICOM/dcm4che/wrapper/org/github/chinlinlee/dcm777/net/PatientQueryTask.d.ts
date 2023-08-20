import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Attributes as org_dcm4che3_data_Attributes } from "./../../../../dcm4che3/data/Attributes";
import { Boolean as java_lang_Boolean } from "./../../../../../java/lang/Boolean";
import { Association as org_dcm4che3_net_Association } from "./../../../../dcm4che3/net/Association";
import { Long as java_lang_Long } from "./../../../../../java/lang/Long";
import { Integer as java_lang_Integer } from "./../../../../../java/lang/Integer";
import { Class as java_lang_Class } from "./../../../../../java/lang/Class";
import { PresentationContext as org_dcm4che3_net_pdu_PresentationContext } from "./../../../../dcm4che3/net/pdu/PresentationContext";
import { QueryTaskInject as org_github_chinlinlee_dcm777_net_QueryTaskInject, QueryTaskInjectInterface as org_github_chinlinlee_dcm777_net_QueryTaskInjectInterface } from "./QueryTaskInject";
import { PatientQueryTaskInject as org_github_chinlinlee_dcm777_net_PatientQueryTaskInject, PatientQueryTaskInjectInterface as org_github_chinlinlee_dcm777_net_PatientQueryTaskInjectInterface } from "./PatientQueryTaskInject";
/**
 * This class just defines types, you should import {@link PatientQueryTask} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class PatientQueryTaskClass extends JavaClass {
    /**
     * @return original return type: 'boolean'
     */
    hasMoreMatches(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    hasMoreMatchesSync(): boolean;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    nextMatch(): Promise<org_dcm4che3_data_Attributes | null>;
    /**
     * @return original return type: 'org.dcm4che3.data.Attributes'
     */
    nextMatchSync(): org_dcm4che3_data_Attributes | null;
    /**
     * @return original return type: 'void'
     */
    run(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    runSync(): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setOptionalKeysNotSupported(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setOptionalKeysNotSupportedSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    isOptionalKeysNotSupported(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isOptionalKeysNotSupportedSync(): boolean;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onCancelRQ(var0: org_dcm4che3_net_Association | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onCancelRQSync(var0: org_dcm4che3_net_Association | null): void;
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
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.PresentationContext'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @param var3 original type: 'org.dcm4che3.data.Attributes'
     * @param var4 original type: 'org.github.chinlinlee.dcm777.net.QueryTaskInject'
     * @param var5 original type: 'org.github.chinlinlee.dcm777.net.PatientQueryTaskInject'
     * @return original return type: 'org.github.chinlinlee.dcm777.net.PatientQueryTask'
     */
    static newInstanceAsync(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_PresentationContext | null, var2: org_dcm4che3_data_Attributes | null, var3: org_dcm4che3_data_Attributes | null, var4: org_github_chinlinlee_dcm777_net_QueryTaskInject | JavaInterfaceProxy<org_github_chinlinlee_dcm777_net_QueryTaskInjectInterface> | null, var5: org_github_chinlinlee_dcm777_net_PatientQueryTaskInject | JavaInterfaceProxy<org_github_chinlinlee_dcm777_net_PatientQueryTaskInjectInterface> | null): Promise<PatientQueryTask>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.PresentationContext'
     * @param var2 original type: 'org.dcm4che3.data.Attributes'
     * @param var3 original type: 'org.dcm4che3.data.Attributes'
     * @param var4 original type: 'org.github.chinlinlee.dcm777.net.QueryTaskInject'
     * @param var5 original type: 'org.github.chinlinlee.dcm777.net.PatientQueryTaskInject'
     */
    constructor(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_PresentationContext | null, var2: org_dcm4che3_data_Attributes | null, var3: org_dcm4che3_data_Attributes | null, var4: org_github_chinlinlee_dcm777_net_QueryTaskInject | JavaInterfaceProxy<org_github_chinlinlee_dcm777_net_QueryTaskInjectInterface> | null, var5: org_github_chinlinlee_dcm777_net_PatientQueryTaskInject | JavaInterfaceProxy<org_github_chinlinlee_dcm777_net_PatientQueryTaskInjectInterface> | null);
}
declare const PatientQueryTask_base: typeof PatientQueryTaskClass;
/**
 * Class org.github.chinlinlee.dcm777.net.PatientQueryTask.
 *
 * This actually imports the java class for further use.
 * The class {@link PatientQueryTaskClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class PatientQueryTask extends PatientQueryTask_base {
}
export default PatientQueryTask;
//# sourceMappingURL=PatientQueryTask.d.ts.map
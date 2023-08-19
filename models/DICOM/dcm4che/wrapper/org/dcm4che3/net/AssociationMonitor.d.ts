import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Association as org_dcm4che3_net_Association } from "./Association";
import { Throwable as java_lang_Throwable } from "./../../../java/lang/Throwable";
import { AAssociateRJ as org_dcm4che3_net_pdu_AAssociateRJ } from "./pdu/AAssociateRJ";
/**
 * This class just defines types, you should import {@link AssociationMonitor} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AssociationMonitorClass extends JavaClass {
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'java.lang.Throwable'
     * @return original return type: 'void'
     */
    onAssociationFailed(var0: org_dcm4che3_net_Association | null, var1: java_lang_Throwable | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'java.lang.Throwable'
     * @return original return type: 'void'
     */
    onAssociationFailedSync(var0: org_dcm4che3_net_Association | null, var1: java_lang_Throwable | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onAssociationEstablished(var0: org_dcm4che3_net_Association | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onAssociationEstablishedSync(var0: org_dcm4che3_net_Association | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.AAssociateRJ'
     * @return original return type: 'void'
     */
    onAssociationRejected(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_AAssociateRJ | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.AAssociateRJ'
     * @return original return type: 'void'
     */
    onAssociationRejectedSync(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_AAssociateRJ | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onAssociationAccepted(var0: org_dcm4che3_net_Association | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onAssociationAcceptedSync(var0: org_dcm4che3_net_Association | null): void;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createAssociationMonitorProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface AssociationMonitorInterface {
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'java.lang.Throwable'
     * @return original return type: 'void'
     */
    onAssociationFailed(var0: org_dcm4che3_net_Association | null, var1: java_lang_Throwable | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onAssociationEstablished(var0: org_dcm4che3_net_Association | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.AAssociateRJ'
     * @return original return type: 'void'
     */
    onAssociationRejected(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_AAssociateRJ | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @return original return type: 'void'
     */
    onAssociationAccepted(var0: org_dcm4che3_net_Association | null): void;
}
/**
 * Create a proxy for the {@link AssociationMonitor} interface.
 * All required methods in {@link AssociationMonitorInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createAssociationMonitorProxy(methods: AssociationMonitorInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<AssociationMonitorInterface>;
declare const AssociationMonitor_base: typeof AssociationMonitorClass;
/**
 * Class org.dcm4che3.net.AssociationMonitor.
 *
 * This actually imports the java class for further use.
 * The class {@link AssociationMonitorClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AssociationMonitor extends AssociationMonitor_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default AssociationMonitor;
//# sourceMappingURL=AssociationMonitor.d.ts.map
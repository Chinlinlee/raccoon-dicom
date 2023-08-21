import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { UserIdentityAC as org_dcm4che3_net_pdu_UserIdentityAC } from "./pdu/UserIdentityAC";
import { Association as org_dcm4che3_net_Association } from "./Association";
import { UserIdentityRQ as org_dcm4che3_net_pdu_UserIdentityRQ } from "./pdu/UserIdentityRQ";
/**
 * This class just defines types, you should import {@link UserIdentityNegotiator} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class UserIdentityNegotiatorClass extends JavaClass {
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.UserIdentityRQ'
     * @return original return type: 'org.dcm4che3.net.pdu.UserIdentityAC'
     */
    negotiate(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_UserIdentityRQ | null): Promise<org_dcm4che3_net_pdu_UserIdentityAC | null>;
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.UserIdentityRQ'
     * @return original return type: 'org.dcm4che3.net.pdu.UserIdentityAC'
     */
    negotiateSync(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_UserIdentityRQ | null): org_dcm4che3_net_pdu_UserIdentityAC | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createUserIdentityNegotiatorProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface UserIdentityNegotiatorInterface {
    /**
     * @param var0 original type: 'org.dcm4che3.net.Association'
     * @param var1 original type: 'org.dcm4che3.net.pdu.UserIdentityRQ'
     * @return original return type: 'org.dcm4che3.net.pdu.UserIdentityAC'
     */
    negotiate?(var0: org_dcm4che3_net_Association | null, var1: org_dcm4che3_net_pdu_UserIdentityRQ | null): org_dcm4che3_net_pdu_UserIdentityAC | null;
}
/**
 * Create a proxy for the {@link UserIdentityNegotiator} interface.
 * All required methods in {@link UserIdentityNegotiatorInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createUserIdentityNegotiatorProxy(methods: UserIdentityNegotiatorInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<UserIdentityNegotiatorInterface>;
declare const UserIdentityNegotiator_base: typeof UserIdentityNegotiatorClass;
/**
 * Class org.dcm4che3.net.UserIdentityNegotiator.
 *
 * This actually imports the java class for further use.
 * The class {@link UserIdentityNegotiatorClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class UserIdentityNegotiator extends UserIdentityNegotiator_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default UserIdentityNegotiator;
//# sourceMappingURL=UserIdentityNegotiator.d.ts.map
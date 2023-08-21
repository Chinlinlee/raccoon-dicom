import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
/**
 * This class just defines types, you should import {@link KeyManager} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class KeyManagerClass extends JavaClass {
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createKeyManagerProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface KeyManagerInterface {
}
/**
 * Create a proxy for the {@link KeyManager} interface.
 * All required methods in {@link KeyManagerInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createKeyManagerProxy(methods: KeyManagerInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<KeyManagerInterface>;
declare const KeyManager_base: typeof KeyManagerClass;
/**
 * Class javax.net.ssl.KeyManager.
 *
 * This actually imports the java class for further use.
 * The class {@link KeyManagerClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class KeyManager extends KeyManager_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default KeyManager;
//# sourceMappingURL=KeyManager.d.ts.map
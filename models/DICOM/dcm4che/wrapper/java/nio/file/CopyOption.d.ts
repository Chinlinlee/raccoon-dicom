import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
/**
 * This class just defines types, you should import {@link CopyOption} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CopyOptionClass extends JavaClass {
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createCopyOptionProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface CopyOptionInterface {
}
/**
 * Create a proxy for the {@link CopyOption} interface.
 * All required methods in {@link CopyOptionInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createCopyOptionProxy(methods: CopyOptionInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<CopyOptionInterface>;
declare const CopyOption_base: typeof CopyOptionClass;
/**
 * Class java.nio.file.CopyOption.
 *
 * This actually imports the java class for further use.
 * The class {@link CopyOptionClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class CopyOption extends CopyOption_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default CopyOption;
//# sourceMappingURL=CopyOption.d.ts.map
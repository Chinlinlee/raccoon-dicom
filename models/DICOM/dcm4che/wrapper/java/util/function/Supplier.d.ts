import { JavaClass, BasicOrJavaType, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
/**
 * This class just defines types, you should import {@link Supplier} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SupplierClass extends JavaClass {
    /**
     * @return original return type: 'java.lang.Object'
     */
    get(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    getSync(): BasicOrJavaType | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createSupplierProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface SupplierInterface {
    /**
     * @return original return type: 'java.lang.Object'
     */
    get(): BasicOrJavaType | null;
}
/**
 * Create a proxy for the {@link Supplier} interface.
 * All required methods in {@link SupplierInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createSupplierProxy(methods: SupplierInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<SupplierInterface>;
declare const Supplier_base: typeof SupplierClass;
/**
 * Class java.util.function.Supplier.
 *
 * This actually imports the java class for further use.
 * The class {@link SupplierClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Supplier extends Supplier_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default Supplier;
//# sourceMappingURL=Supplier.d.ts.map
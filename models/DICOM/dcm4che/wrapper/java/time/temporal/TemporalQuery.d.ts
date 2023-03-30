import { JavaClass, BasicOrJavaType, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { TemporalAccessor as java_time_temporal_TemporalAccessor, TemporalAccessorInterface as java_time_temporal_TemporalAccessorInterface } from "./TemporalAccessor";
/**
 * This class just defines types, you should import {@link TemporalQuery} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TemporalQueryClass extends JavaClass {
    /**
     * @param var0 original type: 'java.time.temporal.TemporalAccessor'
     * @return original return type: 'java.lang.Object'
     */
    queryFrom(var0: java_time_temporal_TemporalAccessor | JavaInterfaceProxy<java_time_temporal_TemporalAccessorInterface> | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.time.temporal.TemporalAccessor'
     * @return original return type: 'java.lang.Object'
     */
    queryFromSync(var0: java_time_temporal_TemporalAccessor | JavaInterfaceProxy<java_time_temporal_TemporalAccessorInterface> | null): BasicOrJavaType | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createTemporalQueryProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface TemporalQueryInterface {
    /**
     * @param var0 original type: 'java.time.temporal.TemporalAccessor'
     * @return original return type: 'java.lang.Object'
     */
    queryFrom(var0: java_time_temporal_TemporalAccessor | JavaInterfaceProxy<java_time_temporal_TemporalAccessorInterface> | null): BasicOrJavaType | null;
}
/**
 * Create a proxy for the {@link TemporalQuery} interface.
 * All required methods in {@link TemporalQueryInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createTemporalQueryProxy(methods: TemporalQueryInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<TemporalQueryInterface>;
declare const TemporalQuery_base: typeof TemporalQueryClass;
/**
 * Class java.time.temporal.TemporalQuery.
 *
 * This actually imports the java class for further use.
 * The class {@link TemporalQueryClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TemporalQuery extends TemporalQuery_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default TemporalQuery;
//# sourceMappingURL=TemporalQuery.d.ts.map
import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Temporal as java_time_temporal_Temporal, TemporalInterface as java_time_temporal_TemporalInterface } from "./Temporal";
/**
 * This class just defines types, you should import {@link TemporalAdjuster} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TemporalAdjusterClass extends JavaClass {
    /**
     * @param var0 original type: 'java.time.temporal.Temporal'
     * @return original return type: 'java.time.temporal.Temporal'
     */
    adjustInto(var0: java_time_temporal_Temporal | JavaInterfaceProxy<java_time_temporal_TemporalInterface> | null): Promise<java_time_temporal_Temporal | null>;
    /**
     * @param var0 original type: 'java.time.temporal.Temporal'
     * @return original return type: 'java.time.temporal.Temporal'
     */
    adjustIntoSync(var0: java_time_temporal_Temporal | JavaInterfaceProxy<java_time_temporal_TemporalInterface> | null): java_time_temporal_Temporal | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createTemporalAdjusterProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface TemporalAdjusterInterface {
    /**
     * @param var0 original type: 'java.time.temporal.Temporal'
     * @return original return type: 'java.time.temporal.Temporal'
     */
    adjustInto(var0: java_time_temporal_Temporal | JavaInterfaceProxy<java_time_temporal_TemporalInterface> | null): java_time_temporal_Temporal | null;
}
/**
 * Create a proxy for the {@link TemporalAdjuster} interface.
 * All required methods in {@link TemporalAdjusterInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createTemporalAdjusterProxy(methods: TemporalAdjusterInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<TemporalAdjusterInterface>;
declare const TemporalAdjuster_base: typeof TemporalAdjusterClass;
/**
 * Class java.time.temporal.TemporalAdjuster.
 *
 * This actually imports the java class for further use.
 * The class {@link TemporalAdjusterClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TemporalAdjuster extends TemporalAdjuster_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default TemporalAdjuster;
//# sourceMappingURL=TemporalAdjuster.d.ts.map
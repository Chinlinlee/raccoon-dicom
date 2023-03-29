import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { WatchKey as java_nio_file_WatchKey } from "./WatchKey";
import { Long as java_lang_Long } from "./../../lang/Long";
import { TimeUnit as java_util_concurrent_TimeUnit } from "./../../util/concurrent/TimeUnit";
/**
 * This class just defines types, you should import {@link WatchService} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class WatchServiceClass extends JavaClass {
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.nio.file.WatchKey'
     */
    poll(var0: java_lang_Long | bigint | number, var1: java_util_concurrent_TimeUnit | null): Promise<java_nio_file_WatchKey | null>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.nio.file.WatchKey'
     */
    pollSync(var0: java_lang_Long | bigint | number, var1: java_util_concurrent_TimeUnit | null): java_nio_file_WatchKey | null;
    /**
     * @return original return type: 'java.nio.file.WatchKey'
     */
    poll(): Promise<java_nio_file_WatchKey | null>;
    /**
     * @return original return type: 'java.nio.file.WatchKey'
     */
    pollSync(): java_nio_file_WatchKey | null;
    /**
     * @return original return type: 'void'
     */
    close(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeSync(): void;
    /**
     * @return original return type: 'java.nio.file.WatchKey'
     */
    take(): Promise<java_nio_file_WatchKey | null>;
    /**
     * @return original return type: 'java.nio.file.WatchKey'
     */
    takeSync(): java_nio_file_WatchKey | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createWatchServiceProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface WatchServiceInterface {
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.nio.file.WatchKey'
     */
    poll(var0: java_lang_Long | bigint | number, var1: java_util_concurrent_TimeUnit | null): java_nio_file_WatchKey | null;
    /**
     * @return original return type: 'java.nio.file.WatchKey'
     */
    poll(): java_nio_file_WatchKey | null;
    /**
     * @return original return type: 'void'
     */
    close(): void;
    /**
     * @return original return type: 'java.nio.file.WatchKey'
     */
    take(): java_nio_file_WatchKey | null;
}
/**
 * Create a proxy for the {@link WatchService} interface.
 * All required methods in {@link WatchServiceInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createWatchServiceProxy(methods: WatchServiceInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<WatchServiceInterface>;
declare const WatchService_base: typeof WatchServiceClass;
/**
 * Class java.nio.file.WatchService.
 *
 * This actually imports the java class for further use.
 * The class {@link WatchServiceClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class WatchService extends WatchService_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default WatchService;
//# sourceMappingURL=WatchService.d.ts.map
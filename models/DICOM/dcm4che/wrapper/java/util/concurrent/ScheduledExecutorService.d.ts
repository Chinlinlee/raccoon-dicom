import { JavaClass, BasicOrJavaType, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { ScheduledFuture as java_util_concurrent_ScheduledFuture } from "./ScheduledFuture";
import { Runnable as java_lang_Runnable, RunnableInterface as java_lang_RunnableInterface } from "./../../lang/Runnable";
import { Long as java_lang_Long } from "./../../lang/Long";
import { TimeUnit as java_util_concurrent_TimeUnit } from "./TimeUnit";
import { Callable as java_util_concurrent_Callable, CallableInterface as java_util_concurrent_CallableInterface } from "./Callable";
import { Future as java_util_concurrent_Future } from "./Future";
import { List as java_util_List } from "./../List";
import { Collection as java_util_Collection, CollectionInterface as java_util_CollectionInterface } from "./../Collection";
/**
 * This class just defines types, you should import {@link ScheduledExecutorService} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ScheduledExecutorServiceClass extends JavaClass {
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    schedule(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): Promise<java_util_concurrent_ScheduledFuture | null>;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleSync(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @param var0 original type: 'java.util.concurrent.Callable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    schedule(var0: java_util_concurrent_Callable | JavaInterfaceProxy<java_util_concurrent_CallableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): Promise<java_util_concurrent_ScheduledFuture | null>;
    /**
     * @param var0 original type: 'java.util.concurrent.Callable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleSync(var0: java_util_concurrent_Callable | JavaInterfaceProxy<java_util_concurrent_CallableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleWithFixedDelay(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_util_concurrent_TimeUnit | null): Promise<java_util_concurrent_ScheduledFuture | null>;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleWithFixedDelaySync(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleAtFixedRate(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_util_concurrent_TimeUnit | null): Promise<java_util_concurrent_ScheduledFuture | null>;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleAtFixedRateSync(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @return original return type: 'void'
     */
    shutdown(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    shutdownSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isShutdown(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isShutdownSync(): boolean;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submit(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null): Promise<java_util_concurrent_Future | null>;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submitSync(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null): java_util_concurrent_Future | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submit(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: BasicOrJavaType | null): Promise<java_util_concurrent_Future | null>;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submitSync(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: BasicOrJavaType | null): java_util_concurrent_Future | null;
    /**
     * @param var0 original type: 'java.util.concurrent.Callable'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submit(var0: java_util_concurrent_Callable | JavaInterfaceProxy<java_util_concurrent_CallableInterface> | null): Promise<java_util_concurrent_Future | null>;
    /**
     * @param var0 original type: 'java.util.concurrent.Callable'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submitSync(var0: java_util_concurrent_Callable | JavaInterfaceProxy<java_util_concurrent_CallableInterface> | null): java_util_concurrent_Future | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.List'
     */
    invokeAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): Promise<java_util_List | null>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.List'
     */
    invokeAllSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): java_util_List | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.util.List'
     */
    invokeAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<java_util_List | null>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.util.List'
     */
    invokeAllSync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): java_util_List | null;
    /**
     * @return original return type: 'java.util.List'
     */
    shutdownNow(): Promise<java_util_List | null>;
    /**
     * @return original return type: 'java.util.List'
     */
    shutdownNowSync(): java_util_List | null;
    /**
     * @return original return type: 'boolean'
     */
    isTerminated(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isTerminatedSync(): boolean;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'boolean'
     */
    awaitTermination(var0: java_lang_Long | bigint | number, var1: java_util_concurrent_TimeUnit | null): Promise<boolean>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'boolean'
     */
    awaitTerminationSync(var0: java_lang_Long | bigint | number, var1: java_util_concurrent_TimeUnit | null): boolean;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.lang.Object'
     */
    invokeAny(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.lang.Object'
     */
    invokeAnySync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.lang.Object'
     */
    invokeAny(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.lang.Object'
     */
    invokeAnySync(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @return original return type: 'void'
     */
    execute(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @return original return type: 'void'
     */
    executeSync(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null): void;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createScheduledExecutorServiceProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface ScheduledExecutorServiceInterface {
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    schedule(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @param var0 original type: 'java.util.concurrent.Callable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    schedule(var0: java_util_concurrent_Callable | JavaInterfaceProxy<java_util_concurrent_CallableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleWithFixedDelay(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @param var3 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.concurrent.ScheduledFuture'
     */
    scheduleAtFixedRate(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number, var3: java_util_concurrent_TimeUnit | null): java_util_concurrent_ScheduledFuture | null;
    /**
     * @return original return type: 'void'
     */
    shutdown(): void;
    /**
     * @return original return type: 'boolean'
     */
    isShutdown(): boolean;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submit(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null): java_util_concurrent_Future | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submit(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null, var1: BasicOrJavaType | null): java_util_concurrent_Future | null;
    /**
     * @param var0 original type: 'java.util.concurrent.Callable'
     * @return original return type: 'java.util.concurrent.Future'
     */
    submit(var0: java_util_concurrent_Callable | JavaInterfaceProxy<java_util_concurrent_CallableInterface> | null): java_util_concurrent_Future | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.util.List'
     */
    invokeAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): java_util_List | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.util.List'
     */
    invokeAll(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): java_util_List | null;
    /**
     * @return original return type: 'java.util.List'
     */
    shutdownNow(): java_util_List | null;
    /**
     * @return original return type: 'boolean'
     */
    isTerminated(): boolean;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'boolean'
     */
    awaitTermination(var0: java_lang_Long | bigint | number, var1: java_util_concurrent_TimeUnit | null): boolean;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @return original return type: 'java.lang.Object'
     */
    invokeAny(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.util.Collection'
     * @param var1 original type: 'long'
     * @param var2 original type: 'java.util.concurrent.TimeUnit'
     * @return original return type: 'java.lang.Object'
     */
    invokeAny(var0: java_util_Collection | JavaInterfaceProxy<java_util_CollectionInterface> | null, var1: java_lang_Long | bigint | number, var2: java_util_concurrent_TimeUnit | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.lang.Runnable'
     * @return original return type: 'void'
     */
    execute(var0: java_lang_Runnable | JavaInterfaceProxy<java_lang_RunnableInterface> | null): void;
}
/**
 * Create a proxy for the {@link ScheduledExecutorService} interface.
 * All required methods in {@link ScheduledExecutorServiceInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createScheduledExecutorServiceProxy(methods: ScheduledExecutorServiceInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<ScheduledExecutorServiceInterface>;
declare const ScheduledExecutorService_base: typeof ScheduledExecutorServiceClass;
/**
 * Class java.util.concurrent.ScheduledExecutorService.
 *
 * This actually imports the java class for further use.
 * The class {@link ScheduledExecutorServiceClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ScheduledExecutorService extends ScheduledExecutorService_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default ScheduledExecutorService;
//# sourceMappingURL=ScheduledExecutorService.d.ts.map
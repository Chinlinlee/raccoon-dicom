import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { SocketOption as java_net_SocketOption, SocketOptionInterface as java_net_SocketOptionInterface } from "./../../net/SocketOption";
import { NetworkChannel as java_nio_channels_NetworkChannel } from "./NetworkChannel";
import { ServerSocket as java_net_ServerSocket } from "./../../net/ServerSocket";
import { SocketAddress as java_net_SocketAddress } from "./../../net/SocketAddress";
import { SocketChannel as java_nio_channels_SocketChannel } from "./SocketChannel";
import { ProtocolFamily as java_net_ProtocolFamily, ProtocolFamilyInterface as java_net_ProtocolFamilyInterface } from "./../../net/ProtocolFamily";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { SelectionKey as java_nio_channels_SelectionKey } from "./SelectionKey";
import { Selector as java_nio_channels_Selector } from "./Selector";
import { SelectableChannel as java_nio_channels_SelectableChannel } from "./SelectableChannel";
import { Boolean as java_lang_Boolean } from "./../../lang/Boolean";
import { SelectorProvider as java_nio_channels_spi_SelectorProvider } from "./spi/SelectorProvider";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Class as java_lang_Class } from "./../../lang/Class";
import { Set as java_util_Set } from "./../../util/Set";
/**
 * This class just defines types, you should import {@link ServerSocketChannel} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ServerSocketChannelClass extends JavaClass {
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    setOption(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): Promise<ServerSocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    setOptionSync(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): ServerSocketChannel | null;
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.NetworkChannel'
     */
    setOption(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): Promise<java_nio_channels_NetworkChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.NetworkChannel'
     */
    setOptionSync(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): java_nio_channels_NetworkChannel | null;
    /**
     * @return original return type: 'java.net.ServerSocket'
     */
    socket(): Promise<java_net_ServerSocket | null>;
    /**
     * @return original return type: 'java.net.ServerSocket'
     */
    socketSync(): java_net_ServerSocket | null;
    /**
     * @return original return type: 'int'
     */
    validOps(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    validOpsSync(): number;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalAddressSync(): java_net_SocketAddress | null;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    accept(): Promise<java_nio_channels_SocketChannel | null>;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    acceptSync(): java_nio_channels_SocketChannel | null;
    /**
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    static open(): Promise<ServerSocketChannel | null>;
    /**
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    static openSync(): ServerSocketChannel | null;
    /**
     * @param var0 original type: 'java.net.ProtocolFamily'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    static open(var0: java_net_ProtocolFamily | JavaInterfaceProxy<java_net_ProtocolFamilyInterface> | null): Promise<ServerSocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.ProtocolFamily'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    static openSync(var0: java_net_ProtocolFamily | JavaInterfaceProxy<java_net_ProtocolFamilyInterface> | null): ServerSocketChannel | null;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.nio.channels.NetworkChannel'
     */
    bind(var0: java_net_SocketAddress | null): Promise<java_nio_channels_NetworkChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.nio.channels.NetworkChannel'
     */
    bindSync(var0: java_net_SocketAddress | null): java_nio_channels_NetworkChannel | null;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    bind(var0: java_net_SocketAddress | null): Promise<ServerSocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    bindSync(var0: java_net_SocketAddress | null): ServerSocketChannel | null;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    bind(var0: java_net_SocketAddress | null, var1: java_lang_Integer | number): Promise<ServerSocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.channels.ServerSocketChannel'
     */
    bindSync(var0: java_net_SocketAddress | null, var1: java_lang_Integer | number): ServerSocketChannel | null;
    /**
     * @return original return type: 'boolean'
     */
    isBlocking(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isBlockingSync(): boolean;
    /**
     * @param var0 original type: 'java.nio.channels.Selector'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    keyFor(var0: java_nio_channels_Selector | null): Promise<java_nio_channels_SelectionKey | null>;
    /**
     * @param var0 original type: 'java.nio.channels.Selector'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    keyForSync(var0: java_nio_channels_Selector | null): java_nio_channels_SelectionKey | null;
    /**
     * @return original return type: 'java.lang.Object'
     */
    blockingLock(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    blockingLockSync(): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'java.nio.channels.SelectableChannel'
     */
    configureBlocking(var0: java_lang_Boolean | boolean): Promise<java_nio_channels_SelectableChannel | null>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'java.nio.channels.SelectableChannel'
     */
    configureBlockingSync(var0: java_lang_Boolean | boolean): java_nio_channels_SelectableChannel | null;
    /**
     * @return original return type: 'boolean'
     */
    isRegistered(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRegisteredSync(): boolean;
    /**
     * @param var0 original type: 'java.nio.channels.Selector'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    register(var0: java_nio_channels_Selector | null, var1: java_lang_Integer | number, var2: BasicOrJavaType | null): Promise<java_nio_channels_SelectionKey | null>;
    /**
     * @param var0 original type: 'java.nio.channels.Selector'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    registerSync(var0: java_nio_channels_Selector | null, var1: java_lang_Integer | number, var2: BasicOrJavaType | null): java_nio_channels_SelectionKey | null;
    /**
     * @param var0 original type: 'java.nio.channels.Selector'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    register(var0: java_nio_channels_Selector | null, var1: java_lang_Integer | number): Promise<java_nio_channels_SelectionKey | null>;
    /**
     * @param var0 original type: 'java.nio.channels.Selector'
     * @param var1 original type: 'int'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    registerSync(var0: java_nio_channels_Selector | null, var1: java_lang_Integer | number): java_nio_channels_SelectionKey | null;
    /**
     * @return original return type: 'java.nio.channels.spi.SelectorProvider'
     */
    provider(): Promise<java_nio_channels_spi_SelectorProvider | null>;
    /**
     * @return original return type: 'java.nio.channels.spi.SelectorProvider'
     */
    providerSync(): java_nio_channels_spi_SelectorProvider | null;
    /**
     * @return original return type: 'boolean'
     */
    isOpen(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isOpenSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    close(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeSync(): void;
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
     * @param var0 original type: 'java.net.SocketOption'
     * @return original return type: 'java.lang.Object'
     */
    getOption(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @return original return type: 'java.lang.Object'
     */
    getOptionSync(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null): BasicOrJavaType | null;
    /**
     * @return original return type: 'java.util.Set'
     */
    supportedOptions(): Promise<java_util_Set | null>;
    /**
     * @return original return type: 'java.util.Set'
     */
    supportedOptionsSync(): java_util_Set | null;
}
declare const ServerSocketChannel_base: typeof ServerSocketChannelClass;
/**
 * Class java.nio.channels.ServerSocketChannel.
 *
 * This actually imports the java class for further use.
 * The class {@link ServerSocketChannelClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ServerSocketChannel extends ServerSocketChannel_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default ServerSocketChannel;
//# sourceMappingURL=ServerSocketChannel.d.ts.map
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { ByteBuffer as java_nio_ByteBuffer } from "./../ByteBuffer";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { SocketAddress as java_net_SocketAddress } from "./../../net/SocketAddress";
import { ProtocolFamily as java_net_ProtocolFamily, ProtocolFamilyInterface as java_net_ProtocolFamilyInterface } from "./../../net/ProtocolFamily";
import { NetworkChannel as java_nio_channels_NetworkChannel } from "./NetworkChannel";
import { SocketOption as java_net_SocketOption, SocketOptionInterface as java_net_SocketOptionInterface } from "./../../net/SocketOption";
import { Socket as java_net_Socket } from "./../../net/Socket";
import { SelectionKey as java_nio_channels_SelectionKey } from "./SelectionKey";
import { Selector as java_nio_channels_Selector } from "./Selector";
import { SelectorProvider as java_nio_channels_spi_SelectorProvider } from "./spi/SelectorProvider";
import { SelectableChannel as java_nio_channels_SelectableChannel } from "./SelectableChannel";
import { Boolean as java_lang_Boolean } from "./../../lang/Boolean";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Class as java_lang_Class } from "./../../lang/Class";
import { Set as java_util_Set } from "./../../util/Set";
/**
 * This class just defines types, you should import {@link SocketChannel} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SocketChannelClass extends JavaClass {
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'long'
     */
    write(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'long'
     */
    writeSync(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @return original return type: 'long'
     */
    write(var0: (java_nio_ByteBuffer | null)[] | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @return original return type: 'long'
     */
    writeSync(var0: (java_nio_ByteBuffer | null)[] | null): number;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    write(var0: java_nio_ByteBuffer | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    writeSync(var0: java_nio_ByteBuffer | null): number;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'long'
     */
    read(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'long'
     */
    readSync(var0: (java_nio_ByteBuffer | null)[] | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    read(var0: java_nio_ByteBuffer | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer'
     * @return original return type: 'int'
     */
    readSync(var0: java_nio_ByteBuffer | null): number;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @return original return type: 'long'
     */
    read(var0: (java_nio_ByteBuffer | null)[] | null): Promise<number>;
    /**
     * @param var0 original type: 'java.nio.ByteBuffer[]'
     * @return original return type: 'long'
     */
    readSync(var0: (java_nio_ByteBuffer | null)[] | null): number;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'boolean'
     */
    connect(var0: java_net_SocketAddress | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'boolean'
     */
    connectSync(var0: java_net_SocketAddress | null): boolean;
    /**
     * @param var0 original type: 'java.net.ProtocolFamily'
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    static open(var0: java_net_ProtocolFamily | JavaInterfaceProxy<java_net_ProtocolFamilyInterface> | null): Promise<SocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.ProtocolFamily'
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    static openSync(var0: java_net_ProtocolFamily | JavaInterfaceProxy<java_net_ProtocolFamilyInterface> | null): SocketChannel | null;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    static open(): Promise<SocketChannel | null>;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    static openSync(): SocketChannel | null;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    static open(var0: java_net_SocketAddress | null): Promise<SocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    static openSync(var0: java_net_SocketAddress | null): SocketChannel | null;
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
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    bind(var0: java_net_SocketAddress | null): Promise<SocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    bindSync(var0: java_net_SocketAddress | null): SocketChannel | null;
    /**
     * @return original return type: 'boolean'
     */
    isConnected(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isConnectedSync(): boolean;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalAddressSync(): java_net_SocketAddress | null;
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
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    setOption(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): Promise<SocketChannel | null>;
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    setOptionSync(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): SocketChannel | null;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    shutdownInput(): Promise<SocketChannel | null>;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    shutdownInputSync(): SocketChannel | null;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    shutdownOutput(): Promise<SocketChannel | null>;
    /**
     * @return original return type: 'java.nio.channels.SocketChannel'
     */
    shutdownOutputSync(): SocketChannel | null;
    /**
     * @return original return type: 'java.net.Socket'
     */
    socket(): Promise<java_net_Socket | null>;
    /**
     * @return original return type: 'java.net.Socket'
     */
    socketSync(): java_net_Socket | null;
    /**
     * @return original return type: 'int'
     */
    validOps(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    validOpsSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isConnectionPending(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isConnectionPendingSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    finishConnect(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    finishConnectSync(): boolean;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getRemoteAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getRemoteAddressSync(): java_net_SocketAddress | null;
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
     * @return original return type: 'java.util.Set'
     */
    supportedOptions(): Promise<java_util_Set | null>;
    /**
     * @return original return type: 'java.util.Set'
     */
    supportedOptionsSync(): java_util_Set | null;
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
}
declare const SocketChannel_base: typeof SocketChannelClass;
/**
 * Class java.nio.channels.SocketChannel.
 *
 * This actually imports the java class for further use.
 * The class {@link SocketChannelClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SocketChannel extends SocketChannel_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default SocketChannel;
//# sourceMappingURL=SocketChannel.d.ts.map
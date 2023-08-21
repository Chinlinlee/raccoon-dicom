import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { SocketAddress as java_net_SocketAddress } from "./SocketAddress";
import { InetAddress as java_net_InetAddress } from "./InetAddress";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { DatagramChannel as java_nio_channels_DatagramChannel } from "./../nio/channels/DatagramChannel";
import { SocketOption as java_net_SocketOption, SocketOptionInterface as java_net_SocketOptionInterface } from "./SocketOption";
import { Set as java_util_Set } from "./../util/Set";
import { Boolean as java_lang_Boolean } from "./../lang/Boolean";
import { DatagramPacket as java_net_DatagramPacket } from "./DatagramPacket";
import { NetworkInterface as java_net_NetworkInterface } from "./NetworkInterface";
import { DatagramSocketImplFactory as java_net_DatagramSocketImplFactory, DatagramSocketImplFactoryInterface as java_net_DatagramSocketImplFactoryInterface } from "./DatagramSocketImplFactory";
import { Long as java_lang_Long } from "./../lang/Long";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link DatagramSocket} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DatagramSocketClass extends JavaClass {
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'void'
     */
    connect(var0: java_net_SocketAddress | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'void'
     */
    connectSync(var0: java_net_SocketAddress | null): void;
    /**
     * @param var0 original type: 'java.net.InetAddress'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    connect(var0: java_net_InetAddress | null, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'java.net.InetAddress'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    connectSync(var0: java_net_InetAddress | null, var1: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    close(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    closeSync(): void;
    /**
     * @return original return type: 'int'
     */
    getPort(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getPortSync(): number;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'void'
     */
    bind(var0: java_net_SocketAddress | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'void'
     */
    bindSync(var0: java_net_SocketAddress | null): void;
    /**
     * @return original return type: 'java.nio.channels.DatagramChannel'
     */
    getChannel(): Promise<java_nio_channels_DatagramChannel | null>;
    /**
     * @return original return type: 'java.nio.channels.DatagramChannel'
     */
    getChannelSync(): java_nio_channels_DatagramChannel | null;
    /**
     * @return original return type: 'boolean'
     */
    getBroadcast(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getBroadcastSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    getInetAddress(): Promise<java_net_InetAddress | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSendBufferSizeSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getLocalAddress(): Promise<java_net_InetAddress | null>;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getLocalAddressSync(): java_net_InetAddress | null;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getRemoteSocketAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getRemoteSocketAddressSync(): java_net_SocketAddress | null;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalSocketAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalSocketAddressSync(): java_net_SocketAddress | null;
    /**
     * @return original return type: 'boolean'
     */
    isClosed(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isClosedSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isConnected(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isConnectedSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isBound(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isBoundSync(): boolean;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getInetAddress(): Promise<java_net_InetAddress | null>;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getInetAddressSync(): java_net_InetAddress | null;
    /**
     * @return original return type: 'int'
     */
    getLocalPort(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getLocalPortSync(): number;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getLocalAddress(): Promise<java_net_InetAddress | null>;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getLocalAddressSync(): java_net_InetAddress | null;
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.net.DatagramSocket'
     */
    setOption(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): Promise<DatagramSocket | null>;
    /**
     * @param var0 original type: 'java.net.SocketOption'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.net.DatagramSocket'
     */
    setOptionSync(var0: java_net_SocketOption | JavaInterfaceProxy<java_net_SocketOptionInterface> | null, var1: BasicOrJavaType | null): DatagramSocket | null;
    /**
     * @return original return type: 'java.util.Set'
     */
    supportedOptions(): Promise<java_util_Set | null>;
    /**
     * @return original return type: 'java.util.Set'
     */
    supportedOptionsSync(): java_util_Set | null;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getRemoteSocketAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getRemoteSocketAddressSync(): java_net_SocketAddress | null;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalSocketAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getLocalSocketAddressSync(): java_net_SocketAddress | null;
    /**
     * @return original return type: 'int'
     */
    getSoTimeout(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSoTimeoutSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setTrafficClass(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setTrafficClassSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'int'
     */
    getTrafficClass(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getTrafficClassSync(): number;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setReuseAddress(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setReuseAddressSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getReuseAddress(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getReuseAddressSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    disconnect(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    disconnectSync(): void;
    /**
     * @param var0 original type: 'java.net.DatagramPacket'
     * @return original return type: 'void'
     */
    send(var0: java_net_DatagramPacket | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.DatagramPacket'
     * @return original return type: 'void'
     */
    sendSync(var0: java_net_DatagramPacket | null): void;
    /**
     * @param var0 original type: 'java.net.DatagramPacket'
     * @return original return type: 'void'
     */
    receive(var0: java_net_DatagramPacket | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.DatagramPacket'
     * @return original return type: 'void'
     */
    receiveSync(var0: java_net_DatagramPacket | null): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setBroadcast(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setBroadcastSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @param var1 original type: 'java.net.NetworkInterface'
     * @return original return type: 'void'
     */
    joinGroup(var0: java_net_SocketAddress | null, var1: java_net_NetworkInterface | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @param var1 original type: 'java.net.NetworkInterface'
     * @return original return type: 'void'
     */
    joinGroupSync(var0: java_net_SocketAddress | null, var1: java_net_NetworkInterface | null): void;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @param var1 original type: 'java.net.NetworkInterface'
     * @return original return type: 'void'
     */
    leaveGroup(var0: java_net_SocketAddress | null, var1: java_net_NetworkInterface | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @param var1 original type: 'java.net.NetworkInterface'
     * @return original return type: 'void'
     */
    leaveGroupSync(var0: java_net_SocketAddress | null, var1: java_net_NetworkInterface | null): void;
    /**
     * @param var0 original type: 'java.net.DatagramSocketImplFactory'
     * @return original return type: 'void'
     */
    static setDatagramSocketImplFactory(var0: java_net_DatagramSocketImplFactory | JavaInterfaceProxy<java_net_DatagramSocketImplFactoryInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.DatagramSocketImplFactory'
     * @return original return type: 'void'
     */
    static setDatagramSocketImplFactorySync(var0: java_net_DatagramSocketImplFactory | JavaInterfaceProxy<java_net_DatagramSocketImplFactoryInterface> | null): void;
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
     * @return original return type: 'int'
     */
    getSendBufferSize(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSendBufferSizeSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSoTimeout(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setSoTimeoutSync(var0: java_lang_Integer | number): void;
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
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.net.InetAddress'
     * @return original return type: 'java.net.DatagramSocket'
     */
    static newInstanceAsync(var0: java_lang_Integer | number, var1: java_net_InetAddress | null): Promise<DatagramSocket>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.net.DatagramSocket'
     */
    static newInstanceAsync(var0: java_net_SocketAddress | null): Promise<DatagramSocket>;
    /**
     * @return original return type: 'java.net.DatagramSocket'
     */
    static newInstanceAsync(): Promise<DatagramSocket>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.net.DatagramSocket'
     */
    static newInstanceAsync(var0: java_lang_Integer | number): Promise<DatagramSocket>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.net.InetAddress'
     */
    constructor(var0: java_lang_Integer | number, var1: java_net_InetAddress | null);
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     */
    constructor(var0: java_net_SocketAddress | null);
    constructor();
    /**
     * @param var0 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number);
}
declare const DatagramSocket_base: typeof DatagramSocketClass;
/**
 * Class java.net.DatagramSocket.
 *
 * This actually imports the java class for further use.
 * The class {@link DatagramSocketClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DatagramSocket extends DatagramSocket_base {
}
export default DatagramSocket;
//# sourceMappingURL=DatagramSocket.d.ts.map
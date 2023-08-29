/// <reference types="node" />
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { InetAddress as java_net_InetAddress } from "./InetAddress";
import { SocketAddress as java_net_SocketAddress } from "./SocketAddress";
import { Long as java_lang_Long } from "./../lang/Long";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link DatagramPacket} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DatagramPacketClass extends JavaClass {
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    setData(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    setDataSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    setData(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    setDataSync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.net.InetAddress'
     * @return original return type: 'void'
     */
    setAddress(var0: java_net_InetAddress | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.InetAddress'
     * @return original return type: 'void'
     */
    setAddressSync(var0: java_net_InetAddress | null): void;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'void'
     */
    setSocketAddress(var0: java_net_SocketAddress | null): Promise<void>;
    /**
     * @param var0 original type: 'java.net.SocketAddress'
     * @return original return type: 'void'
     */
    setSocketAddressSync(var0: java_net_SocketAddress | null): void;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getSocketAddress(): Promise<java_net_SocketAddress | null>;
    /**
     * @return original return type: 'java.net.SocketAddress'
     */
    getSocketAddressSync(): java_net_SocketAddress | null;
    /**
     * @return original return type: 'int'
     */
    getLength(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getLengthSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setLength(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setLengthSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getAddress(): Promise<java_net_InetAddress | null>;
    /**
     * @return original return type: 'java.net.InetAddress'
     */
    getAddressSync(): java_net_InetAddress | null;
    /**
     * @return original return type: 'int'
     */
    getPort(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getPortSync(): number;
    /**
     * @return original return type: 'int'
     */
    getOffset(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getOffsetSync(): number;
    /**
     * @return original return type: 'byte[]'
     */
    getData(): Promise<Buffer | null>;
    /**
     * @return original return type: 'byte[]'
     */
    getDataSync(): Buffer | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setPort(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setPortSync(var0: java_lang_Integer | number): void;
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
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'java.net.DatagramPacket'
     */
    static newInstanceAsync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<DatagramPacket>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @return original return type: 'java.net.DatagramPacket'
     */
    static newInstanceAsync(var0: Buffer | null, var1: java_lang_Integer | number): Promise<DatagramPacket>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.net.InetAddress'
     * @param var4 original type: 'int'
     * @return original return type: 'java.net.DatagramPacket'
     */
    static newInstanceAsync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_net_InetAddress | null, var4: java_lang_Integer | number): Promise<DatagramPacket>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.net.DatagramPacket'
     */
    static newInstanceAsync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_net_SocketAddress | null): Promise<DatagramPacket>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.net.InetAddress'
     * @param var3 original type: 'int'
     * @return original return type: 'java.net.DatagramPacket'
     */
    static newInstanceAsync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_net_InetAddress | null, var3: java_lang_Integer | number): Promise<DatagramPacket>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.net.SocketAddress'
     * @return original return type: 'java.net.DatagramPacket'
     */
    static newInstanceAsync(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_net_SocketAddress | null): Promise<DatagramPacket>;
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     */
    constructor(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number);
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     */
    constructor(var0: Buffer | null, var1: java_lang_Integer | number);
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.net.InetAddress'
     * @param var4 original type: 'int'
     */
    constructor(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_net_InetAddress | null, var4: java_lang_Integer | number);
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.net.SocketAddress'
     */
    constructor(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_net_SocketAddress | null);
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.net.InetAddress'
     * @param var3 original type: 'int'
     */
    constructor(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_net_InetAddress | null, var3: java_lang_Integer | number);
    /**
     * @param var0 original type: 'byte[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.net.SocketAddress'
     */
    constructor(var0: Buffer | null, var1: java_lang_Integer | number, var2: java_net_SocketAddress | null);
}
declare const DatagramPacket_base: typeof DatagramPacketClass;
/**
 * Class java.net.DatagramPacket.
 *
 * This actually imports the java class for further use.
 * The class {@link DatagramPacketClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DatagramPacket extends DatagramPacket_base {
}
export default DatagramPacket;
//# sourceMappingURL=DatagramPacket.d.ts.map
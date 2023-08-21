import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Long as java_lang_Long } from "./../lang/Long";
import { Class as java_lang_Class } from "./../lang/Class";
/**
 * This class just defines types, you should import {@link SocketImpl} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SocketImplClass extends JavaClass {
    /**
     * Original type: 'int'
     */
    static readonly TCP_NODELAY: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_BINDADDR: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_REUSEADDR: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_REUSEPORT: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_BROADCAST: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly IP_MULTICAST_IF: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly IP_MULTICAST_IF2: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly IP_MULTICAST_LOOP: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly IP_TOS: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_LINGER: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_TIMEOUT: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_SNDBUF: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_RCVBUF: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_KEEPALIVE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SO_OOBINLINE: java_lang_Integer | number;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
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
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    setOption(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    setOptionSync(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    getOption(var0: java_lang_Integer | number): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.lang.Object'
     */
    getOptionSync(var0: java_lang_Integer | number): BasicOrJavaType | null;
}
declare const SocketImpl_base: typeof SocketImplClass;
/**
 * Class java.net.SocketImpl.
 *
 * This actually imports the java class for further use.
 * The class {@link SocketImplClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SocketImpl extends SocketImpl_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default SocketImpl;
//# sourceMappingURL=SocketImpl.d.ts.map
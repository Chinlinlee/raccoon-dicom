import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { SelectableChannel as java_nio_channels_SelectableChannel } from "./SelectableChannel";
import { Selector as java_nio_channels_Selector } from "./Selector";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Class as java_lang_Class } from "./../../lang/Class";
/**
 * This class just defines types, you should import {@link SelectionKey} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SelectionKeyClass extends JavaClass {
    /**
     * Original type: 'int'
     */
    static readonly OP_READ: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly OP_WRITE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly OP_CONNECT: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly OP_ACCEPT: java_lang_Integer | number;
    /**
     * @return original return type: 'java.lang.Object'
     */
    attachment(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    attachmentSync(): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    attach(var0: BasicOrJavaType | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    attachSync(var0: BasicOrJavaType | null): BasicOrJavaType | null;
    /**
     * @return original return type: 'java.nio.channels.SelectableChannel'
     */
    channel(): Promise<java_nio_channels_SelectableChannel | null>;
    /**
     * @return original return type: 'java.nio.channels.SelectableChannel'
     */
    channelSync(): java_nio_channels_SelectableChannel | null;
    /**
     * @return original return type: 'boolean'
     */
    isReadable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isReadableSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isWritable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isWritableSync(): boolean;
    /**
     * @return original return type: 'java.nio.channels.Selector'
     */
    selector(): Promise<java_nio_channels_Selector | null>;
    /**
     * @return original return type: 'java.nio.channels.Selector'
     */
    selectorSync(): java_nio_channels_Selector | null;
    /**
     * @return original return type: 'void'
     */
    cancel(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    cancelSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isValid(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isValidSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    interestOps(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    interestOpsSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    interestOps(var0: java_lang_Integer | number): Promise<SelectionKey | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.nio.channels.SelectionKey'
     */
    interestOpsSync(var0: java_lang_Integer | number): SelectionKey | null;
    /**
     * @return original return type: 'int'
     */
    readyOps(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    readyOpsSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    interestOpsOr(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    interestOpsOrSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    interestOpsAnd(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    interestOpsAndSync(var0: java_lang_Integer | number): number;
    /**
     * @return original return type: 'boolean'
     */
    isConnectable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isConnectableSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isAcceptable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isAcceptableSync(): boolean;
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
}
declare const SelectionKey_base: typeof SelectionKeyClass;
/**
 * Class java.nio.channels.SelectionKey.
 *
 * This actually imports the java class for further use.
 * The class {@link SelectionKeyClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class SelectionKey extends SelectionKey_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default SelectionKey;
//# sourceMappingURL=SelectionKey.d.ts.map
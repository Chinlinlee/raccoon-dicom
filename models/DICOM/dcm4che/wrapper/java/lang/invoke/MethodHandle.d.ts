import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { MethodType as java_lang_invoke_MethodType } from "./MethodType";
import { Optional as java_util_Optional } from "./../../util/Optional";
import { List as java_util_List, ListInterface as java_util_ListInterface } from "./../../util/List";
import { Integer as java_lang_Integer } from "./../Integer";
import { Class as java_lang_Class } from "./../Class";
import { Boolean as java_lang_Boolean } from "./../Boolean";
import { Long as java_lang_Long } from "./../Long";
/**
 * This class just defines types, you should import {@link MethodHandle} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class MethodHandleClass extends JavaClass {
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object'
     */
    invoke(var0: (BasicOrJavaType | null)[] | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object'
     */
    invokeSync(var0: (BasicOrJavaType | null)[] | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object'
     */
    invokeExact(var0: (BasicOrJavaType | null)[] | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object'
     */
    invokeExactSync(var0: (BasicOrJavaType | null)[] | null): BasicOrJavaType | null;
    /**
     * @return original return type: 'java.lang.invoke.MethodType'
     */
    type(): Promise<java_lang_invoke_MethodType | null>;
    /**
     * @return original return type: 'java.lang.invoke.MethodType'
     */
    typeSync(): java_lang_invoke_MethodType | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstable(): Promise<java_util_Optional | null>;
    /**
     * @return original return type: 'java.util.Optional'
     */
    describeConstableSync(): java_util_Optional | null;
    /**
     * @param var0 original type: 'java.lang.invoke.MethodType'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asType(var0: java_lang_invoke_MethodType | null): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'java.lang.invoke.MethodType'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asTypeSync(var0: java_lang_invoke_MethodType | null): MethodHandle | null;
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object'
     */
    invokeWithArguments(var0: (BasicOrJavaType | null)[] | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.lang.Object[]'
     * @return original return type: 'java.lang.Object'
     */
    invokeWithArgumentsSync(var0: (BasicOrJavaType | null)[] | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'java.util.List'
     * @return original return type: 'java.lang.Object'
     */
    invokeWithArguments(var0: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.util.List'
     * @return original return type: 'java.lang.Object'
     */
    invokeWithArgumentsSync(var0: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Class'
     * @param var2 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asSpreader(var0: java_lang_Integer | number, var1: java_lang_Class | null, var2: java_lang_Integer | number): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Class'
     * @param var2 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asSpreaderSync(var0: java_lang_Integer | number, var1: java_lang_Class | null, var2: java_lang_Integer | number): MethodHandle | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asSpreader(var0: java_lang_Class | null, var1: java_lang_Integer | number): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asSpreaderSync(var0: java_lang_Class | null, var1: java_lang_Integer | number): MethodHandle | null;
    /**
     * @return original return type: 'boolean'
     */
    isVarargsCollector(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isVarargsCollectorSync(): boolean;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asVarargsCollector(var0: java_lang_Class | null): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asVarargsCollectorSync(var0: java_lang_Class | null): MethodHandle | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asCollector(var0: java_lang_Class | null, var1: java_lang_Integer | number): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asCollectorSync(var0: java_lang_Class | null, var1: java_lang_Integer | number): MethodHandle | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Class'
     * @param var2 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asCollector(var0: java_lang_Integer | number, var1: java_lang_Class | null, var2: java_lang_Integer | number): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Class'
     * @param var2 original type: 'int'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asCollectorSync(var0: java_lang_Integer | number, var1: java_lang_Class | null, var2: java_lang_Integer | number): MethodHandle | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    withVarargs(var0: java_lang_Boolean | boolean): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    withVarargsSync(var0: java_lang_Boolean | boolean): MethodHandle | null;
    /**
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asFixedArity(): Promise<MethodHandle | null>;
    /**
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    asFixedAritySync(): MethodHandle | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    bindTo(var0: BasicOrJavaType | null): Promise<MethodHandle | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.invoke.MethodHandle'
     */
    bindToSync(var0: BasicOrJavaType | null): MethodHandle | null;
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
}
declare const MethodHandle_base: typeof MethodHandleClass;
/**
 * Class java.lang.invoke.MethodHandle.
 *
 * This actually imports the java class for further use.
 * The class {@link MethodHandleClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class MethodHandle extends MethodHandle_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default MethodHandle;
//# sourceMappingURL=MethodHandle.d.ts.map
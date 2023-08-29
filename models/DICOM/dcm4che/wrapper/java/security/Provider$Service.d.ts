import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Provider as java_security_Provider } from "./Provider";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Class as java_lang_Class } from "./../lang/Class";
import { List as java_util_List, ListInterface as java_util_ListInterface } from "./../util/List";
import { Map as java_util_Map, MapInterface as java_util_MapInterface } from "./../util/Map";
/**
 * This class just defines types, you should import {@link Provider$Service} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Provider$ServiceClass extends JavaClass {
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    supportsParameter(var0: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    supportsParameterSync(var0: BasicOrJavaType | null): boolean;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    newInstance(var0: BasicOrJavaType | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    newInstanceSync(var0: BasicOrJavaType | null): BasicOrJavaType | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getTypeSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getClassName(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getClassNameSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    getAttribute(var0: string | null): Promise<string | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    getAttributeSync(var0: string | null): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getAlgorithm(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getAlgorithmSync(): string | null;
    /**
     * @return original return type: 'java.security.Provider'
     */
    getProvider(): Promise<java_security_Provider | null>;
    /**
     * @return original return type: 'java.security.Provider'
     */
    getProviderSync(): java_security_Provider | null;
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
     * @param var0 original type: 'java.security.Provider'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.String'
     * @param var3 original type: 'java.lang.String'
     * @param var4 original type: 'java.util.List'
     * @param var5 original type: 'java.util.Map'
     * @return original return type: 'java.security.Provider$Service'
     */
    static newInstanceAsync(var0: java_security_Provider | null, var1: string | null, var2: string | null, var3: string | null, var4: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null, var5: java_util_Map | JavaInterfaceProxy<java_util_MapInterface> | null): Promise<Provider$Service>;
    /**
     * @param var0 original type: 'java.security.Provider'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.String'
     * @param var3 original type: 'java.lang.String'
     * @param var4 original type: 'java.util.List'
     * @param var5 original type: 'java.util.Map'
     */
    constructor(var0: java_security_Provider | null, var1: string | null, var2: string | null, var3: string | null, var4: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null, var5: java_util_Map | JavaInterfaceProxy<java_util_MapInterface> | null);
}
declare const Provider$Service_base: typeof Provider$ServiceClass;
/**
 * Class java.security.Provider$Service.
 *
 * This actually imports the java class for further use.
 * The class {@link Provider$ServiceClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Provider$Service extends Provider$Service_base {
}
export default Provider$Service;
//# sourceMappingURL=Provider$Service.d.ts.map
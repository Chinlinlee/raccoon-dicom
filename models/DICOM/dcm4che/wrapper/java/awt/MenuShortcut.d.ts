import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Long as java_lang_Long } from "./../lang/Long";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Class as java_lang_Class } from "./../lang/Class";
import { Boolean as java_lang_Boolean } from "./../lang/Boolean";
/**
 * This class just defines types, you should import {@link MenuShortcut} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class MenuShortcutClass extends JavaClass {
    /**
     * @param var0 original type: 'java.awt.MenuShortcut'
     * @return original return type: 'boolean'
     */
    equals(var0: MenuShortcutClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.MenuShortcut'
     * @return original return type: 'boolean'
     */
    equalsSync(var0: MenuShortcutClass | null): boolean;
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
     * @return original return type: 'int'
     */
    getKey(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getKeySync(): number;
    /**
     * @return original return type: 'boolean'
     */
    usesShiftModifier(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    usesShiftModifierSync(): boolean;
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
     * @return original return type: 'java.awt.MenuShortcut'
     */
    static newInstanceAsync(var0: java_lang_Integer | number): Promise<MenuShortcut>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     * @return original return type: 'java.awt.MenuShortcut'
     */
    static newInstanceAsync(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean): Promise<MenuShortcut>;
    /**
     * @param var0 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'boolean'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Boolean | boolean);
}
declare const MenuShortcut_base: typeof MenuShortcutClass;
/**
 * Class java.awt.MenuShortcut.
 *
 * This actually imports the java class for further use.
 * The class {@link MenuShortcutClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class MenuShortcut extends MenuShortcut_base {
}
export default MenuShortcut;
//# sourceMappingURL=MenuShortcut.d.ts.map
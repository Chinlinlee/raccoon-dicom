import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { Float as java_lang_Float } from "./../../lang/Float";
import { Boolean as java_lang_Boolean } from "./../../lang/Boolean";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Class as java_lang_Class } from "./../../lang/Class";
/**
 * This class just defines types, you should import {@link GlyphJustificationInfo} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class GlyphJustificationInfoClass extends JavaClass {
    /**
     * Original type: 'int'
     */
    static readonly PRIORITY_KASHIDA: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly PRIORITY_WHITESPACE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly PRIORITY_INTERCHAR: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly PRIORITY_NONE: java_lang_Integer | number;
    /**
     * Original type: 'float'
     */
    readonly weight: java_lang_Float | number;
    /**
     * Original type: 'int'
     */
    readonly growPriority: java_lang_Integer | number;
    /**
     * Original type: 'boolean'
     */
    readonly growAbsorb: java_lang_Boolean | boolean;
    /**
     * Original type: 'float'
     */
    readonly growLeftLimit: java_lang_Float | number;
    /**
     * Original type: 'float'
     */
    readonly growRightLimit: java_lang_Float | number;
    /**
     * Original type: 'int'
     */
    readonly shrinkPriority: java_lang_Integer | number;
    /**
     * Original type: 'boolean'
     */
    readonly shrinkAbsorb: java_lang_Boolean | boolean;
    /**
     * Original type: 'float'
     */
    readonly shrinkLeftLimit: java_lang_Float | number;
    /**
     * Original type: 'float'
     */
    readonly shrinkRightLimit: java_lang_Float | number;
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
     * @param var0 original type: 'float'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'float'
     * @param var4 original type: 'float'
     * @param var5 original type: 'boolean'
     * @param var6 original type: 'int'
     * @param var7 original type: 'float'
     * @param var8 original type: 'float'
     * @return original return type: 'java.awt.font.GlyphJustificationInfo'
     */
    static newInstanceAsync(var0: java_lang_Float | number, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Float | number, var4: java_lang_Float | number, var5: java_lang_Boolean | boolean, var6: java_lang_Integer | number, var7: java_lang_Float | number, var8: java_lang_Float | number): Promise<GlyphJustificationInfo>;
    /**
     * @param var0 original type: 'float'
     * @param var1 original type: 'boolean'
     * @param var2 original type: 'int'
     * @param var3 original type: 'float'
     * @param var4 original type: 'float'
     * @param var5 original type: 'boolean'
     * @param var6 original type: 'int'
     * @param var7 original type: 'float'
     * @param var8 original type: 'float'
     */
    constructor(var0: java_lang_Float | number, var1: java_lang_Boolean | boolean, var2: java_lang_Integer | number, var3: java_lang_Float | number, var4: java_lang_Float | number, var5: java_lang_Boolean | boolean, var6: java_lang_Integer | number, var7: java_lang_Float | number, var8: java_lang_Float | number);
}
declare const GlyphJustificationInfo_base: typeof GlyphJustificationInfoClass;
/**
 * Class java.awt.font.GlyphJustificationInfo.
 *
 * This actually imports the java class for further use.
 * The class {@link GlyphJustificationInfoClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class GlyphJustificationInfo extends GlyphJustificationInfo_base {
}
export default GlyphJustificationInfo;
//# sourceMappingURL=GlyphJustificationInfo.d.ts.map
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Byte as java_lang_Byte } from "./../../lang/Byte";
import { Rectangle2D as java_awt_geom_Rectangle2D } from "./../geom/Rectangle2D";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { Class as java_lang_Class } from "./../../lang/Class";
import { Float as java_lang_Float } from "./../../lang/Float";
import { Boolean as java_lang_Boolean } from "./../../lang/Boolean";
/**
 * This class just defines types, you should import {@link GlyphMetrics} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class GlyphMetricsClass extends JavaClass {
    /**
     * Original type: 'byte'
     */
    static readonly STANDARD: java_lang_Byte | number;
    /**
     * Original type: 'byte'
     */
    static readonly LIGATURE: java_lang_Byte | number;
    /**
     * Original type: 'byte'
     */
    static readonly COMBINING: java_lang_Byte | number;
    /**
     * Original type: 'byte'
     */
    static readonly COMPONENT: java_lang_Byte | number;
    /**
     * Original type: 'byte'
     */
    static readonly WHITESPACE: java_lang_Byte | number;
    /**
     * @return original return type: 'boolean'
     */
    isWhitespace(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isWhitespaceSync(): boolean;
    /**
     * @return original return type: 'int'
     */
    getType(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getTypeSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isStandard(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isStandardSync(): boolean;
    /**
     * @return original return type: 'java.awt.geom.Rectangle2D'
     */
    getBounds2D(): Promise<java_awt_geom_Rectangle2D | null>;
    /**
     * @return original return type: 'java.awt.geom.Rectangle2D'
     */
    getBounds2DSync(): java_awt_geom_Rectangle2D | null;
    /**
     * @return original return type: 'float'
     */
    getAdvance(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getAdvanceSync(): number;
    /**
     * @return original return type: 'float'
     */
    getAdvanceX(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getAdvanceXSync(): number;
    /**
     * @return original return type: 'float'
     */
    getAdvanceY(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getAdvanceYSync(): number;
    /**
     * @return original return type: 'float'
     */
    getLSB(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getLSBSync(): number;
    /**
     * @return original return type: 'float'
     */
    getRSB(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getRSBSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    isLigature(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isLigatureSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isCombining(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isCombiningSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isComponent(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isComponentSync(): boolean;
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
     * @param var1 original type: 'java.awt.geom.Rectangle2D'
     * @param var2 original type: 'byte'
     * @return original return type: 'java.awt.font.GlyphMetrics'
     */
    static newInstance(var0: java_lang_Float | number, var1: java_awt_geom_Rectangle2D | null, var2: java_lang_Byte | number): Promise<GlyphMetrics>;
    /**
     * @param var0 original type: 'boolean'
     * @param var1 original type: 'float'
     * @param var2 original type: 'float'
     * @param var3 original type: 'java.awt.geom.Rectangle2D'
     * @param var4 original type: 'byte'
     * @return original return type: 'java.awt.font.GlyphMetrics'
     */
    static newInstance(var0: java_lang_Boolean | boolean, var1: java_lang_Float | number, var2: java_lang_Float | number, var3: java_awt_geom_Rectangle2D | null, var4: java_lang_Byte | number): Promise<GlyphMetrics>;
    /**
     * @param var0 original type: 'float'
     * @param var1 original type: 'java.awt.geom.Rectangle2D'
     * @param var2 original type: 'byte'
     */
    constructor(var0: java_lang_Float | number, var1: java_awt_geom_Rectangle2D | null, var2: java_lang_Byte | number);
    /**
     * @param var0 original type: 'boolean'
     * @param var1 original type: 'float'
     * @param var2 original type: 'float'
     * @param var3 original type: 'java.awt.geom.Rectangle2D'
     * @param var4 original type: 'byte'
     */
    constructor(var0: java_lang_Boolean | boolean, var1: java_lang_Float | number, var2: java_lang_Float | number, var3: java_awt_geom_Rectangle2D | null, var4: java_lang_Byte | number);
}
declare const GlyphMetrics_base: typeof GlyphMetricsClass;
/**
 * Class java.awt.font.GlyphMetrics.
 *
 * This actually imports the java class for further use.
 * The class {@link GlyphMetricsClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class GlyphMetrics extends GlyphMetrics_base {
}
export default GlyphMetrics;
//# sourceMappingURL=GlyphMetrics.d.ts.map
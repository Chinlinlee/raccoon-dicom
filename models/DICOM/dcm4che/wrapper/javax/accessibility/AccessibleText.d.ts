import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../java/lang/Integer";
import { Point as java_awt_Point } from "./../../java/awt/Point";
import { Rectangle as java_awt_Rectangle } from "./../../java/awt/Rectangle";
import { AttributeSet as javax_swing_text_AttributeSet } from "./../swing/text/AttributeSet";
/**
 * This class just defines types, you should import {@link AccessibleText} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AccessibleTextClass extends JavaClass {
    /**
     * Original type: 'int'
     */
    static readonly CHARACTER: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly WORD: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SENTENCE: java_lang_Integer | number;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSelectedText(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSelectedTextSync(): string | null;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'int'
     */
    getIndexAtPoint(var0: java_awt_Point | null): Promise<number>;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'int'
     */
    getIndexAtPointSync(var0: java_awt_Point | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.Rectangle'
     */
    getCharacterBounds(var0: java_lang_Integer | number): Promise<java_awt_Rectangle | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.Rectangle'
     */
    getCharacterBoundsSync(var0: java_lang_Integer | number): java_awt_Rectangle | null;
    /**
     * @return original return type: 'int'
     */
    getCharCount(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getCharCountSync(): number;
    /**
     * @return original return type: 'int'
     */
    getCaretPosition(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getCaretPositionSync(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getAtIndex(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<string | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getAtIndexSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getAfterIndex(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<string | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getAfterIndexSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getBeforeIndex(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<string | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getBeforeIndexSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.swing.text.AttributeSet'
     */
    getCharacterAttribute(var0: java_lang_Integer | number): Promise<javax_swing_text_AttributeSet | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.swing.text.AttributeSet'
     */
    getCharacterAttributeSync(var0: java_lang_Integer | number): javax_swing_text_AttributeSet | null;
    /**
     * @return original return type: 'int'
     */
    getSelectionStart(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSelectionStartSync(): number;
    /**
     * @return original return type: 'int'
     */
    getSelectionEnd(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getSelectionEndSync(): number;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createAccessibleTextProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface AccessibleTextInterface {
    /**
     * @return original return type: 'java.lang.String'
     */
    getSelectedText(): string | null;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'int'
     */
    getIndexAtPoint(var0: java_awt_Point | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.Rectangle'
     */
    getCharacterBounds(var0: java_lang_Integer | number): java_awt_Rectangle | null;
    /**
     * @return original return type: 'int'
     */
    getCharCount(): number;
    /**
     * @return original return type: 'int'
     */
    getCaretPosition(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getAtIndex(var0: java_lang_Integer | number, var1: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getAfterIndex(var0: java_lang_Integer | number, var1: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.lang.String'
     */
    getBeforeIndex(var0: java_lang_Integer | number, var1: java_lang_Integer | number): string | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'javax.swing.text.AttributeSet'
     */
    getCharacterAttribute(var0: java_lang_Integer | number): javax_swing_text_AttributeSet | null;
    /**
     * @return original return type: 'int'
     */
    getSelectionStart(): number;
    /**
     * @return original return type: 'int'
     */
    getSelectionEnd(): number;
}
/**
 * Create a proxy for the {@link AccessibleText} interface.
 * All required methods in {@link AccessibleTextInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createAccessibleTextProxy(methods: AccessibleTextInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<AccessibleTextInterface>;
declare const AccessibleText_base: typeof AccessibleTextClass;
/**
 * Class javax.accessibility.AccessibleText.
 *
 * This actually imports the java class for further use.
 * The class {@link AccessibleTextClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AccessibleText extends AccessibleText_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default AccessibleText;
//# sourceMappingURL=AccessibleText.d.ts.map
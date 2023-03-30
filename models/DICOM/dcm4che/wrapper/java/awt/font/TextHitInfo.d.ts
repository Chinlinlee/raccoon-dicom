import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Class as java_lang_Class } from "./../../lang/Class";
/**
 * This class just defines types, you should import {@link TextHitInfo} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TextHitInfoClass extends JavaClass {
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
     * @param var0 original type: 'java.awt.font.TextHitInfo'
     * @return original return type: 'boolean'
     */
    equals(var0: TextHitInfoClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.font.TextHitInfo'
     * @return original return type: 'boolean'
     */
    equalsSync(var0: TextHitInfoClass | null): boolean;
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
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static leading(var0: java_lang_Integer | number): Promise<TextHitInfo | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static leadingSync(var0: java_lang_Integer | number): TextHitInfo | null;
    /**
     * @return original return type: 'boolean'
     */
    isLeadingEdge(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isLeadingEdgeSync(): boolean;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static trailing(var0: java_lang_Integer | number): Promise<TextHitInfo | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static trailingSync(var0: java_lang_Integer | number): TextHitInfo | null;
    /**
     * @return original return type: 'int'
     */
    getCharIndex(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getCharIndexSync(): number;
    /**
     * @return original return type: 'int'
     */
    getInsertionIndex(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getInsertionIndexSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static beforeOffset(var0: java_lang_Integer | number): Promise<TextHitInfo | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static beforeOffsetSync(var0: java_lang_Integer | number): TextHitInfo | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static afterOffset(var0: java_lang_Integer | number): Promise<TextHitInfo | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    static afterOffsetSync(var0: java_lang_Integer | number): TextHitInfo | null;
    /**
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    getOtherHit(): Promise<TextHitInfo | null>;
    /**
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    getOtherHitSync(): TextHitInfo | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    getOffsetHit(var0: java_lang_Integer | number): Promise<TextHitInfo | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.font.TextHitInfo'
     */
    getOffsetHitSync(var0: java_lang_Integer | number): TextHitInfo | null;
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
}
declare const TextHitInfo_base: typeof TextHitInfoClass;
/**
 * Class java.awt.font.TextHitInfo.
 *
 * This actually imports the java class for further use.
 * The class {@link TextHitInfoClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class TextHitInfo extends TextHitInfo_base {
}
export default TextHitInfo;
//# sourceMappingURL=TextHitInfo.d.ts.map
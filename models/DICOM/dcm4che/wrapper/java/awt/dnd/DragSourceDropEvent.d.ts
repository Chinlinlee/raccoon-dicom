import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Point as java_awt_Point } from "./../Point";
import { DragSourceContext as java_awt_dnd_DragSourceContext } from "./DragSourceContext";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { Class as java_lang_Class } from "./../../lang/Class";
import { Boolean as java_lang_Boolean } from "./../../lang/Boolean";
/**
 * This class just defines types, you should import {@link DragSourceDropEvent} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DragSourceDropEventClass extends JavaClass {
    /**
     * @return original return type: 'int'
     */
    getDropAction(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getDropActionSync(): number;
    /**
     * @return original return type: 'boolean'
     */
    getDropSuccess(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getDropSuccessSync(): boolean;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getLocation(): Promise<java_awt_Point | null>;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getLocationSync(): java_awt_Point | null;
    /**
     * @return original return type: 'int'
     */
    getX(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getXSync(): number;
    /**
     * @return original return type: 'int'
     */
    getY(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getYSync(): number;
    /**
     * @return original return type: 'java.awt.dnd.DragSourceContext'
     */
    getDragSourceContext(): Promise<java_awt_dnd_DragSourceContext | null>;
    /**
     * @return original return type: 'java.awt.dnd.DragSourceContext'
     */
    getDragSourceContextSync(): java_awt_dnd_DragSourceContext | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'java.lang.Object'
     */
    getSource(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    getSourceSync(): BasicOrJavaType | null;
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
     * @param var0 original type: 'java.awt.dnd.DragSourceContext'
     * @return original return type: 'java.awt.dnd.DragSourceDropEvent'
     */
    static newInstance(var0: java_awt_dnd_DragSourceContext | null): Promise<DragSourceDropEvent>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceContext'
     * @param var1 original type: 'int'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'java.awt.dnd.DragSourceDropEvent'
     */
    static newInstance(var0: java_awt_dnd_DragSourceContext | null, var1: java_lang_Integer | number, var2: java_lang_Boolean | boolean, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<DragSourceDropEvent>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceContext'
     * @param var1 original type: 'int'
     * @param var2 original type: 'boolean'
     * @return original return type: 'java.awt.dnd.DragSourceDropEvent'
     */
    static newInstance(var0: java_awt_dnd_DragSourceContext | null, var1: java_lang_Integer | number, var2: java_lang_Boolean | boolean): Promise<DragSourceDropEvent>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceContext'
     */
    constructor(var0: java_awt_dnd_DragSourceContext | null);
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceContext'
     * @param var1 original type: 'int'
     * @param var2 original type: 'boolean'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     */
    constructor(var0: java_awt_dnd_DragSourceContext | null, var1: java_lang_Integer | number, var2: java_lang_Boolean | boolean, var3: java_lang_Integer | number, var4: java_lang_Integer | number);
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceContext'
     * @param var1 original type: 'int'
     * @param var2 original type: 'boolean'
     */
    constructor(var0: java_awt_dnd_DragSourceContext | null, var1: java_lang_Integer | number, var2: java_lang_Boolean | boolean);
}
declare const DragSourceDropEvent_base: typeof DragSourceDropEventClass;
/**
 * Class java.awt.dnd.DragSourceDropEvent.
 *
 * This actually imports the java class for further use.
 * The class {@link DragSourceDropEventClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DragSourceDropEvent extends DragSourceDropEvent_base {
}
export default DragSourceDropEvent;
//# sourceMappingURL=DragSourceDropEvent.d.ts.map
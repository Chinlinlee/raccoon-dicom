import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Cursor as java_awt_Cursor } from "./../Cursor";
import { EventListener as java_util_EventListener } from "./../../util/EventListener";
import { Class as java_lang_Class } from "./../../lang/Class";
import { DragGestureRecognizer as java_awt_dnd_DragGestureRecognizer } from "./DragGestureRecognizer";
import { Component as java_awt_Component } from "./../Component";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { DragGestureListener as java_awt_dnd_DragGestureListener, DragGestureListenerInterface as java_awt_dnd_DragGestureListenerInterface } from "./DragGestureListener";
import { FlavorMap as java_awt_datatransfer_FlavorMap, FlavorMapInterface as java_awt_datatransfer_FlavorMapInterface } from "./../datatransfer/FlavorMap";
import { DragGestureEvent as java_awt_dnd_DragGestureEvent } from "./DragGestureEvent";
import { Image as java_awt_Image } from "./../Image";
import { Point as java_awt_Point } from "./../Point";
import { Transferable as java_awt_datatransfer_Transferable, TransferableInterface as java_awt_datatransfer_TransferableInterface } from "./../datatransfer/Transferable";
import { DragSourceListener as java_awt_dnd_DragSourceListener, DragSourceListenerInterface as java_awt_dnd_DragSourceListenerInterface } from "./DragSourceListener";
import { DragSourceMotionListener as java_awt_dnd_DragSourceMotionListener, DragSourceMotionListenerInterface as java_awt_dnd_DragSourceMotionListenerInterface } from "./DragSourceMotionListener";
import { Long as java_lang_Long } from "./../../lang/Long";
/**
 * This class just defines types, you should import {@link DragSource} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DragSourceClass extends JavaClass {
    /**
     * Original type: 'java.awt.Cursor'
     */
    static readonly DefaultCopyDrop: java_awt_Cursor | null;
    /**
     * Original type: 'java.awt.Cursor'
     */
    static readonly DefaultMoveDrop: java_awt_Cursor | null;
    /**
     * Original type: 'java.awt.Cursor'
     */
    static readonly DefaultLinkDrop: java_awt_Cursor | null;
    /**
     * Original type: 'java.awt.Cursor'
     */
    static readonly DefaultCopyNoDrop: java_awt_Cursor | null;
    /**
     * Original type: 'java.awt.Cursor'
     */
    static readonly DefaultMoveNoDrop: java_awt_Cursor | null;
    /**
     * Original type: 'java.awt.Cursor'
     */
    static readonly DefaultLinkNoDrop: java_awt_Cursor | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.EventListener[]'
     */
    getListeners(var0: java_lang_Class | null): Promise<(java_util_EventListener | null)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @return original return type: 'java.util.EventListener[]'
     */
    getListenersSync(var0: java_lang_Class | null): (java_util_EventListener | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.awt.Component'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.awt.dnd.DragGestureListener'
     * @return original return type: 'java.awt.dnd.DragGestureRecognizer'
     */
    createDragGestureRecognizer(var0: java_lang_Class | null, var1: java_awt_Component | null, var2: java_lang_Integer | number, var3: java_awt_dnd_DragGestureListener | JavaInterfaceProxy<java_awt_dnd_DragGestureListenerInterface> | null): Promise<java_awt_dnd_DragGestureRecognizer | null>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.awt.Component'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.awt.dnd.DragGestureListener'
     * @return original return type: 'java.awt.dnd.DragGestureRecognizer'
     */
    createDragGestureRecognizerSync(var0: java_lang_Class | null, var1: java_awt_Component | null, var2: java_lang_Integer | number, var3: java_awt_dnd_DragGestureListener | JavaInterfaceProxy<java_awt_dnd_DragGestureListenerInterface> | null): java_awt_dnd_DragGestureRecognizer | null;
    /**
     * @return original return type: 'java.awt.datatransfer.FlavorMap'
     */
    getFlavorMap(): Promise<java_awt_datatransfer_FlavorMap | null>;
    /**
     * @return original return type: 'java.awt.datatransfer.FlavorMap'
     */
    getFlavorMapSync(): java_awt_datatransfer_FlavorMap | null;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.Image'
     * @param var3 original type: 'java.awt.Point'
     * @param var4 original type: 'java.awt.datatransfer.Transferable'
     * @param var5 original type: 'java.awt.dnd.DragSourceListener'
     * @param var6 original type: 'java.awt.datatransfer.FlavorMap'
     * @return original return type: 'void'
     */
    startDrag(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_Image | null, var3: java_awt_Point | null, var4: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var5: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null, var6: java_awt_datatransfer_FlavorMap | JavaInterfaceProxy<java_awt_datatransfer_FlavorMapInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.Image'
     * @param var3 original type: 'java.awt.Point'
     * @param var4 original type: 'java.awt.datatransfer.Transferable'
     * @param var5 original type: 'java.awt.dnd.DragSourceListener'
     * @param var6 original type: 'java.awt.datatransfer.FlavorMap'
     * @return original return type: 'void'
     */
    startDragSync(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_Image | null, var3: java_awt_Point | null, var4: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var5: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null, var6: java_awt_datatransfer_FlavorMap | JavaInterfaceProxy<java_awt_datatransfer_FlavorMapInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.datatransfer.Transferable'
     * @param var3 original type: 'java.awt.dnd.DragSourceListener'
     * @param var4 original type: 'java.awt.datatransfer.FlavorMap'
     * @return original return type: 'void'
     */
    startDrag(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var3: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null, var4: java_awt_datatransfer_FlavorMap | JavaInterfaceProxy<java_awt_datatransfer_FlavorMapInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.datatransfer.Transferable'
     * @param var3 original type: 'java.awt.dnd.DragSourceListener'
     * @param var4 original type: 'java.awt.datatransfer.FlavorMap'
     * @return original return type: 'void'
     */
    startDragSync(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var3: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null, var4: java_awt_datatransfer_FlavorMap | JavaInterfaceProxy<java_awt_datatransfer_FlavorMapInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.Image'
     * @param var3 original type: 'java.awt.Point'
     * @param var4 original type: 'java.awt.datatransfer.Transferable'
     * @param var5 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    startDrag(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_Image | null, var3: java_awt_Point | null, var4: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var5: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.Image'
     * @param var3 original type: 'java.awt.Point'
     * @param var4 original type: 'java.awt.datatransfer.Transferable'
     * @param var5 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    startDragSync(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_Image | null, var3: java_awt_Point | null, var4: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var5: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.datatransfer.Transferable'
     * @param var3 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    startDrag(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var3: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragGestureEvent'
     * @param var1 original type: 'java.awt.Cursor'
     * @param var2 original type: 'java.awt.datatransfer.Transferable'
     * @param var3 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    startDragSync(var0: java_awt_dnd_DragGestureEvent | null, var1: java_awt_Cursor | null, var2: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null, var3: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    addDragSourceListener(var0: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    addDragSourceListenerSync(var0: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceMotionListener'
     * @return original return type: 'void'
     */
    addDragSourceMotionListener(var0: java_awt_dnd_DragSourceMotionListener | JavaInterfaceProxy<java_awt_dnd_DragSourceMotionListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceMotionListener'
     * @return original return type: 'void'
     */
    addDragSourceMotionListenerSync(var0: java_awt_dnd_DragSourceMotionListener | JavaInterfaceProxy<java_awt_dnd_DragSourceMotionListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.dnd.DragSource'
     */
    static getDefaultDragSource(): Promise<DragSource | null>;
    /**
     * @return original return type: 'java.awt.dnd.DragSource'
     */
    static getDefaultDragSourceSync(): DragSource | null;
    /**
     * @return original return type: 'boolean'
     */
    static isDragImageSupported(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    static isDragImageSupportedSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.awt.dnd.DragGestureListener'
     * @return original return type: 'java.awt.dnd.DragGestureRecognizer'
     */
    createDefaultDragGestureRecognizer(var0: java_awt_Component | null, var1: java_lang_Integer | number, var2: java_awt_dnd_DragGestureListener | JavaInterfaceProxy<java_awt_dnd_DragGestureListenerInterface> | null): Promise<java_awt_dnd_DragGestureRecognizer | null>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.awt.dnd.DragGestureListener'
     * @return original return type: 'java.awt.dnd.DragGestureRecognizer'
     */
    createDefaultDragGestureRecognizerSync(var0: java_awt_Component | null, var1: java_lang_Integer | number, var2: java_awt_dnd_DragGestureListener | JavaInterfaceProxy<java_awt_dnd_DragGestureListenerInterface> | null): java_awt_dnd_DragGestureRecognizer | null;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    removeDragSourceListener(var0: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceListener'
     * @return original return type: 'void'
     */
    removeDragSourceListenerSync(var0: java_awt_dnd_DragSourceListener | JavaInterfaceProxy<java_awt_dnd_DragSourceListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.dnd.DragSourceListener[]'
     */
    getDragSourceListeners(): Promise<(java_awt_dnd_DragSourceListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.dnd.DragSourceListener[]'
     */
    getDragSourceListenersSync(): (java_awt_dnd_DragSourceListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceMotionListener'
     * @return original return type: 'void'
     */
    removeDragSourceMotionListener(var0: java_awt_dnd_DragSourceMotionListener | JavaInterfaceProxy<java_awt_dnd_DragSourceMotionListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DragSourceMotionListener'
     * @return original return type: 'void'
     */
    removeDragSourceMotionListenerSync(var0: java_awt_dnd_DragSourceMotionListener | JavaInterfaceProxy<java_awt_dnd_DragSourceMotionListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.dnd.DragSourceMotionListener[]'
     */
    getDragSourceMotionListeners(): Promise<(java_awt_dnd_DragSourceMotionListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.dnd.DragSourceMotionListener[]'
     */
    getDragSourceMotionListenersSync(): (java_awt_dnd_DragSourceMotionListener | null)[] | null;
    /**
     * @return original return type: 'int'
     */
    static getDragThreshold(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    static getDragThresholdSync(): number;
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
     * @return original return type: 'java.awt.dnd.DragSource'
     */
    static newInstance(): Promise<DragSource>;
    constructor();
}
declare const DragSource_base: typeof DragSourceClass;
/**
 * Class java.awt.dnd.DragSource.
 *
 * This actually imports the java class for further use.
 * The class {@link DragSourceClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DragSource extends DragSource_base {
}
export default DragSource;
//# sourceMappingURL=DragSource.d.ts.map
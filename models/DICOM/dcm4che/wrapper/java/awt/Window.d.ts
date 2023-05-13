import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Float as java_lang_Float } from "./../lang/Float";
import { Integer as java_lang_Integer } from "./../lang/Integer";
import { Window$Type as java_awt_Window$Type } from "./Window$Type";
import { Dimension as java_awt_Dimension } from "./Dimension";
import { Locale as java_util_Locale } from "./../util/Locale";
import { Rectangle as java_awt_Rectangle } from "./Rectangle";
import { Point as java_awt_Point } from "./Point";
import { Color as java_awt_Color } from "./Color";
import { PropertyChangeListener as java_beans_PropertyChangeListener, PropertyChangeListenerInterface as java_beans_PropertyChangeListenerInterface } from "./../beans/PropertyChangeListener";
import { EventListener as java_util_EventListener } from "./../util/EventListener";
import { Class as java_lang_Class } from "./../lang/Class";
import { Shape as java_awt_Shape, ShapeInterface as java_awt_ShapeInterface } from "./Shape";
import { Boolean as java_lang_Boolean } from "./../lang/Boolean";
import { Toolkit as java_awt_Toolkit } from "./Toolkit";
import { List as java_util_List, ListInterface as java_util_ListInterface } from "./../util/List";
import { Event as java_awt_Event } from "./Event";
import { Cursor as java_awt_Cursor } from "./Cursor";
import { Component as java_awt_Component } from "./Component";
import { ResourceBundle as java_util_ResourceBundle } from "./../util/ResourceBundle";
import { WindowListener as java_awt_event_WindowListener, WindowListenerInterface as java_awt_event_WindowListenerInterface } from "./event/WindowListener";
import { WindowFocusListener as java_awt_event_WindowFocusListener, WindowFocusListenerInterface as java_awt_event_WindowFocusListenerInterface } from "./event/WindowFocusListener";
import { WindowStateListener as java_awt_event_WindowStateListener, WindowStateListenerInterface as java_awt_event_WindowStateListenerInterface } from "./event/WindowStateListener";
import { Dialog$ModalExclusionType as java_awt_Dialog$ModalExclusionType } from "./Dialog$ModalExclusionType";
import { BufferCapabilities as java_awt_BufferCapabilities } from "./BufferCapabilities";
import { BufferStrategy as java_awt_image_BufferStrategy } from "./image/BufferStrategy";
import { Graphics as java_awt_Graphics } from "./Graphics";
import { Image as java_awt_Image } from "./Image";
import { InputContext as java_awt_im_InputContext } from "./im/InputContext";
import { Set as java_util_Set, SetInterface as java_util_SetInterface } from "./../util/Set";
import { Container as java_awt_Container } from "./Container";
import { AccessibleContext as javax_accessibility_AccessibleContext } from "./../../javax/accessibility/AccessibleContext";
import { PopupMenu as java_awt_PopupMenu } from "./PopupMenu";
import { MenuComponent as java_awt_MenuComponent } from "./MenuComponent";
import { PrintWriter as java_io_PrintWriter } from "./../io/PrintWriter";
import { PrintStream as java_io_PrintStream } from "./../io/PrintStream";
import { Font as java_awt_Font } from "./Font";
import { Insets as java_awt_Insets } from "./Insets";
import { LayoutManager as java_awt_LayoutManager, LayoutManagerInterface as java_awt_LayoutManagerInterface } from "./LayoutManager";
import { FocusTraversalPolicy as java_awt_FocusTraversalPolicy } from "./FocusTraversalPolicy";
import { ComponentOrientation as java_awt_ComponentOrientation } from "./ComponentOrientation";
import { ContainerListener as java_awt_event_ContainerListener, ContainerListenerInterface as java_awt_event_ContainerListenerInterface } from "./event/ContainerListener";
import { ColorModel as java_awt_image_ColorModel } from "./image/ColorModel";
import { ImageProducer as java_awt_image_ImageProducer, ImageProducerInterface as java_awt_image_ImageProducerInterface } from "./image/ImageProducer";
import { FontMetrics as java_awt_FontMetrics } from "./FontMetrics";
import { Byte as java_lang_Byte } from "./../lang/Byte";
import { Double as java_lang_Double } from "./../lang/Double";
import { Short as java_lang_Short } from "./../lang/Short";
import { Long as java_lang_Long } from "./../lang/Long";
import { ImageObserver as java_awt_image_ImageObserver, ImageObserverInterface as java_awt_image_ImageObserverInterface } from "./image/ImageObserver";
import { GraphicsConfiguration as java_awt_GraphicsConfiguration } from "./GraphicsConfiguration";
import { FocusEvent$Cause as java_awt_event_FocusEvent$Cause } from "./event/FocusEvent$Cause";
import { AWTEvent as java_awt_AWTEvent } from "./AWTEvent";
import { VolatileImage as java_awt_image_VolatileImage } from "./image/VolatileImage";
import { ImageCapabilities as java_awt_ImageCapabilities } from "./ImageCapabilities";
import { ComponentListener as java_awt_event_ComponentListener, ComponentListenerInterface as java_awt_event_ComponentListenerInterface } from "./event/ComponentListener";
import { FocusListener as java_awt_event_FocusListener, FocusListenerInterface as java_awt_event_FocusListenerInterface } from "./event/FocusListener";
import { KeyListener as java_awt_event_KeyListener, KeyListenerInterface as java_awt_event_KeyListenerInterface } from "./event/KeyListener";
import { MouseListener as java_awt_event_MouseListener, MouseListenerInterface as java_awt_event_MouseListenerInterface } from "./event/MouseListener";
import { MouseMotionListener as java_awt_event_MouseMotionListener, MouseMotionListenerInterface as java_awt_event_MouseMotionListenerInterface } from "./event/MouseMotionListener";
import { InputMethodListener as java_awt_event_InputMethodListener, InputMethodListenerInterface as java_awt_event_InputMethodListenerInterface } from "./event/InputMethodListener";
import { HierarchyListener as java_awt_event_HierarchyListener, HierarchyListenerInterface as java_awt_event_HierarchyListenerInterface } from "./event/HierarchyListener";
import { HierarchyBoundsListener as java_awt_event_HierarchyBoundsListener, HierarchyBoundsListenerInterface as java_awt_event_HierarchyBoundsListenerInterface } from "./event/HierarchyBoundsListener";
import { MouseWheelListener as java_awt_event_MouseWheelListener, MouseWheelListenerInterface as java_awt_event_MouseWheelListenerInterface } from "./event/MouseWheelListener";
import { DropTarget as java_awt_dnd_DropTarget } from "./dnd/DropTarget";
import { Component$BaselineResizeBehavior as java_awt_Component$BaselineResizeBehavior } from "./Component$BaselineResizeBehavior";
import { InputMethodRequests as java_awt_im_InputMethodRequests } from "./im/InputMethodRequests";
import { Frame as java_awt_Frame } from "./Frame";
/**
 * This class just defines types, you should import {@link Window} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class WindowClass extends JavaClass {
    /**
     * Original type: 'float'
     */
    static readonly TOP_ALIGNMENT: java_lang_Float | number;
    /**
     * Original type: 'float'
     */
    static readonly CENTER_ALIGNMENT: java_lang_Float | number;
    /**
     * Original type: 'float'
     */
    static readonly BOTTOM_ALIGNMENT: java_lang_Float | number;
    /**
     * Original type: 'float'
     */
    static readonly LEFT_ALIGNMENT: java_lang_Float | number;
    /**
     * Original type: 'float'
     */
    static readonly RIGHT_ALIGNMENT: java_lang_Float | number;
    /**
     * Original type: 'int'
     */
    static readonly WIDTH: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly HEIGHT: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly PROPERTIES: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly SOMEBITS: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly FRAMEBITS: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly ALLBITS: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly ERROR: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly ABORT: java_lang_Integer | number;
    /**
     * @return original return type: 'java.awt.Window$Type'
     */
    getType(): Promise<java_awt_Window$Type | null>;
    /**
     * @return original return type: 'java.awt.Window$Type'
     */
    getTypeSync(): java_awt_Window$Type | null;
    /**
     * @return original return type: 'boolean'
     */
    isOpaque(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isOpaqueSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isActive(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isActiveSync(): boolean;
    /**
     * @return original return type: 'java.awt.Window'
     */
    getOwner(): Promise<Window | null>;
    /**
     * @return original return type: 'java.awt.Window'
     */
    getOwnerSync(): Window | null;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setSize(var0: java_awt_Dimension | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setSizeSync(var0: java_awt_Dimension | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    setSize(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    setSizeSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): void;
    /**
     * @return original return type: 'java.util.Locale'
     */
    getLocale(): Promise<java_util_Locale | null>;
    /**
     * @return original return type: 'java.util.Locale'
     */
    getLocaleSync(): java_util_Locale | null;
    /**
     * @return original return type: 'void'
     */
    dispose(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    disposeSync(): void;
    /**
     * @param var0 original type: 'java.awt.Window$Type'
     * @return original return type: 'void'
     */
    setType(var0: java_awt_Window$Type | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Window$Type'
     * @return original return type: 'void'
     */
    setTypeSync(var0: java_awt_Window$Type | null): void;
    /**
     * @param var0 original type: 'java.awt.Rectangle'
     * @return original return type: 'void'
     */
    setBounds(var0: java_awt_Rectangle | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Rectangle'
     * @return original return type: 'void'
     */
    setBoundsSync(var0: java_awt_Rectangle | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'void'
     */
    setBounds(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'void'
     */
    setBoundsSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'void'
     */
    reshape(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'void'
     */
    reshapeSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'void'
     */
    setLocation(var0: java_awt_Point | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'void'
     */
    setLocationSync(var0: java_awt_Point | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    setLocation(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    setLocationSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.Color'
     * @return original return type: 'void'
     */
    setBackground(var0: java_awt_Color | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Color'
     * @return original return type: 'void'
     */
    setBackgroundSync(var0: java_awt_Color | null): void;
    /**
     * @return original return type: 'java.awt.Color'
     */
    getBackground(): Promise<java_awt_Color | null>;
    /**
     * @return original return type: 'java.awt.Color'
     */
    getBackgroundSync(): java_awt_Color | null;
    /**
     * @param var0 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    addPropertyChangeListener(var0: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    addPropertyChangeListenerSync(var0: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    addPropertyChangeListener(var0: string | null, var1: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    addPropertyChangeListenerSync(var0: string | null, var1: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): void;
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
     * @return original return type: 'boolean'
     */
    isAlwaysOnTopSupported(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isAlwaysOnTopSupportedSync(): boolean;
    /**
     * @return original return type: 'java.awt.Shape'
     */
    getShape(): Promise<java_awt_Shape | null>;
    /**
     * @return original return type: 'java.awt.Shape'
     */
    getShapeSync(): java_awt_Shape | null;
    /**
     * @param var0 original type: 'java.awt.Shape'
     * @return original return type: 'void'
     */
    setShape(var0: java_awt_Shape | JavaInterfaceProxy<java_awt_ShapeInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Shape'
     * @return original return type: 'void'
     */
    setShapeSync(var0: java_awt_Shape | JavaInterfaceProxy<java_awt_ShapeInterface> | null): void;
    /**
     * @return original return type: 'float'
     */
    getOpacity(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getOpacitySync(): number;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    setOpacity(var0: java_lang_Float | number): Promise<void>;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    setOpacitySync(var0: java_lang_Float | number): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setVisible(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setVisibleSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'void'
     */
    toFront(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    toFrontSync(): void;
    /**
     * @return original return type: 'java.awt.Toolkit'
     */
    getToolkit(): Promise<java_awt_Toolkit | null>;
    /**
     * @return original return type: 'java.awt.Toolkit'
     */
    getToolkitSync(): java_awt_Toolkit | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setLocationByPlatform(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setLocationByPlatformSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    isAlwaysOnTop(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isAlwaysOnTopSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setAlwaysOnTop(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setAlwaysOnTopSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'java.util.List'
     * @return original return type: 'void'
     */
    setIconImages(var0: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.List'
     * @return original return type: 'void'
     */
    setIconImagesSync(var0: java_util_List | JavaInterfaceProxy<java_util_ListInterface> | null): void;
    /**
     * @return original return type: 'void'
     */
    addNotify(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    addNotifySync(): void;
    /**
     * @return original return type: 'void'
     */
    removeNotify(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    removeNotifySync(): void;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setMinimumSize(var0: java_awt_Dimension | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setMinimumSizeSync(var0: java_awt_Dimension | null): void;
    /**
     * @return original return type: 'void'
     */
    show(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    showSync(): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    show(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    showSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    isShowing(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isShowingSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @return original return type: 'boolean'
     */
    postEvent(var0: java_awt_Event | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @return original return type: 'boolean'
     */
    postEventSync(var0: java_awt_Event | null): boolean;
    /**
     * @return original return type: 'void'
     */
    hide(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    hideSync(): void;
    /**
     * @return original return type: 'void'
     */
    toBack(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    toBackSync(): void;
    /**
     * @param var0 original type: 'java.awt.Cursor'
     * @return original return type: 'void'
     */
    setCursor(var0: java_awt_Cursor | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Cursor'
     * @return original return type: 'void'
     */
    setCursorSync(var0: java_awt_Cursor | null): void;
    /**
     * @return original return type: 'java.awt.Window[]'
     */
    static getWindows(): Promise<(Window | null)[] | null>;
    /**
     * @return original return type: 'java.awt.Window[]'
     */
    static getWindowsSync(): (Window | null)[] | null;
    /**
     * @return original return type: 'java.awt.Window[]'
     */
    getOwnedWindows(): Promise<(Window | null)[] | null>;
    /**
     * @return original return type: 'java.awt.Window[]'
     */
    getOwnedWindowsSync(): (Window | null)[] | null;
    /**
     * @return original return type: 'boolean'
     */
    isFocused(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusedSync(): boolean;
    /**
     * @return original return type: 'java.awt.Component'
     */
    getFocusOwner(): Promise<java_awt_Component | null>;
    /**
     * @return original return type: 'java.awt.Component'
     */
    getFocusOwnerSync(): java_awt_Component | null;
    /**
     * @return original return type: 'java.awt.Component'
     */
    getMostRecentFocusOwner(): Promise<java_awt_Component | null>;
    /**
     * @return original return type: 'java.awt.Component'
     */
    getMostRecentFocusOwnerSync(): java_awt_Component | null;
    /**
     * @return original return type: 'boolean'
     */
    isFocusableWindow(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusableWindowSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    getFocusableWindowState(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getFocusableWindowStateSync(): boolean;
    /**
     * @param var0 original type: 'java.util.ResourceBundle'
     * @return original return type: 'void'
     */
    applyResourceBundle(var0: java_util_ResourceBundle | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.ResourceBundle'
     * @return original return type: 'void'
     */
    applyResourceBundleSync(var0: java_util_ResourceBundle | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    applyResourceBundle(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    applyResourceBundleSync(var0: string | null): void;
    /**
     * @param var0 original type: 'java.awt.event.WindowListener'
     * @return original return type: 'void'
     */
    addWindowListener(var0: java_awt_event_WindowListener | JavaInterfaceProxy<java_awt_event_WindowListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.WindowListener'
     * @return original return type: 'void'
     */
    addWindowListenerSync(var0: java_awt_event_WindowListener | JavaInterfaceProxy<java_awt_event_WindowListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.WindowFocusListener'
     * @return original return type: 'void'
     */
    addWindowFocusListener(var0: java_awt_event_WindowFocusListener | JavaInterfaceProxy<java_awt_event_WindowFocusListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.WindowFocusListener'
     * @return original return type: 'void'
     */
    addWindowFocusListenerSync(var0: java_awt_event_WindowFocusListener | JavaInterfaceProxy<java_awt_event_WindowFocusListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.WindowStateListener'
     * @return original return type: 'void'
     */
    addWindowStateListener(var0: java_awt_event_WindowStateListener | JavaInterfaceProxy<java_awt_event_WindowStateListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.WindowStateListener'
     * @return original return type: 'void'
     */
    addWindowStateListenerSync(var0: java_awt_event_WindowStateListener | JavaInterfaceProxy<java_awt_event_WindowStateListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.Dialog$ModalExclusionType'
     * @return original return type: 'void'
     */
    setModalExclusionType(var0: java_awt_Dialog$ModalExclusionType | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Dialog$ModalExclusionType'
     * @return original return type: 'void'
     */
    setModalExclusionTypeSync(var0: java_awt_Dialog$ModalExclusionType | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    createBufferStrategy(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    createBufferStrategySync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.awt.BufferCapabilities'
     * @return original return type: 'void'
     */
    createBufferStrategy(var0: java_lang_Integer | number, var1: java_awt_BufferCapabilities | null): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.awt.BufferCapabilities'
     * @return original return type: 'void'
     */
    createBufferStrategySync(var0: java_lang_Integer | number, var1: java_awt_BufferCapabilities | null): void;
    /**
     * @return original return type: 'java.awt.image.BufferStrategy'
     */
    getBufferStrategy(): Promise<java_awt_image_BufferStrategy | null>;
    /**
     * @return original return type: 'java.awt.image.BufferStrategy'
     */
    getBufferStrategySync(): java_awt_image_BufferStrategy | null;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    paint(var0: java_awt_Graphics | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    paintSync(var0: java_awt_Graphics | null): void;
    /**
     * @return original return type: 'java.util.List'
     */
    getIconImages(): Promise<java_util_List | null>;
    /**
     * @return original return type: 'java.util.List'
     */
    getIconImagesSync(): java_util_List | null;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @return original return type: 'void'
     */
    setIconImage(var0: java_awt_Image | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @return original return type: 'void'
     */
    setIconImageSync(var0: java_awt_Image | null): void;
    /**
     * @return original return type: 'void'
     */
    pack(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    packSync(): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    getWarningString(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getWarningStringSync(): string | null;
    /**
     * @return original return type: 'java.awt.im.InputContext'
     */
    getInputContext(): Promise<java_awt_im_InputContext | null>;
    /**
     * @return original return type: 'java.awt.im.InputContext'
     */
    getInputContextSync(): java_awt_im_InputContext | null;
    /**
     * @return original return type: 'java.awt.Window[]'
     */
    static getOwnerlessWindows(): Promise<(Window | null)[] | null>;
    /**
     * @return original return type: 'java.awt.Window[]'
     */
    static getOwnerlessWindowsSync(): (Window | null)[] | null;
    /**
     * @return original return type: 'java.awt.Dialog$ModalExclusionType'
     */
    getModalExclusionType(): Promise<java_awt_Dialog$ModalExclusionType | null>;
    /**
     * @return original return type: 'java.awt.Dialog$ModalExclusionType'
     */
    getModalExclusionTypeSync(): java_awt_Dialog$ModalExclusionType | null;
    /**
     * @param var0 original type: 'java.awt.event.WindowListener'
     * @return original return type: 'void'
     */
    removeWindowListener(var0: java_awt_event_WindowListener | JavaInterfaceProxy<java_awt_event_WindowListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.WindowListener'
     * @return original return type: 'void'
     */
    removeWindowListenerSync(var0: java_awt_event_WindowListener | JavaInterfaceProxy<java_awt_event_WindowListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.WindowStateListener'
     * @return original return type: 'void'
     */
    removeWindowStateListener(var0: java_awt_event_WindowStateListener | JavaInterfaceProxy<java_awt_event_WindowStateListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.WindowStateListener'
     * @return original return type: 'void'
     */
    removeWindowStateListenerSync(var0: java_awt_event_WindowStateListener | JavaInterfaceProxy<java_awt_event_WindowStateListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.WindowFocusListener'
     * @return original return type: 'void'
     */
    removeWindowFocusListener(var0: java_awt_event_WindowFocusListener | JavaInterfaceProxy<java_awt_event_WindowFocusListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.WindowFocusListener'
     * @return original return type: 'void'
     */
    removeWindowFocusListenerSync(var0: java_awt_event_WindowFocusListener | JavaInterfaceProxy<java_awt_event_WindowFocusListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.WindowListener[]'
     */
    getWindowListeners(): Promise<(java_awt_event_WindowListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.WindowListener[]'
     */
    getWindowListenersSync(): (java_awt_event_WindowListener | null)[] | null;
    /**
     * @return original return type: 'java.awt.event.WindowFocusListener[]'
     */
    getWindowFocusListeners(): Promise<(java_awt_event_WindowFocusListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.WindowFocusListener[]'
     */
    getWindowFocusListenersSync(): (java_awt_event_WindowFocusListener | null)[] | null;
    /**
     * @return original return type: 'java.awt.event.WindowStateListener[]'
     */
    getWindowStateListeners(): Promise<(java_awt_event_WindowStateListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.WindowStateListener[]'
     */
    getWindowStateListenersSync(): (java_awt_event_WindowStateListener | null)[] | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.util.Set'
     */
    getFocusTraversalKeys(var0: java_lang_Integer | number): Promise<java_util_Set | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.util.Set'
     */
    getFocusTraversalKeysSync(var0: java_lang_Integer | number): java_util_Set | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusCycleRoot(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusCycleRootSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    isFocusCycleRoot(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusCycleRootSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.Container'
     * @return original return type: 'boolean'
     */
    isFocusCycleRoot(var0: java_awt_Container | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Container'
     * @return original return type: 'boolean'
     */
    isFocusCycleRootSync(var0: java_awt_Container | null): boolean;
    /**
     * @return original return type: 'java.awt.Container'
     */
    getFocusCycleRootAncestor(): Promise<java_awt_Container | null>;
    /**
     * @return original return type: 'java.awt.Container'
     */
    getFocusCycleRootAncestorSync(): java_awt_Container | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusableWindowState(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusableWindowStateSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setAutoRequestFocus(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setAutoRequestFocusSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    isAutoRequestFocus(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isAutoRequestFocusSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isValidateRoot(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isValidateRootSync(): boolean;
    /**
     * @return original return type: 'javax.accessibility.AccessibleContext'
     */
    getAccessibleContext(): Promise<javax_accessibility_AccessibleContext | null>;
    /**
     * @return original return type: 'javax.accessibility.AccessibleContext'
     */
    getAccessibleContextSync(): javax_accessibility_AccessibleContext | null;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'void'
     */
    setLocationRelativeTo(var0: java_awt_Component | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'void'
     */
    setLocationRelativeToSync(var0: java_awt_Component | null): void;
    /**
     * @return original return type: 'boolean'
     */
    isLocationByPlatform(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isLocationByPlatformSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'java.awt.Component'
     */
    add(var0: java_awt_Component | null): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'java.awt.Component'
     */
    addSync(var0: java_awt_Component | null): java_awt_Component | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.awt.Component'
     * @return original return type: 'java.awt.Component'
     */
    add(var0: string | null, var1: java_awt_Component | null): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.awt.Component'
     * @return original return type: 'java.awt.Component'
     */
    addSync(var0: string | null, var1: java_awt_Component | null): java_awt_Component | null;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    add(var0: java_awt_Component | null, var1: BasicOrJavaType | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'void'
     */
    addSync(var0: java_awt_Component | null, var1: BasicOrJavaType | null): void;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    add(var0: java_awt_Component | null, var1: java_lang_Integer | number): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    addSync(var0: java_awt_Component | null, var1: java_lang_Integer | number): java_awt_Component | null;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'java.lang.Object'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    add(var0: java_awt_Component | null, var1: BasicOrJavaType | null, var2: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'java.lang.Object'
     * @param var2 original type: 'int'
     * @return original return type: 'void'
     */
    addSync(var0: java_awt_Component | null, var1: BasicOrJavaType | null, var2: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.PopupMenu'
     * @return original return type: 'void'
     */
    add(var0: java_awt_PopupMenu | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.PopupMenu'
     * @return original return type: 'void'
     */
    addSync(var0: java_awt_PopupMenu | null): void;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'void'
     */
    remove(var0: java_awt_Component | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'void'
     */
    removeSync(var0: java_awt_Component | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    remove(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    removeSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.MenuComponent'
     * @return original return type: 'void'
     */
    remove(var0: java_awt_MenuComponent | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.MenuComponent'
     * @return original return type: 'void'
     */
    removeSync(var0: java_awt_MenuComponent | null): void;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    update(var0: java_awt_Graphics | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    updateSync(var0: java_awt_Graphics | null): void;
    /**
     * @param var0 original type: 'java.io.PrintWriter'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    list(var0: java_io_PrintWriter | null, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'java.io.PrintWriter'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    listSync(var0: java_io_PrintWriter | null, var1: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.io.PrintStream'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    list(var0: java_io_PrintStream | null, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'java.io.PrintStream'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    listSync(var0: java_io_PrintStream | null, var1: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.io.PrintStream'
     * @return original return type: 'void'
     */
    list(var0: java_io_PrintStream | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.PrintStream'
     * @return original return type: 'void'
     */
    listSync(var0: java_io_PrintStream | null): void;
    /**
     * @return original return type: 'void'
     */
    list(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    listSync(): void;
    /**
     * @param var0 original type: 'java.io.PrintWriter'
     * @return original return type: 'void'
     */
    list(var0: java_io_PrintWriter | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.PrintWriter'
     * @return original return type: 'void'
     */
    listSync(var0: java_io_PrintWriter | null): void;
    /**
     * @return original return type: 'void'
     */
    validate(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    validateSync(): void;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    print(var0: java_awt_Graphics | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    printSync(var0: java_awt_Graphics | null): void;
    /**
     * @return original return type: 'void'
     */
    removeAll(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    removeAllSync(): void;
    /**
     * @return original return type: 'java.awt.Component[]'
     */
    getComponents(): Promise<(java_awt_Component | null)[] | null>;
    /**
     * @return original return type: 'java.awt.Component[]'
     */
    getComponentsSync(): (java_awt_Component | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.Font'
     * @return original return type: 'void'
     */
    setFont(var0: java_awt_Font | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Font'
     * @return original return type: 'void'
     */
    setFontSync(var0: java_awt_Font | null): void;
    /**
     * @return original return type: 'java.awt.Insets'
     */
    insets(): Promise<java_awt_Insets | null>;
    /**
     * @return original return type: 'java.awt.Insets'
     */
    insetsSync(): java_awt_Insets | null;
    /**
     * @return original return type: 'void'
     */
    layout(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    layoutSync(): void;
    /**
     * @return original return type: 'void'
     */
    invalidate(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    invalidateSync(): void;
    /**
     * @param var0 original type: 'java.awt.LayoutManager'
     * @return original return type: 'void'
     */
    setLayout(var0: java_awt_LayoutManager | JavaInterfaceProxy<java_awt_LayoutManagerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.LayoutManager'
     * @return original return type: 'void'
     */
    setLayoutSync(var0: java_awt_LayoutManager | JavaInterfaceProxy<java_awt_LayoutManagerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getPreferredSize(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getPreferredSizeSync(): java_awt_Dimension | null;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getMinimumSize(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getMinimumSizeSync(): java_awt_Dimension | null;
    /**
     * @return original return type: 'java.awt.FocusTraversalPolicy'
     */
    getFocusTraversalPolicy(): Promise<java_awt_FocusTraversalPolicy | null>;
    /**
     * @return original return type: 'java.awt.FocusTraversalPolicy'
     */
    getFocusTraversalPolicySync(): java_awt_FocusTraversalPolicy | null;
    /**
     * @param var0 original type: 'java.awt.ComponentOrientation'
     * @return original return type: 'void'
     */
    applyComponentOrientation(var0: java_awt_ComponentOrientation | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.ComponentOrientation'
     * @return original return type: 'void'
     */
    applyComponentOrientationSync(var0: java_awt_ComponentOrientation | null): void;
    /**
     * @return original return type: 'int'
     */
    getComponentCount(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getComponentCountSync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    getComponent(var0: java_lang_Integer | number): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    getComponentSync(var0: java_lang_Integer | number): java_awt_Component | null;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    minimumSize(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    minimumSizeSync(): java_awt_Dimension | null;
    /**
     * @return original return type: 'int'
     */
    countComponents(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    countComponentsSync(): number;
    /**
     * @return original return type: 'java.awt.Insets'
     */
    getInsets(): Promise<java_awt_Insets | null>;
    /**
     * @return original return type: 'java.awt.Insets'
     */
    getInsetsSync(): java_awt_Insets | null;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'int'
     */
    getComponentZOrder(var0: java_awt_Component | null): Promise<number>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'int'
     */
    getComponentZOrderSync(var0: java_awt_Component | null): number;
    /**
     * @return original return type: 'void'
     */
    doLayout(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    doLayoutSync(): void;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    preferredSize(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    preferredSizeSync(): java_awt_Dimension | null;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getMaximumSize(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getMaximumSizeSync(): java_awt_Dimension | null;
    /**
     * @return original return type: 'float'
     */
    getAlignmentX(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getAlignmentXSync(): number;
    /**
     * @return original return type: 'float'
     */
    getAlignmentY(): Promise<number>;
    /**
     * @return original return type: 'float'
     */
    getAlignmentYSync(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    getComponentAt(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    getComponentAtSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_awt_Component | null;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'java.awt.Component'
     */
    getComponentAt(var0: java_awt_Point | null): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'java.awt.Component'
     */
    getComponentAtSync(var0: java_awt_Point | null): java_awt_Component | null;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @return original return type: 'void'
     */
    deliverEvent(var0: java_awt_Event | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @return original return type: 'void'
     */
    deliverEventSync(var0: java_awt_Event | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    locate(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    locateSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_awt_Component | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    findComponentAt(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Component'
     */
    findComponentAtSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_awt_Component | null;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'java.awt.Component'
     */
    findComponentAt(var0: java_awt_Point | null): Promise<java_awt_Component | null>;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'java.awt.Component'
     */
    findComponentAtSync(var0: java_awt_Point | null): java_awt_Component | null;
    /**
     * @return original return type: 'boolean'
     */
    isFocusTraversalPolicyProvider(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusTraversalPolicyProviderSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.event.ContainerListener'
     * @return original return type: 'void'
     */
    addContainerListener(var0: java_awt_event_ContainerListener | JavaInterfaceProxy<java_awt_event_ContainerListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.ContainerListener'
     * @return original return type: 'void'
     */
    addContainerListenerSync(var0: java_awt_event_ContainerListener | JavaInterfaceProxy<java_awt_event_ContainerListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.LayoutManager'
     */
    getLayout(): Promise<java_awt_LayoutManager | null>;
    /**
     * @return original return type: 'java.awt.LayoutManager'
     */
    getLayoutSync(): java_awt_LayoutManager | null;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    setComponentZOrder(var0: java_awt_Component | null, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    setComponentZOrderSync(var0: java_awt_Component | null, var1: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    paintComponents(var0: java_awt_Graphics | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    paintComponentsSync(var0: java_awt_Graphics | null): void;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    printComponents(var0: java_awt_Graphics | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    printComponentsSync(var0: java_awt_Graphics | null): void;
    /**
     * @param var0 original type: 'java.awt.event.ContainerListener'
     * @return original return type: 'void'
     */
    removeContainerListener(var0: java_awt_event_ContainerListener | JavaInterfaceProxy<java_awt_event_ContainerListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.ContainerListener'
     * @return original return type: 'void'
     */
    removeContainerListenerSync(var0: java_awt_event_ContainerListener | JavaInterfaceProxy<java_awt_event_ContainerListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.ContainerListener[]'
     */
    getContainerListeners(): Promise<(java_awt_event_ContainerListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.ContainerListener[]'
     */
    getContainerListenersSync(): (java_awt_event_ContainerListener | null)[] | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'java.awt.Point'
     */
    getMousePosition(var0: java_lang_Boolean | boolean): Promise<java_awt_Point | null>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'java.awt.Point'
     */
    getMousePositionSync(var0: java_lang_Boolean | boolean): java_awt_Point | null;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getMousePosition(): Promise<java_awt_Point | null>;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getMousePositionSync(): java_awt_Point | null;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'boolean'
     */
    isAncestorOf(var0: java_awt_Component | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Component'
     * @return original return type: 'boolean'
     */
    isAncestorOfSync(var0: java_awt_Component | null): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.util.Set'
     * @return original return type: 'void'
     */
    setFocusTraversalKeys(var0: java_lang_Integer | number, var1: java_util_Set | JavaInterfaceProxy<java_util_SetInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.util.Set'
     * @return original return type: 'void'
     */
    setFocusTraversalKeysSync(var0: java_lang_Integer | number, var1: java_util_Set | JavaInterfaceProxy<java_util_SetInterface> | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    areFocusTraversalKeysSet(var0: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    areFocusTraversalKeysSetSync(var0: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.FocusTraversalPolicy'
     * @return original return type: 'void'
     */
    setFocusTraversalPolicy(var0: java_awt_FocusTraversalPolicy | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.FocusTraversalPolicy'
     * @return original return type: 'void'
     */
    setFocusTraversalPolicySync(var0: java_awt_FocusTraversalPolicy | null): void;
    /**
     * @return original return type: 'boolean'
     */
    isFocusTraversalPolicySet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusTraversalPolicySetSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusTraversalPolicyProvider(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusTraversalPolicyProviderSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'void'
     */
    transferFocusDownCycle(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    transferFocusDownCycleSync(): void;
    /**
     * @return original return type: 'java.lang.String'
     */
    getName(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getNameSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    toString(): Promise<string>;
    /**
     * @return original return type: 'java.lang.String'
     */
    toStringSync(): string;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    size(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    sizeSync(): java_awt_Dimension | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    contains(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    containsSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'boolean'
     */
    contains(var0: java_awt_Point | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'boolean'
     */
    containsSync(var0: java_awt_Point | null): boolean;
    /**
     * @param var0 original type: 'java.awt.Rectangle'
     * @return original return type: 'java.awt.Rectangle'
     */
    getBounds(var0: java_awt_Rectangle | null): Promise<java_awt_Rectangle | null>;
    /**
     * @param var0 original type: 'java.awt.Rectangle'
     * @return original return type: 'java.awt.Rectangle'
     */
    getBoundsSync(var0: java_awt_Rectangle | null): java_awt_Rectangle | null;
    /**
     * @return original return type: 'java.awt.Rectangle'
     */
    getBounds(): Promise<java_awt_Rectangle | null>;
    /**
     * @return original return type: 'java.awt.Rectangle'
     */
    getBoundsSync(): java_awt_Rectangle | null;
    /**
     * @return original return type: 'java.awt.Rectangle'
     */
    bounds(): Promise<java_awt_Rectangle | null>;
    /**
     * @return original return type: 'java.awt.Rectangle'
     */
    boundsSync(): java_awt_Rectangle | null;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getLocation(): Promise<java_awt_Point | null>;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getLocationSync(): java_awt_Point | null;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'java.awt.Point'
     */
    getLocation(var0: java_awt_Point | null): Promise<java_awt_Point | null>;
    /**
     * @param var0 original type: 'java.awt.Point'
     * @return original return type: 'java.awt.Point'
     */
    getLocationSync(var0: java_awt_Point | null): java_awt_Point | null;
    /**
     * @return original return type: 'java.awt.Container'
     */
    getParent(): Promise<java_awt_Container | null>;
    /**
     * @return original return type: 'java.awt.Container'
     */
    getParentSync(): java_awt_Container | null;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    action(var0: java_awt_Event | null, var1: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    actionSync(var0: java_awt_Event | null, var1: BasicOrJavaType | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setName(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setNameSync(var0: string | null): void;
    /**
     * @return original return type: 'java.awt.Point'
     */
    location(): Promise<java_awt_Point | null>;
    /**
     * @return original return type: 'java.awt.Point'
     */
    locationSync(): java_awt_Point | null;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getSize(): Promise<java_awt_Dimension | null>;
    /**
     * @return original return type: 'java.awt.Dimension'
     */
    getSizeSync(): java_awt_Dimension | null;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'java.awt.Dimension'
     */
    getSize(var0: java_awt_Dimension | null): Promise<java_awt_Dimension | null>;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'java.awt.Dimension'
     */
    getSizeSync(var0: java_awt_Dimension | null): java_awt_Dimension | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    resize(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    resizeSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    resize(var0: java_awt_Dimension | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    resizeSync(var0: java_awt_Dimension | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    move(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'void'
     */
    moveSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): void;
    /**
     * @return original return type: 'boolean'
     */
    isEnabled(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isEnabledSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    enable(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    enableSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'void'
     */
    enable(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    enableSync(): void;
    /**
     * @param var0 original type: 'java.util.Locale'
     * @return original return type: 'void'
     */
    setLocale(var0: java_util_Locale | null): Promise<void>;
    /**
     * @param var0 original type: 'java.util.Locale'
     * @return original return type: 'void'
     */
    setLocaleSync(var0: java_util_Locale | null): void;
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
    getHeight(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getHeightSync(): number;
    /**
     * @return original return type: 'int'
     */
    getWidth(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getWidthSync(): number;
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
     * @return original return type: 'java.awt.image.ColorModel'
     */
    getColorModel(): Promise<java_awt_image_ColorModel | null>;
    /**
     * @return original return type: 'java.awt.image.ColorModel'
     */
    getColorModelSync(): java_awt_image_ColorModel | null;
    /**
     * @return original return type: 'java.awt.Graphics'
     */
    getGraphics(): Promise<java_awt_Graphics | null>;
    /**
     * @return original return type: 'java.awt.Graphics'
     */
    getGraphicsSync(): java_awt_Graphics | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Image'
     */
    createImage(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_awt_Image | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.Image'
     */
    createImageSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_awt_Image | null;
    /**
     * @param var0 original type: 'java.awt.image.ImageProducer'
     * @return original return type: 'java.awt.Image'
     */
    createImage(var0: java_awt_image_ImageProducer | JavaInterfaceProxy<java_awt_image_ImageProducerInterface> | null): Promise<java_awt_Image | null>;
    /**
     * @param var0 original type: 'java.awt.image.ImageProducer'
     * @return original return type: 'java.awt.Image'
     */
    createImageSync(var0: java_awt_image_ImageProducer | JavaInterfaceProxy<java_awt_image_ImageProducerInterface> | null): java_awt_Image | null;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'int'
     * @return original return type: 'boolean'
     */
    imageUpdate(var0: java_awt_Image | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'int'
     * @return original return type: 'boolean'
     */
    imageUpdateSync(var0: java_awt_Image | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    inside(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    insideSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): boolean;
    /**
     * @return original return type: 'java.awt.Font'
     */
    getFont(): Promise<java_awt_Font | null>;
    /**
     * @return original return type: 'java.awt.Font'
     */
    getFontSync(): java_awt_Font | null;
    /**
     * @param var0 original type: 'java.awt.Font'
     * @return original return type: 'java.awt.FontMetrics'
     */
    getFontMetrics(var0: java_awt_Font | null): Promise<java_awt_FontMetrics | null>;
    /**
     * @param var0 original type: 'java.awt.Font'
     * @return original return type: 'java.awt.FontMetrics'
     */
    getFontMetricsSync(var0: java_awt_Font | null): java_awt_FontMetrics | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'byte'
     * @param var2 original type: 'byte'
     * @return original return type: 'void'
     */
    firePropertyChange(var0: string | null, var1: java_lang_Byte | number, var2: java_lang_Byte | number): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'byte'
     * @param var2 original type: 'byte'
     * @return original return type: 'void'
     */
    firePropertyChangeSync(var0: string | null, var1: java_lang_Byte | number, var2: java_lang_Byte | number): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'char'
     * @param var2 original type: 'char'
     * @return original return type: 'void'
     */
    firePropertyChange(var0: string | null, var1: string | null, var2: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'char'
     * @param var2 original type: 'char'
     * @return original return type: 'void'
     */
    firePropertyChangeSync(var0: string | null, var1: string | null, var2: string | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'float'
     * @param var2 original type: 'float'
     * @return original return type: 'void'
     */
    firePropertyChange(var0: string | null, var1: java_lang_Float | number, var2: java_lang_Float | number): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'float'
     * @param var2 original type: 'float'
     * @return original return type: 'void'
     */
    firePropertyChangeSync(var0: string | null, var1: java_lang_Float | number, var2: java_lang_Float | number): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    firePropertyChange(var0: string | null, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    firePropertyChangeSync(var0: string | null, var1: java_lang_Double | number, var2: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'short'
     * @param var2 original type: 'short'
     * @return original return type: 'void'
     */
    firePropertyChange(var0: string | null, var1: java_lang_Short | number, var2: java_lang_Short | number): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'short'
     * @param var2 original type: 'short'
     * @return original return type: 'void'
     */
    firePropertyChangeSync(var0: string | null, var1: java_lang_Short | number, var2: java_lang_Short | number): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @return original return type: 'void'
     */
    firePropertyChange(var0: string | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'long'
     * @param var2 original type: 'long'
     * @return original return type: 'void'
     */
    firePropertyChangeSync(var0: string | null, var1: java_lang_Long | bigint | number, var2: java_lang_Long | bigint | number): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    removePropertyChangeListener(var0: string | null, var1: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    removePropertyChangeListenerSync(var0: string | null, var1: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    removePropertyChangeListener(var0: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.beans.PropertyChangeListener'
     * @return original return type: 'void'
     */
    removePropertyChangeListenerSync(var0: java_beans_PropertyChangeListener | JavaInterfaceProxy<java_beans_PropertyChangeListenerInterface> | null): void;
    /**
     * @return original return type: 'java.beans.PropertyChangeListener[]'
     */
    getPropertyChangeListeners(): Promise<(java_beans_PropertyChangeListener | null)[] | null>;
    /**
     * @return original return type: 'java.beans.PropertyChangeListener[]'
     */
    getPropertyChangeListenersSync(): (java_beans_PropertyChangeListener | null)[] | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.beans.PropertyChangeListener[]'
     */
    getPropertyChangeListeners(var0: string | null): Promise<(java_beans_PropertyChangeListener | null)[] | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.beans.PropertyChangeListener[]'
     */
    getPropertyChangeListenersSync(var0: string | null): (java_beans_PropertyChangeListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'boolean'
     */
    prepareImage(var0: java_awt_Image | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'boolean'
     */
    prepareImageSync(var0: java_awt_Image | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): boolean;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'boolean'
     */
    prepareImage(var0: java_awt_Image | null, var1: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'boolean'
     */
    prepareImageSync(var0: java_awt_Image | null, var1: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): boolean;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'int'
     */
    checkImage(var0: java_awt_Image | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): Promise<number>;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'int'
     */
    checkImageSync(var0: java_awt_Image | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): number;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'int'
     */
    checkImage(var0: java_awt_Image | null, var1: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): Promise<number>;
    /**
     * @param var0 original type: 'java.awt.Image'
     * @param var1 original type: 'java.awt.image.ImageObserver'
     * @return original return type: 'int'
     */
    checkImageSync(var0: java_awt_Image | null, var1: java_awt_image_ImageObserver | JavaInterfaceProxy<java_awt_image_ImageObserverInterface> | null): number;
    /**
     * @return original return type: 'java.awt.GraphicsConfiguration'
     */
    getGraphicsConfiguration(): Promise<java_awt_GraphicsConfiguration | null>;
    /**
     * @return original return type: 'java.awt.GraphicsConfiguration'
     */
    getGraphicsConfigurationSync(): java_awt_GraphicsConfiguration | null;
    /**
     * @return original return type: 'java.awt.Color'
     */
    getForeground(): Promise<java_awt_Color | null>;
    /**
     * @return original return type: 'java.awt.Color'
     */
    getForegroundSync(): java_awt_Color | null;
    /**
     * @param var0 original type: 'java.awt.Color'
     * @return original return type: 'void'
     */
    setForeground(var0: java_awt_Color | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Color'
     * @return original return type: 'void'
     */
    setForegroundSync(var0: java_awt_Color | null): void;
    /**
     * @return original return type: 'java.lang.Object'
     */
    getTreeLock(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    getTreeLockSync(): BasicOrJavaType | null;
    /**
     * @return original return type: 'boolean'
     */
    isMinimumSizeSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isMinimumSizeSetSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isDisplayable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isDisplayableSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isVisible(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isVisibleSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    requestFocus(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    requestFocusSync(): void;
    /**
     * @param var0 original type: 'java.awt.event.FocusEvent$Cause'
     * @return original return type: 'void'
     */
    requestFocus(var0: java_awt_event_FocusEvent$Cause | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.FocusEvent$Cause'
     * @return original return type: 'void'
     */
    requestFocusSync(var0: java_awt_event_FocusEvent$Cause | null): void;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @return original return type: 'boolean'
     */
    handleEvent(var0: java_awt_Event | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @return original return type: 'boolean'
     */
    handleEventSync(var0: java_awt_Event | null): boolean;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getLocationOnScreen(): Promise<java_awt_Point | null>;
    /**
     * @return original return type: 'java.awt.Point'
     */
    getLocationOnScreenSync(): java_awt_Point | null;
    /**
     * @param var0 original type: 'java.awt.AWTEvent'
     * @return original return type: 'void'
     */
    dispatchEvent(var0: java_awt_AWTEvent | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.AWTEvent'
     * @return original return type: 'void'
     */
    dispatchEventSync(var0: java_awt_AWTEvent | null): void;
    /**
     * @return original return type: 'boolean'
     */
    isFocusable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusableSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isLightweight(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isLightweightSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isFocusOwner(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusOwnerSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    transferFocus(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    transferFocusSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isPreferredSizeSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isPreferredSizeSetSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isMaximumSizeSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isMaximumSizeSetSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    transferFocusBackward(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    transferFocusBackwardSync(): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setEnabled(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setEnabledSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'void'
     */
    disable(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    disableSync(): void;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    repaint(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    repaintSync(var0: java_lang_Long | bigint | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'void'
     */
    repaint(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @param var3 original type: 'int'
     * @return original return type: 'void'
     */
    repaintSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_lang_Integer | number, var3: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    repaint(var0: java_lang_Long | bigint | number): Promise<void>;
    /**
     * @param var0 original type: 'long'
     * @return original return type: 'void'
     */
    repaintSync(var0: java_lang_Long | bigint | number): void;
    /**
     * @return original return type: 'void'
     */
    repaint(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    repaintSync(): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.image.VolatileImage'
     */
    createVolatileImage(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_awt_image_VolatileImage | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.image.VolatileImage'
     */
    createVolatileImageSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_awt_image_VolatileImage | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.awt.ImageCapabilities'
     * @return original return type: 'java.awt.image.VolatileImage'
     */
    createVolatileImage(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_awt_ImageCapabilities | null): Promise<java_awt_image_VolatileImage | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.awt.ImageCapabilities'
     * @return original return type: 'java.awt.image.VolatileImage'
     */
    createVolatileImageSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: java_awt_ImageCapabilities | null): java_awt_image_VolatileImage | null;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseEnter(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseEnterSync(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseExit(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseExitSync(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseMove(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseMoveSync(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseDown(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseDownSync(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseDrag(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseDragSync(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseUp(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int'
     * @return original return type: 'boolean'
     */
    mouseUpSync(var0: java_awt_Event | null, var1: java_lang_Integer | number, var2: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    keyDown(var0: java_awt_Event | null, var1: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    keyDownSync(var0: java_awt_Event | null, var1: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    keyUp(var0: java_awt_Event | null, var1: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'int'
     * @return original return type: 'boolean'
     */
    keyUpSync(var0: java_awt_Event | null, var1: java_lang_Integer | number): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    gotFocus(var0: java_awt_Event | null, var1: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    gotFocusSync(var0: java_awt_Event | null, var1: BasicOrJavaType | null): boolean;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    lostFocus(var0: java_awt_Event | null, var1: BasicOrJavaType | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.Event'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'boolean'
     */
    lostFocusSync(var0: java_awt_Event | null, var1: BasicOrJavaType | null): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isFocusTraversable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFocusTraversableSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    nextFocus(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    nextFocusSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    requestFocusInWindow(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    requestFocusInWindowSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.event.FocusEvent$Cause'
     * @return original return type: 'boolean'
     */
    requestFocusInWindow(var0: java_awt_event_FocusEvent$Cause | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.event.FocusEvent$Cause'
     * @return original return type: 'boolean'
     */
    requestFocusInWindowSync(var0: java_awt_event_FocusEvent$Cause | null): boolean;
    /**
     * @return original return type: 'boolean'
     */
    hasFocus(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    hasFocusSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.event.ComponentListener'
     * @return original return type: 'void'
     */
    addComponentListener(var0: java_awt_event_ComponentListener | JavaInterfaceProxy<java_awt_event_ComponentListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.ComponentListener'
     * @return original return type: 'void'
     */
    addComponentListenerSync(var0: java_awt_event_ComponentListener | JavaInterfaceProxy<java_awt_event_ComponentListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.FocusListener'
     * @return original return type: 'void'
     */
    addFocusListener(var0: java_awt_event_FocusListener | JavaInterfaceProxy<java_awt_event_FocusListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.FocusListener'
     * @return original return type: 'void'
     */
    addFocusListenerSync(var0: java_awt_event_FocusListener | JavaInterfaceProxy<java_awt_event_FocusListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.KeyListener'
     * @return original return type: 'void'
     */
    addKeyListener(var0: java_awt_event_KeyListener | JavaInterfaceProxy<java_awt_event_KeyListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.KeyListener'
     * @return original return type: 'void'
     */
    addKeyListenerSync(var0: java_awt_event_KeyListener | JavaInterfaceProxy<java_awt_event_KeyListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.MouseListener'
     * @return original return type: 'void'
     */
    addMouseListener(var0: java_awt_event_MouseListener | JavaInterfaceProxy<java_awt_event_MouseListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.MouseListener'
     * @return original return type: 'void'
     */
    addMouseListenerSync(var0: java_awt_event_MouseListener | JavaInterfaceProxy<java_awt_event_MouseListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.MouseMotionListener'
     * @return original return type: 'void'
     */
    addMouseMotionListener(var0: java_awt_event_MouseMotionListener | JavaInterfaceProxy<java_awt_event_MouseMotionListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.MouseMotionListener'
     * @return original return type: 'void'
     */
    addMouseMotionListenerSync(var0: java_awt_event_MouseMotionListener | JavaInterfaceProxy<java_awt_event_MouseMotionListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.InputMethodListener'
     * @return original return type: 'void'
     */
    addInputMethodListener(var0: java_awt_event_InputMethodListener | JavaInterfaceProxy<java_awt_event_InputMethodListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.InputMethodListener'
     * @return original return type: 'void'
     */
    addInputMethodListenerSync(var0: java_awt_event_InputMethodListener | JavaInterfaceProxy<java_awt_event_InputMethodListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyListener'
     * @return original return type: 'void'
     */
    addHierarchyListener(var0: java_awt_event_HierarchyListener | JavaInterfaceProxy<java_awt_event_HierarchyListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyListener'
     * @return original return type: 'void'
     */
    addHierarchyListenerSync(var0: java_awt_event_HierarchyListener | JavaInterfaceProxy<java_awt_event_HierarchyListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyBoundsListener'
     * @return original return type: 'void'
     */
    addHierarchyBoundsListener(var0: java_awt_event_HierarchyBoundsListener | JavaInterfaceProxy<java_awt_event_HierarchyBoundsListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyBoundsListener'
     * @return original return type: 'void'
     */
    addHierarchyBoundsListenerSync(var0: java_awt_event_HierarchyBoundsListener | JavaInterfaceProxy<java_awt_event_HierarchyBoundsListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.event.MouseWheelListener'
     * @return original return type: 'void'
     */
    addMouseWheelListener(var0: java_awt_event_MouseWheelListener | JavaInterfaceProxy<java_awt_event_MouseWheelListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.MouseWheelListener'
     * @return original return type: 'void'
     */
    addMouseWheelListenerSync(var0: java_awt_event_MouseWheelListener | JavaInterfaceProxy<java_awt_event_MouseWheelListenerInterface> | null): void;
    /**
     * @param var0 original type: 'java.awt.ComponentOrientation'
     * @return original return type: 'void'
     */
    setComponentOrientation(var0: java_awt_ComponentOrientation | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.ComponentOrientation'
     * @return original return type: 'void'
     */
    setComponentOrientationSync(var0: java_awt_ComponentOrientation | null): void;
    /**
     * @param var0 original type: 'java.awt.dnd.DropTarget'
     * @return original return type: 'void'
     */
    setDropTarget(var0: java_awt_dnd_DropTarget | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.dnd.DropTarget'
     * @return original return type: 'void'
     */
    setDropTargetSync(var0: java_awt_dnd_DropTarget | null): void;
    /**
     * @return original return type: 'java.awt.dnd.DropTarget'
     */
    getDropTarget(): Promise<java_awt_dnd_DropTarget | null>;
    /**
     * @return original return type: 'java.awt.dnd.DropTarget'
     */
    getDropTargetSync(): java_awt_dnd_DropTarget | null;
    /**
     * @return original return type: 'boolean'
     */
    isDoubleBuffered(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isDoubleBufferedSync(): boolean;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    enableInputMethods(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    enableInputMethodsSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    isForegroundSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isForegroundSetSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isBackgroundSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isBackgroundSetSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isFontSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFontSetSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setPreferredSize(var0: java_awt_Dimension | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setPreferredSizeSync(var0: java_awt_Dimension | null): void;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setMaximumSize(var0: java_awt_Dimension | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Dimension'
     * @return original return type: 'void'
     */
    setMaximumSizeSync(var0: java_awt_Dimension | null): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getBaseline(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getBaselineSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): number;
    /**
     * @return original return type: 'java.awt.Component$BaselineResizeBehavior'
     */
    getBaselineResizeBehavior(): Promise<java_awt_Component$BaselineResizeBehavior | null>;
    /**
     * @return original return type: 'java.awt.Component$BaselineResizeBehavior'
     */
    getBaselineResizeBehaviorSync(): java_awt_Component$BaselineResizeBehavior | null;
    /**
     * @return original return type: 'void'
     */
    revalidate(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    revalidateSync(): void;
    /**
     * @return original return type: 'java.awt.Cursor'
     */
    getCursor(): Promise<java_awt_Cursor | null>;
    /**
     * @return original return type: 'java.awt.Cursor'
     */
    getCursorSync(): java_awt_Cursor | null;
    /**
     * @return original return type: 'boolean'
     */
    isCursorSet(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isCursorSetSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    paintAll(var0: java_awt_Graphics | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    paintAllSync(var0: java_awt_Graphics | null): void;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    printAll(var0: java_awt_Graphics | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Graphics'
     * @return original return type: 'void'
     */
    printAllSync(var0: java_awt_Graphics | null): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setIgnoreRepaint(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setIgnoreRepaintSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getIgnoreRepaint(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getIgnoreRepaintSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.event.ComponentListener'
     * @return original return type: 'void'
     */
    removeComponentListener(var0: java_awt_event_ComponentListener | JavaInterfaceProxy<java_awt_event_ComponentListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.ComponentListener'
     * @return original return type: 'void'
     */
    removeComponentListenerSync(var0: java_awt_event_ComponentListener | JavaInterfaceProxy<java_awt_event_ComponentListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.ComponentListener[]'
     */
    getComponentListeners(): Promise<(java_awt_event_ComponentListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.ComponentListener[]'
     */
    getComponentListenersSync(): (java_awt_event_ComponentListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.FocusListener'
     * @return original return type: 'void'
     */
    removeFocusListener(var0: java_awt_event_FocusListener | JavaInterfaceProxy<java_awt_event_FocusListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.FocusListener'
     * @return original return type: 'void'
     */
    removeFocusListenerSync(var0: java_awt_event_FocusListener | JavaInterfaceProxy<java_awt_event_FocusListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.FocusListener[]'
     */
    getFocusListeners(): Promise<(java_awt_event_FocusListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.FocusListener[]'
     */
    getFocusListenersSync(): (java_awt_event_FocusListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyListener'
     * @return original return type: 'void'
     */
    removeHierarchyListener(var0: java_awt_event_HierarchyListener | JavaInterfaceProxy<java_awt_event_HierarchyListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyListener'
     * @return original return type: 'void'
     */
    removeHierarchyListenerSync(var0: java_awt_event_HierarchyListener | JavaInterfaceProxy<java_awt_event_HierarchyListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.HierarchyListener[]'
     */
    getHierarchyListeners(): Promise<(java_awt_event_HierarchyListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.HierarchyListener[]'
     */
    getHierarchyListenersSync(): (java_awt_event_HierarchyListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyBoundsListener'
     * @return original return type: 'void'
     */
    removeHierarchyBoundsListener(var0: java_awt_event_HierarchyBoundsListener | JavaInterfaceProxy<java_awt_event_HierarchyBoundsListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.HierarchyBoundsListener'
     * @return original return type: 'void'
     */
    removeHierarchyBoundsListenerSync(var0: java_awt_event_HierarchyBoundsListener | JavaInterfaceProxy<java_awt_event_HierarchyBoundsListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.HierarchyBoundsListener[]'
     */
    getHierarchyBoundsListeners(): Promise<(java_awt_event_HierarchyBoundsListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.HierarchyBoundsListener[]'
     */
    getHierarchyBoundsListenersSync(): (java_awt_event_HierarchyBoundsListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.KeyListener'
     * @return original return type: 'void'
     */
    removeKeyListener(var0: java_awt_event_KeyListener | JavaInterfaceProxy<java_awt_event_KeyListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.KeyListener'
     * @return original return type: 'void'
     */
    removeKeyListenerSync(var0: java_awt_event_KeyListener | JavaInterfaceProxy<java_awt_event_KeyListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.KeyListener[]'
     */
    getKeyListeners(): Promise<(java_awt_event_KeyListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.KeyListener[]'
     */
    getKeyListenersSync(): (java_awt_event_KeyListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.MouseListener'
     * @return original return type: 'void'
     */
    removeMouseListener(var0: java_awt_event_MouseListener | JavaInterfaceProxy<java_awt_event_MouseListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.MouseListener'
     * @return original return type: 'void'
     */
    removeMouseListenerSync(var0: java_awt_event_MouseListener | JavaInterfaceProxy<java_awt_event_MouseListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.MouseListener[]'
     */
    getMouseListeners(): Promise<(java_awt_event_MouseListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.MouseListener[]'
     */
    getMouseListenersSync(): (java_awt_event_MouseListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.MouseMotionListener'
     * @return original return type: 'void'
     */
    removeMouseMotionListener(var0: java_awt_event_MouseMotionListener | JavaInterfaceProxy<java_awt_event_MouseMotionListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.MouseMotionListener'
     * @return original return type: 'void'
     */
    removeMouseMotionListenerSync(var0: java_awt_event_MouseMotionListener | JavaInterfaceProxy<java_awt_event_MouseMotionListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.MouseMotionListener[]'
     */
    getMouseMotionListeners(): Promise<(java_awt_event_MouseMotionListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.MouseMotionListener[]'
     */
    getMouseMotionListenersSync(): (java_awt_event_MouseMotionListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.MouseWheelListener'
     * @return original return type: 'void'
     */
    removeMouseWheelListener(var0: java_awt_event_MouseWheelListener | JavaInterfaceProxy<java_awt_event_MouseWheelListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.MouseWheelListener'
     * @return original return type: 'void'
     */
    removeMouseWheelListenerSync(var0: java_awt_event_MouseWheelListener | JavaInterfaceProxy<java_awt_event_MouseWheelListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.MouseWheelListener[]'
     */
    getMouseWheelListeners(): Promise<(java_awt_event_MouseWheelListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.MouseWheelListener[]'
     */
    getMouseWheelListenersSync(): (java_awt_event_MouseWheelListener | null)[] | null;
    /**
     * @param var0 original type: 'java.awt.event.InputMethodListener'
     * @return original return type: 'void'
     */
    removeInputMethodListener(var0: java_awt_event_InputMethodListener | JavaInterfaceProxy<java_awt_event_InputMethodListenerInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.event.InputMethodListener'
     * @return original return type: 'void'
     */
    removeInputMethodListenerSync(var0: java_awt_event_InputMethodListener | JavaInterfaceProxy<java_awt_event_InputMethodListenerInterface> | null): void;
    /**
     * @return original return type: 'java.awt.event.InputMethodListener[]'
     */
    getInputMethodListeners(): Promise<(java_awt_event_InputMethodListener | null)[] | null>;
    /**
     * @return original return type: 'java.awt.event.InputMethodListener[]'
     */
    getInputMethodListenersSync(): (java_awt_event_InputMethodListener | null)[] | null;
    /**
     * @return original return type: 'java.awt.im.InputMethodRequests'
     */
    getInputMethodRequests(): Promise<java_awt_im_InputMethodRequests | null>;
    /**
     * @return original return type: 'java.awt.im.InputMethodRequests'
     */
    getInputMethodRequestsSync(): java_awt_im_InputMethodRequests | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusable(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusableSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusTraversalKeysEnabled(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setFocusTraversalKeysEnabledSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @return original return type: 'boolean'
     */
    getFocusTraversalKeysEnabled(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    getFocusTraversalKeysEnabledSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    transferFocusUpCycle(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    transferFocusUpCycleSync(): void;
    /**
     * @return original return type: 'java.awt.ComponentOrientation'
     */
    getComponentOrientation(): Promise<java_awt_ComponentOrientation | null>;
    /**
     * @return original return type: 'java.awt.ComponentOrientation'
     */
    getComponentOrientationSync(): java_awt_ComponentOrientation | null;
    /**
     * @param var0 original type: 'java.awt.Shape'
     * @return original return type: 'void'
     */
    setMixingCutoutShape(var0: java_awt_Shape | JavaInterfaceProxy<java_awt_ShapeInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.Shape'
     * @return original return type: 'void'
     */
    setMixingCutoutShapeSync(var0: java_awt_Shape | JavaInterfaceProxy<java_awt_ShapeInterface> | null): void;
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
     * @param var0 original type: 'java.awt.Frame'
     * @return original return type: 'java.awt.Window'
     */
    static newInstanceAsync(var0: java_awt_Frame | null): Promise<Window>;
    /**
     * @param var0 original type: 'java.awt.Window'
     * @return original return type: 'java.awt.Window'
     */
    static newInstanceAsync(var0: WindowClass | null): Promise<Window>;
    /**
     * @param var0 original type: 'java.awt.Window'
     * @param var1 original type: 'java.awt.GraphicsConfiguration'
     * @return original return type: 'java.awt.Window'
     */
    static newInstanceAsync(var0: WindowClass | null, var1: java_awt_GraphicsConfiguration | null): Promise<Window>;
    /**
     * @param var0 original type: 'java.awt.Frame'
     */
    constructor(var0: java_awt_Frame | null);
    /**
     * @param var0 original type: 'java.awt.Window'
     */
    constructor(var0: WindowClass | null);
    /**
     * @param var0 original type: 'java.awt.Window'
     * @param var1 original type: 'java.awt.GraphicsConfiguration'
     */
    constructor(var0: WindowClass | null, var1: java_awt_GraphicsConfiguration | null);
}
declare const Window_base: typeof WindowClass;
/**
 * Class java.awt.Window.
 *
 * This actually imports the java class for further use.
 * The class {@link WindowClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Window extends Window_base {
}
export default Window;
//# sourceMappingURL=Window.d.ts.map
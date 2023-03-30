import { JavaClass, InterfaceProxyOptions, JavaInterfaceProxy } from "java-bridge";
import { Rectangle2D as java_awt_geom_Rectangle2D } from "./geom/Rectangle2D";
import { Double as java_lang_Double } from "./../lang/Double";
import { Point2D as java_awt_geom_Point2D } from "./geom/Point2D";
import { Rectangle as java_awt_Rectangle } from "./Rectangle";
import { PathIterator as java_awt_geom_PathIterator } from "./geom/PathIterator";
import { AffineTransform as java_awt_geom_AffineTransform } from "./geom/AffineTransform";
/**
 * This class just defines types, you should import {@link Shape} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class ShapeClass extends JavaClass {
    /**
     * @param var0 original type: 'java.awt.geom.Rectangle2D'
     * @return original return type: 'boolean'
     */
    contains(var0: java_awt_geom_Rectangle2D | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.geom.Rectangle2D'
     * @return original return type: 'boolean'
     */
    containsSync(var0: java_awt_geom_Rectangle2D | null): boolean;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'boolean'
     */
    contains(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): Promise<boolean>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'boolean'
     */
    containsSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): boolean;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'boolean'
     */
    contains(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<boolean>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'boolean'
     */
    containsSync(var0: java_lang_Double | number, var1: java_lang_Double | number): boolean;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'boolean'
     */
    contains(var0: java_awt_geom_Point2D | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'boolean'
     */
    containsSync(var0: java_awt_geom_Point2D | null): boolean;
    /**
     * @return original return type: 'java.awt.Rectangle'
     */
    getBounds(): Promise<java_awt_Rectangle | null>;
    /**
     * @return original return type: 'java.awt.Rectangle'
     */
    getBoundsSync(): java_awt_Rectangle | null;
    /**
     * @return original return type: 'java.awt.geom.Rectangle2D'
     */
    getBounds2D(): Promise<java_awt_geom_Rectangle2D | null>;
    /**
     * @return original return type: 'java.awt.geom.Rectangle2D'
     */
    getBounds2DSync(): java_awt_geom_Rectangle2D | null;
    /**
     * @param var0 original type: 'java.awt.geom.Rectangle2D'
     * @return original return type: 'boolean'
     */
    intersects(var0: java_awt_geom_Rectangle2D | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.geom.Rectangle2D'
     * @return original return type: 'boolean'
     */
    intersectsSync(var0: java_awt_geom_Rectangle2D | null): boolean;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'boolean'
     */
    intersects(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): Promise<boolean>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'boolean'
     */
    intersectsSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): boolean;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.PathIterator'
     */
    getPathIterator(var0: java_awt_geom_AffineTransform | null, var1: java_lang_Double | number): Promise<java_awt_geom_PathIterator | null>;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.PathIterator'
     */
    getPathIteratorSync(var0: java_awt_geom_AffineTransform | null, var1: java_lang_Double | number): java_awt_geom_PathIterator | null;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'java.awt.geom.PathIterator'
     */
    getPathIterator(var0: java_awt_geom_AffineTransform | null): Promise<java_awt_geom_PathIterator | null>;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'java.awt.geom.PathIterator'
     */
    getPathIteratorSync(var0: java_awt_geom_AffineTransform | null): java_awt_geom_PathIterator | null;
}
/**
 * This interface just defines types for creating proxies,
 * you should use {@link createShapeProxy} for actually creating the proxies.
 *
 * Optional methods in here may still be required by java.
 * This is caused by typescript not allowing to have both optional and
 * non-optional signatures for the same interface member.
 *
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export interface ShapeInterface {
    /**
     * @param var0 original type: 'java.awt.geom.Rectangle2D'
     * @return original return type: 'boolean'
     */
    contains(var0: java_awt_geom_Rectangle2D | null): boolean;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'boolean'
     */
    contains(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): boolean;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'boolean'
     */
    contains(var0: java_lang_Double | number, var1: java_lang_Double | number): boolean;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'boolean'
     */
    contains(var0: java_awt_geom_Point2D | null): boolean;
    /**
     * @return original return type: 'java.awt.Rectangle'
     */
    getBounds(): java_awt_Rectangle | null;
    /**
     * @return original return type: 'java.awt.geom.Rectangle2D'
     */
    getBounds2D(): java_awt_geom_Rectangle2D | null;
    /**
     * @param var0 original type: 'java.awt.geom.Rectangle2D'
     * @return original return type: 'boolean'
     */
    intersects(var0: java_awt_geom_Rectangle2D | null): boolean;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'boolean'
     */
    intersects(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): boolean;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.PathIterator'
     */
    getPathIterator(var0: java_awt_geom_AffineTransform | null, var1: java_lang_Double | number): java_awt_geom_PathIterator | null;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'java.awt.geom.PathIterator'
     */
    getPathIterator(var0: java_awt_geom_AffineTransform | null): java_awt_geom_PathIterator | null;
}
/**
 * Create a proxy for the {@link Shape} interface.
 * All required methods in {@link ShapeInterface} must be implemented.
 *
 * @param methods the methods to implement
 * @param opts the proxy options
 * @return the proxy
 */
export declare function createShapeProxy(methods: ShapeInterface, opts?: InterfaceProxyOptions): JavaInterfaceProxy<ShapeInterface>;
declare const Shape_base: typeof ShapeClass;
/**
 * Class java.awt.Shape.
 *
 * This actually imports the java class for further use.
 * The class {@link ShapeClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Shape extends Shape_base {
    /**
     * Private constructor to prevent instantiation
     * as this is either an abstract class or an interface
     */
    private constructor();
}
export default Shape;
//# sourceMappingURL=Shape.d.ts.map
import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { Double as java_lang_Double } from "./../../lang/Double";
import { Float as java_lang_Float } from "./../../lang/Float";
import { Point2D as java_awt_geom_Point2D } from "./Point2D";
import { Shape as java_awt_Shape, ShapeInterface as java_awt_ShapeInterface } from "./../Shape";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Class as java_lang_Class } from "./../../lang/Class";
/**
 * This class just defines types, you should import {@link AffineTransform} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AffineTransformClass extends JavaClass {
    /**
     * Original type: 'int'
     */
    static readonly TYPE_IDENTITY: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_TRANSLATION: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_UNIFORM_SCALE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_GENERAL_SCALE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_MASK_SCALE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_FLIP: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_QUADRANT_ROTATION: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_GENERAL_ROTATION: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_MASK_ROTATION: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TYPE_GENERAL_TRANSFORM: java_lang_Integer | number;
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
     * @return original return type: 'java.lang.Object'
     */
    clone(): Promise<BasicOrJavaType | null>;
    /**
     * @return original return type: 'java.lang.Object'
     */
    cloneSync(): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    scale(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    scaleSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transform(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transformSync(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transform(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transformSync(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @param var1 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'java.awt.geom.Point2D'
     */
    transform(var0: java_awt_geom_Point2D | null, var1: java_awt_geom_Point2D | null): Promise<java_awt_geom_Point2D | null>;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @param var1 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'java.awt.geom.Point2D'
     */
    transformSync(var0: java_awt_geom_Point2D | null, var1: java_awt_geom_Point2D | null): java_awt_geom_Point2D | null;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'float[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transform(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Float | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'float[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transformSync(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Float | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.awt.geom.Point2D[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transform(var0: (java_awt_geom_Point2D | null)[] | null, var1: java_lang_Integer | number, var2: (java_awt_geom_Point2D | null)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.awt.geom.Point2D[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transformSync(var0: (java_awt_geom_Point2D | null)[] | null, var1: java_lang_Integer | number, var2: (java_awt_geom_Point2D | null)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'float[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transform(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Float | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'float[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    transformSync(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Float | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
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
    isIdentity(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isIdentitySync(): boolean;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    rotate(var0: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    rotateSync(var0: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    rotate(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    rotateSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'void'
     */
    rotate(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'void'
     */
    rotateSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    rotate(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    rotateSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double[]'
     * @return original return type: 'void'
     */
    getMatrix(var0: (java_lang_Double | number)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'double[]'
     * @return original return type: 'void'
     */
    getMatrixSync(var0: (java_lang_Double | number)[] | null): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    translate(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    translateSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    shear(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    shearSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @param var4 original type: 'double'
     * @param var5 original type: 'double'
     * @return original return type: 'void'
     */
    setTransform(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number, var4: java_lang_Double | number, var5: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @param var4 original type: 'double'
     * @param var5 original type: 'double'
     * @return original return type: 'void'
     */
    setTransformSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number, var4: java_lang_Double | number, var5: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'void'
     */
    setTransform(var0: AffineTransformClass | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'void'
     */
    setTransformSync(var0: AffineTransformClass | null): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToTranslation(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToTranslationSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotation(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotationSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotation(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotationSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotation(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotationSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotation(var0: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'void'
     */
    setToRotationSync(var0: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    setToQuadrantRotation(var0: java_lang_Integer | number, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    setToQuadrantRotationSync(var0: java_lang_Integer | number, var1: java_lang_Double | number, var2: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setToQuadrantRotation(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setToQuadrantRotationSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToScale(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToScaleSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToShear(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'void'
     */
    setToShearSync(var0: java_lang_Double | number, var1: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getTranslateInstance(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getTranslateInstanceSync(var0: java_lang_Double | number, var1: java_lang_Double | number): AffineTransform | null;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstance(var0: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstanceSync(var0: java_lang_Double | number): AffineTransform | null;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstance(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstanceSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number): AffineTransform | null;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstance(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstanceSync(var0: java_lang_Double | number, var1: java_lang_Double | number): AffineTransform | null;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstance(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getRotateInstanceSync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number): AffineTransform | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getQuadrantRotateInstance(var0: java_lang_Integer | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getQuadrantRotateInstanceSync(var0: java_lang_Integer | number): AffineTransform | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getQuadrantRotateInstance(var0: java_lang_Integer | number, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getQuadrantRotateInstanceSync(var0: java_lang_Integer | number, var1: java_lang_Double | number, var2: java_lang_Double | number): AffineTransform | null;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getScaleInstance(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getScaleInstanceSync(var0: java_lang_Double | number, var1: java_lang_Double | number): AffineTransform | null;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getShearInstance(var0: java_lang_Double | number, var1: java_lang_Double | number): Promise<AffineTransform | null>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static getShearInstanceSync(var0: java_lang_Double | number, var1: java_lang_Double | number): AffineTransform | null;
    /**
     * @return original return type: 'double'
     */
    getDeterminant(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getDeterminantSync(): number;
    /**
     * @return original return type: 'double'
     */
    getScaleX(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getScaleXSync(): number;
    /**
     * @return original return type: 'double'
     */
    getScaleY(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getScaleYSync(): number;
    /**
     * @return original return type: 'double'
     */
    getShearX(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getShearXSync(): number;
    /**
     * @return original return type: 'double'
     */
    getShearY(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getShearYSync(): number;
    /**
     * @return original return type: 'double'
     */
    getTranslateX(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getTranslateXSync(): number;
    /**
     * @return original return type: 'double'
     */
    getTranslateY(): Promise<number>;
    /**
     * @return original return type: 'double'
     */
    getTranslateYSync(): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    quadrantRotate(var0: java_lang_Integer | number, var1: java_lang_Double | number, var2: java_lang_Double | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @return original return type: 'void'
     */
    quadrantRotateSync(var0: java_lang_Integer | number, var1: java_lang_Double | number, var2: java_lang_Double | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    quadrantRotate(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    quadrantRotateSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    setToIdentity(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    setToIdentitySync(): void;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'void'
     */
    concatenate(var0: AffineTransformClass | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'void'
     */
    concatenateSync(var0: AffineTransformClass | null): void;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'void'
     */
    preConcatenate(var0: AffineTransformClass | null): Promise<void>;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'void'
     */
    preConcatenateSync(var0: AffineTransformClass | null): void;
    /**
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    createInverse(): Promise<AffineTransform | null>;
    /**
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    createInverseSync(): AffineTransform | null;
    /**
     * @return original return type: 'void'
     */
    invert(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    invertSync(): void;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    inverseTransform(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    inverseTransformSync(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @param var1 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'java.awt.geom.Point2D'
     */
    inverseTransform(var0: java_awt_geom_Point2D | null, var1: java_awt_geom_Point2D | null): Promise<java_awt_geom_Point2D | null>;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @param var1 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'java.awt.geom.Point2D'
     */
    inverseTransformSync(var0: java_awt_geom_Point2D | null, var1: java_awt_geom_Point2D | null): java_awt_geom_Point2D | null;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @param var1 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'java.awt.geom.Point2D'
     */
    deltaTransform(var0: java_awt_geom_Point2D | null, var1: java_awt_geom_Point2D | null): Promise<java_awt_geom_Point2D | null>;
    /**
     * @param var0 original type: 'java.awt.geom.Point2D'
     * @param var1 original type: 'java.awt.geom.Point2D'
     * @return original return type: 'java.awt.geom.Point2D'
     */
    deltaTransformSync(var0: java_awt_geom_Point2D | null, var1: java_awt_geom_Point2D | null): java_awt_geom_Point2D | null;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    deltaTransform(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'double[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'double[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @return original return type: 'void'
     */
    deltaTransformSync(var0: (java_lang_Double | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Double | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.awt.Shape'
     * @return original return type: 'java.awt.Shape'
     */
    createTransformedShape(var0: java_awt_Shape | JavaInterfaceProxy<java_awt_ShapeInterface> | null): Promise<java_awt_Shape | null>;
    /**
     * @param var0 original type: 'java.awt.Shape'
     * @return original return type: 'java.awt.Shape'
     */
    createTransformedShapeSync(var0: java_awt_Shape | JavaInterfaceProxy<java_awt_ShapeInterface> | null): java_awt_Shape | null;
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
     * @param var0 original type: 'float'
     * @param var1 original type: 'float'
     * @param var2 original type: 'float'
     * @param var3 original type: 'float'
     * @param var4 original type: 'float'
     * @param var5 original type: 'float'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static newInstanceAsync(var0: java_lang_Float | number, var1: java_lang_Float | number, var2: java_lang_Float | number, var3: java_lang_Float | number, var4: java_lang_Float | number, var5: java_lang_Float | number): Promise<AffineTransform>;
    /**
     * @param var0 original type: 'float[]'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static newInstanceAsync(var0: (java_lang_Float | number)[] | null): Promise<AffineTransform>;
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @param var4 original type: 'double'
     * @param var5 original type: 'double'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static newInstanceAsync(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number, var4: java_lang_Double | number, var5: java_lang_Double | number): Promise<AffineTransform>;
    /**
     * @param var0 original type: 'double[]'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static newInstanceAsync(var0: (java_lang_Double | number)[] | null): Promise<AffineTransform>;
    /**
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static newInstanceAsync(): Promise<AffineTransform>;
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     * @return original return type: 'java.awt.geom.AffineTransform'
     */
    static newInstanceAsync(var0: AffineTransformClass | null): Promise<AffineTransform>;
    /**
     * @param var0 original type: 'float'
     * @param var1 original type: 'float'
     * @param var2 original type: 'float'
     * @param var3 original type: 'float'
     * @param var4 original type: 'float'
     * @param var5 original type: 'float'
     */
    constructor(var0: java_lang_Float | number, var1: java_lang_Float | number, var2: java_lang_Float | number, var3: java_lang_Float | number, var4: java_lang_Float | number, var5: java_lang_Float | number);
    /**
     * @param var0 original type: 'float[]'
     */
    constructor(var0: (java_lang_Float | number)[] | null);
    /**
     * @param var0 original type: 'double'
     * @param var1 original type: 'double'
     * @param var2 original type: 'double'
     * @param var3 original type: 'double'
     * @param var4 original type: 'double'
     * @param var5 original type: 'double'
     */
    constructor(var0: java_lang_Double | number, var1: java_lang_Double | number, var2: java_lang_Double | number, var3: java_lang_Double | number, var4: java_lang_Double | number, var5: java_lang_Double | number);
    /**
     * @param var0 original type: 'double[]'
     */
    constructor(var0: (java_lang_Double | number)[] | null);
    constructor();
    /**
     * @param var0 original type: 'java.awt.geom.AffineTransform'
     */
    constructor(var0: AffineTransformClass | null);
}
declare const AffineTransform_base: typeof AffineTransformClass;
/**
 * Class java.awt.geom.AffineTransform.
 *
 * This actually imports the java class for further use.
 * The class {@link AffineTransformClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class AffineTransform extends AffineTransform_base {
}
export default AffineTransform;
//# sourceMappingURL=AffineTransform.d.ts.map
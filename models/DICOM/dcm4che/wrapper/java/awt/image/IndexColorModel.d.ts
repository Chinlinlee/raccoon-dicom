/// <reference types="node" />
import { JavaClass, BasicOrJavaType } from "java-bridge";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { WritableRaster as java_awt_image_WritableRaster } from "./WritableRaster";
import { Raster as java_awt_image_Raster } from "./Raster";
import { Float as java_lang_Float } from "./../../lang/Float";
import { SampleModel as java_awt_image_SampleModel } from "./SampleModel";
import { BufferedImage as java_awt_image_BufferedImage } from "./BufferedImage";
import { Boolean as java_lang_Boolean } from "./../../lang/Boolean";
import { BigInteger as java_math_BigInteger } from "./../../math/BigInteger";
import { ColorModel as java_awt_image_ColorModel } from "./ColorModel";
import { ColorSpace as java_awt_color_ColorSpace } from "./../color/ColorSpace";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Class as java_lang_Class } from "./../../lang/Class";
/**
 * This class just defines types, you should import {@link IndexColorModel} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class IndexColorModelClass extends JavaClass {
    /**
     * Original type: 'int'
     */
    static readonly OPAQUE: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly BITMASK: java_lang_Integer | number;
    /**
     * Original type: 'int'
     */
    static readonly TRANSLUCENT: java_lang_Integer | number;
    /**
     * @return original return type: 'void'
     */
    finalize(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    finalizeSync(): void;
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
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    isValid(var0: java_lang_Integer | number): Promise<boolean>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'boolean'
     */
    isValidSync(var0: java_lang_Integer | number): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isValid(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isValidSync(): boolean;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.image.WritableRaster'
     */
    createCompatibleWritableRaster(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_awt_image_WritableRaster | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.image.WritableRaster'
     */
    createCompatibleWritableRasterSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_awt_image_WritableRaster | null;
    /**
     * @return original return type: 'int'
     */
    getMapSize(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getMapSizeSync(): number;
    /**
     * @param var0 original type: 'java.awt.image.Raster'
     * @return original return type: 'boolean'
     */
    isCompatibleRaster(var0: java_awt_image_Raster | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.image.Raster'
     * @return original return type: 'boolean'
     */
    isCompatibleRasterSync(var0: java_awt_image_Raster | null): boolean;
    /**
     * @return original return type: 'int[]'
     */
    getComponentSize(): Promise<(number)[] | null>;
    /**
     * @return original return type: 'int[]'
     */
    getComponentSizeSync(): (number)[] | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getComponentSize(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getComponentSizeSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    getDataElements(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    getDataElementsSync(var0: java_lang_Integer | number, var1: BasicOrJavaType | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    getDataElements(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number, var2: BasicOrJavaType | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    getDataElementsSync(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number, var2: BasicOrJavaType | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    getDataElements(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: BasicOrJavaType | null): Promise<BasicOrJavaType | null>;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'java.lang.Object'
     * @return original return type: 'java.lang.Object'
     */
    getDataElementsSync(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: BasicOrJavaType | null): BasicOrJavaType | null;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getRGB(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getRGBSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getRGB(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getRGBSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.image.SampleModel'
     */
    createCompatibleSampleModel(var0: java_lang_Integer | number, var1: java_lang_Integer | number): Promise<java_awt_image_SampleModel | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @return original return type: 'java.awt.image.SampleModel'
     */
    createCompatibleSampleModelSync(var0: java_lang_Integer | number, var1: java_lang_Integer | number): java_awt_image_SampleModel | null;
    /**
     * @return original return type: 'int'
     */
    getTransparency(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getTransparencySync(): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getAlpha(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getAlphaSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getAlpha(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getAlphaSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getRed(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getRedSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getRed(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getRedSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getGreen(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getGreenSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getGreen(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getGreenSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getBlue(var0: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'int'
     */
    getBlueSync(var0: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getBlue(var0: BasicOrJavaType | null): Promise<number>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @return original return type: 'int'
     */
    getBlueSync(var0: BasicOrJavaType | null): number;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getDataElement(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getDataElementSync(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getDataElement(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number): Promise<number>;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @return original return type: 'int'
     */
    getDataElementSync(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number): number;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'int[]'
     * @param var2 original type: 'int'
     * @return original return type: 'int[]'
     */
    getComponents(var0: BasicOrJavaType | null, var1: (java_lang_Integer | number)[] | null, var2: java_lang_Integer | number): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'int[]'
     * @param var2 original type: 'int'
     * @return original return type: 'int[]'
     */
    getComponentsSync(var0: BasicOrJavaType | null, var1: (java_lang_Integer | number)[] | null, var2: java_lang_Integer | number): (number)[] | null;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int[]'
     * @param var2 original type: 'int'
     * @return original return type: 'int[]'
     */
    getComponents(var0: java_lang_Integer | number, var1: (java_lang_Integer | number)[] | null, var2: java_lang_Integer | number): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int[]'
     * @param var2 original type: 'int'
     * @return original return type: 'int[]'
     */
    getComponentsSync(var0: java_lang_Integer | number, var1: (java_lang_Integer | number)[] | null, var2: java_lang_Integer | number): (number)[] | null;
    /**
     * @param var0 original type: 'java.awt.image.SampleModel'
     * @return original return type: 'boolean'
     */
    isCompatibleSampleModel(var0: java_awt_image_SampleModel | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.image.SampleModel'
     * @return original return type: 'boolean'
     */
    isCompatibleSampleModelSync(var0: java_awt_image_SampleModel | null): boolean;
    /**
     * @return original return type: 'int'
     */
    getTransparentPixel(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getTransparentPixelSync(): number;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getReds(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getRedsSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getGreens(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getGreensSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getBlues(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getBluesSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getAlphas(var0: Buffer | null): Promise<void>;
    /**
     * @param var0 original type: 'byte[]'
     * @return original return type: 'void'
     */
    getAlphasSync(var0: Buffer | null): void;
    /**
     * @param var0 original type: 'int[]'
     * @return original return type: 'void'
     */
    getRGBs(var0: (java_lang_Integer | number)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'int[]'
     * @return original return type: 'void'
     */
    getRGBsSync(var0: (java_lang_Integer | number)[] | null): void;
    /**
     * @param var0 original type: 'java.awt.image.Raster'
     * @param var1 original type: 'boolean'
     * @return original return type: 'java.awt.image.BufferedImage'
     */
    convertToIntDiscrete(var0: java_awt_image_Raster | null, var1: java_lang_Boolean | boolean): Promise<java_awt_image_BufferedImage | null>;
    /**
     * @param var0 original type: 'java.awt.image.Raster'
     * @param var1 original type: 'boolean'
     * @return original return type: 'java.awt.image.BufferedImage'
     */
    convertToIntDiscreteSync(var0: java_awt_image_Raster | null, var1: java_lang_Boolean | boolean): java_awt_image_BufferedImage | null;
    /**
     * @return original return type: 'java.math.BigInteger'
     */
    getValidPixels(): Promise<java_math_BigInteger | null>;
    /**
     * @return original return type: 'java.math.BigInteger'
     */
    getValidPixelsSync(): java_math_BigInteger | null;
    /**
     * @return original return type: 'java.awt.image.ColorModel'
     */
    static getRGBdefault(): Promise<java_awt_image_ColorModel | null>;
    /**
     * @return original return type: 'java.awt.image.ColorModel'
     */
    static getRGBdefaultSync(): java_awt_image_ColorModel | null;
    /**
     * @return original return type: 'boolean'
     */
    hasAlpha(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    hasAlphaSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isAlphaPremultiplied(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isAlphaPremultipliedSync(): boolean;
    /**
     * @param var0 original type: 'java.awt.image.WritableRaster'
     * @param var1 original type: 'boolean'
     * @return original return type: 'java.awt.image.ColorModel'
     */
    coerceData(var0: java_awt_image_WritableRaster | null, var1: java_lang_Boolean | boolean): Promise<java_awt_image_ColorModel | null>;
    /**
     * @param var0 original type: 'java.awt.image.WritableRaster'
     * @param var1 original type: 'boolean'
     * @return original return type: 'java.awt.image.ColorModel'
     */
    coerceDataSync(var0: java_awt_image_WritableRaster | null, var1: java_lang_Boolean | boolean): java_awt_image_ColorModel | null;
    /**
     * @return original return type: 'java.awt.color.ColorSpace'
     */
    getColorSpace(): Promise<java_awt_color_ColorSpace | null>;
    /**
     * @return original return type: 'java.awt.color.ColorSpace'
     */
    getColorSpaceSync(): java_awt_color_ColorSpace | null;
    /**
     * @return original return type: 'int'
     */
    getPixelSize(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getPixelSizeSync(): number;
    /**
     * @return original return type: 'int'
     */
    getNumComponents(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getNumComponentsSync(): number;
    /**
     * @param var0 original type: 'java.awt.image.WritableRaster'
     * @return original return type: 'java.awt.image.WritableRaster'
     */
    getAlphaRaster(var0: java_awt_image_WritableRaster | null): Promise<java_awt_image_WritableRaster | null>;
    /**
     * @param var0 original type: 'java.awt.image.WritableRaster'
     * @return original return type: 'java.awt.image.WritableRaster'
     */
    getAlphaRasterSync(var0: java_awt_image_WritableRaster | null): java_awt_image_WritableRaster | null;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int[]'
     * @param var3 original type: 'int'
     * @return original return type: 'int[]'
     */
    getUnnormalizedComponents(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Integer | number)[] | null, var3: java_lang_Integer | number): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'float[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int[]'
     * @param var3 original type: 'int'
     * @return original return type: 'int[]'
     */
    getUnnormalizedComponentsSync(var0: (java_lang_Float | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Integer | number)[] | null, var3: java_lang_Integer | number): (number)[] | null;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'float[]'
     * @param var3 original type: 'int'
     * @return original return type: 'float[]'
     */
    getNormalizedComponents(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Float | number)[] | null, var3: java_lang_Integer | number): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'int[]'
     * @param var1 original type: 'int'
     * @param var2 original type: 'float[]'
     * @param var3 original type: 'int'
     * @return original return type: 'float[]'
     */
    getNormalizedComponentsSync(var0: (java_lang_Integer | number)[] | null, var1: java_lang_Integer | number, var2: (java_lang_Float | number)[] | null, var3: java_lang_Integer | number): (number)[] | null;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'float[]'
     * @param var2 original type: 'int'
     * @return original return type: 'float[]'
     */
    getNormalizedComponents(var0: BasicOrJavaType | null, var1: (java_lang_Float | number)[] | null, var2: java_lang_Integer | number): Promise<(number)[] | null>;
    /**
     * @param var0 original type: 'java.lang.Object'
     * @param var1 original type: 'float[]'
     * @param var2 original type: 'int'
     * @return original return type: 'float[]'
     */
    getNormalizedComponentsSync(var0: BasicOrJavaType | null, var1: (java_lang_Float | number)[] | null, var2: java_lang_Integer | number): (number)[] | null;
    /**
     * @return original return type: 'int'
     */
    getTransferType(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getTransferTypeSync(): number;
    /**
     * @return original return type: 'int'
     */
    getNumColorComponents(): Promise<number>;
    /**
     * @return original return type: 'int'
     */
    getNumColorComponentsSync(): number;
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
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'byte[]'
     * @param var4 original type: 'byte[]'
     * @param var5 original type: 'byte[]'
     * @return original return type: 'java.awt.image.IndexColorModel'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: Buffer | null, var4: Buffer | null, var5: Buffer | null): Promise<IndexColorModel>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'boolean'
     * @return original return type: 'java.awt.image.IndexColorModel'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: java_lang_Integer | number, var4: java_lang_Boolean | boolean): Promise<IndexColorModel>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'boolean'
     * @param var5 original type: 'int'
     * @return original return type: 'java.awt.image.IndexColorModel'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: java_lang_Integer | number, var4: java_lang_Boolean | boolean, var5: java_lang_Integer | number): Promise<IndexColorModel>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'java.math.BigInteger'
     * @return original return type: 'java.awt.image.IndexColorModel'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: (java_lang_Integer | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_math_BigInteger | null): Promise<IndexColorModel>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'byte[]'
     * @param var4 original type: 'byte[]'
     * @param var5 original type: 'int'
     * @return original return type: 'java.awt.image.IndexColorModel'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: Buffer | null, var4: Buffer | null, var5: java_lang_Integer | number): Promise<IndexColorModel>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'byte[]'
     * @param var4 original type: 'byte[]'
     * @return original return type: 'java.awt.image.IndexColorModel'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: Buffer | null, var4: Buffer | null): Promise<IndexColorModel>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'boolean'
     * @param var5 original type: 'int'
     * @param var6 original type: 'int'
     * @return original return type: 'java.awt.image.IndexColorModel'
     */
    static newInstance(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: (java_lang_Integer | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Boolean | boolean, var5: java_lang_Integer | number, var6: java_lang_Integer | number): Promise<IndexColorModel>;
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'byte[]'
     * @param var4 original type: 'byte[]'
     * @param var5 original type: 'byte[]'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: Buffer | null, var4: Buffer | null, var5: Buffer | null);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'boolean'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: java_lang_Integer | number, var4: java_lang_Boolean | boolean);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'boolean'
     * @param var5 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: java_lang_Integer | number, var4: java_lang_Boolean | boolean, var5: java_lang_Integer | number);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'int'
     * @param var5 original type: 'java.math.BigInteger'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: (java_lang_Integer | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Integer | number, var5: java_math_BigInteger | null);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'byte[]'
     * @param var4 original type: 'byte[]'
     * @param var5 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: Buffer | null, var4: Buffer | null, var5: java_lang_Integer | number);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'byte[]'
     * @param var3 original type: 'byte[]'
     * @param var4 original type: 'byte[]'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: Buffer | null, var3: Buffer | null, var4: Buffer | null);
    /**
     * @param var0 original type: 'int'
     * @param var1 original type: 'int'
     * @param var2 original type: 'int[]'
     * @param var3 original type: 'int'
     * @param var4 original type: 'boolean'
     * @param var5 original type: 'int'
     * @param var6 original type: 'int'
     */
    constructor(var0: java_lang_Integer | number, var1: java_lang_Integer | number, var2: (java_lang_Integer | number)[] | null, var3: java_lang_Integer | number, var4: java_lang_Boolean | boolean, var5: java_lang_Integer | number, var6: java_lang_Integer | number);
}
declare const IndexColorModel_base: typeof IndexColorModelClass;
/**
 * Class java.awt.image.IndexColorModel.
 *
 * This actually imports the java class for further use.
 * The class {@link IndexColorModelClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class IndexColorModel extends IndexColorModel_base {
}
export default IndexColorModel;
//# sourceMappingURL=IndexColorModel.d.ts.map
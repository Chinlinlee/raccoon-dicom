import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { File as java_io_File } from "./../../../../java/io/File";
import { Number as java_lang_Number } from "./../../../../java/lang/Number";
import { Integer as java_lang_Integer } from "./../../../../java/lang/Integer";
import { Float as java_lang_Float } from "./../../../../java/lang/Float";
import { Boolean as java_lang_Boolean } from "./../../../../java/lang/Boolean";
import { Dcm2Jpg$ReadImage as org_github_chinlinlee_dcm2jpg_Dcm2Jpg$ReadImage, Dcm2Jpg$ReadImageInterface as org_github_chinlinlee_dcm2jpg_Dcm2Jpg$ReadImageInterface } from "./Dcm2Jpg$ReadImage";
import { ICCProfile$Option as org_dcm4che3_image_ICCProfile$Option } from "./../../../dcm4che3/image/ICCProfile$Option";
import { BufferedImage as java_awt_image_BufferedImage } from "./../../../../java/awt/image/BufferedImage";
import { Attributes as org_dcm4che3_data_Attributes } from "./../../../dcm4che3/data/Attributes";
import { Long as java_lang_Long } from "./../../../../java/lang/Long";
import { Class as java_lang_Class } from "./../../../../java/lang/Class";
/**
 * This class just defines types, you should import {@link Dcm2Jpg} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Dcm2JpgClass extends JavaClass {
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static main(var0: (string | null)[] | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String[]'
     * @return original return type: 'void'
     */
    static mainSync(var0: (string | null)[] | null): void;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.io.File'
     * @return original return type: 'void'
     */
    convert(var0: java_io_File | null, var1: java_io_File | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.File'
     * @param var1 original type: 'java.io.File'
     * @return original return type: 'void'
     */
    convertSync(var0: java_io_File | null, var1: java_io_File | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.String'
     * @param var3 original type: 'java.lang.String'
     * @param var4 original type: 'java.lang.Number'
     * @return original return type: 'void'
     */
    initImageWriter(var0: string | null, var1: string | null, var2: string | null, var3: string | null, var4: java_lang_Number | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.String'
     * @param var3 original type: 'java.lang.String'
     * @param var4 original type: 'java.lang.Number'
     * @return original return type: 'void'
     */
    initImageWriterSync(var0: string | null, var1: string | null, var2: string | null, var3: string | null, var4: java_lang_Number | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setFrame(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setFrameSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    setWindowCenter(var0: java_lang_Float | number): Promise<void>;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    setWindowCenterSync(var0: java_lang_Float | number): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setPreferWindow(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setPreferWindowSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setVOILUTIndex(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setVOILUTIndexSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setOverlayRGBValue(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setOverlayRGBValueSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setAutoWindowing(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setAutoWindowingSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    setWindowWidth(var0: java_lang_Float | number): Promise<void>;
    /**
     * @param var0 original type: 'float'
     * @return original return type: 'void'
     */
    setWindowWidthSync(var0: java_lang_Float | number): void;
    /**
     * @param var0 original type: 'org.github.chinlinlee.dcm2jpg.Dcm2Jpg$ReadImage'
     * @return original return type: 'void'
     */
    setReadImage(var0: org_github_chinlinlee_dcm2jpg_Dcm2Jpg$ReadImage | JavaInterfaceProxy<org_github_chinlinlee_dcm2jpg_Dcm2Jpg$ReadImageInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'org.github.chinlinlee.dcm2jpg.Dcm2Jpg$ReadImage'
     * @return original return type: 'void'
     */
    setReadImageSync(var0: org_github_chinlinlee_dcm2jpg_Dcm2Jpg$ReadImage | JavaInterfaceProxy<org_github_chinlinlee_dcm2jpg_Dcm2Jpg$ReadImageInterface> | null): void;
    /**
     * @param var0 original type: 'org.dcm4che3.image.ICCProfile$Option'
     * @return original return type: 'void'
     */
    setICCProfile(var0: org_dcm4che3_image_ICCProfile$Option | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.image.ICCProfile$Option'
     * @return original return type: 'void'
     */
    setICCProfileSync(var0: org_dcm4che3_image_ICCProfile$Option | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setWindowIndex(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setWindowIndexSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    setReadImageDicomInput(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    setReadImageDicomInputSync(): void;
    /**
     * @return original return type: 'boolean'
     */
    isIgnorePresentationLUTShape(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isIgnorePresentationLUTShapeSync(): boolean;
    /**
     * @return original return type: 'void'
     */
    setReadImageImageInput(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    setReadImageImageInputSync(): void;
    /**
     * @param var0 original type: 'java.io.File'
     * @return original return type: 'java.awt.image.BufferedImage'
     */
    readImageFromImageInputStream(var0: java_io_File | null): Promise<java_awt_image_BufferedImage | null>;
    /**
     * @param var0 original type: 'java.io.File'
     * @return original return type: 'java.awt.image.BufferedImage'
     */
    readImageFromImageInputStreamSync(var0: java_io_File | null): java_awt_image_BufferedImage | null;
    /**
     * @param var0 original type: 'java.io.File'
     * @return original return type: 'java.awt.image.BufferedImage'
     */
    readImageFromDicomInputStream(var0: java_io_File | null): Promise<java_awt_image_BufferedImage | null>;
    /**
     * @param var0 original type: 'java.io.File'
     * @return original return type: 'java.awt.image.BufferedImage'
     */
    readImageFromDicomInputStreamSync(var0: java_io_File | null): java_awt_image_BufferedImage | null;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setIgnorePresentationLUTShape(var0: java_lang_Boolean | boolean): Promise<void>;
    /**
     * @param var0 original type: 'boolean'
     * @return original return type: 'void'
     */
    setIgnorePresentationLUTShapeSync(var0: java_lang_Boolean | boolean): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setOverlayActivationMask(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setOverlayActivationMaskSync(var0: java_lang_Integer | number): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    static listSupportedImageWriters(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    static listSupportedImageWritersSync(var0: string | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setIccProfileFromString(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setIccProfileFromStringSync(var0: string | null): void;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setOverlayGrayscaleValue(var0: java_lang_Integer | number): Promise<void>;
    /**
     * @param var0 original type: 'int'
     * @return original return type: 'void'
     */
    setOverlayGrayscaleValueSync(var0: java_lang_Integer | number): void;
    /**
     * @return original return type: 'void'
     */
    static listSupportedFormats(): Promise<void>;
    /**
     * @return original return type: 'void'
     */
    static listSupportedFormatsSync(): void;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    setPresentationState(var0: org_dcm4che3_data_Attributes | null): Promise<void>;
    /**
     * @param var0 original type: 'org.dcm4che3.data.Attributes'
     * @return original return type: 'void'
     */
    setPresentationStateSync(var0: org_dcm4che3_data_Attributes | null): void;
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
     * @return original return type: 'org.github.chinlinlee.dcm2jpg.Dcm2Jpg'
     */
    static newInstance(): Promise<Dcm2Jpg>;
    constructor();
}
declare const Dcm2Jpg_base: typeof Dcm2JpgClass;
/**
 * Class org.github.chinlinlee.dcm2jpg.Dcm2Jpg.
 *
 * This actually imports the java class for further use.
 * The class {@link Dcm2JpgClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class Dcm2Jpg extends Dcm2Jpg_base {
}
export default Dcm2Jpg;
//# sourceMappingURL=Dcm2Jpg.d.ts.map
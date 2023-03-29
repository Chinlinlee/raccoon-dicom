import { JavaClass, BasicOrJavaType, JavaInterfaceProxy } from "java-bridge";
import { ObjectOutput as java_io_ObjectOutput, ObjectOutputInterface as java_io_ObjectOutputInterface } from "./../../io/ObjectOutput";
import { ObjectInput as java_io_ObjectInput, ObjectInputInterface as java_io_ObjectInputInterface } from "./../../io/ObjectInput";
import { Class as java_lang_Class } from "./../../lang/Class";
import { Reader as java_io_Reader } from "./../../io/Reader";
import { Transferable as java_awt_datatransfer_Transferable, TransferableInterface as java_awt_datatransfer_TransferableInterface } from "./Transferable";
import { Long as java_lang_Long } from "./../../lang/Long";
import { Integer as java_lang_Integer } from "./../../lang/Integer";
import { ClassLoader as java_lang_ClassLoader } from "./../../lang/ClassLoader";
/**
 * This class just defines types, you should import {@link DataFlavor} instead of this.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DataFlavorClass extends JavaClass {
    /**
     * Original type: 'java.awt.datatransfer.DataFlavor'
     */
    static readonly stringFlavor: DataFlavorClass | null;
    /**
     * Original type: 'java.awt.datatransfer.DataFlavor'
     */
    static readonly imageFlavor: DataFlavorClass | null;
    /**
     * Original type: 'java.awt.datatransfer.DataFlavor'
     */
    static readonly plainTextFlavor: DataFlavorClass | null;
    /**
     * Original type: 'java.lang.String'
     */
    static readonly javaSerializedObjectMimeType: string | null;
    /**
     * Original type: 'java.awt.datatransfer.DataFlavor'
     */
    static readonly javaFileListFlavor: DataFlavorClass | null;
    /**
     * Original type: 'java.lang.String'
     */
    static readonly javaJVMLocalObjectMimeType: string | null;
    /**
     * Original type: 'java.lang.String'
     */
    static readonly javaRemoteObjectMimeType: string | null;
    /**
     * Original type: 'java.awt.datatransfer.DataFlavor'
     */
    static readonly selectionHtmlFlavor: DataFlavorClass | null;
    /**
     * Original type: 'java.awt.datatransfer.DataFlavor'
     */
    static readonly fragmentHtmlFlavor: DataFlavorClass | null;
    /**
     * Original type: 'java.awt.datatransfer.DataFlavor'
     */
    static readonly allHtmlFlavor: DataFlavorClass | null;
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
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    equals(var0: string | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    equalsSync(var0: string | null): boolean;
    /**
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor'
     * @return original return type: 'boolean'
     */
    equals(var0: DataFlavorClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor'
     * @return original return type: 'boolean'
     */
    equalsSync(var0: DataFlavorClass | null): boolean;
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
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor'
     * @return original return type: 'boolean'
     */
    match(var0: DataFlavorClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor'
     * @return original return type: 'boolean'
     */
    matchSync(var0: DataFlavorClass | null): boolean;
    /**
     * @param var0 original type: 'java.io.ObjectOutput'
     * @return original return type: 'void'
     */
    writeExternal(var0: java_io_ObjectOutput | JavaInterfaceProxy<java_io_ObjectOutputInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.ObjectOutput'
     * @return original return type: 'void'
     */
    writeExternalSync(var0: java_io_ObjectOutput | JavaInterfaceProxy<java_io_ObjectOutputInterface> | null): void;
    /**
     * @param var0 original type: 'java.io.ObjectInput'
     * @return original return type: 'void'
     */
    readExternal(var0: java_io_ObjectInput | JavaInterfaceProxy<java_io_ObjectInputInterface> | null): Promise<void>;
    /**
     * @param var0 original type: 'java.io.ObjectInput'
     * @return original return type: 'void'
     */
    readExternalSync(var0: java_io_ObjectInput | JavaInterfaceProxy<java_io_ObjectInputInterface> | null): void;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    getParameter(var0: string | null): Promise<string | null>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.lang.String'
     */
    getParameterSync(var0: string | null): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getPrimaryType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getPrimaryTypeSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSubType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getSubTypeSync(): string | null;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassInputStream(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassInputStreamSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassByteBuffer(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassByteBufferSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorTextType(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorTextTypeSync(): boolean;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getRepresentationClass(): Promise<java_lang_Class | null>;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getRepresentationClassSync(): java_lang_Class | null;
    /**
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor'
     * @return original return type: 'boolean'
     */
    isMimeTypeEqual(var0: DataFlavorClass | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor'
     * @return original return type: 'boolean'
     */
    isMimeTypeEqualSync(var0: DataFlavorClass | null): boolean;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    isMimeTypeEqual(var0: string | null): Promise<boolean>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'boolean'
     */
    isMimeTypeEqualSync(var0: string | null): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassReader(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassReaderSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassCharBuffer(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassCharBufferSync(): boolean;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getDefaultRepresentationClass(): Promise<java_lang_Class | null>;
    /**
     * @return original return type: 'java.lang.Class'
     */
    getDefaultRepresentationClassSync(): java_lang_Class | null;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassSerializable(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassSerializableSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassRemote(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isRepresentationClassRemoteSync(): boolean;
    /**
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static getTextPlainUnicodeFlavor(): Promise<DataFlavor | null>;
    /**
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static getTextPlainUnicodeFlavorSync(): DataFlavor | null;
    /**
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor[]'
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static selectBestTextFlavor(var0: (DataFlavorClass | null)[] | null): Promise<DataFlavor | null>;
    /**
     * @param var0 original type: 'java.awt.datatransfer.DataFlavor[]'
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static selectBestTextFlavorSync(var0: (DataFlavorClass | null)[] | null): DataFlavor | null;
    /**
     * @param var0 original type: 'java.awt.datatransfer.Transferable'
     * @return original return type: 'java.io.Reader'
     */
    getReaderForText(var0: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null): Promise<java_io_Reader | null>;
    /**
     * @param var0 original type: 'java.awt.datatransfer.Transferable'
     * @return original return type: 'java.io.Reader'
     */
    getReaderForTextSync(var0: java_awt_datatransfer_Transferable | JavaInterfaceProxy<java_awt_datatransfer_TransferableInterface> | null): java_io_Reader | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getMimeType(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getMimeTypeSync(): string | null;
    /**
     * @return original return type: 'java.lang.String'
     */
    getHumanPresentableName(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getHumanPresentableNameSync(): string | null;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setHumanPresentableName(var0: string | null): Promise<void>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'void'
     */
    setHumanPresentableNameSync(var0: string | null): void;
    /**
     * @return original return type: 'boolean'
     */
    isMimeTypeSerializedObject(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isMimeTypeSerializedObjectSync(): boolean;
    /**
     * @return original return type: 'java.lang.String'
     */
    getDefaultRepresentationClassAsString(): Promise<string | null>;
    /**
     * @return original return type: 'java.lang.String'
     */
    getDefaultRepresentationClassAsStringSync(): string | null;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorSerializedObjectType(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorSerializedObjectTypeSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorRemoteObjectType(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorRemoteObjectTypeSync(): boolean;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorJavaFileListType(): Promise<boolean>;
    /**
     * @return original return type: 'boolean'
     */
    isFlavorJavaFileListTypeSync(): boolean;
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
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static newInstance(): Promise<DataFlavor>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static newInstance(var0: string | null): Promise<DataFlavor>;
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static newInstance(var0: java_lang_Class | null, var1: string | null): Promise<DataFlavor>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static newInstance(var0: string | null, var1: string | null): Promise<DataFlavor>;
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.ClassLoader'
     * @return original return type: 'java.awt.datatransfer.DataFlavor'
     */
    static newInstance(var0: string | null, var1: string | null, var2: java_lang_ClassLoader | null): Promise<DataFlavor>;
    constructor();
    /**
     * @param var0 original type: 'java.lang.String'
     */
    constructor(var0: string | null);
    /**
     * @param var0 original type: 'java.lang.Class'
     * @param var1 original type: 'java.lang.String'
     */
    constructor(var0: java_lang_Class | null, var1: string | null);
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     */
    constructor(var0: string | null, var1: string | null);
    /**
     * @param var0 original type: 'java.lang.String'
     * @param var1 original type: 'java.lang.String'
     * @param var2 original type: 'java.lang.ClassLoader'
     */
    constructor(var0: string | null, var1: string | null, var2: java_lang_ClassLoader | null);
}
declare const DataFlavor_base: typeof DataFlavorClass;
/**
 * Class java.awt.datatransfer.DataFlavor.
 *
 * This actually imports the java class for further use.
 * The class {@link DataFlavorClass} only defines types, this is the class you should actually import.
 * Please note that this statement imports the underlying java class at runtime, which may take a while.
 * This was generated by java-bridge.
 * You should probably not edit this.
 */
export declare class DataFlavor extends DataFlavor_base {
}
export default DataFlavor;
//# sourceMappingURL=DataFlavor.d.ts.map